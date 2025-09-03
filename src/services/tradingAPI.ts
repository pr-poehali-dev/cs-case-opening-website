// API сервис для работы с торговыми площадками CS:GO/CS2
export interface SkinPurchaseRequest {
  skinName: string;
  marketHashName: string;
  maxPrice: number;
  userSteamID: string;
  userTradeURL: string;
}

export interface SkinPurchaseResponse {
  success: boolean;
  transactionId?: string;
  estimatedDeliveryTime?: number; // в минутах
  actualPrice?: number;
  error?: string;
  retryAfter?: number; // секунды до повторной попытки
}

export interface MarketPrice {
  skinName: string;
  currentPrice: number;
  currency: string;
  availability: 'available' | 'limited' | 'unavailable';
  estimatedDeliveryTime: number;
}

// Конфигурация торговых площадок
const TRADING_PLATFORMS = {
  STEAM_MARKET: {
    name: 'Steam Community Market',
    baseUrl: 'https://steamcommunity.com/market',
    apiKey: process.env.STEAM_API_KEY || '',
    priority: 1
  },
  SKINPORT: {
    name: 'Skinport',
    baseUrl: 'https://api.skinport.com',
    apiKey: process.env.SKINPORT_API_KEY || '',
    priority: 2
  },
  BITSKINS: {
    name: 'BitSkins',
    baseUrl: 'https://api.bitskins.com',
    apiKey: process.env.BITSKINS_API_KEY || '',
    priority: 3
  },
  CSMONEY: {
    name: 'CS.MONEY',
    baseUrl: 'https://api.cs.money',
    apiKey: process.env.CSMONEY_API_KEY || '',
    priority: 4
  }
};

class TradingAPIService {
  private readonly platforms = TRADING_PLATFORMS;

  /**
   * Получает текущие цены скина на разных площадках
   */
  async getMarketPrices(skinName: string, marketHashName: string): Promise<MarketPrice[]> {
    try {
      const promises = [
        this.getSteamMarketPrice(marketHashName),
        this.getSkinportPrice(marketHashName),
        this.getBitSkinsPrice(marketHashName),
        this.getCSMoneyPrice(marketHashName)
      ];

      const results = await Promise.allSettled(promises);
      const prices: MarketPrice[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          prices.push({
            skinName,
            ...result.value
          });
        }
      });

