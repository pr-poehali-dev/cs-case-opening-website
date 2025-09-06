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
  // Бюджетные скины из Budget Case
  { id: 1001, name: 'P250 | Sand Dune', image: '/img/236b445b-e695-4fe7-b87e-901eb42931cc.jpg', rarity: 'common', value: 50 },
  { id: 1002, name: 'Glock-18 | Sand Dune', image: '/img/2331b718-3961-4507-a01a-516fd5f4dd17.jpg', rarity: 'common', value: 450 },
  { id: 1003, name: 'MP9 | Sand Dashed', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FABz7P7YKAJF4N27mL-HnvD8J_WDxT8AuMEg3b2VrNvxigXj-kVsYDz6I4WQIwE8MAnT_AW9w-3xxcjr7i_Bt2k', rarity: 'common', value: 280 },
  { id: 1004, name: 'UMP-45 | Mudder', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3YjoXuY-0mL-Zkvb4DL7VqWNU6dNoxO2Z8Ij0m1Hj_UU-YWqgctScJgRsZ1DR81LsxObxxcjrh7iB6ww', rarity: 'uncommon', value: 820 },
  { id: 1005, name: 'Galil AR | Sandstorm', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDLFIhGJU4MBpmOTI8LP6jgTl-hI5YWv6JoKWcQ9sY1zR8gTtlbrxxcjrUGFNOp8', rarity: 'uncommon', value: 1560 },
  { id: 1006, name: 'M4A1-S | Boreal Forest', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOmjb-LmsrwO67VhWpU6dNoxO2Z8Ij0m1Hj_UU-YWqgctScJgRsZ1DR81LsxObxxcjrh7iB6ww', rarity: 'rare', value: 4500 },
  { id: 1007, name: 'AK-47 | Safari Mesh', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09m7hoO0mvLwOq7c2D8J6sYg2bmQrI2t2AThrhY5MGynLYKSJwQ9Y1nW8gK4xefxxcjrrsyTrJU', rarity: 'rare', value: 7500 },
  
  // Средние скины из Standard Case
  { id: 1008, name: 'M4A4 | Desert-Strike', image: '/img/a36abddd-10b2-4164-807c-a388a3db3e42.jpg', rarity: 'common', value: 850 },
  { id: 1009, name: 'AK-47 | Blue Laminate', image: '/img/6d75fe2e-90c6-40ae-b546-bbbd9517fdad.jpg', rarity: 'common', value: 2500 },
  { id: 1010, name: 'AWP | Worm God', image: '/img/aca5cd59-01d6-45c4-9a28-858907242d7c.jpg', rarity: 'uncommon', value: 4200 },
  { id: 1011, name: 'M4A1-S | Guardian', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-LmufhjKnFl2xU7cNo2L3ApYj03Qy2rko-YmihJI6SdgI8N1CD_VG9w7q-jcC7tMvIzydlviEjsHjZgVXp1kFj_Fto', rarity: 'uncommon', value: 6500 },
  { id: 1012, name: 'AK-47 | Redline', image: '/img/d9b4799f-9ddb-4e07-8128-aa9174b80231.jpg', rarity: 'rare', value: 10200 },
  { id: 1013, name: 'AWP | Graphite', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTZk2pH_Pp9g-7J4bP5iUazrl1rN2HwdtWTcgJvZAyC8lK5yLrng5G76pTAzSFiuyV3snvD30vgwFX3Voc', rarity: 'rare', value: 18500 },
  { id: 1014, name: 'AK-47 | Vulcan', image: '/img/0f8e56ef-15e3-4d26-83ce-251dd48aa2ab.jpg', rarity: 'legendary', value: 40000 },
  { id: 1015, name: 'AK-47 | Fire Serpent', image: '/img/a72ff8d4-ef6e-4a7d-9df8-17a65ce9895c.jpg', rarity: 'legendary', value: 172000 },
  
  // Премиум скины из Premium Case
  { id: 1016, name: 'AK-47 | Redline FT', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08-jhIWZlP_1IbzVqWdY781lxOyZpI-s3QXg-kBrMG71LdWRdlQ4Z13X8gK4wejxxcjrp8hxGyQ', rarity: 'common', value: 10200 },
  { id: 1017, name: 'M4A4 | Asiimov FT', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzE893w2gXirUdrMT_wctSSJwE8aV_Z_wS4kuvxxcjrvMuayiAysyF2s2HSgVXp1uqCDKdY', rarity: 'uncommon', value: 28500 },
  { id: 1018, name: 'AK-47 | Vulcan FT', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0rCXoNuniAK3-0Y5ZmygJoTGJwA3Zg6D-gW6xurxxcjrKKtxmw', rarity: 'uncommon', value: 45000 },
  { id: 1019, name: 'AWP | Lightning Strike FN', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTck3lu5MB0mOTE8YjyjQ3i-kVqMG3zdYbBdwVtM1DTrAC3w-3xxcjrQyqAHTY', rarity: 'rare', value: 78000 },
  { id: 1020, name: 'M4A1-S | Knight FN', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2L6So4v33AbkrUpuYT_7JYXHJAU-ZFzTrlO2lebxxcjrt54hOhk', rarity: 'rare', value: 125000 },
  { id: 1021, name: 'AK-47 | Case Hardened MW', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0r2R84mjjgzirBBoZGv2IYSTdlc5MgrQ8lW9wOrxxcjrjW_L5g', rarity: 'rare', value: 168000 },
  { id: 1022, name: 'AK-47 | Fire Serpent FT', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0r2R84mgig7mrElqZG3wI9LBdVI-Y16C-Va4xr_rhJLvtcubm3c17yF0tHfUl0fmhUkaarcI0KHYFQ3QKw', rarity: 'legendary', value: 172000 },
  { id: 1023, name: 'M4A4 | Howl FT', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzE893w2gXirUdrMT_wctSSJwE8aV_Z_wS4kuvxxcjrvMuayiAysyF2s2HSgVXp1uqCDKdY', rarity: 'legendary', value: 385000 },
  { id: 1024, name: 'AWP | Dragon Lore FT', image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJS-tZuYzSdjuidw4C7cygv33088X8Wh0Q', rarity: 'ancient', value: 980000 }
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