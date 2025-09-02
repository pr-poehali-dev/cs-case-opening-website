import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
  chance: number;
}

interface CaseData {
  id: string;
  name: string;
  price: number;
  image: string;
  items: CaseItem[];
}

interface CaseSelectorProps {
  cases: CaseData[];
  selectedCase: CaseData;
  onCaseSelect: (caseData: CaseData) => void;
  onOpenCase: () => void;
  balance: number;
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

export default function CaseSelector({ 
  cases, 
  selectedCase, 
  onCaseSelect, 
  onOpenCase, 
  balance 
}: CaseSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Available Cases */}
      <Card className="bg-space-dark/50 border-space-purple/30">
        <CardHeader>
          <CardTitle className="text-space-purple text-xl flex items-center">
            <Icon name="Package" className="mr-2" />
            Доступные кейсы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseData) => (
              <Card 
                key={caseData.id} 
                className={`bg-space-deep/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-space-purple/20 hover:scale-105 ${
                  selectedCase.id === caseData.id ? 'border-space-purple shadow-space-purple/30' : 'border-space-purple/30'
                }`}
                onClick={() => onCaseSelect(caseData)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-lg mb-4 overflow-hidden relative">
                    <img 
                      src={caseData.image} 
                      alt={caseData.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="bg-space-gold text-black px-2 py-1 rounded text-xs font-bold">
                        {caseData.price}₽
                      </div>
                    </div>
                    {selectedCase.id === caseData.id && (
                      <div className="absolute inset-0 bg-space-purple/20 flex items-center justify-center">
                        <Icon name="Check" className="text-space-purple text-3xl" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{caseData.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-space-cyan text-sm">{caseData.items.length} предметов</span>
                    <span className="text-space-gold font-bold">{caseData.price}₽</span>
                  </div>

                  {/* Best Items Preview */}
                  <div className="flex gap-1 mb-3">
                    {caseData.items
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 4)
                      .map((item, idx) => (
                        <div key={idx} className="w-8 h-8 rounded border overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    }
                    {caseData.items.length > 4 && (
                      <div className="w-8 h-8 rounded border bg-space-deep/50 flex items-center justify-center text-xs text-gray-400">
                        +{caseData.items.length - 4}
                      </div>
                    )}
                  </div>

                  <Button 
                    className={`w-full ${
                      selectedCase.id === caseData.id 
                        ? 'bg-gradient-to-r from-space-purple to-space-cyan' 
                        : 'bg-space-purple'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCaseSelect(caseData);
                    }}
                  >
                    {selectedCase.id === caseData.id ? 'Выбрано ✓' : 'Выбрать'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Case Details */}
      <Card className="bg-space-dark/50 border-space-cyan/30">
        <CardHeader>
          <CardTitle className="text-space-cyan text-xl flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="Eye" className="mr-2" />
              Содержимое: {selectedCase.name}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-space-cyan text-space-cyan hover:bg-space-cyan/10">
                  Показать все предметы
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl bg-space-dark border-space-purple">
                <DialogHeader>
                  <DialogTitle className="text-space-purple text-xl">{selectedCase.name} - Все предметы</DialogTitle>
                </DialogHeader>
                <div className="max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {selectedCase.items.map((item, idx) => (
                      <div key={idx} className={`bg-space-deep/30 rounded-lg border-2 ${
                        item.rarity === 'ancient' ? 'border-red-500' :
                        item.rarity === 'legendary' ? 'border-space-purple' :
                        item.rarity === 'rare' ? 'border-space-cyan' :
                        item.rarity === 'uncommon' ? 'border-blue-400' : 'border-gray-400'
                      }`}>
                        <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-lg mb-3 overflow-hidden relative">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <div className={`w-3 h-3 rounded-full ${getRarityBg(item.rarity)} animate-pulse`}></div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <div className="text-space-gold font-bold text-sm bg-black/50 rounded px-2 py-1">{item.chance}%</div>
                          </div>
                        </div>
                        <h4 className="text-white font-semibold text-sm mb-2 px-2">{item.name}</h4>
                        <div className="flex items-center justify-between px-2 pb-2">
                          <Badge className={`${
                            item.rarity === 'ancient' ? 'bg-red-500' :
                            item.rarity === 'legendary' ? 'bg-space-purple' :
                            item.rarity === 'rare' ? 'bg-space-cyan' :
                            item.rarity === 'uncommon' ? 'bg-blue-400' : 'bg-gray-400'
                          } text-white text-xs`}>
                            {item.rarity === 'ancient' ? 'Древний' :
                             item.rarity === 'legendary' ? 'Легендарный' :
                             item.rarity === 'rare' ? 'Редкий' : 
                             item.rarity === 'uncommon' ? 'Необычный' : 'Обычный'}
                          </Badge>
                          <div className="text-space-gold font-bold">{item.value.toLocaleString()}₽</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Top 6 Items Preview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {selectedCase.items
              .sort((a, b) => b.value - a.value)
              .slice(0, 6)
              .map((item, idx) => (
                <div key={idx} className={`bg-space-deep/30 rounded-lg border-2 ${
                  item.rarity === 'ancient' ? 'border-red-500' :
                  item.rarity === 'legendary' ? 'border-space-purple' :
                  item.rarity === 'rare' ? 'border-space-cyan' :
                  item.rarity === 'uncommon' ? 'border-blue-400' : 'border-gray-400'
                } hover:scale-105 transition-transform duration-200`}>
                  <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-lg mb-2 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 right-1">
                      <div className={`w-2 h-2 rounded-full ${getRarityBg(item.rarity)}`}></div>
                    </div>
                    <div className="absolute top-1 left-1">
                      <div className="text-space-gold font-bold text-xs bg-black/70 rounded px-1">{item.chance}%</div>
                    </div>
                  </div>
                  <div className="px-2 pb-2">
                    <h4 className="text-white font-semibold text-xs mb-1 truncate">{item.name}</h4>
                    <div className="text-space-gold font-bold text-xs">{item.value.toLocaleString()}₽</div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Open Case Button */}
          <div className="text-center">
            <Button 
              onClick={onOpenCase}
              disabled={balance < selectedCase.price}
              className="bg-gradient-to-r from-space-purple to-space-cyan text-white font-bold py-4 px-8 text-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {balance >= selectedCase.price ? (
                <>
                  <Icon name="Package" className="mr-2" />
                  Открыть кейс за {selectedCase.price}₽
                </>
              ) : (
                <>
                  <Icon name="AlertCircle" className="mr-2" />
                  Недостаточно средств
                </>
              )}
            </Button>
            {balance < selectedCase.price && (
              <p className="text-red-400 text-sm mt-2">
                Нужно еще {(selectedCase.price - balance).toLocaleString()}₽
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}