      // Сортируем по цене (от меньшей к большей)
      return prices.sort((a, b) => a.currentPrice - b.currentPrice);
    } catch (error) {
      console.error('Error fetching market prices:', error);
      return [];
    }
  }

  /**
   * Покупает скин на лучшей доступной площадке
   */
  async purchaseSkin(request: SkinPurchaseRequest): Promise<SkinPurchaseResponse> {
    try {
      // Сначала получаем актуальные цены
      const marketPrices = await this.getMarketPrices(request.skinName, request.marketHashName);
      
      if (marketPrices.length === 0) {
        return {
          success: false,
          error: 'Скин не найден ни на одной площадке'
        };
      }

      // Фильтруем по максимальной цене и доступности
      const affordablePrices = marketPrices.filter(
        price => price.currentPrice <= request.maxPrice && price.availability === 'available'
      );

      if (affordablePrices.length === 0) {
        const cheapestPrice = Math.min(...marketPrices.map(p => p.currentPrice));
        return {
          success: false,
          error: `Скин недоступен по указанной цене. Минимальная цена: ${cheapestPrice}₽`
        };
      }

      // Выбираем самое дешевое предложение
      const bestOffer = affordablePrices[0];

      // В зависимости от площадки выполняем покупку
      if (bestOffer.currentPrice <= request.maxPrice) {
        return await this.executePurchase(request, bestOffer);
      }

      return {
        success: false,
        error: 'Не удалось найти подходящее предложение'
      };

    } catch (error) {
      console.error('Error purchasing skin:', error);
      return {
        success: false,
        error: 'Произошла ошибка при покупке скина'
      };
    }
  }

  /**
   * Выполняет покупку на конкретной площадке
   */
  private async executePurchase(
    request: SkinPurchaseRequest, 
    bestOffer: MarketPrice
  ): Promise<SkinPurchaseResponse> {
    
    // Симуляция API запроса к торговой площадке
    // В реальном приложении здесь будут настоящие API вызовы
    
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Здесь должен быть реальный API запрос к торговой площадке
      const purchaseData = {
        skinName: request.skinName,
        marketHashName: request.marketHashName,
        price: bestOffer.currentPrice,
        buyerSteamId: request.userSteamID,
        tradeUrl: request.userTradeURL,
        transactionId
      };

      // Симуляция успешной покупки
      // В реальности здесь будет HTTP запрос к API площадки
      console.log('Executing purchase:', purchaseData);

      // Симулируем задержку API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Симулируем успешный ответ (90% шанс успеха)
      const isSuccessful = Math.random() > 0.1;

      if (isSuccessful) {
        return {
          success: true,
          transactionId,
          actualPrice: bestOffer.currentPrice,
          estimatedDeliveryTime: bestOffer.estimatedDeliveryTime
        };
      } else {
        return {
          success: false,
          error: 'Предмет был продан другому покупателю',
          retryAfter: 30
        };
      }

    } catch (error) {
      console.error('Purchase execution failed:', error);
      return {
        success: false,
        error: 'Ошибка при выполнении покупки'
      };
    }
  }

  /**
   * Получение цены с Steam Market
   */
  private async getSteamMarketPrice(marketHashName: string): Promise<Partial<MarketPrice> | null> {
    try {
      // В реальном приложении здесь будет запрос к Steam API
      // const response = await fetch(`${this.platforms.STEAM_MARKET.baseUrl}/priceoverview/?appid=730&currency=5&market_hash_name=${encodeURIComponent(marketHashName)}`);
      
      // Симуляция ответа
      const mockPrice = 1000 + Math.random() * 5000;
      return {
        currentPrice: Math.round(mockPrice),
        currency: 'RUB',
        availability: Math.random() > 0.3 ? 'available' : 'limited',
        estimatedDeliveryTime: 5
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Получение цены с Skinport
   */
  private async getSkinportPrice(marketHashName: string): Promise<Partial<MarketPrice> | null> {
    try {
      // В реальном приложении здесь будет запрос к Skinport API
      const mockPrice = 800 + Math.random() * 4000;
      return {
        currentPrice: Math.round(mockPrice),
        currency: 'RUB',
        availability: Math.random() > 0.2 ? 'available' : 'limited',
        estimatedDeliveryTime: 10
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Получение цены с BitSkins
   */
  private async getBitSkinsPrice(marketHashName: string): Promise<Partial<MarketPrice> | null> {
    try {
      // В реальном приложении здесь будет запрос к BitSkins API
      const mockPrice = 900 + Math.random() * 4500;
      return {
        currentPrice: Math.round(mockPrice),
        currency: 'RUB',
        availability: Math.random() > 0.4 ? 'available' : 'unavailable',
        estimatedDeliveryTime: 15
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Получение цены с CS.MONEY
   */
  private async getCSMoneyPrice(marketHashName: string): Promise<Partial<MarketPrice> | null> {
    try {
      // В реальном приложении здесь будет запрос к CS.MONEY API
      const mockPrice = 1100 + Math.random() * 3500;
      return {
        currentPrice: Math.round(mockPrice),
        currency: 'RUB',
        availability: Math.random() > 0.35 ? 'available' : 'limited',
        estimatedDeliveryTime: 20
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Проверяет статус транзакции
   */
  async checkTransactionStatus(transactionId: string): Promise<{
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    deliveryTime?: number;
    error?: string;
  }> {
    try {
      // Симуляция проверки статуса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const statuses: Array<'pending' | 'completed' | 'failed'> = ['pending', 'completed', 'failed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      if (randomStatus === 'pending') {
        return {
          status: 'pending',
          deliveryTime: Math.floor(Math.random() * 30) + 5 // 5-35 минут
        };
      }
      
      if (randomStatus === 'completed') {
        return {
          status: 'completed'
        };
      }
      
      return {
        status: 'failed',
        error: 'Не удалось доставить предмет'
      };
      
    } catch (error) {
      return {
        status: 'failed',
        error: 'Ошибка при проверке статуса'
      };
    }
  }

  /**
   * Получает Steam Trade URL пользователя (mock)
   */
  async getUserTradeURL(steamId: string): Promise<string | null> {
    // В реальном приложении здесь будет получение Trade URL из профиля Steam
    return `https://steamcommunity.com/tradeoffer/new/?partner=${steamId}&token=MOCK_TOKEN`;
  }

  /**
   * Валидирует Steam Trade URL
   */
  validateTradeURL(tradeUrl: string): boolean {
    const tradeUrlPattern = /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[a-zA-Z0-9_-]+$/;
    return tradeUrlPattern.test(tradeUrl);
  }
}

// Экспортируем единственный экземпляр сервиса
export const tradingAPI = new TradingAPIService();

// Вспомогательные функции для работы с API
export const formatSkinName = (name: string): string => {
  // Преобразует название скина в формат для market hash name
  return name.replace(/\s+/g, '%20').replace(/[|]/g, '%7C');
};

export const convertRubToUSD = (rubPrice: number): number => {
  // Примерный курс (в реальном приложении нужно получать актуальный курс)
  return Math.round(rubPrice / 100);
};

export const getDeliveryTimeText = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} мин.`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}ч ${remainingMinutes}м` : `${hours}ч`;
};