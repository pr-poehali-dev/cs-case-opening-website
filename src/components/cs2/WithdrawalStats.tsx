import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface WithdrawalRequest {
  id: string;
  item: {
    id: number;
    name: string;
    image: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
    value: number;
  };
  status: 'pending' | 'processing' | 'searching_market' | 'purchasing' | 'delivering' | 'completed' | 'failed';
  transactionId?: string;
  estimatedDelivery?: number;
  actualPrice?: number;
  error?: string;
  createdAt: number;
}

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface WithdrawalStatsProps {
  withdrawalRequests: WithdrawalRequest[];
  inventory: InventoryItem[];
}

export default function WithdrawalStats({ withdrawalRequests, inventory }: WithdrawalStatsProps) {
  const completedRequests = withdrawalRequests.filter(req => req.status === 'completed').length;
  const totalValue = withdrawalRequests
    .filter(req => req.status === 'completed')
    .reduce((sum, req) => sum + req.item.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-space-deep/50 border-space-purple/30">
        <CardContent className="p-4 text-center">
          <Icon name="TrendingUp" className="mx-auto mb-2 text-space-green" />
          <div className="text-2xl font-bold text-space-green">{completedRequests}</div>
          <div className="text-sm text-gray-400">Успешных выводов</div>
        </CardContent>
      </Card>
      
      <Card className="bg-space-deep/50 border-space-purple/30">
        <CardContent className="p-4 text-center">
          <Icon name="DollarSign" className="mx-auto mb-2 text-space-gold" />
          <div className="text-2xl font-bold text-space-gold">{totalValue.toLocaleString()}₽</div>
          <div className="text-sm text-gray-400">Общая стоимость</div>
        </CardContent>
      </Card>

      <Card className="bg-space-deep/50 border-space-purple/30">
        <CardContent className="p-4 text-center">
          <Icon name="Package" className="mx-auto mb-2 text-space-cyan" />
          <div className="text-2xl font-bold text-space-cyan">{inventory.length}</div>
          <div className="text-sm text-gray-400">Скинов в инвентаре</div>
        </CardContent>
      </Card>
    </div>
  );
}