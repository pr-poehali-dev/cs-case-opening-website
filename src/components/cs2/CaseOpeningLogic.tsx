import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import CaseRollingAnimation from '@/components/cs2/CaseRollingAnimation';
import CaseSelector from '@/components/cs2/CaseSelector';
import { playCS2Sound } from '@/components/cs2/CS2SoundManager';

interface CaseItem {
  id?: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
  chance: number;
  isWinner?: boolean;
}

interface CaseData {
  id: number;
  name: string;
  price: number;
  image: string;
  rarity: string;
  items: CaseItem[];
}

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface CaseOpeningLogicProps {
  cases: CaseData[];
  userBalance: number;
  userInventory: InventoryItem[];
  onBalanceChange: (balance: number) => void;
  onInventoryChange: (inventory: InventoryItem[]) => void;
}

const CaseOpeningLogic = ({ 
  cases, 
  userBalance, 
  userInventory, 
  onBalanceChange, 
  onInventoryChange 
}: CaseOpeningLogicProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [openedItem, setOpenedItem] = useState<CaseItem | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollingItems, setRollingItems] = useState<CaseItem[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseData>(cases[0]);
  const [showPreview, setShowPreview] = useState(false);
  const [openCount, setOpenCount] = useState(1);

  const generateRollingItems = (caseItems: CaseItem[], wonItem: CaseItem) => {
    const items = [];
    
    for (let i = 0; i < 50; i++) {
      if (i === 35) {
        items.push({ ...wonItem, isWinner: true });
      } else {
        const randomItem = caseItems[Math.floor(Math.random() * caseItems.length)];
        items.push({ ...randomItem, id: i });
      }
    }
    
    return items;
  };

  const selectWinningItem = (caseItems: CaseItem[]) => {
    const rand = Math.random() * 100;
    let cumulativeChance = 0;
    
    for (const item of caseItems) {
      cumulativeChance += item.chance;
      if (rand <= cumulativeChance) {
        return item;
      }
    }
    
    return caseItems[0];
  };

  const handleOpenCase = (count: number = 1) => {
    const totalCost = selectedCase.price * count;
    if (userBalance < totalCost) return;
    
    onBalanceChange(userBalance - totalCost);
    setIsOpening(true);
    setIsRolling(true);
    setOpenedItem(null);
    
    playCS2Sound('case_open', 0.5);
    
    const wonItem = selectWinningItem(selectedCase.items);
    const rollingItemsList = generateRollingItems(selectedCase.items, wonItem);
    setRollingItems(rollingItemsList);
    
    const playRollingSounds = () => {
      const startX = 560;
      const endX = -4312;
      const duration = 11760;
      const totalDistance = startX - endX;
      
      const skinWidth = 128;
      const skinMargin = 16;
      const skinStep = skinWidth + skinMargin;
      const centerLine = 400;
      
      rollingItemsList.forEach((skin, index) => {
        const initialLeft = startX + (index * skinStep);
        const initialRight = initialLeft + skinWidth;
        const finalLeft = initialLeft + (endX - startX);
        const finalRight = finalLeft + skinWidth;
        
        const willCross = initialLeft > centerLine && finalRight < centerLine;
        
        if (willCross) {
          const distanceToLine = initialLeft - centerLine;
          const timeToTick = (distanceToLine / totalDistance) * duration;
          const tickTime = Math.max(200, Math.min(timeToTick, duration - 200));
          
          setTimeout(() => {
            playCS2Sound('roll_tick', 0.2);
          }, tickTime);
        }
      });
      
      setTimeout(() => {
        playCS2Sound('roll_tick', 0.1);
      }, 100);
    };
    
    playRollingSounds();
    
    setTimeout(() => {
      setIsRolling(false);
      const actualWonItem = rollingItemsList.find(item => item.isWinner) || wonItem;
      setOpenedItem(actualWonItem);
      
      const newInventoryItem: InventoryItem = {
        ...actualWonItem,
        id: Date.now()
      };
      onInventoryChange([newInventoryItem, ...userInventory]);
      
      const dropVolume = actualWonItem.rarity === 'ancient' ? 0.8 : 
                        actualWonItem.rarity === 'legendary' ? 0.7 :
                        actualWonItem.rarity === 'rare' ? 0.6 : 0.5;
      playCS2Sound('item_drop', dropVolume);
      
      if (actualWonItem.rarity === 'ancient') {
        setTimeout(() => playCS2Sound('case_unlock', 0.4), 300);
        setTimeout(() => playCS2Sound('item_drop', 0.3), 600);
      } else if (actualWonItem.rarity === 'legendary') {
        setTimeout(() => playCS2Sound('case_unlock', 0.3), 400);
      }
      
    }, 11760);
  };

  const handleSellOpenedItem = (item: CaseItem) => {
    onBalanceChange(userBalance + item.value);
    onInventoryChange(userInventory.filter(invItem => invItem.name !== item.name || invItem.id !== Date.now()));
    playCS2Sound('case_unlock', 0.6);
  };

  return (
    <>
      <TabsContent value="cases" className="space-y-6">
        <CaseSelector 
          cases={cases}
          selectedCase={selectedCase}
          onCaseSelect={setSelectedCase}
          onOpenCase={(count) => {
            setOpenCount(count);
            setShowPreview(true);
          }}
          balance={userBalance}
        />
      </TabsContent>

      {showPreview && (() => {
        const maxOpens = Math.min(10, Math.floor(userBalance / selectedCase.price));
        const totalCost = selectedCase.price * openCount;
        
        return (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-space-dark border-2 border-space-purple rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-space-dark border-b border-space-purple/30 p-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-space-purple">{selectedCase.name}</h2>
                <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-white">
                  <Icon name="X" size={24} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {selectedCase.items.map((item, idx) => (
                    <div key={idx} className={`bg-space-deep/50 rounded-lg border-2 p-3 ${
                      item.rarity === 'ancient' ? 'border-red-500' :
                      item.rarity === 'legendary' ? 'border-space-purple' :
                      item.rarity === 'rare' ? 'border-space-cyan' :
                      item.rarity === 'uncommon' ? 'border-blue-400' : 'border-gray-400'
                    }`}>
                      <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-lg mb-2 overflow-hidden relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute top-1 right-1 bg-space-gold text-black px-2 py-0.5 rounded text-xs font-bold">
                          {item.chance}%
                        </div>
                      </div>
                      <h4 className="text-white text-sm font-semibold mb-1 truncate">{item.name}</h4>
                      <p className="text-space-gold text-xs">{item.value}₽</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-space-deep/50 border border-space-purple/30 rounded-lg p-6 mb-6">
                  <h3 className="text-white text-lg font-bold mb-4 text-center">Количество открытий</h3>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button
                      onClick={() => setOpenCount(Math.max(1, openCount - 1))}
                      disabled={openCount <= 1}
                      className="w-12 h-12 bg-space-purple hover:bg-space-purple/80 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg font-bold text-xl transition-colors"
                    >
                      -
                    </button>
                    <div className="bg-space-deep border-2 border-space-cyan rounded-lg px-8 py-3">
                      <span className="text-4xl font-bold text-space-cyan">{openCount}</span>
                    </div>
                    <button
                      onClick={() => setOpenCount(Math.min(maxOpens, openCount + 1))}
                      disabled={openCount >= maxOpens}
                      className="w-12 h-12 bg-space-purple hover:bg-space-purple/80 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg font-bold text-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-center gap-4 mb-2">
                    {[1, 3, 5, 10].map(num => (
                      <button
                        key={num}
                        onClick={() => setOpenCount(Math.min(maxOpens, num))}
                        disabled={num > maxOpens}
                        className="px-4 py-2 bg-space-deep hover:bg-space-purple/50 disabled:opacity-30 disabled:cursor-not-allowed border border-space-purple/50 text-white rounded-lg transition-colors"
                      >
                        {num}x
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-space-cyan text-sm mb-1">Стоимость: <span className="font-bold text-space-gold">{totalCost.toLocaleString()}₽</span></p>
                    <p className="text-gray-400 text-xs">Доступно максимум: {maxOpens} открытий</p>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setShowPreview(false);
                      setOpenCount(1);
                    }}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Назад
                  </button>
                  <button 
                    onClick={() => {
                      setShowPreview(false);
                      handleOpenCase(openCount);
                      setOpenCount(1);
                    }}
                    disabled={userBalance < totalCost || maxOpens < 1}
                    className="px-8 py-3 bg-gradient-to-r from-space-purple to-space-cyan hover:shadow-lg hover:shadow-space-purple/50 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {userBalance >= totalCost ? `Открыть ${openCount}x за ${totalCost.toLocaleString()}₽` : 'Недостаточно средств'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {isOpening && (
        <CaseRollingAnimation
          isRolling={isRolling}
          rollingItems={rollingItems}
          openedItem={openedItem}
          onClose={() => {
            setIsOpening(false);
            setOpenedItem(null);
            setRollingItems([]);
          }}
          onSellItem={handleSellOpenedItem}
          onOpenAgain={handleOpenCase}
        />
      )}
    </>
  );
};

export default CaseOpeningLogic;