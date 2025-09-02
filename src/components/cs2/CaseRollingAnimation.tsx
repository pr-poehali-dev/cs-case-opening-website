import { playCS2Sound } from './CS2SoundManager';

interface CaseItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
  chance: number;
  isWinner?: boolean;
}

interface CaseRollingAnimationProps {
  isRolling: boolean;
  rollingItems: CaseItem[];
  openedItem: CaseItem | null;
  onClose: () => void;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'ancient': return 'from-red-600 to-red-400';
    case 'legendary': return 'from-space-purple to-purple-400';
    case 'rare': return 'from-space-cyan to-cyan-400';
    case 'uncommon': return 'from-blue-500 to-blue-400';
    default: return 'from-gray-500 to-gray-400';
  }
};

const getRarityBg = (rarity: string) => {
  switch (rarity) {
    case 'ancient': return 'bg-red-500';
    case 'legendary': return 'bg-space-purple';
    case 'rare': return 'bg-space-cyan';
    case 'uncommon': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
};

export default function CaseRollingAnimation({ 
  isRolling, 
  rollingItems, 
  openedItem, 
  onClose 
}: CaseRollingAnimationProps) {
  return (
    <div className="fixed inset-0 bg-space-dark/95 backdrop-blur-md flex items-center justify-center z-50">
      <div className="text-center animate-fade-in">
        {isRolling ? (
          <>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent mb-8 animate-pulse">
              Открываем кейс...
            </h3>
            
            {/* Rolling Items Animation */}
            <div className="relative w-[800px] h-40 bg-space-deep/50 rounded-lg border-2 border-space-purple overflow-hidden mb-8">
              {/* Winning Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-space-gold z-10 shadow-lg shadow-space-gold/50"></div>
              
              {/* Items Container */}
              <div className="flex items-center h-full">
                <div className="flex items-center h-full animate-roll">
                  {rollingItems.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-shrink-0 w-32 h-32 mx-2 rounded-lg border-2 bg-gradient-to-br ${getRarityColor(item.rarity)}/20 ${
                        item.rarity === 'ancient' ? 'border-red-500' :
                        item.rarity === 'legendary' ? 'border-space-purple' :
                        item.rarity === 'rare' ? 'border-space-cyan' :
                        item.rarity === 'uncommon' ? 'border-blue-400' : 'border-gray-400'
                      } overflow-hidden relative`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 text-center p-1">
                        <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${getRarityBg(item.rarity)}`}></div>
                        <div className="text-xs text-white truncate">{item.name.split(' ')[0]}</div>
                        <div className="text-xs text-space-gold">{item.value}₽</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-space-cyan animate-bounce text-xl">Определяем победителя...</p>
          </>
        ) : openedItem && (
          <>
            <div className="relative mb-6 animate-stellar-pulse">
              <div className="text-8xl">🎉</div>
              <div className="absolute inset-0 animate-ping delay-300">
                <div className="text-8xl opacity-50">💫</div>
              </div>
            </div>
            <h3 className="text-5xl font-bold bg-gradient-to-r from-space-gold to-space-cyan bg-clip-text text-transparent mb-4">
              Поздравляем!
            </h3>
            <p className="text-2xl text-space-cyan mb-6">Вы получили:</p>
            
            <div className="relative group mb-8">
              <div className={`w-64 h-64 mx-auto rounded-2xl border-4 bg-gradient-to-br ${getRarityColor(openedItem.rarity)}/30 ${
                openedItem.rarity === 'ancient' ? 'border-red-500 shadow-red-500/50' :
                openedItem.rarity === 'legendary' ? 'border-space-purple shadow-space-purple/50' :
                openedItem.rarity === 'rare' ? 'border-space-cyan shadow-space-cyan/50' :
                openedItem.rarity === 'uncommon' ? 'border-blue-400 shadow-blue-400/50' : 'border-gray-400 shadow-gray-400/50'
              } shadow-2xl overflow-hidden animate-stellar-pulse relative`}>
                <img 
                  src={openedItem.image} 
                  alt={openedItem.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className={`w-6 h-6 rounded-full ${getRarityBg(openedItem.rarity)} animate-pulse`}></div>
                </div>
              </div>
            </div>

            <div className="bg-space-deep/30 backdrop-blur-sm rounded-2xl border border-space-purple/30 p-6 mb-8 max-w-md mx-auto">
              <h4 className="text-2xl font-bold text-white mb-2">{openedItem.name}</h4>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  openedItem.rarity === 'ancient' ? 'bg-red-500' :
                  openedItem.rarity === 'legendary' ? 'bg-space-purple' :
                  openedItem.rarity === 'rare' ? 'bg-space-cyan' :
                  openedItem.rarity === 'uncommon' ? 'bg-blue-400' : 'bg-gray-400'
                } text-white`}>
                  {openedItem.rarity === 'ancient' ? 'Древний' :
                   openedItem.rarity === 'legendary' ? 'Легендарный' :
                   openedItem.rarity === 'rare' ? 'Редкий' : 
                   openedItem.rarity === 'uncommon' ? 'Необычный' : 'Обычный'}
                </span>
                <span className="text-3xl font-bold text-space-gold">{openedItem.value.toLocaleString()}₽</span>
              </div>
              <div className="text-sm text-gray-400">
                Шанс выпадения: <span className="text-space-cyan font-semibold">{openedItem.chance}%</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-space-purple to-space-cyan text-white font-bold rounded-lg hover:opacity-80 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Отлично! 🚀
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}