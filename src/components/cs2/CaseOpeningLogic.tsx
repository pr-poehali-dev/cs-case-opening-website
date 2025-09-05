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

  const handleOpenCase = () => {
    if (userBalance < selectedCase.price) return;
    
    onBalanceChange(userBalance - selectedCase.price);
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
          onOpenCase={handleOpenCase}
          balance={userBalance}
        />
      </TabsContent>

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