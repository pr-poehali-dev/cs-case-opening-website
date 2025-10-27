import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Header from '@/components/cs2/Header';
import BackgroundEffects from '@/components/cs2/BackgroundEffects';
import CaseOpeningLogic from '@/components/cs2/CaseOpeningLogic';
import InventoryLogic from '@/components/cs2/InventoryLogic';
import MultiplierSkinUpgrade from '@/components/cs2/MultiplierSkinUpgrade';
import CaseBattle from '@/components/cs2/CaseBattle';

interface CaseItem {
  id?: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
  chance: number;
  isWinner?: boolean;
}

interface CaseData {
  id: number;
  name: string;
  price: number;
  image: string;
  rarity: string;
  items: CaseItem[];
}

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'ancient';
  value: number;
}

const Index = () => {
  const [userBalance, setUserBalance] = useState(500000);
  const [userInventory, setUserInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'AK-47 | Nebula Storm', rarity: 'rare', value: 6700, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
    { id: 2, name: 'AWP | Cosmic Dragon', rarity: 'legendary', value: 15600, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
    { id: 3, name: 'Glock-18 | Stardust', rarity: 'common', value: 2300, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' }
  ]);

  const cases: CaseData[] = [
    {
      id: 1,
      name: 'Budget Case',
      price: 50,
      image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg',
      rarity: 'common',
      items: [
        { name: 'P250 | Sand Dune', rarity: 'common', chance: 35.0, value: 50, image: '/img/236b445b-e695-4fe7-b87e-901eb42931cc.jpg' },
        { name: 'Glock-18 | Sand Dune', rarity: 'common', chance: 30.0, value: 450, image: '/img/2331b718-3961-4507-a01a-516fd5f4dd17.jpg' },
        { name: 'MP9 | Sand Dashed', rarity: 'common', chance: 20.0, value: 280, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FABz7P7YKAJF4N27mL-HnvD8J_WDxT8AuMEg3b2VrNvxigXj-kVsYDz6I4WQIwE8MAnT_AW9w-3xxcjr7i_Bt2k' },
        { name: 'UMP-45 | Mudder', rarity: 'uncommon', chance: 10.0, value: 820, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3YjoXuY-0mL-Zkvb4DL7VqWNU6dNoxO2Z8Ij0m1Hj_UU-YWqgctScJgRsZ1DR81LsxObxxcjrh7iB6ww' },
        { name: 'Galil AR | Sandstorm', rarity: 'uncommon', chance: 4.0, value: 1560, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDLFIhGJU4MBpmOTI8LP6jgTl-hI5YWv6JoKWcQ9sY1zR8gTtlbrxxcjrUGFNOp8' },
        { name: 'M4A1-S | Boreal Forest', rarity: 'rare', chance: 0.8, value: 4500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOmjb-LmsrwO67VhWpU6dNoxO2Z8Ij0m1Hj_UU-YWqgctScJgRsZ1DR81LsxObxxcjrh7iB6ww' },
        { name: 'AK-47 | Safari Mesh', rarity: 'rare', chance: 0.2, value: 7500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09m7hoO0mvLwOq7c2D8J6sYg2bmQrI2t2AThrhY5MGynLYKSJwQ9Y1nW8gK4xefxxcjrrsyTrJU' }
      ]
    },
    {
      id: 2,
      name: 'Standard Case',
      price: 250,
      image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg',
      rarity: 'uncommon',
      items: [
        { name: 'M4A4 | Desert-Strike', rarity: 'common', chance: 25.0, value: 850, image: '/img/a36abddd-10b2-4164-807c-a388a3db3e42.jpg' },
        { name: 'AK-47 | Blue Laminate', rarity: 'common', chance: 20.0, value: 2500, image: '/img/6d75fe2e-90c6-40ae-b546-bbbd9517fdad.jpg' },
        { name: 'AWP | Worm God', rarity: 'uncommon', chance: 18.0, value: 4200, image: '/img/aca5cd59-01d6-45c4-9a28-858907242d7c.jpg' },
        { name: 'M4A1-S | Guardian', rarity: 'uncommon', chance: 15.0, value: 6500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-LmufhjKnFl2xU7cNo2L3ApYj03Qy2rko-YmihJI6SdgI8N1CD_VG9w7q-jcC7tMvIzydlviEjsHjZgVXp1kFj_Fto' },
        { name: 'AK-47 | Redline', rarity: 'rare', chance: 15.0, value: 10200, image: '/img/d9b4799f-9ddb-4e07-8128-aa9174b80231.jpg' },
        { name: 'AWP | Graphite', rarity: 'rare', chance: 5.0, value: 18500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTZk2pH_Pp9g-7J4bP5iUazrl1rN2HwdtWTcgJvZAyC8lK5yLrng5G76pTAzSFiuyV3snvD30vgwFX3Voc' },
        { name: 'AK-47 | Vulcan', rarity: 'legendary', chance: 1.8, value: 40000, image: '/img/0f8e56ef-15e3-4d26-83ce-251dd48aa2ab.jpg' },
        { name: 'AK-47 | Fire Serpent', rarity: 'legendary', chance: 0.2, value: 172000, image: '/img/a72ff8d4-ef6e-4a7d-9df8-17a65ce9895c.jpg' }
      ]
    },
    {
      id: 3,
      name: 'Premium Case',
      price: 2500,
      image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg',
      rarity: 'rare',
      items: [
        { name: 'AK-47 | Redline FT', rarity: 'common', chance: 22.0, value: 10200, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08-jhIWZlP_1IbzVqWdY781lxOyZpI-s3QXg-kBrMG71LdWRdlQ4Z13X8gK4wejxxcjrp8hxGyQ' },
        { name: 'M4A4 | Asiimov FT', rarity: 'uncommon', chance: 18.0, value: 28500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzE893w2gXirUdrMT_wctSSJwE8aV_Z_wS4kuvxxcjrvMuayiAysyF2s2HSgVXp1uqCDKdY' },
        { name: 'AK-47 | Vulcan FT', rarity: 'uncommon', chance: 15.0, value: 45000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0rCXoNuniAK3-0Y5ZmygJoTGJwA3Zg6D-gW6xurxxcjrKKtxmw' },
        { name: 'AWP | Lightning Strike FN', rarity: 'rare', chance: 12.0, value: 78000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTck3lu5MB0mOTE8YjyjQ3i-kVqMG3zdYbBdwVtM1DTrAC3w-3xxcjrQyqAHTY' },
        { name: 'M4A1-S | Knight FN', rarity: 'rare', chance: 8.0, value: 125000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2L6So4v33AbkrUpuYT_7JYXHJAU-ZFzTrlO2lebxxcjrt54hOhk' },
        { name: 'AK-47 | Case Hardened MW', rarity: 'rare', chance: 6.0, value: 168000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0r2R84mjjgzirBBoZGv2IYSTdlc5MgrQ8lW9wOrxxcjrjW_L5g' },
        { name: 'AK-47 | Fire Serpent FT', rarity: 'legendary', chance: 3.5, value: 172000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0r2R84mgig7mrElqZG3wI9LBdVI-Y16C-Va4xr_rhJLvtcubm3c17yF0tHfUl0fmhUkaarcI0KHYFQ3QKw' },
        { name: 'M4A4 | Howl FT', rarity: 'legendary', chance: 2.0, value: 385000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzE893w2gXirUdrMT_wctSSJwE8aV_Z_wS4kuvxxcjrvMuayiAysyF2s2HSgVXp1uqCDKdY' },
        { name: 'AWP | Dragon Lore FT', rarity: 'ancient', chance: 0.5, value: 980000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJS-tZuYzSdjuidw4C7cygv33088X8Wh0Q' }
      ]
    },
    {
      id: 4,
      name: 'Diamond Case',
      price: 10000,
      image: '/img/0f8e56ef-15e3-4d26-83ce-251dd48aa2ab.jpg',
      rarity: 'legendary',
      items: [
        { name: 'AK-47 | Vulcan FN', rarity: 'common', chance: 20.0, value: 95000, image: '/img/0f8e56ef-15e3-4d26-83ce-251dd48aa2ab.jpg' },
        { name: 'M4A4 | Asiimov FT', rarity: 'common', chance: 18.0, value: 82000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzE893w2gXirUdrMT_wctSSJwE8aV_Z_wS4kuvxxcjrvMuayiAysyF2s2HSgVXp1uqCDKdY' },
        { name: 'AWP | Lightning Strike FN', rarity: 'uncommon', chance: 16.0, value: 115000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTck3lu5MB0mOTE8YjyjQ3i-kVqMG3zdYbBdwVtM1DTrAC3w-3xxcjrQyqAHTY' },
        { name: 'M4A1-S | Knight FN', rarity: 'uncommon', chance: 14.0, value: 168000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2L6So4v33AbkrUpuYT_7JYXHJAU-ZFzTrlO2lebxxcjrt54hOhk' },
        { name: 'AK-47 | Fire Serpent MW', rarity: 'rare', chance: 12.0, value: 285000, image: '/img/a72ff8d4-ef6e-4a7d-9df8-17a65ce9895c.jpg' },
        { name: 'M4A4 | Howl FT', rarity: 'rare', chance: 8.0, value: 425000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzE893w2gXirUdrMT_wctSSJwE8aV_Z_wS4kuvxxcjrvMuayiAysyF2s2HSgVXp1uqCDKdY' },
        { name: 'AWP | Dragon Lore FT', rarity: 'legendary', chance: 6.0, value: 1050000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJS-tZuYzSdjuidw4C7cygv33088X8Wh0Q' },
        { name: 'Karambit | Doppler FN', rarity: 'legendary', chance: 4.0, value: 1250000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmhJKbluXLP7LWnn8fvpIi2LzFrNmsiQbkqRdvZGDyJNSScgA3Y1GE-wC8yejxxcjrPRIuRFo' },
        { name: 'AWP | Dragon Lore FN', rarity: 'ancient', chance: 2.0, value: 2800000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJS-tZuYzSdjuidw4C7cygv330884aMZ0Q' }
      ]
    },
    {
      id: 5,
      name: 'Elite Case',
      price: 50000,
      image: '/img/a72ff8d4-ef6e-4a7d-9df8-17a65ce9895c.jpg',
      rarity: 'ancient',
      items: [
        { name: 'AK-47 | Fire Serpent MW', rarity: 'common', chance: 22.0, value: 320000, image: '/img/a72ff8d4-ef6e-4a7d-9df8-17a65ce9895c.jpg' },
        { name: 'M4A4 | Howl MW', rarity: 'common', chance: 18.0, value: 650000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LyW99nxjFfj_kA5ZmHwIofDdVNqNFzY8wS7le-9m9bi65qFx8Mb' },
        { name: 'AWP | Dragon Lore FT', rarity: 'uncommon', chance: 16.0, value: 1150000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJS-tZuYzSdjuidw4C7cygv33088X8Wh0Q' },
        { name: 'Karambit | Doppler FN', rarity: 'uncommon', chance: 14.0, value: 1400000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmhJKbluXLP7LWnn8fvpIi2LzFrNmsiQbkqRdvZGDyJNSScgA3Y1GE-wC8yejxxcjrPRIuRFo' },
        { name: 'AWP | Gungnir FT', rarity: 'rare', chance: 12.0, value: 2200000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q5aO2bTLIb_ummJW4NE_2r3H89Sj2FXnrktrNWGnLYGRdwQ3YwmC-Qe-yL-71sC0uZydn3E2vykqsCuPzxW1hU0fasZOhfbOVxzAUe7-1Bc' },
        { name: 'AWP | Dragon Lore MW', rarity: 'rare', chance: 8.0, value: 2750000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJS-tZuYzSc2vyd2sn3ZyQv33086IuWBRA' },
        { name: 'AWP | Dragon Lore FN', rarity: 'legendary', chance: 5.0, value: 3200000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJS-tZuYzSdjuidw4C7cygv330884aMZ0Q' },
        { name: 'Karambit | Crimson Web FN', rarity: 'legendary', chance: 3.5, value: 4800000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmgIGZnuTgDLfYkWNF18l4jeHVyoHwjVWx-0Q_MGH0LdXGJwNrYgqGq1C-366x0p63sBT0' },
        { name: 'M4A4 | Howl FN', rarity: 'ancient', chance: 1.5, value: 6500000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LyWrNv00FfkqBBrZmnxIdPEcg9oZlyE-1G6wujxxcjr6TYqeSI' }
      ]
    }
  ];

  const handleUpgrade = (item: InventoryItem, targetRarity: string, cost: number) => {
    setUserInventory(prev => prev.filter(invItem => invItem.id !== item.id));
    
    const rarityMultipliers = {
      uncommon: 1.5,
      rare: 3.0,
      legendary: 6.0,
      ancient: 12.0
    };
    
    const newValue = Math.round(item.value * rarityMultipliers[targetRarity as keyof typeof rarityMultipliers]);
    const rarityNames = {
      uncommon: 'Необычный',
      rare: 'Редкий', 
      legendary: 'Легендарный',
      ancient: 'Древний'
    };
    
    const upgradedItem: InventoryItem = {
      ...item,
      id: Date.now(),
      rarity: targetRarity as any,
      value: newValue,
      name: item.name.replace(/\s+\(.*?\)$/, '') + ` (${rarityNames[targetRarity as keyof typeof rarityNames]})`
    };
    
    setUserInventory(prev => [upgradedItem, ...prev]);
  };

  return (
    <div className="min-h-screen bg-space-dark text-white relative overflow-hidden" style={{fontFamily: 'Rajdhani, sans-serif'}}>
      <BackgroundEffects />
      
      <Header 
        userBalance={userBalance}
        onBalanceChange={setUserBalance}
      />

      <main className="relative z-10 max-w-7xl mx-auto p-6">
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-space-deep/50 border-space-purple/30">
            <TabsTrigger value="cases" className="data-[state=active]:bg-space-purple">
              <Icon name="Package" className="mr-2" />
              Кейсы
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-space-purple">
              <Icon name="Backpack" className="mr-2" />
              Инвентарь
            </TabsTrigger>
            <TabsTrigger value="battle" className="data-[state=active]:bg-space-purple">
              <Icon name="Swords" className="mr-2" />
              Батл
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="data-[state=active]:bg-space-purple">
              <Icon name="TrendingUp" className="mr-2" />
              Апгрейд
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="data-[state=active]:bg-space-purple">
              <Icon name="Send" className="mr-2" />
              Вывод
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases">
            <CaseOpeningLogic 
              cases={cases}
              userBalance={userBalance}
              userInventory={userInventory}
              onBalanceChange={setUserBalance}
              onInventoryChange={setUserInventory}
            />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryLogic 
              userInventory={userInventory}
              userBalance={userBalance}
              onInventoryChange={setUserInventory}
              onBalanceChange={setUserBalance}
            />
          </TabsContent>

          <TabsContent value="battle">
            <CaseBattle 
              inventory={userInventory}
              balance={userBalance}
              onBalanceChange={setUserBalance}
              onInventoryChange={setUserInventory}
            />
          </TabsContent>

          <TabsContent value="upgrade">
            <MultiplierSkinUpgrade 
              inventory={userInventory}
              balance={userBalance}
              onBalanceChange={setUserBalance}
              onInventoryChange={setUserInventory}
            />
          </TabsContent>

          <TabsContent value="withdraw">
            <div className="text-center py-20">
              <Icon name="Construction" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">В разработке</h3>
              <p className="text-muted-foreground">Функция вывода скоро будет доступна</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;