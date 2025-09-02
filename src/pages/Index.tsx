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

  const cases = [
    {
      id: 1,
      name: 'Galactic Case',
      price: 299,
      image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg',
      rarity: 'legendary',
      items: ['AK-47 | Nebula Storm', 'AWP | Cosmic Dragon', 'M4A4 | Galaxy']
    },
    {
      id: 2,
      name: 'Stellar Case',
      price: 499,
      image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg',
      rarity: 'mythical',
      items: ['Stellar Gloves', 'Cosmic Karambit', 'Void Butterfly']
    },
    {
      id: 3,
      name: 'Universe Case',
      price: 899,
      image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg',
      rarity: 'legendary',
      items: ['Quantum Karambit', 'Solar M9', 'Supernova Talon']
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

  const handleCaseOpen = (caseId: number) => {
    setSelectedCase(caseId);
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
      setSelectedCase(null);
    }, 3000);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card 
                  key={caseItem.id} 
                  className={`bg-space-deep/90 backdrop-blur-md border-space-purple/30 hover:border-space-cyan hover:shadow-2xl hover:shadow-space-purple/30 transition-all cursor-pointer group animate-cosmic-glow ${
                    selectedCase === caseItem.id && isOpening ? 'animate-stellar-pulse' : ''
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
                    </div>
                    <CardTitle className="text-white text-xl">{caseItem.name}</CardTitle>
                    <Badge className={`w-fit ${
                      caseItem.rarity === 'legendary' 
                        ? 'bg-gradient-to-r from-space-purple to-space-pink' 
                        : 'bg-gradient-to-r from-space-cyan to-space-purple'
                    }`}>
                      {caseItem.rarity === 'legendary' ? 'Легендарный' : 'Мифический'}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold bg-gradient-to-r from-space-gold to-space-cyan bg-clip-text text-transparent">
                        {caseItem.price}₽
                      </span>
                      <Icon name="Package" className="text-space-purple animate-stellar-pulse" />
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      {caseItem.items.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-space-cyan rounded-full mr-3 animate-pulse"></div>
                          {item}
                        </div>
                      ))}
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

      {/* Opening Animation */}
      {isOpening && (
        <div className="fixed inset-0 bg-space-dark/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center animate-fade-in">
            <div className="text-8xl mb-6 animate-stellar-pulse">🚀</div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent mb-4">
              Запуск космического кейса...
            </h3>
            <div className="w-80 bg-space-deep rounded-full overflow-hidden border border-space-purple">
              <div className="bg-gradient-to-r from-space-purple to-space-cyan h-3 rounded-full animate-pulse"></div>
            </div>
            <p className="text-space-cyan mt-4">Исследуем далекие галактики...</p>
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