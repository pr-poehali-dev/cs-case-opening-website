// API для обработки платежей
export interface PaymentRequest {
  amount: number;
  method: string;
  userId?: string;
  currency?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  qrCode?: string;
  error?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  estimatedTime?: number; // в минутах
}

export interface PaymentStatus {
  transactionId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  amount: number;
  method: string;
  createdAt: number;
  completedAt?: number;
  error?: string;
}

class PaymentAPI {
  private baseUrl = 'https://api.payments.cosmic-cases.dev';

  // Инициация платежа
  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Симуляция разных сценариев
    const successRate = 0.95; // 95% успешных платежей
    const isSuccess = Math.random() < successRate;

    if (!isSuccess) {
      return {
        success: false,
        status: 'failed',
        error: 'Временные технические проблемы. Попробуйте другой способ оплаты.'
      };
    }

    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    // Разное время обработки для разных методов
    const estimatedTimes: Record<string, number> = {
      'visa_mastercard': 0, // мгновенно
      'yandex_money': 0,
      'qiwi': 1,
      'bitcoin': 15,
      'ethereum': 8,
      'sber': 2
    };

    // Генерация URL или QR кода в зависимости от метода
    let paymentUrl: string | undefined;
    let qrCode: string | undefined;

    if (request.method.includes('crypto')) {
      // Для крипто генерируем адрес кошелька
      const cryptoAddress = request.method === 'bitcoin' ? 
        '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' :
        '0x742d35Cc6634C0532925a3b8D2CF9a1d5C7A4F2e';
      
      qrCode = `crypto:${cryptoAddress}?amount=${request.amount}`;
      paymentUrl = `https://payment.cosmic-cases.dev/crypto/${transactionId}`;
    } else {
      // Для остальных методов - стандартный URL
      paymentUrl = `https://payment.cosmic-cases.dev/pay/${transactionId}`;
    }

    return {
      success: true,
      transactionId,
      paymentUrl,
      qrCode,
      status: 'pending',
      estimatedTime: estimatedTimes[request.method] || 5
    };
  }

  // Проверка статуса платежа
  async checkPaymentStatus(transactionId: string): Promise<PaymentStatus> {
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Симуляция прогресса платежа
    const createdAt = Date.now() - Math.random() * 300000; // создан в последние 5 минут
    const elapsed = Date.now() - createdAt;
    
    // Статусы в зависимости от времени
    let status: PaymentStatus['status'];
    let completedAt: number | undefined;

    if (elapsed < 30000) { // первые 30 секунд
      status = 'pending';
    } else if (elapsed < 120000) { // до 2 минут
      status = 'processing';
    } else if (Math.random() > 0.05) { // 95% успешных
      status = 'completed';
      completedAt = Date.now();
    } else {
      status = 'failed';
    }

    const mockAmount = 1000 + Math.random() * 10000;
    const mockMethod = 'visa_mastercard';

    return {
      transactionId,
      status,
      amount: Math.round(mockAmount),
      method: mockMethod,
      createdAt,
      completedAt,
      error: status === 'failed' ? 'Отклонено банком' : undefined
    };
  }

  // Отмена платежа
  async cancelPayment(transactionId: string): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Симуляция успешной отмены
    if (Math.random() > 0.1) { // 90% успешных отмен
      return { success: true };
    } else {
      return { 
        success: false, 
        error: 'Платеж уже обрабатывается и не может быть отменен' 
      };
    }
  }

  // Получение истории платежей
  async getPaymentHistory(userId?: string): Promise<PaymentStatus[]> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Генерация мок-данных истории
    const history: PaymentStatus[] = [];
    const methods = ['visa_mastercard', 'yandex_money', 'bitcoin', 'sber'];
    
    for (let i = 0; i < 5; i++) {
      const createdAt = Date.now() - Math.random() * 2592000000; // в последний месяц
      const status = Math.random() > 0.1 ? 'completed' : 'failed';
      
      history.push({
        transactionId: `TXN_${Date.now() - i * 1000}_${Math.random().toString(36).substr(2, 6)}`,
        status,
        amount: Math.round(500 + Math.random() * 10000),
        method: methods[Math.floor(Math.random() * methods.length)],
        createdAt,
        completedAt: status === 'completed' ? createdAt + Math.random() * 300000 : undefined,
        error: status === 'failed' ? 'Недостаточно средств' : undefined
      });
    }

    return history.sort((a, b) => b.createdAt - a.createdAt);
  }

  // Валидация суммы платежа
  validateAmount(amount: number, method: string): { valid: boolean; error?: string } {
    const limits: Record<string, { min: number; max: number }> = {
      'visa_mastercard': { min: 100, max: 100000 },
      'yandex_money': { min: 50, max: 50000 },
      'qiwi': { min: 100, max: 75000 },
      'bitcoin': { min: 500, max: 500000 },
      'ethereum': { min: 300, max: 300000 },
      'sber': { min: 100, max: 200000 }
    };

    const limit = limits[method];
    if (!limit) {
      return { valid: false, error: 'Неподдерживаемый метод оплаты' };
    }

    if (amount < limit.min) {
      return { valid: false, error: `Минимальная сумма: ${limit.min}₽` };
    }

    if (amount > limit.max) {
      return { valid: false, error: `Максимальная сумма: ${limit.max.toLocaleString()}₽` };
    }

    return { valid: true };
  }

  // Расчет комиссии
  calculateFee(amount: number, method: string): number {
    const fees: Record<string, number> = {
      'visa_mastercard': 3.5,
      'yandex_money': 2.0,
      'qiwi': 2.5,
      'bitcoin': 1.0,
      'ethereum': 1.5,
      'sber': 0
    };

    const feePercent = fees[method] || 0;
    return Math.round((amount * feePercent) / 100);
  }
}

export const paymentAPI = new PaymentAPI();