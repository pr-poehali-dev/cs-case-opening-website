import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { getDeliveryTimeText } from '@/services/tradingAPI';

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

interface ActiveWithdrawalsProps {
  withdrawalRequests: WithdrawalRequest[];
}

// Получаем статус для отображения
const getStatusInfo = (status: WithdrawalRequest['status']) => {
  const statusMap = {
    pending: { text: 'Ожидание', color: 'bg-gray-500', icon: 'Clock' },
    processing: { text: 'Обработка', color: 'bg-blue-500', icon: 'Loader' },
    searching_market: { text: 'Поиск на площадках', color: 'bg-blue-500', icon: 'Search' },
    purchasing: { text: 'Покупка', color: 'bg-orange-500', icon: 'ShoppingCart' },
    delivering: { text: 'Доставка', color: 'bg-purple-500', icon: 'Truck' },
    completed: { text: 'Завершено', color: 'bg-green-500', icon: 'CheckCircle' },
    failed: { text: 'Ошибка', color: 'bg-red-500', icon: 'XCircle' }
  };
  return statusMap[status];
};

export default function ActiveWithdrawals({ withdrawalRequests }: ActiveWithdrawalsProps) {
  if (withdrawalRequests.length === 0) {
    return null;
  }

  return (
    <Card className="bg-space-deep/50 border-space-purple/30">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon name="Activity" />
          <span>Активные заявки</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {withdrawalRequests.slice(0, 5).map((request) => {
            const statusInfo = getStatusInfo(request.status);
            return (
              <div key={request.id} className="flex items-center justify-between p-3 bg-space-dark/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img 
                    src={request.item.image} 
                    alt={request.item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{request.item.name}</h4>
                    <p className="text-xs text-gray-400">{request.item.value.toLocaleString()}₽</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={`${statusInfo.color} text-white text-xs`}>
                    <Icon name={statusInfo.icon as any} className="w-3 h-3 mr-1" />
                    {statusInfo.text}
                  </Badge>
                  
                  {request.status === 'delivering' && request.estimatedDelivery && (
                    <span className="text-xs text-space-cyan">
                      ~{getDeliveryTimeText(request.estimatedDelivery)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}