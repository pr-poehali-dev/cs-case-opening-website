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

interface BattleParticipant {
  id: number;
  name: string;
  avatar: string;
  balance: number;
  items: CaseItem[];
  totalValue: number;
}

interface CaseBattleProps {
  balance: number;
  inventory: CaseItem[];
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

export default function CaseBattle({ balance, inventory, onBalanceChange, onInventoryChange }: CaseBattleProps) {
  const [battleState, setBattleState] = useState<'setup' | 'waiting' | 'opening' | 'results'>('setup');
  const [selectedMultiplier, setSelectedMultiplier] = useState<number | null>(null);
  const [selectedSkin, setSelectedSkin] = useState<CaseItem | null>(null);
  const [participants, setParticipants] = useState<BattleParticipant[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [battleResult, setBattleResult] = useState<{ winner: BattleParticipant; items: CaseItem[] } | null>(null);
  const [enhanceChance, setEnhanceChance] = useState(0);

  const generateBotParticipants = (count: number): BattleParticipant[] => {
    const botNames = ['ProGamer2024', 'SkinHunter', 'CaseOpener', 'LuckyShot', 'DragonSlayer', 'AWP_Master'];
    const bots: BattleParticipant[] = [];
    
    for (let i = 0; i < count; i++) {
      const randomItems = AVAILABLE_SKINS.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 1);
      const totalValue = randomItems.reduce((sum, item) => sum + item.value, 0);
      
      bots.push({
        id: i + 2,
        name: botNames[Math.floor(Math.random() * botNames.length)] + Math.floor(Math.random() * 999),
        avatar: '/api/placeholder/40/40',
        balance: Math.floor(Math.random() * 50000) + 10000,
        items: randomItems,
        totalValue
      });
    }
    return bots;
  };

  const getAvailableSkinsForMultiplier = (multiplier: number, baseSkinValue: number) => {
    const targetValue = baseSkinValue * multiplier;
    const tolerance = 0.3;
    
    return AVAILABLE_SKINS.filter(skin => {
      const minValue = targetValue * (1 - tolerance);
      const maxValue = targetValue * (1 + tolerance);
      return skin.value >= minValue && skin.value <= maxValue;
    });
  };

  const startBattle = () => {
    if (!selectedMultiplier || !selectedSkin) return;
    
    const multiplierData = MULTIPLIERS.find(m => m.value === selectedMultiplier);
    if (!multiplierData) return;

    const totalCost = multiplierData.cost + (enhanceChance * 100);
    if (balance < totalCost) return;

    onBalanceChange(balance - totalCost);

    const playerItems = [selectedSkin];
    const player: BattleParticipant = {
      id: 1,
      name: 'Вы',
      avatar: '/api/placeholder/40/40',
      balance,
      items: playerItems,
      totalValue: selectedSkin.value
    };

    const bots = generateBotParticipants(3);
    const allParticipants = [player, ...bots];
    setParticipants(allParticipants);
    setBattleState('opening');
    setIsSpinning(true);

    setTimeout(() => {
      const finalChance = multiplierData.chance + enhanceChance;
      const isWin = Math.random() * 100 < finalChance;
      
      let winner: BattleParticipant;
      let items: CaseItem[];

      if (isWin) {
        winner = player;
        items = [selectedSkin];
        const newInventory = [...inventory, selectedSkin];
        onInventoryChange(newInventory);
      } else {
        winner = bots[Math.floor(Math.random() * bots.length)];
        items = winner.items;
      }

      setBattleResult({ winner, items });
      setIsSpinning(false);
      setBattleState('results');
    }, 4000);
  };

  const resetBattle = () => {
    setBattleState('setup');
    setSelectedMultiplier(null);
    setSelectedSkin(null);
    setParticipants([]);
    setBattleResult(null);
    setEnhanceChance(0);
  };

  const availableSkins = selectedMultiplier && selectedSkin 
    ? getAvailableSkinsForMultiplier(selectedMultiplier, selectedSkin.value)
    : [];

  const selectedMultiplierData = MULTIPLIERS.find(m => m.value === selectedMultiplier);
  const totalCost = selectedMultiplierData ? selectedMultiplierData.cost + (enhanceChance * 100) : 0;

  if (battleState === 'setup') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
            ⚔️ Кейс Батл
          </h2>
          <p className="text-muted-foreground">
            Выберите скин, множитель и сражайтесь с другими игроками!
          </p>
        </div>

        {/* Выбор скина из инвентаря */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">1. Выберите скин из инвентаря</h3>
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

        {/* Целевые скины */}
        {selectedMultiplier && selectedSkin && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">3. Возможные призы ({selectedMultiplier}x)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {availableSkins.map((skin) => (
                  <Card key={skin.id} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                    <CardContent className="p-3">
                      <img src={skin.image} alt={skin.name} className="w-full h-20 object-cover rounded mb-2" />
                      <p className="text-sm font-medium truncate">{skin.name}</p>
                      <p className="text-xs text-primary font-semibold">{skin.value}₽</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Улучшение шанса */}
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
                </div>
                <Button
                  onClick={startBattle}
                  disabled={balance < totalCost}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  size="lg"
                >
                  <Icon name="Swords" className="mr-2" />
                  Начать батл
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (battleState === 'opening') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">⚔️ Идет батл...</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {participants.map((participant) => (
              <Card key={participant.id} className="relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={participant.avatar} alt={participant.name} className="w-8 h-8 rounded-full" />
                    <span className="font-medium truncate">{participant.name}</span>
                  </div>
                  <div className="space-y-2">
                    {participant.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <img src={item.image} alt={item.name} className="w-6 h-6 rounded" />
                        <span className="truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="font-semibold text-primary">{participant.totalValue}₽</p>
                  </div>
                </CardContent>
                {isSpinning && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 animate-pulse" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (battleState === 'results') {
    const isPlayerWinner = battleResult?.winner.id === 1;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isPlayerWinner ? "🎉 Победа!" : "💔 Поражение"}
          </h2>
          <Card className={cn(
            "max-w-md mx-auto",
            isPlayerWinner ? "border-green-500 bg-green-500/5" : "border-red-500 bg-red-500/5"
          )}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={battleResult?.winner.avatar} 
                  alt={battleResult?.winner.name} 
                  className="w-12 h-12 rounded-full" 
                />
                <div>
                  <h3 className="text-xl font-bold">{battleResult?.winner.name}</h3>
                  <p className="text-muted-foreground">Победитель батла</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Выигранные предметы:</h4>
                {battleResult?.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-muted rounded">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-primary">{item.value}₽</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button onClick={resetBattle} size="lg">
              <Icon name="RotateCcw" className="mr-2" />
              Новый батл
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}