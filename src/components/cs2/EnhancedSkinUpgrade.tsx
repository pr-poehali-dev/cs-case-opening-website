import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { playCS2Sound } from '@/components/cs2/CS2SoundManager';

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface UpgradeOption {
  rarity: 'uncommon' | 'rare' | 'legendary' | 'ancient';
  name: string;
  chance: number;
  cost: number;
  multiplier: number;
  color: string;
}

interface EnhancedSkinUpgradeProps {
  inventory: InventoryItem[];
  balance: number;
  onUpgrade: (item: InventoryItem, targetRarity: string, cost: number) => void;
  onBalanceChange: (balance: number) => void;
  onInventoryChange: (inventory: InventoryItem[]) => void;
}

const EnhancedSkinUpgrade = ({ 
  inventory, 
  balance, 
  onUpgrade, 
  onBalanceChange, 
  onInventoryChange 
}: EnhancedSkinUpgradeProps) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [selectedUpgrade, setSelectedUpgrade] = useState<UpgradeOption | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<'success' | 'failed' | null>(null);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const upgradeOptions: UpgradeOption[] = [
    { rarity: 'uncommon', name: 'Необычный', chance: 65, cost: 1000, multiplier: 1.5, color: 'bg-green-500' },
    { rarity: 'rare', name: 'Редкий', chance: 35, cost: 2500, multiplier: 3.0, color: 'bg-blue-500' },
    { rarity: 'legendary', name: 'Легендарный', chance: 15, cost: 7500, multiplier: 6.0, color: 'bg-purple-500' },
    { rarity: 'ancient', name: 'Древний', chance: 5, cost: 20000, multiplier: 12.0, color: 'bg-red-500' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'uncommon': return 'bg-green-500';
      case 'rare': return 'bg-blue-500';
      case 'legendary': return 'bg-purple-500';
      case 'ancient': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailableUpgrades = (item: InventoryItem): UpgradeOption[] => {
    const rarityOrder = ['common', 'uncommon', 'rare', 'legendary', 'ancient'];
    const currentIndex = rarityOrder.indexOf(item.rarity);
    return upgradeOptions.filter((_, index) => index > currentIndex);
  };

  const calculateTotalCost = (baseCost: number, customAmount: number) => {
    return baseCost + customAmount;
  };

  const calculateSuccessChance = (baseChance: number, customAmount: number) => {
    const bonusChance = Math.min(customAmount / 1000 * 2, 30);
    return Math.min(baseChance + bonusChance, 95);
  };

  const handleStartUpgrade = (item: InventoryItem, upgrade: UpgradeOption) => {
    setSelectedItem(item);
    setSelectedUpgrade(upgrade);
    setShowUpgradeDialog(true);
    setCustomAmount(0);
  };

  const executeUpgrade = async () => {
    if (!selectedItem || !selectedUpgrade) return;

    const totalCost = calculateTotalCost(selectedUpgrade.cost, customAmount);
    if (balance < totalCost) return;

    setIsUpgrading(true);
    setIsSpinning(true);
    playCS2Sound('case_open', 0.6);

    onBalanceChange(balance - totalCost);
    onInventoryChange(inventory.filter(item => item.id !== selectedItem.id));

    const successChance = calculateSuccessChance(selectedUpgrade.chance, customAmount);
    const spinDuration = 3000 + Math.random() * 2000;

    setTimeout(() => {
      setIsSpinning(false);
      const success = Math.random() * 100 < successChance;

      if (success) {
        const newValue = Math.round(selectedItem.value * selectedUpgrade.multiplier);
        const upgradedItem: InventoryItem = {
          ...selectedItem,
          id: Date.now(),
          rarity: selectedUpgrade.rarity as any,
          value: newValue,
          name: selectedItem.name.replace(/\s+\(.*?\)$/, '') + ` (${selectedUpgrade.name})`
        };

        onInventoryChange([upgradedItem, ...inventory.filter(item => item.id !== selectedItem.id)]);
        setUpgradeResult('success');
        playCS2Sound('case_unlock', 0.8);
      } else {
        setUpgradeResult('failed');
        playCS2Sound('roll_tick', 0.6);
      }

      setIsUpgrading(false);

      setTimeout(() => {
        setShowUpgradeDialog(false);
        setUpgradeResult(null);
        setSelectedItem(null);
        setSelectedUpgrade(null);
        setCustomAmount(0);
      }, 3000);

    }, spinDuration);
  };

  return (
    <>
      <TabsContent value="upgrade">
        <Card className="bg-space-deep/50 border-space-purple/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="TrendingUp" className="text-space-gold" />
              <span>Улучшение скинов</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inventory.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Icon name="Package" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Инвентарь пуст</p>
                <p className="text-sm">Откройте кейсы, чтобы получить скины для апгрейда</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-space-dark/50 p-4 rounded-lg border border-space-purple/20">
                  <h3 className="text-lg font-semibold text-space-cyan mb-2">🎯 Как работает апгрейд:</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Выберите скин и целевую редкость</li>
                    <li>• Добавьте дополнительные деньги для увеличения шансов</li>
                    <li>• При успехе - скин улучшается, при провале - сгорает</li>
                    <li>• Чем выше редкость, тем ниже шанс успеха</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {inventory.map((item) => {
                    const availableUpgrades = getAvailableUpgrades(item);
                    
                    return (
                      <Card key={item.id} className="bg-space-dark/30 border-space-purple/20 overflow-hidden">
                        <div className="relative">
                          <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                          <Badge className={`absolute top-2 right-2 ${getRarityColor(item.rarity)} text-white text-xs`}>
                            {item.rarity}
                          </Badge>
                        </div>
                        <CardContent className="p-3">
                          <h4 className="font-semibold text-white text-sm mb-1 truncate">{item.name}</h4>
                          <p className="text-space-gold text-sm mb-3">{item.value.toLocaleString()}₽</p>
                          
                          {availableUpgrades.length > 0 ? (
                            <div className="space-y-1">
                              {availableUpgrades.slice(0, 2).map((upgrade) => (
                                <Button
                                  key={upgrade.rarity}
                                  onClick={() => handleStartUpgrade(item, upgrade)}
                                  size="sm"
                                  className={`w-full text-xs ${upgrade.color} hover:opacity-80`}
                                >
                                  ➤ {upgrade.name} ({upgrade.chance}%)
                                </Button>
                              ))}
                              {availableUpgrades.length > 2 && (
                                <Button
                                  onClick={() => handleStartUpgrade(item, availableUpgrades[2])}
                                  size="sm"
                                  className="w-full text-xs bg-space-purple hover:opacity-80"
                                >
                                  +{availableUpgrades.length - 2} еще
                                </Button>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 text-center">Максимальная редкость</p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="bg-space-deep border-space-purple/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {isUpgrading ? 'Процесс апгрейда...' : 'Настройка апгрейда'}
            </DialogTitle>
          </DialogHeader>

          {selectedItem && selectedUpgrade && (
            <div className="space-y-6">
              {!isUpgrading && upgradeResult === null && (
                <>
                  <div className="text-center space-y-4">
                    <div className="flex justify-center items-center space-x-4">
                      <div className="text-center">
                        <img src={selectedItem.image} alt={selectedItem.name} className="w-20 h-20 rounded mx-auto mb-2" />
                        <p className="text-xs">{selectedItem.name}</p>
                        <Badge className={`${getRarityColor(selectedItem.rarity)} text-white text-xs`}>
                          {selectedItem.rarity}
                        </Badge>
                      </div>
                      
                      <Icon name="ArrowRight" className="text-space-purple w-8 h-8" />
                      
                      <div className="text-center">
                        <div className={`w-20 h-20 rounded mx-auto mb-2 ${selectedUpgrade.color} flex items-center justify-center`}>
                          <Icon name="Star" className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-xs">{selectedUpgrade.name}</p>
                        <p className="text-xs text-space-gold">
                          {Math.round(selectedItem.value * selectedUpgrade.multiplier).toLocaleString()}₽
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-space-dark/50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span>Базовая стоимость:</span>
                      <span className="text-space-gold">{selectedUpgrade.cost.toLocaleString()}₽</span>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Доплата за шанс:</label>
                      <Input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(Math.max(0, parseInt(e.target.value) || 0))}
                        placeholder="0"
                        className="bg-space-dark border-space-purple/30"
                      />
                      <div className="flex justify-between text-xs">
                        <span>Шанс успеха:</span>
                        <span className={calculateSuccessChance(selectedUpgrade.chance, customAmount) > 80 ? 'text-green-400' : 'text-yellow-400'}>
                          {calculateSuccessChance(selectedUpgrade.chance, customAmount).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-space-purple/20 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span className="text-space-gold">{calculateTotalCost(selectedUpgrade.cost, customAmount).toLocaleString()}₽</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setShowUpgradeDialog(false)}
                      variant="outline"
                      className="flex-1 border-space-purple/30 hover:bg-space-purple/20"
                    >
                      Отмена
                    </Button>
                    <Button
                      onClick={executeUpgrade}
                      disabled={balance < calculateTotalCost(selectedUpgrade.cost, customAmount)}
                      className="flex-1 bg-gradient-to-r from-space-purple to-space-pink hover:opacity-80"
                    >
                      Улучшить
                    </Button>
                  </div>
                </>
              )}

              {isUpgrading && (
                <div className="text-center py-8">
                  <div className={`w-24 h-24 mx-auto mb-4 transition-transform duration-1000 ${isSpinning ? 'animate-spin' : ''}`}>
                    <Icon name="RotateCcw" className="w-24 h-24 text-space-purple" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Крутим барабан...</h3>
                  <p className="text-gray-400">Определяем результат апгрейда</p>
                  <div className="mt-4 bg-space-dark/50 p-3 rounded">
                    <p className="text-sm text-space-cyan">
                      Шанс: {calculateSuccessChance(selectedUpgrade.chance, customAmount).toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}

              {upgradeResult === 'success' && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">Апгрейд успешен!</h3>
                  <p className="text-gray-400 mb-4">Скин улучшен до {selectedUpgrade.name}</p>
                  <div className="bg-green-900/20 border border-green-400/30 p-4 rounded-lg">
                    <p className="text-green-400 font-bold">
                      Новая стоимость: {Math.round(selectedItem.value * selectedUpgrade.multiplier).toLocaleString()}₽
                    </p>
                  </div>
                </div>
              )}

              {upgradeResult === 'failed' && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">💥</div>
                  <h3 className="text-2xl font-bold text-red-400 mb-2">Апгрейд провален!</h3>
                  <p className="text-gray-400 mb-4">Скин сгорел в процессе улучшения</p>
                  <div className="bg-red-900/20 border border-red-400/30 p-4 rounded-lg">
                    <p className="text-red-400 font-bold">
                      Потеряно: {calculateTotalCost(selectedUpgrade.cost, customAmount).toLocaleString()}₽
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedSkinUpgrade;