import { Tabs, TabsContent } from '@/components/ui/tabs';
import UserInventory from '@/components/cs2/UserInventory';
import SkinWithdrawal from '@/components/cs2/SkinWithdrawal';
import { playCS2Sound } from '@/components/cs2/CS2SoundManager';

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

interface InventoryLogicProps {
  userInventory: InventoryItem[];
  userBalance: number;
  onInventoryChange: (inventory: InventoryItem[]) => void;
  onBalanceChange: (balance: number) => void;
}

const InventoryLogic = ({ 
  userInventory, 
  userBalance, 
  onInventoryChange, 
  onBalanceChange 
}: InventoryLogicProps) => {
  
  const handleSellItem = (item: InventoryItem) => {
    onInventoryChange(userInventory.filter(invItem => invItem.id !== item.id));
    onBalanceChange(userBalance + item.value);
    playCS2Sound('item_drop', 0.5);
  };

  const handleWithdrawToSteam = (item: InventoryItem) => {
    const withdrawTab = document.querySelector('[value="withdraw"]') as HTMLElement;
    withdrawTab?.click();
  };

  const handleWithdraw = (item: InventoryItem) => {
    onInventoryChange(userInventory.filter(invItem => invItem.id !== item.id));
    playCS2Sound('case_unlock', 0.6);
  };

  return (
    <>
      <TabsContent value="inventory">
        <UserInventory 
          inventory={userInventory} 
          onSellItem={handleSellItem}
          onWithdrawItem={handleWithdrawToSteam}
        />
      </TabsContent>

      <TabsContent value="withdraw">
        <SkinWithdrawal 
          inventory={userInventory}
          onWithdraw={handleWithdraw}
        />
      </TabsContent>
    </>
  );
};

export default InventoryLogic;