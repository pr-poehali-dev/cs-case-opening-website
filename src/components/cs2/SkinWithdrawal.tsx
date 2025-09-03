import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { playCS2Sound } from './CS2SoundManager';
import { 
  tradingAPI, 
  formatSkinName, 
  getDeliveryTimeText,
  type SkinPurchaseRequest,
  type SkinPurchaseResponse,
  type MarketPrice
} from '@/services/tradingAPI';

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface WithdrawalRequest {
  id: string;
  item: InventoryItem;
  status: 'pending' | 'processing' | 'searching_market' | 'purchasing' | 'delivering' | 'completed' | 'failed';
  transactionId?: string;
  estimatedDelivery?: number;
  actualPrice?: number;
  error?: string;
  createdAt: number;
}

interface SkinWithdrawalProps {
  inventory: InventoryItem[];
  onWithdraw: (item: InventoryItem) => void;
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

const SkinWithdrawal: React.FC<SkinWithdrawalProps> = ({ inventory, onWithdraw }) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false);
  const [tradeUrl, setTradeUrl] = useState('');
  const [steamId, setSteamId] = useState('');
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Загружаем данные пользователя из localStorage
  useEffect(() => {
    const savedTradeUrl = localStorage.getItem('userTradeUrl') || '';
    const savedSteamId = localStorage.getItem('userSteamId') || '';
    setTradeUrl(savedTradeUrl);
    setSteamId(savedSteamId);
  }, []);

  // Сохраняем данные пользователя
  const saveUserData = () => {
    localStorage.setItem('userTradeUrl', tradeUrl);
    localStorage.setItem('userSteamId', steamId);
  };

  // Загружаем цены для выбранного скина
  const loadMarketPrices = async (item: InventoryItem) => {
    if (!item) return;
    
    setIsLoadingPrices(true);
    try {
      const marketHashName = formatSkinName(item.name);
      const prices = await tradingAPI.getMarketPrices(item.name, marketHashName);
      setMarketPrices(prices);
    } catch (error) {
      console.error('Failed to load market prices:', error);
      setMarketPrices([]);
    } finally {
      setIsLoadingPrices(false);
    }
  };

  // Открываем диалог вывода
  const handleStartWithdrawal = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowWithdrawalDialog(true);
    loadMarketPrices(item);
  };

  // Валидация данных пользователя
  const isValidUserData = () => {
    return steamId.trim() && tradeUrl.trim() && tradingAPI.validateTradeURL(tradeUrl);
  };

  // Выполняем вывод скина
  const executeWithdrawal = async () => {
    if (!selectedItem || !isValidUserData()) return;

    setIsProcessing(true);
    playCS2Sound('case_open', 0.5);
    saveUserData();

    const requestId = `WDR_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    // Создаем заявку на вывод
    const withdrawalRequest: WithdrawalRequest = {
      id: requestId,
      item: selectedItem,
      status: 'pending',
      createdAt: Date.now()
    };

    setWithdrawalRequests(prev => [withdrawalRequest, ...prev]);
    
    try {
      // Этап 1: Поиск на торговых площадках
      updateWithdrawalStatus(requestId, 'searching_market');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Этап 2: Покупка скина
      updateWithdrawalStatus(requestId, 'purchasing');
      
      const purchaseRequest: SkinPurchaseRequest = {
        skinName: selectedItem.name,
        marketHashName: formatSkinName(selectedItem.name),
        maxPrice: selectedItem.value * 1.1, // +10% от стоимости скина
        userSteamID: steamId,
        userTradeURL: tradeUrl
      };

      const response: SkinPurchaseResponse = await tradingAPI.purchaseSkin(purchaseRequest);

      if (response.success && response.transactionId) {
        // Успешная покупка
        updateWithdrawalStatus(requestId, 'delivering', {
          transactionId: response.transactionId,
          estimatedDelivery: response.estimatedDeliveryTime,
          actualPrice: response.actualPrice
        });

        playCS2Sound('item_drop', 0.7);

        // Симулируем доставку
        setTimeout(async () => {
          // Проверяем статус доставки
          const deliveryStatus = await tradingAPI.checkTransactionStatus(response.transactionId!);
          
          if (deliveryStatus.status === 'completed') {
            updateWithdrawalStatus(requestId, 'completed');
            playCS2Sound('case_unlock', 0.6);
            // Удаляем скин из инвентаря
            onWithdraw(selectedItem);
          } else {
            updateWithdrawalStatus(requestId, 'failed', {
              error: deliveryStatus.error || 'Не удалось доставить предмет'
            });
            playCS2Sound('roll_tick', 0.4);
          }
        }, (response.estimatedDeliveryTime || 5) * 60 * 1000); // конвертируем минуты в мс

      } else {
        // Ошибка покупки
        updateWithdrawalStatus(requestId, 'failed', {
          error: response.error || 'Не удалось приобрести предмет'
        });
        playCS2Sound('roll_tick', 0.4);
      }

    } catch (error) {
      console.error('Withdrawal failed:', error);
      updateWithdrawalStatus(requestId, 'failed', {
        error: 'Произошла системная ошибка'
      });
      playCS2Sound('roll_tick', 0.4);
    } finally {
      setIsProcessing(false);
      setShowWithdrawalDialog(false);
    }
  };

  // Обновляем статус заявки
  const updateWithdrawalStatus = (
    requestId: string, 
    status: WithdrawalRequest['status'], 
    data?: Partial<WithdrawalRequest>
  ) => {
    setWithdrawalRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status, ...data }
        : req
    ));
  };

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

  const completedRequests = withdrawalRequests.filter(req => req.status === 'completed').length;
  const totalValue = withdrawalRequests
    .filter(req => req.status === 'completed')
    .reduce((sum, req) => sum + req.item.value, 0);

  return (
    <div className="space-y-6">
      {/* Статистика */}
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

      {/* Активные заявки */}
      {withdrawalRequests.length > 0 && (
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
      )}

      {/* Инвентарь для вывода */}
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
                  onClick={() => handleStartWithdrawal(item)}
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

      {/* Диалог вывода */}
      <Dialog open={showWithdrawalDialog} onOpenChange={setShowWithdrawalDialog}>
        <DialogContent className="bg-space-deep border-space-purple/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Icon name="Send" />
              <span>Вывод скина</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6">
              {/* Информация о скине */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-1">{selectedItem.name}</h3>
                <Badge className={`${rarityColors[selectedItem.rarity]} text-white`}>
                  {rarityNames[selectedItem.rarity]}
                </Badge>
                <div className="text-space-gold font-bold mt-2">
                  {selectedItem.value.toLocaleString()}₽
                </div>
              </div>

              {/* Настройки вывода */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="steamId" className="text-sm text-space-cyan">
                    Steam ID
                  </Label>
                  <Input
                    id="steamId"
                    value={steamId}
                    onChange={(e) => setSteamId(e.target.value)}
                    placeholder="76561198000000000"
                    className="mt-1 bg-space-dark border-space-purple/30"
                  />
                </div>

                <div>
                  <Label htmlFor="tradeUrl" className="text-sm text-space-cyan">
                    Trade URL
                  </Label>
                  <Input
                    id="tradeUrl"
                    value={tradeUrl}
                    onChange={(e) => setTradeUrl(e.target.value)}
                    placeholder="https://steamcommunity.com/tradeoffer/new/..."
                    className="mt-1 bg-space-dark border-space-purple/30"
                  />
                </div>
              </div>

              {/* Рыночные цены */}
              {isLoadingPrices ? (
                <div className="text-center py-4">
                  <Icon name="Loader" className="animate-spin mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Загружаем цены...</p>
                </div>
              ) : marketPrices.length > 0 ? (
                <div className="space-y-2">
                  <Label className="text-sm text-space-cyan">Цены на площадках:</Label>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {marketPrices.slice(0, 3).map((price, index) => (
                      <div key={index} className="flex justify-between text-sm p-2 bg-space-dark/30 rounded">
                        <span className="text-gray-300">Площадка {index + 1}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-space-gold font-bold">
                            {price.currentPrice.toLocaleString()}₽
                          </span>
                          <Badge className={
                            price.availability === 'available' ? 'bg-green-500' :
                            price.availability === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
                          }>
                            {price.availability === 'available' ? 'Есть' :
                             price.availability === 'limited' ? 'Мало' : 'Нет'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Предупреждения */}
              <Alert className="border-space-purple/30 bg-space-dark/30">
                <Icon name="Info" className="h-4 w-4" />
                <AlertDescription className="text-sm text-gray-300">
                  Скин будет куплен на торговой площадке и отправлен на ваш Trade URL. 
                  Время доставки: 5-30 минут.
                </AlertDescription>
              </Alert>

              {/* Кнопки действий */}
              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowWithdrawalDialog(false)}
                  variant="outline"
                  className="flex-1 border-space-purple/30"
                  disabled={isProcessing}
                >
                  Отмена
                </Button>
                <Button
                  onClick={executeWithdrawal}
                  disabled={!isValidUserData() || isProcessing}
                  className="flex-1 bg-space-purple hover:bg-space-purple/80"
                >
                  {isProcessing ? (
                    <>
                      <Icon name="Loader" className="animate-spin mr-2 w-4 h-4" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="mr-2 w-4 h-4" />
                      Вывести
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkinWithdrawal;