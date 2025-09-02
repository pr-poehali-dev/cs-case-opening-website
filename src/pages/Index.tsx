import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const cases = [
    {
      id: 1,
      name: 'Weapon Case',
      price: 250,
      image: '/img/ad14b56b-2c45-4312-95ef-089125e656c7.jpg',
      rarity: 'legendary',
      items: ['AK-47 | Redline', 'AWP | Dragon Lore', 'M4A4 | Howl']
    },
    {
      id: 2,
      name: 'Glove Case',
      price: 400,
      image: '/img/ad14b56b-2c45-4312-95ef-089125e656c7.jpg',
      rarity: 'mythical',
      items: ['Driver Gloves', 'Moto Gloves', 'Specialist Gloves']
    },
    {
      id: 3,
      name: 'Knife Case',
      price: 800,
      image: '/img/ad14b56b-2c45-4312-95ef-089125e656c7.jpg',
      rarity: 'legendary',
      items: ['Karambit', 'Butterfly Knife', 'M9 Bayonet']
    }
  ];

  const inventory = [
    { name: 'AK-47 | Redline', rarity: 'rare', value: 45 },
    { name: 'AWP | Asiimov', rarity: 'legendary', value: 89 },
    { name: 'Glock-18 | Water Elemental', rarity: 'common', value: 12 }
  ];

  const topPlayers = [
    { name: 'ProGamer2024', cases: 1250, avatar: '🎯' },
    { name: 'CaseKing', cases: 980, avatar: '👑' },
    { name: 'LuckyShot', cases: 875, avatar: '🍀' }
  ];

  const handleCaseOpen = (caseId: number) => {
    setSelectedCase(caseId);
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
      setSelectedCase(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cs-dark text-white font-sans">
      {/* Header */}
      <header className="bg-cs-gray border-b border-cs-orange/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Gamepad2" className="text-cs-orange" size={32} />
              <h1 className="text-2xl font-bold text-cs-orange">CS2 Cases</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-cs-orange transition-colors">Главная</a>
              <a href="#" className="hover:text-cs-orange transition-colors">Кейсы</a>
              <a href="#" className="hover:text-cs-orange transition-colors">Инвентарь</a>
              <a href="#" className="hover:text-cs-orange transition-colors">Рейтинг</a>
              <a href="#" className="hover:text-cs-orange transition-colors">Профиль</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-cs-blue text-cs-blue">
                <Icon name="Coins" size={16} className="mr-1" />
                1,250₽
              </Badge>
              <Button className="bg-cs-orange hover:bg-cs-orange/80 text-white">
                Пополнить
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-cs-dark via-cs-gray to-cs-dark">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in">
            Открывай кейсы <span className="text-cs-orange">CS2</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">
            Получай редкие скины, ножи и перчатки из популярной игры Counter-Strike 2
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in">
            <Button size="lg" className="bg-cs-orange hover:bg-cs-orange/80">
              <Icon name="Package" className="mr-2" />
              Открыть кейс
            </Button>
            <Button size="lg" variant="outline" className="border-cs-blue text-cs-blue hover:bg-cs-blue hover:text-white">
              <Icon name="Play" className="mr-2" />
              Как играть
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-cs-gray">
            <TabsTrigger value="cases">Кейсы</TabsTrigger>
            <TabsTrigger value="inventory">Инвентарь</TabsTrigger>
            <TabsTrigger value="rating">Рейтинг</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          {/* Cases Tab */}
          <TabsContent value="cases" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card 
                  key={caseItem.id} 
                  className={`bg-cs-gray border-cs-orange/20 hover:border-cs-orange transition-all cursor-pointer group ${
                    selectedCase === caseItem.id && isOpening ? 'animate-case-open animate-case-glow' : ''
                  }`}
                  onClick={() => handleCaseOpen(caseItem.id)}
                >
                  <CardHeader>
                    <div className="aspect-square bg-gradient-to-br from-cs-orange/20 to-cs-blue/20 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={caseItem.image} 
                        alt={caseItem.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardTitle className="text-white">{caseItem.name}</CardTitle>
                    <Badge className={`w-fit ${
                      caseItem.rarity === 'legendary' ? 'bg-cs-orange' : 'bg-cs-blue'
                    }`}>
                      {caseItem.rarity === 'legendary' ? 'Легендарный' : 'Мифический'}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-cs-orange">{caseItem.price}₽</span>
                      <Icon name="Package" className="text-cs-blue" />
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      {caseItem.items.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <Icon name="Dot" size={12} className="mr-2 text-cs-orange" />
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
                <Card key={idx} className="bg-cs-gray border-cs-blue/20">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-cs-blue/20 to-cs-orange/20 rounded mb-3 flex items-center justify-center">
                      <img src="/img/fbc9ea5a-c8bf-43e1-b6ea-2c401b33ac48.jpg" alt={item.name} className="w-16 h-16 object-contain" />
                    </div>
                    <h3 className="font-medium text-white text-sm mb-1">{item.name}</h3>
                    <Badge size="sm" className={
                      item.rarity === 'legendary' ? 'bg-cs-orange' : 
                      item.rarity === 'rare' ? 'bg-cs-blue' : 'bg-gray-500'
                    }>
                      {item.rarity === 'legendary' ? 'Легендарный' : 
                       item.rarity === 'rare' ? 'Редкий' : 'Обычный'}
                    </Badge>
                    <div className="text-cs-orange font-bold mt-2">{item.value}₽</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rating Tab */}
          <TabsContent value="rating" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-cs-gray border-cs-orange/20">
                <CardHeader>
                  <CardTitle className="text-cs-orange">Топ игроков</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPlayers.map((player, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded bg-cs-dark">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{player.avatar}</div>
                          <div>
                            <div className="font-medium text-white">{player.name}</div>
                            <div className="text-sm text-gray-400">{player.cases} кейсов открыто</div>
                          </div>
                        </div>
                        <Badge className="bg-cs-blue">#{idx + 1}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs-gray border-cs-blue/20">
                <CardHeader>
                  <CardTitle className="text-cs-blue">Статистика дропа</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Обычные предметы</span>
                        <span className="text-cs-orange">76%</span>
                      </div>
                      <Progress value={76} className="bg-cs-dark" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Редкие предметы</span>
                        <span className="text-cs-blue">20%</span>
                      </div>
                      <Progress value={20} className="bg-cs-dark" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Легендарные предметы</span>
                        <span className="text-cs-orange">4%</span>
                      </div>
                      <Progress value={4} className="bg-cs-dark" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-cs-gray border-cs-orange/20">
                <CardHeader>
                  <CardTitle className="text-cs-orange">Мой профиль</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-cs-orange text-white text-xl">
                        🎯
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-white">YourNickname</h3>
                      <p className="text-gray-400">Активный игрок</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-cs-dark rounded">
                      <div className="text-2xl font-bold text-cs-orange">127</div>
                      <div className="text-sm text-gray-400">Кейсов открыто</div>
                    </div>
                    <div className="text-center p-3 bg-cs-dark rounded">
                      <div className="text-2xl font-bold text-cs-blue">15</div>
                      <div className="text-sm text-gray-400">Легендарных дропов</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs-gray border-cs-blue/20">
                <CardHeader>
                  <CardTitle className="text-cs-blue">Последние дропы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded bg-cs-dark">
                      <span className="text-white">AK-47 | Redline</span>
                      <Badge className="bg-cs-orange">Редкий</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-cs-dark">
                      <span className="text-white">Glock-18 | Water Elemental</span>
                      <Badge className="bg-gray-500">Обычный</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-cs-dark">
                      <span className="text-white">AWP | Dragon Lore</span>
                      <Badge className="bg-cs-orange">Легендарный</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Opening Animation Overlay */}
      {isOpening && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-4 animate-case-open">📦</div>
            <h3 className="text-2xl font-bold text-cs-orange mb-2">Открываем кейс...</h3>
            <div className="w-64 bg-cs-dark rounded-full overflow-hidden">
              <div className="bg-cs-orange h-2 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-cs-gray border-t border-cs-orange/20 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-8 mb-4">
            <a href="#" className="text-gray-400 hover:text-cs-orange transition-colors">О проекте</a>
            <a href="#" className="text-gray-400 hover:text-cs-orange transition-colors">Правила</a>
            <a href="#" className="text-gray-400 hover:text-cs-orange transition-colors">Поддержка</a>
            <a href="#" className="text-gray-400 hover:text-cs-orange transition-colors">Контакты</a>
          </div>
          <p className="text-gray-500">© 2024 CS2 Cases. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;