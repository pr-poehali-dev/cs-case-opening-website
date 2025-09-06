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