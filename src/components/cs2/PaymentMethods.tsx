import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'wallet' | 'crypto' | 'bank';
  icon: string;
  fee: number; // процент комиссии
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  available: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'visa_mastercard',
    name: 'Visa / MasterCard',
    type: 'card',
    icon: 'CreditCard',
    fee: 3.5,
    minAmount: 100,
    maxAmount: 100000,
    processingTime: 'мгновенно',
    available: true
  },
  {
    id: 'yandex_money',
    name: 'ЮMoney',
    type: 'wallet',
    icon: 'Wallet',
    fee: 2.0,
    minAmount: 50,
    maxAmount: 50000,
    processingTime: 'мгновенно',
    available: true
  },
  {
    id: 'qiwi',
    name: 'QIWI Кошелек',
    type: 'wallet',
    icon: 'Smartphone',
    fee: 2.5,
    minAmount: 100,
    maxAmount: 75000,
    processingTime: 'мгновенно',
    available: true
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin (BTC)',
    type: 'crypto',
    icon: 'Bitcoin',
    fee: 1.0,
    minAmount: 500,
    maxAmount: 500000,
    processingTime: '10-30 мин',
    available: true
  },
  {
    id: 'ethereum',
    name: 'Ethereum (ETH)',
    type: 'crypto',
    icon: 'Zap',
    fee: 1.5,
    minAmount: 300,
    maxAmount: 300000,
    processingTime: '5-15 мин',
    available: true
  },
  {
    id: 'sber',
    name: 'Сбербанк Онлайн',
    type: 'bank',
    icon: 'Building',
    fee: 0,
    minAmount: 100,
    maxAmount: 200000,
    processingTime: '1-3 мин',
    available: true
  }
];

interface PaymentMethodsProps {
  selectedAmount: number;
  onSelectMethod: (method: PaymentMethod, amount: number) => void;
  onCustomAmount: (amount: number) => void;
}

export default function PaymentMethods({ selectedAmount, onSelectMethod, onCustomAmount }: PaymentMethodsProps) {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, ''));
    setCustomAmount(numValue ? numValue.toLocaleString() : '');
    if (numValue && numValue >= 50) {
      onCustomAmount(numValue);
    }
  };

  const getMethodTypeColor = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card': return 'bg-blue-500';
      case 'wallet': return 'bg-green-500';
      case 'crypto': return 'bg-orange-500';
      case 'bank': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getMethodTypeText = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'card': return 'Карта';
      case 'wallet': return 'Кошелек';
      case 'crypto': return 'Крипто';
      case 'bank': return 'Банк';
      default: return 'Другое';
    }
  };

  return (
    <div className="space-y-6">
      {/* Custom Amount Input */}
      <div className="space-y-3">
        <Label className="text-space-cyan font-semibold">Введите сумму</Label>
        <div className="relative">
          <Input
            type="text"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            placeholder="Минимум 50₽"
            className="bg-space-dark border-space-purple/30 text-white pr-8 text-lg"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">₽</span>
        </div>
        
        {customAmount && parseInt(customAmount.replace(/\D/g, '')) < 50 && (
          <p className="text-red-400 text-sm">Минимальная сумма пополнения: 50₽</p>
        )}
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <Label className="text-space-cyan font-semibold">Выберите способ оплаты</Label>
        
        <div className="grid gap-3">
          {paymentMethods.map((method) => {
            const finalAmount = selectedAmount || parseInt(customAmount.replace(/\D/g, '')) || 0;
            const fee = Math.round((finalAmount * method.fee) / 100);
            const totalAmount = finalAmount + fee;
            const isValid = finalAmount >= method.minAmount && finalAmount <= method.maxAmount;
            const isSelected = selectedMethodId === method.id;

            return (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all duration-300 ${
                  !method.available ? 'opacity-50 cursor-not-allowed' :
                  isSelected ? 'border-space-purple bg-space-purple/10' :
                  isValid ? 'hover:border-space-purple/50 border-space-purple/20' :
                  'border-red-500/30 bg-red-500/5'
                } ${isSelected ? 'ring-2 ring-space-purple/50' : ''}`}
                onClick={() => {
                  if (method.available && isValid && finalAmount > 0) {
                    setSelectedMethodId(method.id);
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getMethodTypeColor(method.type)}`}>
                        <Icon name={method.icon as any} className="w-5 h-5 text-white" />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{method.name}</h4>
                          <Badge className={`${getMethodTypeColor(method.type)} text-white text-xs`}>
                            {getMethodTypeText(method.type)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-400">
                            Комиссия: {method.fee}%
                          </span>
                          <span className="text-sm text-space-cyan">
                            {method.processingTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {finalAmount > 0 && isValid ? (
                        <div>
                          <div className="text-sm text-gray-400">
                            К доплате: {fee}₽
                          </div>
                          <div className="font-bold text-space-gold">
                            {totalAmount.toLocaleString()}₽
                          </div>
                        </div>
                      ) : finalAmount > 0 && !isValid ? (
                        <div className="text-red-400 text-sm">
                          {finalAmount < method.minAmount ? 
                            `Мин: ${method.minAmount.toLocaleString()}₽` :
                            `Макс: ${method.maxAmount.toLocaleString()}₽`
                          }
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {isSelected && finalAmount > 0 && isValid && (
                    <div className="mt-4 pt-4 border-t border-space-purple/30">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectMethod(method, finalAmount);
                        }}
                        className="w-full bg-gradient-to-r from-space-purple to-space-pink hover:opacity-80"
                      >
                        <Icon name="ArrowRight" className="mr-2 w-4 h-4" />
                        Пополнить на {totalAmount.toLocaleString()}₽
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-space-dark/50 p-4 rounded-lg border border-space-cyan/30">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" className="text-space-cyan w-5 h-5 mt-0.5" />
          <div>
            <h4 className="text-space-cyan font-semibold text-sm mb-1">Безопасность платежей</h4>
            <div className="text-xs text-gray-400 space-y-1">
              <p>• Все транзакции защищены SSL шифрованием</p>
              <p>• Средства поступают моментально на баланс</p>
              <p>• Возврат средств в течение 24 часов при технических проблемах</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}