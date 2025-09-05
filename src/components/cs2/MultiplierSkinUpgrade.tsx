import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface CaseItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface MultiplierSkinUpgradeProps {
  inventory: CaseItem[];
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onInventoryChange: (newInventory: CaseItem[]) => void;
}

const MULTIPLIERS = [
  { value: 2, label: '2x', cost: 500, chance: 45, color: 'from-green-500 to-emerald-600' },
  { value: 3, label: '3x', cost: 1000, chance: 30, color: 'from-blue-500 to-cyan-600' },
  { value: 5, label: '5x', cost: 2500, chance: 18, color: 'from-purple-500 to-violet-600' },
  { value: 10, label: '10x', cost: 5000, chance: 8, color: 'from-orange-500 to-red-600' }
];

const AVAILABLE_SKINS: CaseItem[] = [
  { id: 1001, name: 'AK-47 | Redline', image: '/api/placeholder/150/150', rarity: 'rare', value: 1200 },
  { id: 1002, name: 'M4A4 | Asiimov', image: '/api/placeholder/150/150', rarity: 'rare', value: 1800 },
  { id: 1003, name: 'AWP | BOOM', image: '/api/placeholder/150/150', rarity: 'rare', value: 2200 },
  { id: 1004, name: 'AK-47 | Vulcan', image: '/api/placeholder/150/150', rarity: 'legendary', value: 3500 },
  { id: 1005, name: 'AWP | Lightning Strike', image: '/api/placeholder/150/150', rarity: 'legendary', value: 4200 },
  { id: 1006, name: 'M4A4 | Howl', image: '/api/placeholder/150/150', rarity: 'legendary', value: 5800 },
  { id: 1007, name: 'AK-47 | Fire Serpent', image: '/api/placeholder/150/150', rarity: 'ancient', value: 12000 },
  { id: 1008, name: 'AWP | Medusa', image: '/api/placeholder/150/150', rarity: 'ancient', value: 15000 },
  { id: 1009, name: 'Karambit | Fade', image: '/api/placeholder/150/150', rarity: 'ancient', value: 18000 },
  { id: 1010, name: 'AWP | Dragon Lore', image: '/api/placeholder/150/150', rarity: 'ancient', value: 25000 },
  { id: 1011, name: 'M4A4 | Howl FN', image: '/api/placeholder/150/150', rarity: 'ancient', value: 35000 },
  { id: 1012, name: 'Karambit | Ruby', image: '/api/placeholder/150/150', rarity: 'ancient', value: 45000 }
];

export default function MultiplierSkinUpgrade({ inventory, balance, onBalanceChange, onInventoryChange }: MultiplierSkinUpgradeProps) {
  const [upgradeState, setUpgradeState] = useState<'setup' | 'spinning' | 'results'>('setup');
  const [selectedMultiplier, setSelectedMultiplier] = useState<number | null>(null);
  const [selectedSkin, setSelectedSkin] = useState<CaseItem | null>(null);
  const [targetSkin, setTargetSkin] = useState<CaseItem | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<{ success: boolean; item?: CaseItem } | null>(null);
  const [enhanceChance, setEnhanceChance] = useState(0);
  const [spinRotation, setSpinRotation] = useState(0);

  const getAvailableSkinsForMultiplier = (multiplier: number, baseSkinValue: number) => {
    const targetValue = baseSkinValue * multiplier;
    const tolerance = 0.3;
    
    return AVAILABLE_SKINS.filter(skin => {
      const minValue = targetValue * (1 - tolerance);
      const maxValue = targetValue * (1 + tolerance);
      return skin.value >= minValue && skin.value <= maxValue;
    });
  };

  const startUpgrade = () => {
    if (!selectedMultiplier || !selectedSkin || !targetSkin) return;
    
    const multiplierData = MULTIPLIERS.find(m => m.value === selectedMultiplier);
    if (!multiplierData) return;

    const totalCost = multiplierData.cost + (enhanceChance * 100);
    if (balance < totalCost) return;

    // Убираем скин из инвентаря и списываем деньги
    const newInventory = inventory.filter(item => item.id !== selectedSkin.id);
    onInventoryChange(newInventory);
    onBalanceChange(balance - totalCost);

    setUpgradeState('spinning');
    setIsSpinning(true);

    // Анимация вращения
    let currentRotation = 0;
    const spinInterval = setInterval(() => {
      currentRotation += 30;
      setSpinRotation(currentRotation);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      
      const finalChance = multiplierData.chance + enhanceChance;
      const isSuccess = Math.random() * 100 < finalChance;
      
      if (isSuccess) {
        const finalInventory = [...newInventory, targetSkin];
        onInventoryChange(finalInventory);
        setUpgradeResult({ success: true, item: targetSkin });
      } else {
        setUpgradeResult({ success: false });
      }

      setIsSpinning(false);
      setUpgradeState('results');
    }, 4000);
  };

  const resetUpgrade = () => {
    setUpgradeState('setup');
    setSelectedMultiplier(null);
    setSelectedSkin(null);
    setTargetSkin(null);
    setUpgradeResult(null);
    setEnhanceChance(0);
    setSpinRotation(0);
  };

  const availableSkins = selectedMultiplier && selectedSkin 
    ? getAvailableSkinsForMultiplier(selectedMultiplier, selectedSkin.value)
    : [];

  const selectedMultiplierData = MULTIPLIERS.find(m => m.value === selectedMultiplier);
  const totalCost = selectedMultiplierData ? selectedMultiplierData.cost + (enhanceChance * 100) : 0;

  if (upgradeState === 'setup') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
            🚀 Апгрейд скинов
          </h2>
          <p className="text-muted-foreground">
            Улучшайте свои скины с множителями и получайте ценные предметы!
          </p>
        </div>

        {/* Выбор скина из инвентаря */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">1. Выберите скин для апгрейда</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {inventory.map((skin) => (
                <Card
                  key={skin.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:scale-105",
                    selectedSkin?.id === skin.id ? "ring-2 ring-primary" : ""
                  )}
                  onClick={() => setSelectedSkin(skin)}
                >
                  <CardContent className="p-3">
                    <img src={skin.image} alt={skin.name} className="w-full h-24 object-cover rounded mb-2" />
                    <p className="text-sm font-medium truncate">{skin.name}</p>
                    <p className="text-xs text-primary font-semibold">{skin.value}₽</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {inventory.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Package" className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Ваш инвентарь пуст. Откройте кейсы, чтобы получить скины!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Выбор множителя */}
        {selectedSkin && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">2. Выберите множитель</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MULTIPLIERS.map((multiplier) => (
                  <Button
                    key={multiplier.value}
                    onClick={() => setSelectedMultiplier(multiplier.value)}
                    className={cn(
                      `h-20 text-lg font-bold bg-gradient-to-r ${multiplier.color}`,
                      selectedMultiplier === multiplier.value ? "ring-2 ring-white" : ""
                    )}
                  >
                    <div className="text-center">
                      <div className="text-2xl">{multiplier.label}</div>
                      <div className="text-sm opacity-90">{multiplier.chance}%</div>
                      <div className="text-xs opacity-75">{multiplier.cost}₽</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Выбор цели */}
        {selectedMultiplier && selectedSkin && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">3. Выберите целевой скин</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {availableSkins.map((skin) => (
                  <Card 
                    key={skin.id} 
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      "bg-gradient-to-br from-purple-900/20 to-blue-900/20",
                      targetSkin?.id === skin.id ? "ring-2 ring-primary" : ""
                    )}
                    onClick={() => setTargetSkin(skin)}
                  >
                    <CardContent className="p-3">
                      <img src={skin.image} alt={skin.name} className="w-full h-20 object-cover rounded mb-2" />
                      <p className="text-sm font-medium truncate">{skin.name}</p>
                      <p className="text-xs text-primary font-semibold">{skin.value}₽</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Улучшение шанса */}
              {targetSkin && (
                <>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Улучшить шанс</h4>
                    <div className="flex gap-2 mb-3">
                      {[0, 5, 10, 15, 20].map((bonus) => (
                        <Button
                          key={bonus}
                          variant={enhanceChance === bonus ? "default" : "outline"}
                          onClick={() => setEnhanceChance(bonus)}
                          className="text-sm"
                        >
                          +{bonus}% ({bonus * 100}₽)
                        </Button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Итоговый шанс: {(selectedMultiplierData?.chance || 0) + enhanceChance}%
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">Стоимость: {totalCost}₽</p>
                      <p className="text-sm text-muted-foreground">Ваш баланс: {balance}₽</p>
                      <p className="text-sm text-yellow-400">⚠️ При неудаче скин будет утерян!</p>
                    </div>
                    <Button
                      onClick={startUpgrade}
                      disabled={balance < totalCost}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      size="lg"
                    >
                      <Icon name="TrendingUp" className="mr-2" />
                      Начать апгрейд
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (upgradeState === 'spinning') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">🎲 Идет апгрейд...</h2>
          
          {/* Рулетка с анимацией */}
          <Card className="max-w-2xl mx-auto mb-6">
            <CardContent className="p-8">
              <div className="relative">
                {/* Центральная стрелка */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400"></div>
                </div>
                
                {/* Крутящееся колесо */}
                <div 
                  className="w-80 h-80 mx-auto rounded-full border-4 border-yellow-400 relative overflow-hidden transition-transform duration-100"
                  style={{ transform: `rotate(${spinRotation}deg)` }}
                >
                  {/* Сектор успеха */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600"
                    style={{ 
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + ((selectedMultiplierData?.chance || 0) + enhanceChance) * 0.5}% 0%, 50% 50%)`
                    }}
                  ></div>
                  
                  {/* Сектор неудачи */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700"
                    style={{ 
                      clipPath: `polygon(50% 50%, ${50 + ((selectedMultiplierData?.chance || 0) + enhanceChance) * 0.5}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`
                    }}
                  ></div>
                  
                  {/* Центральный круг */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-300"></div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold mb-2">
                  Шанс успеха: {(selectedMultiplierData?.chance || 0) + enhanceChance}%
                </p>
                <div className="flex justify-center items-center gap-6">
                  <div className="text-center">
                    <img src={selectedSkin?.image} alt={selectedSkin?.name} className="w-16 h-16 rounded mx-auto mb-2" />
                    <p className="text-sm font-medium">{selectedSkin?.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedSkin?.value}₽</p>
                  </div>
                  
                  <Icon name="ArrowRight" className="text-2xl" />
                  
                  <div className="text-center">
                    <img src={targetSkin?.image} alt={targetSkin?.name} className="w-16 h-16 rounded mx-auto mb-2" />
                    <p className="text-sm font-medium">{targetSkin?.name}</p>
                    <p className="text-xs text-primary">{targetSkin?.value}₽</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (upgradeState === 'results') {
    const isSuccess = upgradeResult?.success;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isSuccess ? "🎉 Успех!" : "💔 Неудача"}
          </h2>
          <Card className={cn(
            "max-w-md mx-auto",
            isSuccess ? "border-green-500 bg-green-500/5" : "border-red-500 bg-red-500/5"
          )}>
            <CardContent className="p-6">
              <div className="text-center">
                {isSuccess ? (
                  <>
                    <Icon name="CheckCircle" className="w-16 h-16 mx-auto mb-4 text-green-500" />
                    <h3 className="text-xl font-bold mb-4 text-green-400">Апгрейд успешен!</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Вы получили:</p>
                      <div className="flex items-center justify-center gap-3 p-3 bg-muted rounded">
                        <img src={upgradeResult.item?.image} alt={upgradeResult.item?.name} className="w-12 h-12 rounded" />
                        <div>
                          <p className="font-medium">{upgradeResult.item?.name}</p>
                          <p className="text-sm text-primary">{upgradeResult.item?.value}₽</p>
                        </div>
                      </div>
                      <p className="text-sm text-green-400">
                        Прибыль: +{(upgradeResult.item?.value || 0) - (selectedSkin?.value || 0)}₽
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Icon name="XCircle" className="w-16 h-16 mx-auto mb-4 text-red-500" />
                    <h3 className="text-xl font-bold mb-4 text-red-400">Апгрейд не удался</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Вы потеряли:</p>
                      <div className="flex items-center justify-center gap-3 p-3 bg-muted rounded">
                        <img src={selectedSkin?.image} alt={selectedSkin?.name} className="w-12 h-12 rounded opacity-50" />
                        <div>
                          <p className="font-medium opacity-75">{selectedSkin?.name}</p>
                          <p className="text-sm text-red-400">-{selectedSkin?.value}₽</p>
                        </div>
                      </div>
                      <p className="text-sm text-red-400">
                        Общий убыток: -{(selectedSkin?.value || 0) + totalCost}₽
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button onClick={resetUpgrade} size="lg">
              <Icon name="RotateCcw" className="mr-2" />
              Новый апгрейд
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}