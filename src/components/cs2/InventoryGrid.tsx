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

interface InventoryGridProps {
  inventory: InventoryItem[];
  onStartWithdrawal: (item: InventoryItem) => void;
}

const rarityColors = {
  common: 'bg-gray-500',
  uncommon: 'bg-green-500',
  rare: 'bg-blue-500',
  legendary: 'bg-purple-500',
  ancient: 'bg-yellow-500'
};

const rarityNames = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  legendary: 'Легендарный',
  ancient: 'Древний'
};

export default function InventoryGrid({ inventory, onStartWithdrawal }: InventoryGridProps) {
  return (
    <Card className="bg-space-deep/50 border-space-purple/30">
      <CardHeader>
        <CardTitle className="text-white">Выберите скин для вывода</CardTitle>
      </CardHeader>
      <CardContent>
        {inventory.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Icon name="Package" className="mx-auto mb-4 w-12 h-12" />
            <p>Инвентарь пуст</p>
            <p className="text-sm">Откройте кейсы для получения скинов</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {inventory.map((item) => (
              <Card 
                key={item.id} 
                className="bg-space-dark/30 border-space-purple/20 hover:border-space-purple/50 transition-colors cursor-pointer"
                onClick={() => onStartWithdrawal(item)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square mb-3 relative overflow-hidden rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${rarityColors[item.rarity]} text-white text-xs`}
                    >
                      {rarityNames[item.rarity]}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-space-gold font-bold">
                      {item.value.toLocaleString()}₽
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-space-purple hover:bg-space-purple/80"
                    >
                      <Icon name="Send" className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}