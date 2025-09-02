import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

// Import новых компонентов
import { playCS2Sound } from '@/components/cs2/CS2SoundManager';
import CaseRollingAnimation from '@/components/cs2/CaseRollingAnimation';
import UserInventory from '@/components/cs2/UserInventory';
import CaseSelector from '@/components/cs2/CaseSelector';

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

const Index = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [openedItem, setOpenedItem] = useState<CaseItem | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollingItems, setRollingItems] = useState<CaseItem[]>([]);
  const [userBalance, setUserBalance] = useState(500000);
  const [userInventory, setUserInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'AK-47 | Nebula Storm', rarity: 'rare', value: 6700, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
    { id: 2, name: 'AWP | Cosmic Dragon', rarity: 'legendary', value: 15600, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
    { id: 3, name: 'Glock-18 | Stardust', rarity: 'common', value: 2300, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' }
  ]);

  const cases: CaseData[] = [
    {
      id: 1,
      name: 'Budget Case',
      price: 50,
      image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg',
      rarity: 'common',
      items: [
        { name: 'P250 | Sand Dune', rarity: 'common', chance: 35.0, value: 50, image: '/img/236b445b-e695-4fe7-b87e-901eb42931cc.jpg' },
        { name: 'Glock-18 | Sand Dune', rarity: 'common', chance: 30.0, value: 450, image: '/img/2331b718-3961-4507-a01a-516fd5f4dd17.jpg' },
        { name: 'MP9 | Sand Dashed', rarity: 'common', chance: 20.0, value: 280, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FABz7P7YKAJF4N27mL-HnvD8J_WDxT8AuMEg3b2VrNvxigXj-kVsYDz6I4WQIwE8MAnT_AW9w-3xxcjr7i_Bt2k' },
        { name: 'UMP-45 | Mudder', rarity: 'uncommon', chance: 10.0, value: 820, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3YjoXuY-0mL-Zkvb4DL7VqWNU6dNoxO2Z8Ij0m1Hj_UU-YWqgctScJgRsZ1DR81LsxObxxcjrh7iB6ww' },
        { name: 'Galil AR | Sandstorm', rarity: 'uncommon', chance: 4.0, value: 1560, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDLFIhGJU4MBpmOTI8LP6jgTl-hI5YWv6JoKWcQ9sY1zR8gTtlbrxxcjrUGFNOp8' },
        { name: 'M4A1-S | Boreal Forest', rarity: 'rare', chance: 0.8, value: 4500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOmjb-LmsrwO67VhWpU6dNoxO2Z8Ij0m1Hj_UU-YWqgctScJgRsZ1DR81LsxObxxcjrh7iB6ww' },
        { name: 'AK-47 | Safari Mesh', rarity: 'rare', chance: 0.2, value: 7500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09m7hoO0mvLwOq7c2D8J6sYg2bmQrI2t2AThrhY5MGynLYKSJwQ9Y1nW8gK4xefxxcjrrsyTrJU' }
      ]
    },
    {
      id: 2,
      name: 'Standard Case',
      price: 250,
      image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg',
      rarity: 'uncommon',
      items: [
        { name: 'M4A4 | Desert-Strike', rarity: 'common', chance: 25.0, value: 850, image: '/img/a36abddd-10b2-4164-807c-a388a3db3e42.jpg' },
        { name: 'AK-47 | Blue Laminate', rarity: 'common', chance: 20.0, value: 2500, image: '/img/6d75fe2e-90c6-40ae-b546-bbbd9517fdad.jpg' },
        { name: 'AWP | Worm God', rarity: 'uncommon', chance: 18.0, value: 4200, image: '/img/aca5cd59-01d6-45c4-9a28-858907242d7c.jpg' },
        { name: 'M4A1-S | Guardian', rarity: 'uncommon', chance: 15.0, value: 6500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-LmufhjKnFl2xU7cNo2L3ApYj03Qy2rko-YmihJI6SdgI8N1CD_VG9w7q-jcC7tMvIzydlviEjsHjZgVXp1kFj_Fto' },
        { name: 'AK-47 | Redline', rarity: 'rare', chance: 15.0, value: 10200, image: '/img/d9b4799f-9ddb-4e07-8128-aa9174b80231.jpg' },
        { name: 'AWP | Graphite', rarity: 'rare', chance: 5.0, value: 18500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTZk2pH_Pp9g-7J4bP5iUazrl1rN2HwdtWTcgJvZAyC8lK5yLrng5G76pTAzSFiuyV3snvD30vgwFX3Voc' },
        { name: 'AK-47 | Vulcan', rarity: 'legendary', chance: 1.8, value: 40000, image: '/img/0f8e56ef-15e3-4d26-83ce-251dd48aa2ab.jpg' },
        { name: 'AK-47 | Fire Serpent', rarity: 'legendary', chance: 0.2, value: 172000, image: '/img/a72ff8d4-ef6e-4a7d-9df8-17a65ce9895c.jpg' }
      ]
    },
    {
      id: 3,
      name: 'Premium Case',
      price: 2500,
      image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg',
      rarity: 'rare',
      items: [
        { name: 'AK-47 | Redline FT', rarity: 'common', chance: 22.0, value: 10200, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08-jhIWZlP_1IbzVqWdY781lxOyZpI-s3QXg-kBrMG71LdWRdlQ4Z13X8gK4wejxxcjrp8hxGyQ' },
        { name: 'M4A4 | Asiimov FT', rarity: 'uncommon', chance: 18.0, value: 28500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzE893w2gXirUdrMT_wctSSJwE8aV_Z_wS4kuvxxcjrvMuayiAysyF2s2HSgVXp1uqCDKdY' },
        { name: 'AK-47 | Vulcan FT', rarity: 'uncommon', chance: 15.0, value: 45000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0rCXoNuniAK3-0Y5ZmygJoTGJwA3Zg6D-gW6xurxxcjrKKtxmw' },
        { name: 'AWP | Lightning Strike FN', rarity: 'rare', chance: 12.0, value: 78000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTck3lu5MB0mOTE8YjyjQ3i-kVqMG3zdYbBdwVtM1DTrAC3w-3xxcjrQyqAHTY' },
        { name: 'M4A1-S | Knight FN', rarity: 'rare', chance: 8.0, value: 125000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2L6So4v33AbkrUpuYT_7JYXHJAU-ZFzTrlO2lebxxcjrt54hOhk' },
        { name: 'AK-47 | Case Hardened MW', rarity: 'rare', chance: 6.0, value: 168000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0r2R84mjjgzirBBoZGv2IYSTdlc5MgrQ8lW9wOrxxcjrjW_L5g' },
        { name: 'AK-47 | Fire Serpent FT', rarity: 'legendary', chance: 3.5, value: 172000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0r2R84mgig7mrElqZG3wI9LBdVI-Y16C-Va4xr_rhJLvtcubm3c17yF0tHfUl0fmhUkaarcI0KHYFQ3QKw' },
        { name: 'M4A4 | Howl FT', rarity: 'legendary', chance: 2.0, value: 385000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzE893w2gXirUdrMT_wctSSJwE8aV_Z_wS4kuvxxcjrvMuayiAysyF2s2HSgVXp1uqCDKdY' },
        { name: 'AWP | Dragon Lore FT', rarity: 'ancient', chance: 0.5, value: 980000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJS-tZuYzSdjuidw4C7cygv33088X8Wh0Q' }
      ]
    }
  ];

  const [selectedCase, setSelectedCase] = useState<CaseData>(cases[0]);

  // Функция генерации прокрутки скинов
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

  // Функция выбора выигрышного предмета
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

  // Функция открытия кейса
  const handleOpenCase = () => {
    if (userBalance < selectedCase.price) return;
    
    setUserBalance(prev => prev - selectedCase.price);
    setIsOpening(true);
    setIsRolling(true);
    setOpenedItem(null);
    
    playCS2Sound('case_open', 0.5);
    
    const wonItem = selectWinningItem(selectedCase.items);
    const rollingItemsList = generateRollingItems(selectedCase.items, wonItem);
    setRollingItems(rollingItemsList);
    
    // Простая и надежная система тиков - тик на каждом скине при прохождении центральной линии
    const playRollingSounds = () => {
      // CSS параметры анимации
      const startX = 560;        // translateX(560px) в начале
      const endX = -4312;        // translateX(-4312px) в конце  
      const duration = 11760;    // 11.76s анимации
      const totalDistance = startX - endX; // 4872px - общий путь движения
      
      // Размеры скинов
      const skinWidth = 128;     // w-32
      const skinMargin = 16;     // mx-2 (8px с каждой стороны)
      const skinStep = skinWidth + skinMargin; // 144px между скинами
      
      // Центральная золотая линия на 400px (половина от 800px контейнера)
      const centerLine = 400;
      
      console.log(`🎵 Настройка тиков для ${rollingItemsList.length} скинов`);
      console.log(`📏 Анимация: ${startX}px → ${endX}px за ${duration}мс`);
      console.log(`🎯 Центральная линия на позиции: ${centerLine}px`);
      
      let validTicks = 0;
      
      // Проходим по каждому скину и рассчитываем время тика
      rollingItemsList.forEach((skin, index) => {
        // Начальная позиция левого края скина
        const initialLeft = startX + (index * skinStep);
        
        // Проверяем: пересечет ли этот скин центральную линию?
        // Скин пересекает линию если его левый край изначально правее линии
        // и в конце анимации его правый край левее линии
        const initialRight = initialLeft + skinWidth;
        const finalLeft = initialLeft + (endX - startX);
        const finalRight = finalLeft + skinWidth;
        
        // Условие пересечения: скин начинается правее линии и заканчивается левее
        const willCross = initialLeft > centerLine && finalRight < centerLine;
        
        if (willCross) {
          validTicks++;
          
          // Рассчитываем точное время когда левый край скина коснется центральной линии
          const distanceToLine = initialLeft - centerLine;
          const timeToTick = (distanceToLine / totalDistance) * duration;
          
          // Добавляем небольшую задержку и ограничиваем диапазон
          const tickTime = Math.max(200, Math.min(timeToTick, duration - 200));
          
          console.log(`🔊 Скин #${index + 1} (${skin.name}): левый край ${initialLeft}px, тик через ${Math.round(tickTime)}мс`);
          
          // Устанавливаем таймер для тика
          setTimeout(() => {
            console.log(`✅ ТИКАЕМ на скине #${index + 1}: ${skin.name}`);
            playCS2Sound('roll_tick', 0.2);
          }, tickTime);
        } else {
          console.log(`❌ Скин #${index + 1} не пересекает линию: ${initialLeft}px → ${finalLeft}px`);
        }
      });
      
      console.log(`📊 Итого запланировано тиков: ${validTicks} из ${rollingItemsList.length} скинов`);
      
      // Дополнительная проверка - убеждаемся что функция playCS2Sound работает
      console.log(`🔧 Тестовый тик через 100мс...`);
      setTimeout(() => {
        console.log(`🎵 ТЕСТ: тестовый тик`);
        playCS2Sound('roll_tick', 0.1);
      }, 100);
    };
    
    playRollingSounds();
    
    // Анимация прокрутки увеличена на 40% и замедлена на 20%: 7s * 1.4 * 1.2 = 11.76s
    setTimeout(() => {
      setIsRolling(false);
      // Берем точно тот предмет, который на 35-й позиции в прокрутке
      const actualWonItem = rollingItemsList.find(item => item.isWinner) || wonItem;
      setOpenedItem(actualWonItem);
      
      // Добавить выигранный предмет в инвентарь
      const newInventoryItem: InventoryItem = {
        ...actualWonItem,
        id: Date.now() // Уникальный ID
      };
      setUserInventory(prev => [newInventoryItem, ...prev]);
      
      // Проигрываем звук выпадения предмета в зависимости от редкости
      const dropVolume = actualWonItem.rarity === 'ancient' ? 0.8 : 
                        actualWonItem.rarity === 'legendary' ? 0.7 :
                        actualWonItem.rarity === 'rare' ? 0.6 : 0.5;
      playCS2Sound('item_drop', dropVolume);
      
      // Дополнительный звук для редких предметов
      if (actualWonItem.rarity === 'ancient') {
        setTimeout(() => playCS2Sound('case_unlock', 0.4), 300);
        setTimeout(() => playCS2Sound('item_drop', 0.3), 600);
      } else if (actualWonItem.rarity === 'legendary') {
        setTimeout(() => playCS2Sound('case_unlock', 0.3), 400);
      }
      
      // Окно результата остается открытым до выбора действия
    }, 11760); // 7s * 1.4 * 1.2 = 11.76s
  };

  return (
    <div className="min-h-screen bg-space-dark text-white relative overflow-hidden" style={{fontFamily: 'Rajdhani, sans-serif'}}>
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-space-dark via-space-deep to-space-dark">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 opacity-30 animate-stellar-pulse">
            <img src="/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg" alt="Cosmic" className="w-full h-full object-cover blur-md" />
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-20 animate-orbit" style={{animationDuration: '30s'}}>
            <img src="/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg" alt="Nebula" className="w-full h-full object-cover blur-sm rounded-full" />
          </div>
          <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 opacity-15 animate-stellar-pulse" style={{animationDelay: '1s'}}>
            <img src="/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg" alt="Galaxy" className="w-full h-full object-cover blur-sm" />
          </div>
        </div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 bg-space-dark/80 backdrop-blur-sm border-b border-space-purple/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent">
              🚀 COSMIC CASES
            </div>
            <div className="text-sm text-space-cyan">Межгалактические кейсы CS2</div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Wallet" className="text-space-gold" />
              <span className="text-space-gold font-bold text-lg">{userBalance.toLocaleString()}₽</span>
            </div>
            
            <Avatar className="border-2 border-space-purple">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback className="bg-space-purple text-white">У</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6">
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-space-deep/50 border-space-purple/30">
            <TabsTrigger value="cases" className="data-[state=active]:bg-space-purple">
              <Icon name="Package" className="mr-2" />
              Кейсы
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-space-purple">
              <Icon name="Backpack" className="mr-2" />
              Инвентарь
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="data-[state=active]:bg-space-purple">
              <Icon name="ArrowUpRight" className="mr-2" />
              Вывод
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-space-purple">
              <Icon name="CreditCard" className="mr-2" />
              Пополнение
            </TabsTrigger>
          </TabsList>

          {/* Cases Tab */}
          <TabsContent value="cases" className="space-y-6">
            <CaseSelector 
              cases={cases}
              selectedCase={selectedCase}
              onCaseSelect={setSelectedCase}
              onOpenCase={handleOpenCase}
              balance={userBalance}
            />
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <UserInventory inventory={userInventory} />
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray-400 text-lg mb-2">Вывод скинов временно недоступен</p>
              <p className="text-gray-500 text-sm">Функция находится в разработке</p>
            </div>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💳</div>
              <p className="text-gray-400 text-lg mb-2">Пополнение баланса временно недоступно</p>
              <p className="text-gray-500 text-sm">Функция находится в разработке</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Opening Animation */}
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
        />
      )}
    </div>
  );
};

export default Index;