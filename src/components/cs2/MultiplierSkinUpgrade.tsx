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

interface MultiplierOption {
  multiplier: 2 | 3 | 5 | 10;
  name: string;
  chance: number;
  baseCost: number;
  color: string;
  icon: string;
}

interface TargetSkin {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface MultiplierSkinUpgradeProps {
  inventory: InventoryItem[];
  balance: number;
  onBalanceChange: (balance: number) => void;
  onInventoryChange: (inventory: InventoryItem[]) => void;
}

const MultiplierSkinUpgrade = ({ 
  inventory, 
  balance, 
  onBalanceChange, 
  onInventoryChange 
}: MultiplierSkinUpgradeProps) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [selectedMultiplier, setSelectedMultiplier] = useState<MultiplierOption | null>(null);
  const [selectedTargetSkin, setSelectedTargetSkin] = useState<TargetSkin | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<'success' | 'failed' | null>(null);
  const [showMultiplierDialog, setShowMultiplierDialog] = useState(false);
  const [showTargetDialog, setShowTargetDialog] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonSkin, setWonSkin] = useState<TargetSkin | null>(null);

  const multiplierOptions: MultiplierOption[] = [
    { multiplier: 2, name: '2x Цена', chance: 45, baseCost: 500, color: 'bg-green-500', icon: '2️⃣' },
    { multiplier: 3, name: '3x Цена', chance: 30, baseCost: 1000, color: 'bg-blue-500', icon: '3️⃣' },
    { multiplier: 5, name: '5x Цена', chance: 18, baseCost: 2500, color: 'bg-purple-500', icon: '5️⃣' },
    { multiplier: 10, name: '10x Цена', chance: 8, baseCost: 5000, color: 'bg-red-500', icon: '🔟' }
  ];

  // База скинов для каждого ценового диапазона
  const skinDatabase: TargetSkin[] = [
    // 2x диапазон (для скинов 1000-5000₽)
    { id: '2x_ak_redline', name: 'AK-47 | Redline', image: '/img/d9b4799f-9ddb-4e07-8128-aa9174b80231.jpg', rarity: 'rare', value: 2500 },
    { id: '2x_m4_asiimov', name: 'M4A4 | Asiimov', image: '/img/a36abddd-10b2-4164-807c-a388a3db3e42.jpg', rarity: 'rare', value: 3200 },
    { id: '2x_awp_boom', name: 'AWP | BOOM', image: '/img/aca5cd59-01d6-45c4-9a28-858907242d7c.jpg', rarity: 'rare', value: 4800 },

    // 3x диапазон (для скинов 2000-8000₽)
    { id: '3x_ak_vulcan', name: 'AK-47 | Vulcan', image: '/img/0f8e56ef-15e3-4d26-83ce-251dd48aa2ab.jpg', rarity: 'legendary', value: 8500 },
    { id: '3x_awp_lightning', name: 'AWP | Lightning Strike', image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg', rarity: 'legendary', value: 12000 },
    { id: '3x_m4_howl', name: 'M4A4 | Howl', image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg', rarity: 'legendary', value: 15000 },

    // 5x диапазон (для скинов 3000-15000₽)
    { id: '5x_ak_fire_serpent', name: 'AK-47 | Fire Serpent', image: '/img/a72ff8d4-ef6e-4a7d-9df8-17a65ce9895c.jpg', rarity: 'legendary', value: 25000 },
    { id: '5x_awp_medusa', name: 'AWP | Medusa', image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg', rarity: 'ancient', value: 35000 },
    { id: '5x_karambit', name: 'Karambit | Fade', image: '/img/236b445b-e695-4fe7-b87e-901eb42931cc.jpg', rarity: 'ancient', value: 50000 },

    // 10x диапазон (для скинов 5000+₽)
    { id: '10x_dragon_lore', name: 'AWP | Dragon Lore', image: '/img/2331b718-3961-4507-a01a-516fd5f4dd17.jpg', rarity: 'ancient', value: 80000 },
    { id: '10x_howl_fn', name: 'M4A4 | Howl FN', image: '/img/6d75fe2e-90c6-40ae-b546-bbbd9517fdad.jpg', rarity: 'ancient', value: 120000 },
    { id: '10x_kara_ruby', name: 'Karambit | Ruby', image: '/img/2265c309-4902-44af-a016-3b526b0a8f2c.jpg', rarity: 'ancient', value: 200000 }
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

  const getTargetSkinsForMultiplier = (currentSkinValue: number, multiplier: number): TargetSkin[] => {
    const targetValue = currentSkinValue * multiplier;
    const tolerance = 0.3; // 30% разброс цены
    
    return skinDatabase.filter(skin => {
      const minValue = targetValue * (1 - tolerance);
      const maxValue = targetValue * (1 + tolerance);
      return skin.value >= minValue && skin.value <= maxValue;
    });
  };

  const calculateTotalCost = (baseCost: number, customAmount: number) => {
    return baseCost + customAmount;
  };

  const calculateSuccessChance = (baseChance: number, customAmount: number) => {
    const bonusChance = Math.min(customAmount / 1000 * 1.5, 25);
    return Math.min(baseChance + bonusChance, 90);
  };

  const handleSelectMultiplier = (item: InventoryItem, multiplier: MultiplierOption) => {
    setSelectedItem(item);
    setSelectedMultiplier(multiplier);
    setShowMultiplierDialog(true);
  };

  const handleShowTargets = () => {
    if (!selectedItem || !selectedMultiplier) return;
    setShowMultiplierDialog(false);
    setShowTargetDialog(true);
  };

  const handleSelectTarget = (target: TargetSkin) => {
    setSelectedTargetSkin(target);
    setShowTargetDialog(false);
    setShowMultiplierDialog(true);
  };

  const executeUpgrade = async () => {
    if (!selectedItem || !selectedMultiplier || !selectedTargetSkin) return;

    const totalCost = calculateTotalCost(selectedMultiplier.baseCost, customAmount);
    if (balance < totalCost) return;

    setIsUpgrading(true);
    setIsSpinning(true);
    playCS2Sound('case_open', 0.6);

    // Снимаем деньги и убираем скин
    onBalanceChange(balance - totalCost);
    onInventoryChange(inventory.filter(item => item.id !== selectedItem.id));

    const successChance = calculateSuccessChance(selectedMultiplier.chance, customAmount);
    const spinDuration = 3000 + Math.random() * 2000;

    setTimeout(() => {
      setIsSpinning(false);
      const success = Math.random() * 100 < successChance;

      if (success) {
        // Успешный апгрейд - добавляем выбранный скин
        const newItem: InventoryItem = {
          id: Date.now(),
          name: selectedTargetSkin.name,
          image: selectedTargetSkin.image,
          rarity: selectedTargetSkin.rarity,
          value: selectedTargetSkin.value
        };

        onInventoryChange([newItem, ...inventory.filter(item => item.id !== selectedItem.id)]);
        setWonSkin(selectedTargetSkin);
        setUpgradeResult('success');
        playCS2Sound('case_unlock', 0.8);
      } else {
        setUpgradeResult('failed');
        playCS2Sound('roll_tick', 0.6);
      }

      setIsUpgrading(false);

      setTimeout(() => {
        resetDialog();
      }, 3000);

    }, spinDuration);
  };

  const resetDialog = () => {
    setShowMultiplierDialog(false);
    setShowTargetDialog(false);
    setUpgradeResult(null);
    setSelectedItem(null);
    setSelectedMultiplier(null);
    setSelectedTargetSkin(null);
    setCustomAmount(0);
    setWonSkin(null);
  };

  return (
    <>
      <TabsContent value="upgrade">
        <Card className="bg-space-deep/50 border-space-purple/30 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="TrendingUp" className="text-space-gold" />
              <span>Апгрейд по множителям</span>
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
                  <h3 className="text-lg font-semibold text-space-cyan mb-2">🎯 Как работает новый апгрейд:</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Выбираешь скин и множитель цены (2x, 3x, 5x, 10x)</li>
                    <li>• Видишь конкретные скины, которые можешь получить</li>
                    <li>• Выбираешь целевой скин из списка</li>
                    <li>• При успехе - получаешь выбранный скин, при провале - всё сгорает</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {inventory.map((item) => (
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
                        
                        <div className="grid grid-cols-2 gap-1">
                          {multiplierOptions.map((multiplier) => {
                            const targetSkinsCount = getTargetSkinsForMultiplier(item.value, multiplier.multiplier).length;
                            return (
                              <Button
                                key={multiplier.multiplier}
                                onClick={() => handleSelectMultiplier(item, multiplier)}
                                disabled={targetSkinsCount === 0}
                                size="sm"
                                className={`text-xs ${multiplier.color} hover:opacity-80 disabled:opacity-30`}
                              >
                                {multiplier.icon} {multiplier.multiplier}x
                              </Button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Диалог выбора множителя */}
      <Dialog open={showMultiplierDialog} onOpenChange={() => resetDialog()}>
        <DialogContent className="bg-space-deep border-space-purple/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {isUpgrading ? 'Процесс апгрейда...' : selectedTargetSkin ? 'Подтверждение апгрейда' : 'Выбор множителя'}
            </DialogTitle>
          </DialogHeader>

          {selectedItem && selectedMultiplier && !isUpgrading && upgradeResult === null && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center items-center space-x-4">
                  <div className="text-center">
                    <img src={selectedItem.image} alt={selectedItem.name} className="w-20 h-20 rounded mx-auto mb-2" />
                    <p className="text-xs">{selectedItem.name}</p>
                    <p className="text-xs text-space-gold">{selectedItem.value.toLocaleString()}₽</p>
                  </div>
                  
                  <Icon name="ArrowRight" className="text-space-purple w-8 h-8" />
                  
                  <div className="text-center">
                    {selectedTargetSkin ? (
                      <>
                        <img src={selectedTargetSkin.image} alt={selectedTargetSkin.name} className="w-20 h-20 rounded mx-auto mb-2" />
                        <p className="text-xs">{selectedTargetSkin.name}</p>
                        <p className="text-xs text-space-gold">{selectedTargetSkin.value.toLocaleString()}₽</p>
                      </>
                    ) : (
                      <>
                        <div className={`w-20 h-20 rounded mx-auto mb-2 ${selectedMultiplier.color} flex items-center justify-center text-2xl`}>
                          {selectedMultiplier.icon}
                        </div>
                        <p className="text-xs">{selectedMultiplier.name}</p>
                        <p className="text-xs text-space-gold">
                          {(selectedItem.value * selectedMultiplier.multiplier).toLocaleString()}₽
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {!selectedTargetSkin && (
                <div className="text-center">
                  <Button
                    onClick={handleShowTargets}
                    className="bg-gradient-to-r from-space-purple to-space-pink hover:opacity-80"
                  >
                    <Icon name="Target" className="mr-2 w-4 h-4" />
                    Выбрать целевой скин
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Доступно {getTargetSkinsForMultiplier(selectedItem.value, selectedMultiplier.multiplier).length} скинов
                  </p>
                </div>
              )}

              {selectedTargetSkin && (
                <>
                  <div className="bg-space-dark/50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span>Базовая стоимость:</span>
                      <span className="text-space-gold">{selectedMultiplier.baseCost.toLocaleString()}₽</span>
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
                        <span className={calculateSuccessChance(selectedMultiplier.chance, customAmount) > 70 ? 'text-green-400' : 'text-yellow-400'}>
                          {calculateSuccessChance(selectedMultiplier.chance, customAmount).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-space-purple/20 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span className="text-space-gold">{calculateTotalCost(selectedMultiplier.baseCost, customAmount).toLocaleString()}₽</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setSelectedTargetSkin(null)}
                      variant="outline"
                      className="flex-1 border-space-purple/30 hover:bg-space-purple/20"
                    >
                      Сменить цель
                    </Button>
                    <Button
                      onClick={executeUpgrade}
                      disabled={balance < calculateTotalCost(selectedMultiplier.baseCost, customAmount)}
                      className="flex-1 bg-gradient-to-r from-space-purple to-space-pink hover:opacity-80"
                    >
                      Апгрейдить
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {isUpgrading && (
            <div className="text-center py-8">
              <div className={`w-24 h-24 mx-auto mb-4 transition-transform duration-1000 ${isSpinning ? 'animate-spin' : ''}`}>
                <Icon name="RotateCcw" className="w-24 h-24 text-space-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Крутим барабан...</h3>
              <p className="text-gray-400">Определяем результат апгрейда</p>
              {selectedTargetSkin && (
                <div className="mt-4 bg-space-dark/50 p-3 rounded">
                  <p className="text-sm text-space-cyan">
                    Цель: {selectedTargetSkin.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Шанс: {calculateSuccessChance(selectedMultiplier?.chance || 0, customAmount).toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          )}

          {upgradeResult === 'success' && wonSkin && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Апгрейд успешен!</h3>
              <p className="text-gray-400 mb-4">Получен скин: {wonSkin.name}</p>
              <div className="bg-green-900/20 border border-green-400/30 p-4 rounded-lg">
                <img src={wonSkin.image} alt={wonSkin.name} className="w-20 h-20 rounded mx-auto mb-2" />
                <p className="text-green-400 font-bold">
                  Стоимость: {wonSkin.value.toLocaleString()}₽
                </p>
              </div>
            </div>
          )}

          {upgradeResult === 'failed' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">💥</div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">Апгрейд провален!</h3>
              <p className="text-gray-400 mb-4">Скин сгорел в процессе апгрейда</p>
              <div className="bg-red-900/20 border border-red-400/30 p-4 rounded-lg">
                <p className="text-red-400 font-bold">
                  Потеряно: {calculateTotalCost(selectedMultiplier?.baseCost || 0, customAmount).toLocaleString()}₽
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог выбора целевого скина */}
      <Dialog open={showTargetDialog} onOpenChange={() => setShowTargetDialog(false)}>
        <DialogContent className="bg-space-deep border-space-purple/30 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              Выбери целевой скин ({selectedMultiplier?.name})
            </DialogTitle>
          </DialogHeader>

          {selectedItem && selectedMultiplier && (
            <div className="space-y-4">
              <div className="text-center bg-space-dark/50 p-3 rounded">
                <p className="text-sm text-gray-300">
                  Твой скин: <span className="text-white">{selectedItem.name}</span> ({selectedItem.value.toLocaleString()}₽)
                </p>
                <p className="text-sm text-space-cyan">
                  Диапазон цели: {(selectedItem.value * selectedMultiplier.multiplier * 0.7).toLocaleString()}₽ - {(selectedItem.value * selectedMultiplier.multiplier * 1.3).toLocaleString()}₽
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {getTargetSkinsForMultiplier(selectedItem.value, selectedMultiplier.multiplier).map((skin) => (
                  <Card 
                    key={skin.id} 
                    className="bg-space-dark/30 border-space-purple/20 overflow-hidden cursor-pointer hover:border-space-purple/50 transition-colors"
                    onClick={() => handleSelectTarget(skin)}
                  >
                    <div className="relative">
                      <img src={skin.image} alt={skin.name} className="w-full h-24 object-cover" />
                      <Badge className={`absolute top-2 right-2 ${getRarityColor(skin.rarity)} text-white text-xs`}>
                        {skin.rarity}
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-semibold text-white text-sm mb-1 truncate">{skin.name}</h4>
                      <p className="text-space-gold text-sm">{skin.value.toLocaleString()}₽</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {getTargetSkinsForMultiplier(selectedItem.value, selectedMultiplier.multiplier).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Icon name="AlertCircle" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Нет доступных скинов для этого множителя</p>
                  <p className="text-sm">Попробуйте другой множитель</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MultiplierSkinUpgrade;