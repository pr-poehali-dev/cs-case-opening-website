import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { playCS2Sound } from './CS2SoundManager';

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface UpgradeChance {
  rarity: string;
  chance: number;
  multiplier: number;
  color: string;
}

interface SkinUpgradeProps {
  inventory: InventoryItem[];
  balance: number;
  onUpgrade: (item: InventoryItem, targetRarity: string, cost: number) => void;
  onBalanceChange: (newBalance: number) => void;
}

const rarityOrder = ['common', 'uncommon', 'rare', 'legendary', 'ancient'];

const rarityColors = {
  common: 'bg-gray-500',
  uncommon: 'bg-green-500',
  rare: 'bg-blue-500',
  legendary: 'bg-purple-500',
  ancient: 'bg-yellow-500'
};

const rarityNames = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  legendary: 'Легендарный',
  ancient: 'Древний'
};

const SkinUpgrade: React.FC<SkinUpgradeProps> = ({ 
  inventory, 
  balance, 
  onUpgrade, 
  onBalanceChange 
}) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [upgradeAmount, setUpgradeAmount] = useState([1000]);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<{success: boolean, newItem?: InventoryItem} | null>(null);

  // Расчет возможных апгрейдов для выбранного предмета
  const getUpgradeChances = (item: InventoryItem, amount: number): UpgradeChance[] => {
    const currentIndex = rarityOrder.indexOf(item.rarity);
    const upgrades: UpgradeChance[] = [];
    
    // Определяем базовые шансы и множители стоимости
    const baseChances = {
      common: { uncommon: 60, rare: 25, legendary: 12, ancient: 3 },
      uncommon: { rare: 50, legendary: 30, ancient: 20 },
      rare: { legendary: 40, ancient: 60 },
      legendary: { ancient: 80 },
      ancient: {} // Древние предметы нельзя улучшить
    };

    const costMultipliers = {
      uncommon: 1.5,
      rare: 3.0,
      legendary: 6.0,
      ancient: 12.0
    };

    if (item.rarity === 'ancient') {
      return upgrades; // Древние предметы нельзя улучшить
    }

    const chances = baseChances[item.rarity as keyof typeof baseChances];
    
    for (const [targetRarity, baseChance] of Object.entries(chances)) {
      const targetIndex = rarityOrder.indexOf(targetRarity);
      if (targetIndex > currentIndex) {
        // Рассчитываем шанс на основе вложенной суммы
        const costRatio = amount / (item.value * costMultipliers[targetRarity as keyof typeof costMultipliers]);
        const finalChance = Math.min(baseChance * Math.sqrt(costRatio), 95); // Максимум 95%
        
        upgrades.push({
          rarity: targetRarity,
          chance: Math.max(finalChance, 1), // Минимум 1%
          multiplier: costMultipliers[targetRarity as keyof typeof costMultipliers],
          color: rarityColors[targetRarity as keyof typeof rarityColors]
        });
      }
    }
    
    return upgrades;
  };

  const handleStartUpgrade = (item: InventoryItem) => {
    setSelectedItem(item);
    setUpgradeAmount([Math.min(item.value * 2, balance)]);
    setShowUpgradeDialog(true);
    setUpgradeResult(null);
  };

  const executeUpgrade = async () => {
    if (!selectedItem || upgradeAmount[0] > balance) return;
    
    setIsUpgrading(true);
    playCS2Sound('case_open', 0.4);
    
    // Обновляем баланс сразу
    onBalanceChange(balance - upgradeAmount[0]);
    
    const upgrades = getUpgradeChances(selectedItem, upgradeAmount[0]);
    
    // Симуляция времени апгрейда
    setTimeout(() => {
      // Определяем результат апгрейда
      const random = Math.random() * 100;
      let cumulativeChance = 0;
      let successfulUpgrade: UpgradeChance | null = null;
      
      // Проверяем шансы от худшего к лучшему
      const sortedUpgrades = [...upgrades].reverse();
      
      for (const upgrade of sortedUpgrades) {
        cumulativeChance += upgrade.chance;
        if (random <= cumulativeChance) {
          successfulUpgrade = upgrade;
          break;
        }
      }
      
      if (successfulUpgrade) {
        // Успешный апгрейд
        const newValue = Math.round(selectedItem.value * successfulUpgrade.multiplier);
        const newItem: InventoryItem = {
          ...selectedItem,
          id: Date.now(), // Новый ID
          rarity: successfulUpgrade.rarity as any,
          value: newValue,
          name: selectedItem.name.replace(/\s+\(.*?\)$/, '') + ` (${rarityNames[successfulUpgrade.rarity as keyof typeof rarityNames]})`
        };
        
        onUpgrade(selectedItem, successfulUpgrade.rarity, upgradeAmount[0]);
        setUpgradeResult({ success: true, newItem });
        
        // Звуки успеха
        playCS2Sound('item_drop', 0.7);
        setTimeout(() => playCS2Sound('case_unlock', 0.5), 300);
      } else {
        // Неудачный апгрейд
        setUpgradeResult({ success: false });
        playCS2Sound('roll_tick', 0.3);
      }
      
      setIsUpgrading(false);
    }, 3000);
  };

  const getItemsForUpgrade = () => {
    return inventory.filter(item => item.rarity !== 'ancient');
  };

  const canUpgrade = selectedItem && upgradeAmount[0] <= balance && upgradeAmount[0] >= selectedItem.value;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-space-deep/50 border-space-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-space-purple">
            <Icon name="TrendingUp" />
            <span>🔧 Система апгрейда скинов</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-space-dark/30 rounded-lg">
              <Icon name="Target" className="mx-auto mb-2 text-space-cyan" />
              <div className="text-space-cyan font-bold">Улучшение редкости</div>
              <div className="text-gray-400">Повышайте класс ваших скинов</div>
            </div>
            <div className="text-center p-4 bg-space-dark/30 rounded-lg">
              <Icon name="DollarSign" className="mx-auto mb-2 text-space-gold" />
              <div className="text-space-gold font-bold">Инвестиции</div>
              <div className="text-gray-400">Чем больше вложите - тем выше шанс</div>
            </div>
            <div className="text-center p-4 bg-space-dark/30 rounded-lg">
              <Icon name="Zap" className="mx-auto mb-2 text-space-purple" />
              <div className="text-space-purple font-bold">Риск</div>
              <div className="text-gray-400">Неудача = потеря инвестиций</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory for Upgrade */}
      <Card className="bg-space-deep/50 border-space-purple/30">
        <CardHeader>
          <CardTitle className="text-white">Выберите скин для апгрейда</CardTitle>
        </CardHeader>
        <CardContent>
          {getItemsForUpgrade().length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Icon name="Package" className="mx-auto mb-4 w-12 h-12" />
              <p>Нет скинов для апгрейда</p>
              <p className="text-sm">Древние скины нельзя улучшить</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {getItemsForUpgrade().map((item) => (
                <Card 
                  key={item.id} 
                  className="bg-space-dark/30 border-space-purple/20 hover:border-space-purple/50 transition-colors cursor-pointer"
                  onClick={() => handleStartUpgrade(item)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square mb-3 relative overflow-hidden rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${rarityColors[item.rarity]} text-white text-xs`}
                      >
                        {rarityNames[item.rarity]}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-space-gold font-bold">
                        {item.value.toLocaleString()}₽
                      </span>
                      <Button 
                        size="sm" 
                        className="bg-space-purple hover:bg-space-purple/80"
                      >
                        <Icon name="ArrowUp" className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="bg-space-deep border-space-purple/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Icon name="TrendingUp" />
              <span>Апгрейд скина</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6">
              {/* Current Item */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-lg overflow-hidden">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-1">{selectedItem.name}</h3>
                <Badge className={`${rarityColors[selectedItem.rarity]} text-white`}>
                  {rarityNames[selectedItem.rarity]}
                </Badge>
                <div className="text-space-gold font-bold mt-2">
                  {selectedItem.value.toLocaleString()}₽
                </div>
              </div>

              {!upgradeResult && !isUpgrading && (
                <>
                  {/* Investment Amount */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-space-cyan">
                      Сумма инвестиций: {upgradeAmount[0].toLocaleString()}₽
                    </label>
                    <Slider
                      value={upgradeAmount}
                      onValueChange={setUpgradeAmount}
                      min={selectedItem.value}
                      max={Math.min(selectedItem.value * 10, balance)}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Мин: {selectedItem.value.toLocaleString()}₽</span>
                      <span>Баланс: {balance.toLocaleString()}₽</span>
                    </div>
                  </div>

                  {/* Upgrade Chances */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-space-cyan">Шансы апгрейда:</h4>
                    {getUpgradeChances(selectedItem, upgradeAmount[0]).map((upgrade) => (
                      <div key={upgrade.rarity} className="flex items-center justify-between p-2 bg-space-dark/30 rounded">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded ${upgrade.color}`}></div>
                          <span className="text-sm">{rarityNames[upgrade.rarity as keyof typeof rarityNames]}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={upgrade.chance} className="w-16 h-2" />
                          <span className="text-sm font-bold">{upgrade.chance.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={executeUpgrade}
                    disabled={!canUpgrade}
                    className="w-full bg-space-purple hover:bg-space-purple/80"
                  >
                    <Icon name="Zap" className="mr-2" />
                    Начать апгрейд
                  </Button>
                </>
              )}

              {/* Upgrading State */}
              {isUpgrading && (
                <div className="text-center py-8">
                  <div className="animate-spin w-12 h-12 border-4 border-space-purple border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-space-cyan">Обрабатываем апгрейд...</p>
                  <p className="text-gray-400 text-sm">Анализируем молекулярную структуру</p>
                </div>
              )}

              {/* Result */}
              {upgradeResult && (
                <div className="text-center py-6">
                  {upgradeResult.success ? (
                    <div className="space-y-4">
                      <div className="text-6xl">🎉</div>
                      <h3 className="text-xl font-bold text-green-400">Успешный апгрейд!</h3>
                      {upgradeResult.newItem && (
                        <div className="space-y-2">
                          <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden">
                            <img 
                              src={upgradeResult.newItem.image} 
                              alt={upgradeResult.newItem.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="font-semibold">{upgradeResult.newItem.name}</h4>
                          <Badge className={`${rarityColors[upgradeResult.newItem.rarity]} text-white`}>
                            {rarityNames[upgradeResult.newItem.rarity]}
                          </Badge>
                          <div className="text-space-gold font-bold">
                            {upgradeResult.newItem.value.toLocaleString()}₽
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">💥</div>
                      <h3 className="text-xl font-bold text-red-400">Апгрейд не удался</h3>
                      <p className="text-gray-400">Инвестиции потеряны, скин остался прежним</p>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => {
                      setShowUpgradeDialog(false);
                      setSelectedItem(null);
                      setUpgradeResult(null);
                    }}
                    className="mt-4 bg-space-purple hover:bg-space-purple/80"
                  >
                    Закрыть
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkinUpgrade;