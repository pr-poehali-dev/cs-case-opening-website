import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { type MarketPrice } from '@/services/tradingAPI';

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: InventoryItem | null;
  tradeUrl: string;
  setTradeUrl: (url: string) => void;
  steamId: string;
  setSteamId: (id: string) => void;
  marketPrices: MarketPrice[];
  isLoadingPrices: boolean;
  isProcessing: boolean;
  isValidUserData: () => boolean;
  onExecuteWithdrawal: () => void;
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

export default function WithdrawalDialog({
  open,
  onOpenChange,
  selectedItem,
  tradeUrl,
  setTradeUrl,
  steamId,
  setSteamId,
  marketPrices,
  isLoadingPrices,
  isProcessing,
  isValidUserData,
  onExecuteWithdrawal
}: WithdrawalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="flex-1 border-space-purple/30"
                disabled={isProcessing}
              >
                Отмена
              </Button>
              <Button
                onClick={onExecuteWithdrawal}
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
  );
}