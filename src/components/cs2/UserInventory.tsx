import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface UserInventoryProps {
  inventory: InventoryItem[];
  onSellItem?: (item: InventoryItem) => void;
  onWithdrawItem?: (item: InventoryItem) => void;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'ancient': return 'from-red-600 to-red-400';
    case 'legendary': return 'from-space-purple to-purple-400';
    case 'rare': return 'from-space-cyan to-cyan-400';
    case 'uncommon': return 'from-blue-500 to-blue-400';
    default: return 'from-gray-500 to-gray-400';
  }
};

const getRarityBorder = (rarity: string) => {
  switch (rarity) {
    case 'ancient': return 'border-red-500';
    case 'legendary': return 'border-space-purple';
    case 'rare': return 'border-space-cyan';
    case 'uncommon': return 'border-blue-400';
    default: return 'border-gray-400';
  }
};

export default function UserInventory({ inventory, onSellItem, onWithdrawItem }: UserInventoryProps) {
  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);
  const itemsByRarity = inventory.reduce((acc, item) => {
    acc[item.rarity] = (acc[item.rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <Card className="bg-space-dark/50 border-space-purple/30">
        <CardHeader>
          <CardTitle className="text-space-purple text-xl flex items-center">
            <Icon name="Package" className="mr-2" />
            Мой инвентарь
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-space-deep/30 rounded-lg border border-space-purple/20">
              <div className="text-lg font-bold text-space-gold">{inventory.length}</div>
              <div className="text-xs text-gray-400">Предметов</div>
            </div>
            <div className="text-center p-3 bg-space-deep/30 rounded-lg border border-space-purple/20">
              <div className="text-lg font-bold text-space-cyan">{totalValue.toLocaleString()}₽</div>
              <div className="text-xs text-gray-400">Общая стоимость</div>
            </div>
            <div className="text-center p-3 bg-space-deep/30 rounded-lg border border-space-purple/20">
              <div className="text-lg font-bold text-red-400">{itemsByRarity.ancient || 0}</div>
              <div className="text-xs text-gray-400">Древних</div>
            </div>
            <div className="text-center p-3 bg-space-deep/30 rounded-lg border border-space-purple/20">
              <div className="text-lg font-bold text-space-purple">{itemsByRarity.legendary || 0}</div>
              <div className="text-xs text-gray-400">Легендарных</div>
            </div>
          </div>

          {inventory.length > 0 ? (
            <>
              {/* Inventory Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {inventory.map((item) => (
                  <div key={item.id} className={`bg-space-deep/50 rounded-lg border-2 ${getRarityBorder(item.rarity)} overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                    <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg';
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <div className={`w-3 h-3 rounded-full ${
                          item.rarity === 'ancient' ? 'bg-red-500' :
                          item.rarity === 'legendary' ? 'bg-space-purple' :
                          item.rarity === 'rare' ? 'bg-space-cyan' :
                          item.rarity === 'uncommon' ? 'bg-blue-500' : 'bg-gray-500'
                        } animate-pulse`}></div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-white font-semibold text-sm mb-2 truncate">{item.name}</h4>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${
                          item.rarity === 'ancient' ? 'bg-red-500' :
                          item.rarity === 'legendary' ? 'bg-space-purple' :
                          item.rarity === 'rare' ? 'bg-space-cyan' :
                          item.rarity === 'uncommon' ? 'bg-blue-400' : 'bg-gray-400'
                        } text-white text-xs`}>
                          {item.rarity === 'ancient' ? 'Древний' :
                           item.rarity === 'legendary' ? 'Легендарный' :
                           item.rarity === 'rare' ? 'Редкий' : 
                           item.rarity === 'uncommon' ? 'Необычный' : 'Обычный'}
                        </Badge>
                        <div className="text-space-gold font-bold text-sm">{item.value.toLocaleString()}₽</div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {onSellItem && (
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onSellItem(item);
                            }}
                            className="flex-1 bg-space-green hover:bg-space-green/80 text-xs"
                          >
                            <Icon name="DollarSign" className="w-3 h-3 mr-1" />
                            Продать
                          </Button>
                        )}
                        {onWithdrawItem && (
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onWithdrawItem(item);
                            }}
                            className="flex-1 bg-space-purple hover:bg-space-purple/80 text-xs"
                          >
                            <Icon name="Send" className="w-3 h-3 mr-1" />
                            Вывести
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Sell Section */}
              <div className="bg-space-deep/30 rounded-lg p-4 border border-space-cyan/30">
                <h4 className="text-space-cyan font-semibold mb-3">Быстрые продажи</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {inventory.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 bg-space-deep/50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-space-gold text-sm">{item.value}₽</p>
                      </div>
                      <Button size="sm" className="bg-space-purple hover:bg-space-purple/80">
                        Выбрать
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-space-purple to-space-pink hover:opacity-80">
                  <Icon name="ExternalLink" className="mr-2" />
                  Отправить скины в Steam
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-400 text-lg mb-2">Ваш инвентарь пуст</p>
              <p className="text-gray-500 text-sm">Откройте несколько кейсов, чтобы получить первые предметы</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-space-dark/50 border-space-cyan/30">
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
}