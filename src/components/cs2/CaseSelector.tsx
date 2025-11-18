import React from 'react';
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
  onOpenCase: (count: number) => void;
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
  const [openCount, setOpenCount] = React.useState(1);
  const maxOpens = Math.min(10, Math.floor(balance / selectedCase.price));

  const handleIncrement = () => {
    if (openCount < maxOpens) setOpenCount(openCount + 1);
  };

  const handleDecrement = () => {
    if (openCount > 1) setOpenCount(openCount - 1);
  };

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

                  <Button 
                    className="w-full bg-gradient-to-r from-space-purple to-space-cyan hover:opacity-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCaseSelect(caseData);
                      onOpenCase(1);
                    }}
                  >
                    Открыть кейс
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}