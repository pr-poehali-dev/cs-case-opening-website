import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [openedItem, setOpenedItem] = useState<any>(null);
  const [isRolling, setIsRolling] = useState(false);

  const cases = [
    {
      id: 1,
      name: 'Starter Case',
      price: 99,
      image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg',
      rarity: 'common',
      items: [
        { name: 'Glock-18 | Sand Dune', rarity: 'common', chance: 25.5, value: 15 },
        { name: 'P250 | Sand Dune', rarity: 'common', chance: 25.5, value: 12 },
        { name: 'MP9 | Sand Dashed', rarity: 'common', chance: 20.0, value: 18 },
        { name: 'UMP-45 | Mudder', rarity: 'uncommon', chance: 15.5, value: 45 },
        { name: 'Galil AR | Sandstorm', rarity: 'uncommon', chance: 10.0, value: 67 },
        { name: 'AK-47 | Safari Mesh', rarity: 'rare', chance: 3.0, value: 150 },
        { name: 'AWP | Safari Mesh', rarity: 'rare', chance: 0.5, value: 280 }
      ]
    },
    {
      id: 2,
      name: 'Cosmic Case',
      price: 149,
      image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg',
      rarity: 'uncommon',
      items: [
        { name: 'M4A4 | Desert-Strike', rarity: 'common', chance: 22.0, value: 35 },
        { name: 'AK-47 | Blue Laminate', rarity: 'common', chance: 20.0, value: 42 },
        { name: 'AWP | Worm God', rarity: 'uncommon', chance: 18.0, value: 78 },
        { name: 'M4A1-S | Guardian', rarity: 'uncommon', chance: 15.0, value: 95 },
        { name: 'AK-47 | Redline', rarity: 'rare', chance: 12.0, value: 185 },
        { name: 'AWP | Graphite', rarity: 'rare', chance: 8.0, value: 320 },
        { name: 'M4A4 | Asiimov', rarity: 'legendary', chance: 3.5, value: 450 },
        { name: 'AK-47 | Fire Serpent', rarity: 'legendary', chance: 1.5, value: 680 }
      ]
    },
    {
      id: 3,
      name: 'Premium Case',
      price: 1499,
      image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg',
      rarity: 'rare',
      items: [
        { name: 'M4A4 | Howl', rarity: 'uncommon', chance: 15.0, value: 890 },
        { name: 'AK-47 | Vulcan', rarity: 'uncommon', chance: 15.0, value: 1250 },
        { name: 'AWP | Dragon Lore', rarity: 'rare', chance: 12.0, value: 2400 },
        { name: 'M4A1-S | Knight', rarity: 'rare', chance: 10.0, value: 1800 },
        { name: 'AK-47 | Case Hardened', rarity: 'rare', chance: 8.0, value: 1600 },
        { name: 'AWP | Medusa', rarity: 'legendary', chance: 5.0, value: 3200 },
        { name: 'M4A4 | Poseidon', rarity: 'legendary', chance: 3.0, value: 2800 },
        { name: 'AK-47 | Gold Arabesque', rarity: 'ancient', chance: 2.0, value: 4500 }
      ]
    },
    {
      id: 4,
      name: 'Elite Case',
      price: 2999,
      image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg',
      rarity: 'legendary',
      items: [
        { name: 'Sport Gloves | Superconductor', rarity: 'rare', chance: 12.0, value: 2800 },
        { name: 'Driver Gloves | King Snake', rarity: 'rare', chance: 10.0, value: 3400 },
        { name: 'Specialist Gloves | Crimson Kimono', rarity: 'legendary', chance: 8.0, value: 4200 },
        { name: 'Moto Gloves | Polygon', rarity: 'legendary', chance: 6.0, value: 3800 },
        { name: 'Hydra Gloves | Case Hardened', rarity: 'legendary', chance: 5.0, value: 4500 },
        { name: 'Sport Gloves | Pandora\'s Box', rarity: 'ancient', chance: 3.0, value: 6800 },
        { name: 'Driver Gloves | Crimson Weave', rarity: 'ancient', chance: 2.0, value: 8200 },
        { name: 'Specialist Gloves | Emerald Web', rarity: 'ancient', chance: 1.0, value: 12000 }
      ]
    },
    {
      id: 5,
      name: 'Master Case',
      price: 4999,
      image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg',
      rarity: 'legendary',
      items: [
        { name: 'StatTrak™ AK-47 | Redline', rarity: 'rare', chance: 10.0, value: 3200 },
        { name: 'StatTrak™ M4A4 | Asiimov', rarity: 'rare', chance: 9.0, value: 3800 },
        { name: 'StatTrak™ AWP | Lightning Strike', rarity: 'legendary', chance: 7.0, value: 4500 },
        { name: 'StatTrak™ AK-47 | Fire Serpent', rarity: 'legendary', chance: 5.0, value: 6200 },
        { name: 'StatTrak™ M4A1-S | Knight', rarity: 'legendary', chance: 4.0, value: 5800 },
        { name: 'StatTrak™ AWP | Dragon Lore', rarity: 'ancient', chance: 3.0, value: 9500 },
        { name: 'StatTrak™ AK-47 | Case Hardened', rarity: 'ancient', chance: 2.0, value: 8700 },
        { name: 'StatTrak™ M4A4 | Howl', rarity: 'ancient', chance: 1.0, value: 15000 }
      ]
    },
    {
      id: 6,
      name: 'Legendary Case',
      price: 9999,
      image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg',
      rarity: 'ancient',
      items: [
        { name: 'Souvenir AWP | Dragon Lore', rarity: 'legendary', chance: 8.0, value: 12000 },
        { name: 'Souvenir AK-47 | Gold Arabesque', rarity: 'legendary', chance: 7.0, value: 9500 },
        { name: 'Souvenir M4A1-S | Knight', rarity: 'legendary', chance: 6.0, value: 8200 },
        { name: 'Factory New Float Items', rarity: 'ancient', chance: 5.0, value: 15000 },
        { name: 'Pattern #1 Case Hardened', rarity: 'ancient', chance: 4.0, value: 18000 },
        { name: 'Titan Holo Katowice 2014', rarity: 'ancient', chance: 3.0, value: 25000 },
        { name: 'IBP Holo Katowice 2014', rarity: 'ancient', chance: 2.0, value: 35000 },
        { name: 'Souvenir M4A4 | Howl', rarity: 'ancient', chance: 1.0, value: 50000 }
      ]
    },
    {
      id: 7,
      name: 'Knife Case',
      price: 24999,
      image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg',
      rarity: 'ancient',
      items: [
        { name: 'Bayonet | Doppler', rarity: 'rare', chance: 12.0, value: 18000 },
        { name: 'M9 Bayonet | Fade', rarity: 'rare', chance: 10.0, value: 22000 },
        { name: 'Karambit | Tiger Tooth', rarity: 'legendary', chance: 8.0, value: 28000 },
        { name: 'Butterfly Knife | Marble Fade', rarity: 'legendary', chance: 7.0, value: 32000 },
        { name: 'Karambit | Fade', rarity: 'legendary', chance: 6.0, value: 35000 },
        { name: 'M9 Bayonet | Crimson Web', rarity: 'ancient', chance: 5.0, value: 45000 },
        { name: 'Karambit | Case Hardened', rarity: 'ancient', chance: 4.0, value: 52000 },
        { name: 'StatTrak™ Karambit | Crimson Web', rarity: 'ancient', chance: 2.0, value: 75000 },
        { name: 'Karambit | Blue Gem #1', rarity: 'ancient', chance: 1.0, value: 150000 }
      ]
    }
  ];

  const inventory = [
    { name: 'AK-47 | Nebula Storm', rarity: 'rare', value: 67, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
    { name: 'AWP | Cosmic Dragon', rarity: 'legendary', value: 156, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
    { name: 'Glock-18 | Stardust', rarity: 'common', value: 23, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' }
  ];

  const marketItems = [
    { id: 1, name: 'Quantum Karambit', seller: 'CosmicTrader', price: 2450, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg', rarity: 'legendary' },
    { id: 2, name: 'Stellar AK-47', seller: 'GalaxyMerchant', price: 890, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg', rarity: 'rare' },
    { id: 3, name: 'Void Butterfly Knife', seller: 'StarDealer', price: 1650, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg', rarity: 'mythical' },
    { id: 4, name: 'Solar Gloves', seller: 'NebulaShop', price: 560, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg', rarity: 'rare' }
  ];

  const topPlayers = [
    { name: 'CosmicCommander', cases: 2580, avatar: '🚀' },
    { name: 'StarLord', cases: 1920, avatar: '⭐' },
    { name: 'GalaxyHunter', cases: 1745, avatar: '🌌' }
  ];

  const getRandomItem = (caseItems: any[]) => {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const item of caseItems) {
      cumulative += item.chance;
      if (random <= cumulative) {
        return item;
      }
    }
    return caseItems[0];
  };

  const handleCaseOpen = (caseId: number) => {
    const caseData = cases.find(c => c.id === caseId);
    if (!caseData) return;
    
    setSelectedCase(caseId);
    setIsOpening(true);
    setIsRolling(true);
    
    // Rolling animation
    setTimeout(() => {
      setIsRolling(false);
      const wonItem = getRandomItem(caseData.items);
      setOpenedItem(wonItem);
      
      // Show result for 3 seconds
      setTimeout(() => {
        setIsOpening(false);
        setSelectedCase(null);
        setOpenedItem(null);
      }, 3000);
    }, 2000);
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
        <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-transparent to-space-dark/80"></div>
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-space-deep/95 backdrop-blur-md border-b border-space-purple/30 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Icon name="Rocket" className="text-space-purple animate-cosmic-glow" size={36} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-space-cyan rounded-full animate-ping"></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-space-purple via-space-cyan to-space-pink bg-clip-text text-transparent" style={{fontFamily: 'Orbitron, monospace'}}>
                COSMIC CS2
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-space-purple transition-colors">Главная</a>
              <a href="#" className="hover:text-space-cyan transition-colors">Кейсы</a>
              <a href="#" className="hover:text-space-pink transition-colors">Инвентарь</a>
              <a href="#" className="hover:text-space-gold transition-colors">Торговля</a>
              <a href="#" className="hover:text-cosmic-glow transition-colors">Профиль</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-space-purple to-space-cyan border-none text-white px-3 py-1">
                <Icon name="Coins" size={16} className="mr-2" />
                2,890₽
              </Badge>
              <Dialog open={showPayment} onOpenChange={setShowPayment}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-space-purple to-space-cyan hover:from-space-cyan hover:to-space-purple transition-all duration-300">
                    <Icon name="CreditCard" className="mr-2" />
                    Пополнить
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-space-deep border-space-purple">
                  <DialogHeader>
                    <DialogTitle className="text-space-cyan">Пополнение баланса</DialogTitle>
                  </DialogHeader>
                  <PaymentForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-transparent via-space-deep/90 to-transparent p-12 rounded-3xl backdrop-blur-md border border-space-purple/20">
            <h2 className="text-7xl font-bold mb-8 animate-fade-in bg-gradient-to-r from-space-purple via-space-cyan to-space-pink bg-clip-text text-transparent" style={{fontFamily: 'Orbitron, monospace'}}>
              КОСМИЧЕСКИЕ КЕЙСЫ CS2
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in drop-shadow-lg">
              🚀 Исследуй галактику редких скинов, получай легендарное оружие из далеких миров
            </p>
            <div className="flex justify-center space-x-6 animate-fade-in">
              <Button size="lg" className="bg-gradient-to-r from-space-purple to-space-cyan hover:from-space-cyan hover:to-space-purple animate-cosmic-glow">
                <Icon name="Rocket" className="mr-2" />
                Запустить кейс
              </Button>
              <Button size="lg" variant="outline" className="border-space-purple text-space-purple hover:bg-space-purple hover:text-white">
                <Icon name="Play" className="mr-2" />
                Как играть
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-space-deep/80 backdrop-blur-md border border-space-purple/30">
            <TabsTrigger value="cases" className="text-space-cyan">Кейсы</TabsTrigger>
            <TabsTrigger value="inventory" className="text-space-purple">Инвентарь</TabsTrigger>
            <TabsTrigger value="market" className="text-space-pink">Торговля</TabsTrigger>
            <TabsTrigger value="withdraw" className="text-space-gold">Вывод</TabsTrigger>
            <TabsTrigger value="profile" className="text-cosmic-glow">Профиль</TabsTrigger>
          </TabsList>

          {/* Cases Tab */}
          <TabsContent value="cases" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cases.map((caseItem) => (
                <Card 
                  key={caseItem.id} 
                  className={`bg-space-deep/90 backdrop-blur-md border-space-purple/30 hover:border-space-cyan hover:shadow-2xl hover:shadow-space-purple/30 transition-all cursor-pointer group ${
                    selectedCase === caseItem.id && isOpening ? 'animate-stellar-pulse border-space-gold shadow-2xl shadow-space-gold/50' : 'hover:animate-cosmic-glow'
                  }`}
                  onClick={() => handleCaseOpen(caseItem.id)}
                >
                  <CardHeader>
                    <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-xl mb-4 overflow-hidden relative">
                      <img 
                        src={caseItem.image} 
                        alt={caseItem.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-space-dark/50 to-transparent"></div>
                      {caseItem.id === 7 && (
                        <div className="absolute top-2 right-2 animate-ping">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-white text-lg">{caseItem.name}</CardTitle>
                    <Badge className={`w-fit ${
                      caseItem.rarity === 'ancient' 
                        ? 'bg-gradient-to-r from-red-600 to-orange-500' 
                        : caseItem.rarity === 'legendary' 
                        ? 'bg-gradient-to-r from-space-purple to-space-pink' 
                        : caseItem.rarity === 'rare'
                        ? 'bg-gradient-to-r from-space-cyan to-space-purple'
                        : caseItem.rarity === 'uncommon'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}>
                      {caseItem.rarity === 'ancient' ? 'Древний' :
                       caseItem.rarity === 'legendary' ? 'Легендарный' : 
                       caseItem.rarity === 'rare' ? 'Редкий' :
                       caseItem.rarity === 'uncommon' ? 'Необычный' : 'Обычный'}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-space-gold to-space-cyan bg-clip-text text-transparent">
                        {caseItem.price.toLocaleString()}₽
                      </span>
                      <Icon name="Package" className="text-space-purple animate-stellar-pulse" />
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      {caseItem.items.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center flex-1 min-w-0">
                            <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                              item.rarity === 'ancient' ? 'bg-red-500' :
                              item.rarity === 'legendary' ? 'bg-space-purple' :
                              item.rarity === 'rare' ? 'bg-space-cyan' :
                              item.rarity === 'uncommon' ? 'bg-blue-400' : 'bg-gray-400'
                            }`}></div>
                            <span className="truncate text-xs">{item.name}</span>
                          </div>
                          <div className="text-xs text-space-gold ml-2">{item.chance}%</div>
                        </div>
                      ))}
                      {caseItem.items.length > 4 && (
                        <div className="text-xs text-center text-space-cyan">+{caseItem.items.length - 4} предметов</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {inventory.map((item, idx) => (
                <Card key={idx} className="bg-space-deep/90 backdrop-blur-md border-space-purple/30 hover:shadow-lg hover:shadow-space-cyan/20 transition-all group">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-lg mb-3 overflow-hidden relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-space-cyan rounded-full animate-ping"></div>
                      </div>
                    </div>
                    <h3 className="font-medium text-white text-sm mb-2">{item.name}</h3>
                    <Badge size="sm" className={
                      item.rarity === 'legendary' 
                        ? 'bg-gradient-to-r from-space-purple to-space-pink' 
                        : item.rarity === 'rare' 
                        ? 'bg-gradient-to-r from-space-cyan to-space-purple' 
                        : 'bg-space-deep'
                    }>
                      {item.rarity === 'legendary' ? 'Легендарный' : 
                       item.rarity === 'rare' ? 'Редкий' : 'Обычный'}
                    </Badge>
                    <div className="text-space-gold font-bold mt-3 text-lg">{item.value}₽</div>
                    <Button size="sm" className="w-full mt-2 bg-gradient-to-r from-space-purple to-space-cyan text-xs">
                      Продать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Market Tab */}
          <TabsContent value="market" className="mt-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent mb-4">
                Торговая площадка
              </h3>
              <div className="flex gap-4 mb-4">
                <Select>
                  <SelectTrigger className="w-48 bg-space-deep border-space-purple">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent className="bg-space-deep border-space-purple">
                    <SelectItem value="all">Все предметы</SelectItem>
                    <SelectItem value="knives">Ножи</SelectItem>
                    <SelectItem value="rifles">Винтовки</SelectItem>
                    <SelectItem value="pistols">Пистолеты</SelectItem>
                    <SelectItem value="gloves">Перчатки</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Поиск предметов..." className="bg-space-deep border-space-purple" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketItems.map((item) => (
                <Card key={item.id} className="bg-space-deep/90 backdrop-blur-md border-space-purple/30 hover:shadow-lg hover:shadow-space-pink/20 transition-all">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-lg mb-3 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-white text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-400 mb-2">Продавец: {item.seller}</p>
                    <Badge size="sm" className={
                      item.rarity === 'legendary' 
                        ? 'bg-gradient-to-r from-space-purple to-space-pink' 
                        : item.rarity === 'mythical'
                        ? 'bg-gradient-to-r from-space-pink to-space-purple'
                        : 'bg-gradient-to-r from-space-cyan to-space-purple'
                    }>
                      {item.rarity === 'legendary' ? 'Легендарный' : 
                       item.rarity === 'mythical' ? 'Мифический' : 'Редкий'}
                    </Badge>
                    <div className="text-space-gold font-bold mt-2 mb-3 text-lg">{item.price}₽</div>
                    <Button size="sm" className="w-full bg-gradient-to-r from-space-cyan to-space-purple text-xs">
                      Купить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw" className="mt-8">
            <WithdrawSection />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-space-deep/90 backdrop-blur-md border-space-purple/30">
                <CardHeader>
                  <CardTitle className="text-space-purple">Космический профиль</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="w-20 h-20 border-2 border-space-cyan">
                      <AvatarFallback className="bg-gradient-to-r from-space-purple to-space-cyan text-white text-2xl">
                        🚀
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold text-white">SpaceCommander</h3>
                      <p className="text-space-cyan">Галактический торговец</p>
                      <Badge className="bg-gradient-to-r from-space-gold to-space-cyan mt-1">
                        Ранг: Капитан
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-space-dark/50 rounded-lg border border-space-purple/30">
                      <div className="text-3xl font-bold text-space-purple">247</div>
                      <div className="text-sm text-gray-400">Кейсов открыто</div>
                    </div>
                    <div className="text-center p-4 bg-space-dark/50 rounded-lg border border-space-cyan/30">
                      <div className="text-3xl font-bold text-space-cyan">32</div>
                      <div className="text-sm text-gray-400">Легендарных дропов</div>
                    </div>
                    <div className="text-center p-4 bg-space-dark/50 rounded-lg border border-space-pink/30">
                      <div className="text-3xl font-bold text-space-pink">156</div>
                      <div className="text-sm text-gray-400">Продано предметов</div>
                    </div>
                    <div className="text-center p-4 bg-space-dark/50 rounded-lg border border-space-gold/30">
                      <div className="text-3xl font-bold text-space-gold">89%</div>
                      <div className="text-sm text-gray-400">Рейтинг</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-space-deep/90 backdrop-blur-md border-space-cyan/30">
                <CardHeader>
                  <CardTitle className="text-space-cyan">Последние трофеи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-space-dark/50 border border-space-purple/20">
                      <span className="text-white">Quantum Karambit</span>
                      <Badge className="bg-gradient-to-r from-space-purple to-space-pink">Легендарный</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-space-dark/50 border border-space-cyan/20">
                      <span className="text-white">Stellar AK-47</span>
                      <Badge className="bg-gradient-to-r from-space-cyan to-space-purple">Редкий</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-space-dark/50 border border-space-pink/20">
                      <span className="text-white">Cosmic AWP</span>
                      <Badge className="bg-gradient-to-r from-space-purple to-space-pink">Легендарный</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Opening Animation */}
      {isOpening && (
        <div className="fixed inset-0 bg-space-dark/95 backdrop-blur-md flex items-center justify-center z-50">
          <div className="text-center animate-fade-in">
            {isRolling ? (
              <>
                <div className="relative mb-8">
                  <div className="text-8xl animate-spin">🎰</div>
                  <div className="absolute inset-0 animate-ping">
                    <div className="text-8xl opacity-30">✨</div>
                  </div>
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent mb-4 animate-pulse">
                  Генерация предмета...
                </h3>
                <div className="w-96 bg-space-deep rounded-full overflow-hidden border-2 border-space-purple mb-4">
                  <div className="bg-gradient-to-r from-space-purple via-space-cyan to-space-pink h-4 rounded-full animate-pulse"></div>
                </div>
                <p className="text-space-cyan animate-bounce">Исследуем космические артефакты...</p>
              </>
            ) : openedItem && (
              <>
                <div className="relative mb-6 animate-stellar-pulse">
                  <div className="text-8xl">🎉</div>
                  <div className="absolute inset-0 animate-ping delay-300">
                    <div className="text-8xl opacity-50">💫</div>
                  </div>
                </div>
                <h3 className="text-5xl font-bold bg-gradient-to-r from-space-gold to-space-cyan bg-clip-text text-transparent mb-4">
                  Поздравляем!
                </h3>
                <div className={`p-6 rounded-2xl border-4 mb-4 animate-cosmic-glow ${
                  openedItem.rarity === 'ancient' 
                    ? 'border-red-500 bg-gradient-to-br from-red-900/50 to-orange-900/50' 
                    : openedItem.rarity === 'legendary'
                    ? 'border-space-purple bg-gradient-to-br from-space-purple/50 to-space-pink/50'
                    : openedItem.rarity === 'rare'
                    ? 'border-space-cyan bg-gradient-to-br from-space-cyan/50 to-space-purple/50'
                    : 'border-blue-400 bg-gradient-to-br from-blue-900/50 to-purple-900/50'
                }`}>
                  <h4 className="text-3xl font-bold text-white mb-2">{openedItem.name}</h4>
                  <Badge className={`text-lg px-4 py-2 ${
                    openedItem.rarity === 'ancient' 
                      ? 'bg-gradient-to-r from-red-600 to-orange-500' 
                      : openedItem.rarity === 'legendary'
                      ? 'bg-gradient-to-r from-space-purple to-space-pink'
                      : openedItem.rarity === 'rare'
                      ? 'bg-gradient-to-r from-space-cyan to-space-purple'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    {openedItem.rarity === 'ancient' ? 'Древний' :
                     openedItem.rarity === 'legendary' ? 'Легендарный' :
                     openedItem.rarity === 'rare' ? 'Редкий' : 'Необычный'}
                  </Badge>
                  <div className="text-4xl font-bold text-space-gold mt-4">
                    {openedItem.value.toLocaleString()}₽
                  </div>
                </div>
                <p className="text-xl text-space-cyan">Предмет добавлен в инвентарь!</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-space-deep/95 backdrop-blur-md border-t border-space-purple/30 py-10 mt-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <a href="#" className="text-gray-400 hover:text-space-purple transition-colors">О проекте</a>
            <a href="#" className="text-gray-400 hover:text-space-cyan transition-colors">Правила</a>
            <a href="#" className="text-gray-400 hover:text-space-pink transition-colors">Поддержка</a>
            <a href="#" className="text-gray-400 hover:text-space-gold transition-colors">Контакты</a>
          </div>
          <p className="text-gray-500 text-lg">© 2024 Cosmic CS2. Все права во вселенной защищены. 🌌</p>
        </div>
      </footer>
    </div>
  );
};

// Payment Form Component
const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button
          variant={paymentMethod === 'card' ? 'default' : 'outline'}
          onClick={() => setPaymentMethod('card')}
          className={paymentMethod === 'card' ? 'bg-space-purple' : 'border-space-purple text-space-purple'}
        >
          <Icon name="CreditCard" className="mr-2" />
          Карта
        </Button>
        <Button
          variant={paymentMethod === 'crypto' ? 'default' : 'outline'}
          onClick={() => setPaymentMethod('crypto')}
          className={paymentMethod === 'crypto' ? 'bg-space-cyan' : 'border-space-cyan text-space-cyan'}
        >
          <Icon name="Bitcoin" className="mr-2" />
          Крипта
        </Button>
        <Button
          variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
          onClick={() => setPaymentMethod('wallet')}
          className={paymentMethod === 'wallet' ? 'bg-space-pink' : 'border-space-pink text-space-pink'}
        >
          <Icon name="Wallet" className="mr-2" />
          Кошелек
        </Button>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-space-cyan">Сумма пополнения</Label>
            <Select>
              <SelectTrigger className="bg-space-dark border-space-purple">
                <SelectValue placeholder="Выберите сумму" />
              </SelectTrigger>
              <SelectContent className="bg-space-dark border-space-purple">
                <SelectItem value="500">500₽</SelectItem>
                <SelectItem value="1000">1000₽</SelectItem>
                <SelectItem value="2500">2500₽</SelectItem>
                <SelectItem value="5000">5000₽</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-space-cyan">Номер карты</Label>
            <Input placeholder="1234 5678 9012 3456" className="bg-space-dark border-space-purple" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-space-cyan">MM/YY</Label>
              <Input placeholder="12/25" className="bg-space-dark border-space-purple" />
            </div>
            <div className="space-y-2">
              <Label className="text-space-cyan">CVV</Label>
              <Input placeholder="123" className="bg-space-dark border-space-purple" />
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-space-purple to-space-cyan">
            Пополнить баланс
          </Button>
        </div>
      )}

      {paymentMethod === 'crypto' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-space-cyan">Выберите криптовалюту</Label>
            <Select>
              <SelectTrigger className="bg-space-dark border-space-cyan">
                <SelectValue placeholder="Криптовалюта" />
              </SelectTrigger>
              <SelectContent className="bg-space-dark border-space-cyan">
                <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                <SelectItem value="usdt">Tether (USDT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-4 bg-space-dark/50 rounded border border-space-cyan/30 text-center">
            <p className="text-space-cyan mb-2">Адрес для пополнения:</p>
            <code className="text-xs bg-space-deep p-2 rounded">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code>
          </div>
          <Button className="w-full bg-gradient-to-r from-space-cyan to-space-purple">
            Я отправил платеж
          </Button>
        </div>
      )}
    </div>
  );
};

// Withdraw Section Component
const WithdrawSection = () => {
  const [withdrawMethod, setWithdrawMethod] = useState('money');

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-space-gold to-space-cyan bg-clip-text text-transparent mb-8 text-center">
        Вывод средств и скинов
      </h3>
      
      <div className="flex justify-center space-x-4 mb-8">
        <Button
          variant={withdrawMethod === 'money' ? 'default' : 'outline'}
          onClick={() => setWithdrawMethod('money')}
          className={withdrawMethod === 'money' ? 'bg-space-gold' : 'border-space-gold text-space-gold'}
        >
          <Icon name="DollarSign" className="mr-2" />
          Деньги
        </Button>
        <Button
          variant={withdrawMethod === 'skins' ? 'default' : 'outline'}
          onClick={() => setWithdrawMethod('skins')}
          className={withdrawMethod === 'skins' ? 'bg-space-purple' : 'border-space-purple text-space-purple'}
        >
          <Icon name="Package" className="mr-2" />
          Скины
        </Button>
      </div>

      <Card className="bg-space-deep/90 backdrop-blur-md border-space-gold/30">
        <CardHeader>
          <CardTitle className="text-space-gold">
            {withdrawMethod === 'money' ? 'Вывод денег' : 'Вывод скинов в Steam'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {withdrawMethod === 'money' && (
            <>
              <div className="space-y-2">
                <Label className="text-space-cyan">Способ вывода</Label>
                <Select>
                  <SelectTrigger className="bg-space-dark border-space-gold">
                    <SelectValue placeholder="Выберите способ" />
                  </SelectTrigger>
                  <SelectContent className="bg-space-dark border-space-gold">
                    <SelectItem value="card">Банковская карта</SelectItem>
                    <SelectItem value="qiwi">QIWI кошелек</SelectItem>
                    <SelectItem value="yandex">ЮMoney</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-space-cyan">Сумма к выводу</Label>
                <Input placeholder="0" className="bg-space-dark border-space-gold" />
                <p className="text-xs text-gray-400">Минимум: 500₽, Комиссия: 5%</p>
              </div>
              <div className="space-y-2">
                <Label className="text-space-cyan">Реквизиты</Label>
                <Input placeholder="Номер карты или кошелька" className="bg-space-dark border-space-gold" />
              </div>
              <Button className="w-full bg-gradient-to-r from-space-gold to-space-cyan">
                <Icon name="ArrowUpRight" className="mr-2" />
                Вывести деньги
              </Button>
            </>
          )}

          {withdrawMethod === 'skins' && (
            <>
              <div className="space-y-2">
                <Label className="text-space-cyan">Steam Trade URL</Label>
                <Input placeholder="https://steamcommunity.com/tradeoffer/new/..." className="bg-space-dark border-space-purple" />
                <p className="text-xs text-gray-400">
                  Найдите в настройках Steam → Торговые предложения → Ссылка для торговли
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inventory.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="p-4 bg-space-dark/50 rounded-lg border border-space-purple/30 flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-space-gold text-sm">{item.value}₽</p>
                    </div>
                    <Button size="sm" className="bg-space-purple">
                      Выбрать
                    </Button>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-space-purple to-space-pink">
                <Icon name="ExternalLink" className="mr-2" />
                Отправить скины в Steam
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6 bg-space-dark/50 border-space-cyan/30">
        <CardHeader>
          <CardTitle className="text-space-cyan text-lg">Статистика выводов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-space-gold">45,670₽</div>
              <p className="text-xs text-gray-400">Выведено денег</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-space-purple">127</div>
              <p className="text-xs text-gray-400">Скинов выведено</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-space-cyan">2 мин</div>
              <p className="text-xs text-gray-400">Среднее время</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;