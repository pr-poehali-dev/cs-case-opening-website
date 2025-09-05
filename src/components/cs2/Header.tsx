import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import PaymentMethods from '@/components/cs2/PaymentMethods';
import { playCS2Sound } from '@/components/cs2/CS2SoundManager';

interface HeaderProps {
  userBalance: number;
  onBalanceChange: (balance: number) => void;
}

const Header = ({ userBalance, onBalanceChange }: HeaderProps) => {
  const [showTopUpDialog, setShowTopUpDialog] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'amount' | 'method' | 'processing' | 'success'>('amount');

  const handleTopUp = (amount: number) => {
    setTopUpAmount(amount);
    setPaymentStep('method');
  };

  const handlePayment = async (method: any, amount: number) => {
    setIsProcessingPayment(true);
    setPaymentStep('processing');
    playCS2Sound('case_open', 0.4);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      if (Math.random() > 0.05) {
        onBalanceChange(userBalance + amount);
        setPaymentStep('success');
        playCS2Sound('case_unlock', 0.6);
        
        setTimeout(() => {
          setShowTopUpDialog(false);
          setPaymentStep('amount');
          setTopUpAmount(0);
        }, 2000);
      } else {
        throw new Error('Платеж отклонен банком');
      }
    } catch (error) {
      playCS2Sound('roll_tick', 0.4);
      setPaymentStep('amount');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const resetTopUpDialog = () => {
    setShowTopUpDialog(false);
    setPaymentStep('amount');
    setTopUpAmount(0);
    setIsProcessingPayment(false);
  };

  return (
    <>
      <header className="relative z-10 bg-space-dark/80 backdrop-blur-sm border-b border-space-purple/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent">
              🚀 COSMIC CASES
            </div>
            <div className="text-sm text-space-cyan">Межгалактические кейсы CS2</div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Wallet" className="text-space-gold" />
              <span className="text-space-gold font-bold text-lg">{userBalance.toLocaleString()}₽</span>
            </div>
            
            <Button 
              onClick={() => setShowTopUpDialog(true)}
              className="bg-gradient-to-r from-space-purple to-space-pink hover:opacity-80"
            >
              <Icon name="Plus" className="mr-2 w-4 h-4" />
              Пополнить
            </Button>
            
            <Avatar className="border-2 border-space-purple">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback className="bg-space-purple text-white">У</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <Dialog open={showTopUpDialog} onOpenChange={resetTopUpDialog}>
        <DialogContent className="bg-space-deep border-space-purple/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Icon name="Wallet" className="text-space-gold" />
              <span>Пополнить баланс</span>
              {paymentStep !== 'amount' && (
                <Button
                  onClick={() => setPaymentStep('amount')}
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-gray-400 hover:text-white"
                >
                  <Icon name="ArrowLeft" className="w-4 h-4" />
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Текущий баланс</div>
              <div className="text-3xl font-bold text-space-gold mb-4">{userBalance.toLocaleString()}₽</div>
            </div>

            {paymentStep === 'amount' && (
              <>
                <div className="space-y-4">
                  <h4 className="text-space-cyan font-semibold">Быстрый выбор суммы</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[1000, 5000, 10000, 25000, 50000, 100000].map((amount) => (
                      <Button
                        key={amount}
                        onClick={() => handleTopUp(amount)}
                        className="bg-space-purple/20 hover:bg-space-purple/40 border border-space-purple/50 text-white p-4 h-auto flex flex-col"
                      >
                        <div className="text-lg font-bold">+{amount.toLocaleString()}₽</div>
                        <div className="text-xs text-gray-400">
                          {amount >= 50000 ? '🚀 Выгодно' : amount >= 10000 ? '⭐ Популярно' : '💰 Базовый'}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setPaymentStep('method')}
                  className="w-full bg-gradient-to-r from-space-purple to-space-pink hover:opacity-80"
                >
                  <Icon name="CreditCard" className="mr-2 w-4 h-4" />
                  Выбрать способ оплаты
                </Button>
              </>
            )}

            {paymentStep === 'method' && (
              <PaymentMethods
                selectedAmount={topUpAmount}
                onSelectMethod={handlePayment}
                onCustomAmount={setTopUpAmount}
              />
            )}

            {paymentStep === 'processing' && (
              <div className="text-center py-8">
                <div className="animate-spin w-16 h-16 mx-auto mb-4">
                  <Icon name="Loader" className="w-16 h-16 text-space-purple" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Обрабатываем платеж</h3>
                <p className="text-gray-400">Не закрывайте это окно...</p>
                <div className="bg-space-dark/50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-space-cyan">
                    Сумма к зачислению: <span className="font-bold text-space-gold">{topUpAmount.toLocaleString()}₽</span>
                  </p>
                </div>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-3xl font-bold text-space-green mb-2">Платеж успешен!</h3>
                <p className="text-gray-400 mb-4">Средства зачислены на ваш баланс</p>
                <div className="bg-space-green/10 border border-space-green/30 p-4 rounded-lg">
                  <p className="text-space-green font-bold">
                    +{topUpAmount.toLocaleString()}₽ зачислено
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Новый баланс: {userBalance.toLocaleString()}₽
                  </p>
                </div>
              </div>
            )}

            {paymentStep === 'amount' && (
              <div className="flex space-x-3">
                <Button
                  onClick={resetTopUpDialog}
                  variant="outline"
                  className="flex-1 border-space-purple/30 hover:bg-space-purple/20"
                >
                  Отмена
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;