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
    },
    {
      id: 6,
      name: 'Starter Case',
      price: 9,
      image: '/img/236b445b-e695-4fe7-b87e-901eb42931cc.jpg',
      rarity: 'common',
      items: [
        { name: 'P2000 | Grassland', rarity: 'common', chance: 40.0, value: 5, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJfAJG7eO1gb-MmsrSlKPCl2hU18h0i_rVyoGniVKxrRZpMDj2d9WRJFdtY17Y_AW9wL_u1JG96YOJlyWfq_7Zlg' },
        { name: 'PP-Bizon | Sand Dashed', rarity: 'common', chance: 30.0, value: 4, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf0Ob3czRY49KJl4GGmMj4MqnVqWZU7Mxkh6fDrNWi2wKwrhA4MGCgctCUcgU6Zg7T_FLowOfxxcjrpVoKaxU' },
        { name: 'FAMAS | Contrast Spray', rarity: 'common', chance: 20.0, value: 8, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0Ob3czRY49KJl5WZkuXLPr7Vn35cpscg2rrA89Wt3Ae3_hJuMDqid4HGJA9vNA7Y8lS4x7i5gsLvtc7LzCQwsiMktGGdwUK_Cxjilw' },
        { name: 'MAG-7 | Sand Dune', rarity: 'uncommon', chance: 6.0, value: 12, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhzw8zSdD9Q7d-3mb-HnvD8J_WDxTsHvJAk3b-XoNig0AHn-UVsZzz6I4LHdwY3YAmC-lS4l-vxxcjrMF4-4vY' },
        { name: 'P250 | Contamination', rarity: 'uncommon', chance: 3.0, value: 18, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS08-6kYGAkvPLP7LWnn8f7sN0i7_Ao9yk21Hi-BJqY2D2LY6Qcw5sYAuBq1noxL27gJft78ycmCE1sCUrtC3fmwv330-R6D1eIQ' },
        { name: 'MP7 | Army Recon', rarity: 'rare', chance: 0.7, value: 28, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFBRw7OfJYTh94863mr-YkvPLPu_Umn5d18l4jeHVyoD0mlOx5UVvZmvwJtWVdAU-YVuD_gS3wr-5m9bi67BxBTm6' },
        { name: 'Glock-18 | Water Elemental BS', rarity: 'rare', chance: 0.3, value: 150, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJkImMn-O6YeDTx2pTvJB1jb7D89-s0Qe2-RZrZG-hJNfEd1c_NF_R-lHolbq-gp-i_MOewv62t04' }
      ]
    },
    {
      id: 7,
      name: 'Rookie Case',
      price: 29,
      image: '/img/2331b718-3961-4507-a01a-516fd5f4dd17.jpg',
      rarity: 'common',
      items: [
        { name: 'Dual Berettas | Colony', rarity: 'common', chance: 35.0, value: 12, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf0Ob3dShD4N6zh4mYnPv3Jr_um2Vf18lwmOzA-LP5gVO8vh4LZiukcZjEcFQ7YQzR-VK5lOi51JO76JTAmHNgvChw5y3D30vgj9kXn_o' },
        { name: 'XM1014 | Blue Spruce', rarity: 'common', chance: 28.0, value: 8, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PvRTitD_tW1lY2EqPH7Ia_ummJW4NFOhODU_Zi6hQPh-ENkMjqhcYKQdFNtZl_W-FnswOq5hMLu6czOn2F9-n51jX_Qlw' },
        { name: 'Nova | Predator', rarity: 'common', chance: 22.0, value: 15, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhz3MzadDl94NWxnJLGlvPLP7LWnn8fvpZ0j-_E8NWnjgPm-xE5MjvzcY-Scw5tYA3UqQW-w-fxxcjroQdZZDo' },
        { name: 'Tec-9 | Groundwater', rarity: 'uncommon', chance: 10.0, value: 18, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhz3MzadDl94NWxnJLGlvPLP7LWnn8f7JQp2LrDo9mm2gLlr0Q6YmylJ4PHe1I6Zl3U_lnqxOi6hJa76ZXInSZ9-n51R6Iax98' },
        { name: 'MP9 | Hot Rod', rarity: 'uncommon', chance: 4.0, value: 35, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FABz7P7YKAJF4N27lYS0kfjmNqjFqWlQ7dN4jeHVyoD0mlOx5UFvamqmd4bDJlRsMF-C-Vbqkue61pC66ZrOyHEx7SYjtCzfmhKpwUYbLqE46tU' },
        { name: 'M4A4 | Radiation Hazard BS', rarity: 'rare', chance: 0.8, value: 85, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2L3C84in2lDgqEdsYWqnLYLGJFI6MwnX_VS3x-fm0JS6uJ7Nw3BlvyQq5nyLmh2w1hlIbOBom7XAHzPk0EUa' },
        { name: 'AK-47 | Elite Build BS', rarity: 'rare', chance: 0.2, value: 420, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV08-jhYO0mvLwOq7c2DlQuZJ13r2V8d3x0FGwrkpkMmqlINOTcQ82YVHVqFm6wey515C6tZ_BmCA0uCknsWGdwUIc0O48Qg' }
      ]
    },
    {
      id: 8,
      name: 'Casual Case',
      price: 100,
      image: '/img/a36abddd-10b2-4164-807c-a388a3db3e42.jpg',
      rarity: 'common',
      items: [
        { name: 'SG 553 | Waves Perforated', rarity: 'common', chance: 30.0, value: 45, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuY-0h4mFnvL6DLfYhV9u4MBwnPCPpdSl3ga3qEQ6ZGmmcoKVdwE2Nw2E_VnqlOzu0JXvuZTNyCB9-n51fj1qTXo' },
        { name: 'P2000 | Chainmail', rarity: 'common', chance: 25.0, value: 38, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJfAJG7eO1gb-MmsrSlKPCl2hU18h0i_rVyoGniVKxrRZpMDj2d9WRJFdtY13Q-wTryeLxxcjrPCHJU9k' },
        { name: 'UMP-45 | Labyrinth', rarity: 'common', chance: 22.0, value: 52, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3ZDBSuImJkoyKjvn4Jr_um2Vf18lwmOzA-LP5jATi-kttYmqmItSQdlVsYliGqAC6yLy608S_upTAyHpm7CE8sn-PgVXp1qMdBzRH' },
        { name: 'Galil AR | Rocket Pop', rarity: 'uncommon', chance: 15.0, value: 68, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDLFIhGJU4MBpmOTI8LP5i1Kw-EQ-Yzz6doTAIwY7YF7T-1K3ye_xxcjruBqJRbg' },
        { name: 'P90 | Blind Spot', rarity: 'uncommon', chance: 6.0, value: 125, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PLfYQJD_9W7m5a0mvLwOq7c2GhX18lwmOzA-LP5jAPg_Uc5Y2rxJ4OWdlU3ZF2E_ge7lb2_gZW_tZ-YwSVrvyQm53qOgVXp1ld-KYA6' },
        { name: 'M4A1-S | Blood Tiger', rarity: 'rare', chance: 1.5, value: 185, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LiV89rziw3jqRJoYTygcoCSJ1BvYwvU_lW_xLq-h5K-6s7JwSBl7ikj4HnYgVXp1rtzl4-F' },
        { name: 'AK-47 | Blue Laminate FT', rarity: 'rare', chance: 0.5, value: 950, image: '/img/6d75fe2e-90c6-40ae-b546-bbbd9517fdad.jpg' }
      ]
    },
    {
      id: 9,
      name: 'Soldier Case',
      price: 250,
      image: '/img/6d75fe2e-90c6-40ae-b546-bbbd9517fdad.jpg',
      rarity: 'uncommon',
      items: [
        { name: 'MAC-10 | Fade FN', rarity: 'common', chance: 28.0, value: 125, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0Ob3fDxB043mq4GHnvL6DLfYkWNF18lwmOzA-LP5i1Kw-EQ-Yzz6doTAIwY6YFjY_FO4l-zxxcjrDQZI4c0' },
        { name: 'P90 | Module', rarity: 'common', chance: 24.0, value: 95, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PLfYQJD_9W7m5a0mvLwOq7c2DlaupYp27vCrIis0FHsrkNvZzj1d4SVdQZrZQ7Z-Vi2yL3q1MW0tJidzSQ1uCkjtnndlwv330-tJsF6rA' },
        { name: 'MP7 | Nemesis', rarity: 'common', chance: 20.0, value: 145, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFBRw7OfJYTh94863moeOqPv9NLPF2DsAvZQli-qXpIrz3AW1qkdqYTr1dtOXdgE9ZQ7Uq1O_xb291J-96Z_IznZi7ykntH7VnBTjgBpMbOA4gvfVAKuYUPIcHvs40NKG' },
        { name: 'Five-SeveN | Copper Galaxy', rarity: 'uncommon', chance: 16.0, value: 185, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTjxP09-kjZOflvv1IbzVqWdY781lxO3Fotqsjgfl_RY_Njv3JoCXdgU7Mw3S-la4wevxxcjr5Q8wGco' },
        { name: 'Glock-18 | Water Elemental FT', rarity: 'uncommon', chance: 8.0, value: 320, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJkImMn-O6YeDTx2pTvJB1jb7D89-s0Qe2-RZrZG-hJNfEd1c_NF_R-lHolbq-gp-i_MOewqObHdI' },
        { name: 'AWP | Worm God MW', rarity: 'rare', chance: 3.0, value: 580, image: '/img/aca5cd59-01d6-45c4-9a28-858907242d7c.jpg' },
        { name: 'AK-47 | Redline BS', rarity: 'rare', chance: 1.0, value: 3200, image: '/img/d9b4799f-9ddb-4e07-8128-aa9174b80231.jpg' }
      ]
    },
    {
      id: 10,
      name: 'Veteran Case',
      price: 500,
      image: '/img/aca5cd59-01d6-45c4-9a28-858907242d7c.jpg',
      rarity: 'uncommon',
      items: [
        { name: 'Five-SeveN | Monkey Business BS', rarity: 'common', chance: 26.0, value: 210, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTj5X09q_goWYkuHxPYTTl2Vf18lwmOzA-LP5gVO8v0poZ2z6IYLAJlRrYFGB-lW9lOnxxcjroWk3ctI' },
        { name: 'CZ75-Auto | The Fuschia Is Now', rarity: 'common', chance: 22.0, value: 165, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0Ob3YjoXuY-0h4mFnvL6P67QhXtu5Mx2gv2Pp4-m2QTjrUZoMD37JI7BcAA4aFnZ_wK_366x0pGFfp6k' },
        { name: 'Desert Eagle | Cobalt Disruption BS', rarity: 'common', chance: 18.0, value: 380, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTzFL-L-Jh5KNqPv9NLPF2DlaupYp27DDpd2s3QPjqkI5N2iid9KQJFI2Y1nT_lnqx7y50JW8tc7BzXoxs3MntCnZnAvknhxLbrM_gPLKVRzAX_JZRQ' },
        { name: 'AK-47 | Rat Rod BS', rarity: 'uncommon', chance: 15.0, value: 420, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-kjZOflvv1Ia_ummJW4NFOhODU_Zi6hQPh-ENkMjqhcYKQdFNtNAyE_1Lql-3xxcjr_dL9rVg' },
        { name: 'M4A1-S | Cyrex BS', rarity: 'uncommon', chance: 12.0, value: 680, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LCUotyg2wW3_EU6YjqhctKQdAA7aV3Zq1HskOnxxcjryv6FKyA' },
        { name: 'AWP | Redline FT', rarity: 'rare', chance: 5.0, value: 1200, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2DlaupYp27DFpYr3i1HgrhZuNmimcoDHcAQ8NV_S-wW9l-y9hZW9tJTNzSE37Sgm5n3VzxHh0RlPb-VsguveFwuPVVGBSQ' },
        { name: 'M4A4 | Asiimov BS', rarity: 'rare', chance: 2.0, value: 6500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LiQrN-njgTh-xBrYGz2d9KUdwVoMgrZq1K_wu69jJLpuJqfz3Azs3Mjti2JzxblnhpObPtohKbIHlzAQ0kZSPIY' }
      ]
    },
    {
      id: 11,
      name: 'Champion Case',
      price: 799,
      image: '/img/d9b4799f-9ddb-4e07-8128-aa9174b80231.jpg',
      rarity: 'uncommon',
      items: [
        { name: 'SSG 08 | Blood in the Water BS', rarity: 'common', chance: 24.0, value: 380, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f0Ob3Yi5FvISJmImMn-O6NbzTk29u5Mx2gv2Prdqt0QzkrRJrYWrxJtTGd1M6NwzX-le2k-vxxcjrEXrP07E' },
        { name: 'P90 | Asiimov BS', rarity: 'common', chance: 22.0, value: 420, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PLfYQJD_9W7m5a0mvLwOq7c2G5SsJUk07-UrI70iw3mrUJvN2Dzd46UcwY4aV2C_FO4wuvxxcjrj1ODZjI' },
        { name: 'AK-47 | Frontside Misty BS', rarity: 'common', chance: 18.0, value: 580, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jkJGSmePLP7LWnn8f7cQk3LmQ896g31HjqkdsZmqlJo6VdlQ4YgyE_1XvxurogpTu78uczCRn6Sgh5HaNgVXp1pLY0xwZ' },
        { name: 'M4A1-S | Golden Coil BS', rarity: 'uncommon', chance: 16.0, value: 750, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LjFpYik2gDmrxE4YjumcNCLdVFtYl6C-wS9xO3u18K_vM7MyiQ17yEm4HqJzhe01BpNbOY_0L1CYbcc' },
        { name: 'USP-S | Neo-Noir BS', rarity: 'uncommon', chance: 12.0, value: 1200, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh-TLMa_ummJW4NFOhODU_Zi6hQPh-ENkMjqhcYKQdFNtNAvX_Vi6xum515fvuJXMm3M1vSI8snyLnwv330_ZYXLFWw' },
        { name: 'AK-47 | Bloodsport BS', rarity: 'rare', chance: 6.0, value: 2800, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0rGT89ij2FKy-RVuMm_6IoPEe1RsZFiD_1C7wLi7hJW8vcudyHcx7yNwtHvczRC1hBpIOLNog-DLVhzAUKBT32-H' },
        { name: 'AWP | Hyper Beast BS', rarity: 'rare', chance: 2.0, value: 9500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv2Po9-mjQTkqBE5Zjv0IIWUdVc-YFHXrge9wey-h5Xp6JrKnGwj5Hf-Q3hbMA' }
      ]
    },
    {
      id: 12,
      name: 'Expert Case',
      price: 1000,
      image: '/img/0f8e56ef-15e3-4d26-83ce-251dd48aa2ab.jpg',
      rarity: 'rare',
      items: [
        { name: 'AWP | Phobos FT', rarity: 'common', chance: 24.0, value: 420, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t2-q4SClvD7PYTQgXtu5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJK4756YyXNn63VzsXrfmAv33087-1VmIQ' },
        { name: 'M4A4 | Desolate Space BS', rarity: 'common', chance: 20.0, value: 650, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LyRrd-g3g2y8kZoZmD3coXBdQRqZF_V_lm9wejxxcjrjWbfPx4' },
        { name: 'AK-47 | Neon Rider BS', rarity: 'common', chance: 18.0, value: 820, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jkJGSmePLP7LWnn8fvJQh2uvEo4ignwPk8hJlYW_6LdWWcVU6N1_UqFa5xL3u0J656czKznZqviYq7SyLgVXp1h3Eb2m5' },
        { name: 'USP-S | Kill Confirmed BS', rarity: 'uncommon', chance: 16.0, value: 1400, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh-TLMa_ummJW4NFOhODU_Zi6jlfk80U5amD3doCLMlhHcxiOrVK2wOy61JLu6JXJyHY3sXIg7X6IyBa11EsbP-NthaTMHFuYRPUcHvuXE_U7Dg' },
        { name: 'AWP | Fever Dream MW', rarity: 'uncommon', chance: 12.0, value: 1850, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2DlQuZJ13r2V89ig2wHiqUdsY2CnJIWQJAU9ZgvZ_FXtx-fxxcjroqQOwBs' },
        { name: 'M4A1-S | Hyper Beast FT', rarity: 'rare', chance: 7.0, value: 3500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2L2X94733gey_0VqYW-mIdCdJwc2aAqGrgXqlObtm9bi65xoO9Bq' },
        { name: 'AK-47 | The Empress FT', rarity: 'rare', chance: 3.0, value: 12500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0rCVrYit2gXlqRFqYmGnddWSJAdsZ1nU-QPql-vxxcjr_qDMYyo' }
      ]
    },
    {
      id: 13,
      name: 'Elite Pro Case',
      price: 3000,
      image: '/img/a72ff8d4-ef6e-4a7d-9df8-17a65ce9895c.jpg',
      rarity: 'rare',
      items: [
        { name: 'P90 | Death by Kitty FT', rarity: 'common', chance: 22.0, value: 1600, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PLfYQJD_9W7m5a0mvLwOq7c2DsDsJ0g3erAotSh3AftqEdlZTqnJ4bHI1U5Nw2G81e5xby50ZC4upjMzSRhvCMgsH-IyRO-hBlFbedsgvPeFwvRNYKdAw' },
        { name: 'AWP | Man-o\\'\\'-war MW', rarity: 'common', chance: 20.0, value: 2100, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2DsJsJIo2-_FrYqk0Va1-RE4ZDz6J9WUJ1c4NArY_lO3k-e6m9bi64_M5KpL' },
        { name: 'M4A4 | Neo-Noir BS', rarity: 'common', chance: 18.0, value: 2850, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzHpdml2gXi-RFlamj7I4bBIAQ7ZwrU-1e7x-vxxcjr46f66TI' },
        { name: 'AK-47 | Fuel Injector FT', rarity: 'uncommon', chance: 15.0, value: 4200, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0rGXpNigjQy3-ENpNmrxcoDGdlQ_Z1HYqFi3xO681J676MvMmCdgvicqsH7ZmkDmixtFbPpqhqbIHlwGQqW8mg' },
        { name: 'Desert Eagle | Blaze FN', rarity: 'uncommon', chance: 10.0, value: 6800, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PTbTi5B7c7kxL-BnvD8J_WBwm5SvJQgiOqXp96k2gLm_0Y_YWuhINOccFM5ZFvU-lTtx-fxxcjrJ7f4yNI' },
        { name: 'M4A1-S | Chantico\\'\\\'s Fire FT', rarity: 'rare', chance: 8.0, value: 12000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2L3A8YrziVfj8xA4YmmmJ4_DdAFrYl_TqFC8wL2-jZC_6siYyHNluiUr5ynbmUPjgElFaeE5habYUUnAUB1DT_se7bSa_L91bQ' },
        { name: 'AK-47 | Neon Revolution FT', rarity: 'rare', chance: 4.0, value: 28000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0rGUo4r2iVDh_UdqMGn3dI-VdQNvZAyBrFi8xLzxxcjrcR8QhKg' },
        { name: 'AWP | Containment Breach FT', rarity: 'legendary', chance: 3.0, value: 65000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2GhX18lwmOzA-LP5gVO8v0tkZTqgJI7AIwY4MlCB8lLtyOzxxcjr2Skt-Tc' }
      ]
    },
    {
      id: 14,
      name: 'Master Case',
      price: 4000,
      image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg',
      rarity: 'legendary',
      items: [
        { name: 'AUG | Akihabara Accept BS', rarity: 'common', chance: 20.0, value: 2200, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFBRv7OXNYzxL09O5mpSbhcj3PLLFk29u5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJLo7M_Jy3M37y5z4X6Jlgv33080IWqJsA' },
        { name: 'SSG 08 | Dragonfire FT', rarity: 'common', chance: 18.0, value: 3100, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f0Ob3Yi5FvISJmImMn-O6YO_Twm5V18h0i_rVyoD0mlOx5UJpMGz1I4DHdFVqZlyBq1G2l-_xxcjrnC3nHpw' },
        { name: 'M4A1-S | Printstream BS', rarity: 'common', chance: 16.0, value: 4500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2L2W8Y-siVDlrkBpNW7wI4-TIAZoMl_W_1Hskbq615K8u5vAnSA2unFw43nVl0GyhU4fafJsgvPeFwsr8TuYPg' },
        { name: 'USP-S | The Traitor FT', rarity: 'uncommon', chance: 14.0, value: 5800, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh-TLMa_ummJW4NFOhODU_Zi6hQPh-ENkMjqhcYKQdFNtNQqD-FK9wufxxcjrM5-j6xQ' },
        { name: 'AK-47 | Ice Coaled FT', rarity: 'uncommon', chance: 12.0, value: 8500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0r2Z89ihigHgr0JuYTiic4GXdAVsMFnW_VG3wbjxxcjr7tM3JGE' },
        { name: 'AWP | Chromatic Aberration FT', rarity: 'rare', chance: 10.0, value: 15000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2DlQuZJ13r2Vo4j02FLgqEtrYGGmI9WTJlVoMAnS-FDqxL28gp686J_InyNhvHQgsGGdwUIE8MwqeQ' },
        { name: 'M4A4 | In Living Color FT', rarity: 'rare', chance: 6.0, value: 38000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LzFotWh2wC1-kduMWCgJ4XDcFQ3Y1uC_1Lrkui915C8upjInCI26iR2si2LykexgxlSLrs4ZYgr3OU' },
        { name: 'AK-47 | Wild Lotus FT', rarity: 'legendary', chance: 4.0, value: 125000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0ryYp9iligDnrkBuMm2mJo-Wd1c-Y1jW_lm2w-q-jJ6-7c7NyXN9-n51FGFfaAA' }
      ]
    },
    {
      id: 15,
      name: 'Supreme Case',
      price: 8000,
      image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg',
      rarity: 'legendary',
      items: [
        { name: 'P2000 | Ocean Foam FN', rarity: 'common', chance: 20.0, value: 4200, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJfAJG7eO1gb-MmsrSlKPCl2hU18h0i_rVyoD0mlOx5UdpNmH7LI-dJFM4ZV3Y_Vm4l7i705bvvMnIzHs16yUhsnvayUepwUYbaOE5hPGYHVjBH_JAZX7vySS5W-M' },
        { name: 'M4A1-S | Icarus Fell FN', rarity: 'common', chance: 18.0, value: 6500, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2L2W8Iit3lCx_kA-Yjr2JNeSd1A2YF_YqAO5l-vxxcjrXl3wDT0' },
        { name: 'Glock-18 | Fade FN', rarity: 'common', chance: 16.0, value: 8200, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJkImMn-O6YuLTzm0JsJR33O-UrY2m3ATi_UFsYj3zddKWdVI_ZwqG_Vi5wea9m9bi64XN7p7x' },
        { name: 'USP-S | Printstream FT', rarity: 'uncommon', chance: 14.0, value: 12000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh-TLMa_ummJW4NFOhODU_Zi6hQPh-ENkMjqhcYKQdFNtNQyG-VO9wea-1JO0vJrAnSNmvHRw4XiLzBzigU4YOrduhvbJShcbO_IO7rSb_c1tZqUgFUvBLg4z1Q' },
        { name: 'AK-47 | X-Ray FT', rarity: 'uncommon', chance: 12.0, value: 18000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV18-jhpWOk-TLPr7Vn35c4ctx0rGXpNmijgS1_RE6aj2nJY_Ed1U3MlvQ-Ve_lLzvhJe9vZ6dnyE26XMn4X-Jy0K21h1JbuJo1ufMT1_JGONRSwKF_g' },
        { name: 'M4A4 | Poseidon FT', rarity: 'rare', chance: 10.0, value: 52000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-DmufnjKnFl2xU7cNo2LDF9I-gigDmqEE6ZWihI4eTdQI_YFHTq1Xrxrq7gJO1vcyfwSM27iAm4n7dy0e-hB4abLM5g-vLHFyWUPEdQOwjrA' },
        { name: 'Desert Eagle | Emerald Jörmungandr FN', rarity: 'rare', chance: 6.0, value: 85000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTi5B7c7kxL-BnvD8J_WBwG5V65Vz2uzA8NWmjVft-hFvamn6IdPHcQY8aQqE-lnoyL3oxcjr18bwWHA' },
        { name: 'Butterfly Knife | Doppler FN', rarity: 'legendary', chance: 4.0, value: 280000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDLbQhG5u5Mx2gv3--Y3nKV_F-ENvY2yldobHdFI6ZQqD-lS-wr2-hJ_ouJrNzXIyviIm5C6Lywv33086z1MJ-g' }
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