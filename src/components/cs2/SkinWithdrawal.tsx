import { useState, useEffect } from 'react';
import { playCS2Sound } from './CS2SoundManager';
import { 
  tradingAPI, 
  formatSkinName, 
  type SkinPurchaseRequest,
  type SkinPurchaseResponse,
  type MarketPrice
} from '@/services/tradingAPI';

// Import декомпозированных компонентов
import WithdrawalStats from './WithdrawalStats';
import ActiveWithdrawals from './ActiveWithdrawals';
import WithdrawalDialog from './WithdrawalDialog';
import InventoryGrid from './InventoryGrid';

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

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <WithdrawalStats 
        withdrawalRequests={withdrawalRequests}
        inventory={inventory}
      />

      {/* Активные заявки */}
      <ActiveWithdrawals withdrawalRequests={withdrawalRequests} />

      {/* Инвентарь для вывода */}
      <InventoryGrid 
        inventory={inventory}
        onStartWithdrawal={handleStartWithdrawal}
      />

      {/* Диалог вывода */}
      <WithdrawalDialog
        open={showWithdrawalDialog}
        onOpenChange={setShowWithdrawalDialog}
        selectedItem={selectedItem}
        tradeUrl={tradeUrl}
        setTradeUrl={setTradeUrl}
        steamId={steamId}
        setSteamId={setSteamId}
        marketPrices={marketPrices}
        isLoadingPrices={isLoadingPrices}
        isProcessing={isProcessing}
        isValidUserData={isValidUserData}
        onExecuteWithdrawal={executeWithdrawal}
      />
    </div>
  );
};

export default SkinWithdrawal;