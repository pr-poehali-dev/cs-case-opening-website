import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [openedItem, setOpenedItem] = useState<any>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [selectedCaseDetails, setSelectedCaseDetails] = useState<any>(null);
  const [rollingItems, setRollingItems] = useState<any[]>([]);
  const [userBalance, setUserBalance] = useState(500000); // Начальный баланс 500,000₽
  const [userInventory, setUserInventory] = useState<any[]>([
    { id: 1, name: 'AK-47 | Nebula Storm', rarity: 'rare', value: 6700, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
    { id: 2, name: 'AWP | Cosmic Dragon', rarity: 'legendary', value: 15600, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
    { id: 3, name: 'Glock-18 | Stardust', rarity: 'common', value: 2300, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' }
  ]);

  const cases = [
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
      name: 'Elite Case',
      price: 5000,
      image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg',
      rarity: 'legendary',
      items: [
        { name: 'AK-47 | Vulcan FT', rarity: 'common', chance: 40.0, value: 45000, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
        { name: 'M4A1-S | Knight FN', rarity: 'common', chance: 30.0, value: 125000, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
        { name: 'AWP | Dragon Lore FT', rarity: 'uncommon', chance: 15.0, value: 980000, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' },
        { name: 'Moto Gloves | Polygon', rarity: 'rare', chance: 8.0, value: 380000, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
        { name: 'Sport Gloves | Superconductor', rarity: 'rare', chance: 5.0, value: 280000, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
        { name: 'Sport Gloves | Pandora\'s Box', rarity: 'legendary', chance: 1.8, value: 680000, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' },
        { name: 'Driver Gloves | Crimson Weave', rarity: 'legendary', chance: 0.15, value: 820000, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
        { name: 'Specialist Gloves | Emerald Web', rarity: 'ancient', chance: 0.05, value: 1200000, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' }
      ]
    },
    {
      id: 5,
      name: 'Master Case',
      price: 10000,
      image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg',
      rarity: 'legendary',
      items: [
        { name: 'StatTrak™ Glock-18 | Water Elemental', rarity: 'common', chance: 30.0, value: 3500, image: '/img/a5022949-4d81-4146-a69d-cab2f94537be.jpg' },
        { name: 'StatTrak™ P250 | Asiimov', rarity: 'common', chance: 25.0, value: 8500, image: '/img/a5022949-4d81-4146-a69d-cab2f94537be.jpg' },
        { name: 'StatTrak™ AK-47 | Blue Laminate', rarity: 'uncommon', chance: 18.0, value: 15000, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
        { name: 'StatTrak™ M4A1-S | Guardian', rarity: 'uncommon', chance: 12.0, value: 32000, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
        { name: 'StatTrak™ AK-47 | Redline', rarity: 'rare', chance: 8.0, value: 65000, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' },
        { name: 'StatTrak™ AWP | Lightning Strike', rarity: 'rare', chance: 4.5, value: 156000, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
        { name: 'StatTrak™ AK-47 | Fire Serpent', rarity: 'legendary', chance: 2.0, value: 620000, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
        { name: 'StatTrak™ AWP | Dragon Lore', rarity: 'ancient', chance: 0.5, value: 2500000, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' }
      ]
    },
    {
      id: 6,
      name: 'Legendary Case',
      price: 50000,
      image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg',
      rarity: 'ancient',
      items: [
        { name: 'AK-47 | Redline FT', rarity: 'common', chance: 35.0, value: 10200, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
        { name: 'M4A4 | Asiimov FT', rarity: 'common', chance: 25.0, value: 28500, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
        { name: 'AWP | Lightning Strike FN', rarity: 'uncommon', chance: 15.0, value: 78000, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' },
        { name: 'AK-47 | Vulcan FT', rarity: 'uncommon', chance: 10.0, value: 45000, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
        { name: 'M4A1-S | Knight FN', rarity: 'rare', chance: 8.0, value: 125000, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' },
        { name: 'AK-47 | Fire Serpent FT', rarity: 'rare', chance: 4.0, value: 172000, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg' },
        { name: 'Souvenir AWP | Dragon Lore', rarity: 'legendary', chance: 2.0, value: 1200000, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg' },
        { name: 'IBP Holo Katowice 2014', rarity: 'ancient', chance: 0.05, value: 3500000, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg' }
      ]
    },
    {
      id: 7,
      name: 'Knife Case',
      price: 100000,
      image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg',
      rarity: 'ancient',
      items: [
        { name: 'AK-47 | Fire Serpent FT', rarity: 'common', chance: 50.0, value: 172000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV19-yhpKOhcj5Nr_Yg2Y' },
        { name: 'AWP | Dragon Lore FT', rarity: 'uncommon', chance: 25.0, value: 980000, image: '/img/479b7c6e-5a3e-42c4-8e53-76375486b2be.jpg' },
        { name: 'M4A4 | Howl FT', rarity: 'uncommon', chance: 15.0, value: 385000, image: '/img/be4a3169-f29b-42a8-af57-0bfc843f18e4.jpg' },
        { name: 'Bayonet | Doppler', rarity: 'rare', chance: 6.0, value: 1800000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAlfwOP3ZTxS6eO7kr-HnvD8J_WAkDME65whjrjFrN3z3QW1-0Q5NT-lLYKSJg5qMgmB8gS9kOa4hZW_u5TXiSw0Zr1dJQ' },
        { name: 'Karambit | Tiger Tooth', rarity: 'rare', chance: 3.0, value: 2800000, image: '/img/58e5868b-2766-4f70-a117-0517eecd1909.jpg' },
        { name: 'Butterfly Knife | Marble Fade', rarity: 'legendary', chance: 0.8, value: 3200000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKnUjFRd4cJ5ntbN9J7yjRrt8kM-Nz_xcoWUcAdrMFiDr1K6yLru08a4vpiannph7HQlsH2MgVXp1vdRXtBr' },
        { name: 'StatTrak™ Karambit | Crimson Web', rarity: 'legendary', chance: 0.15, value: 7500000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKnUjFRd4cJ5ntbN9J7yjRrg_UI-a2D1I4KUIlI5NFCErle8yOfmhpPp753ByXY37HEi4mGdwUKkzv8' },
        { name: 'Karambit | Blue Gem #1', rarity: 'ancient', chance: 0.05, value: 15000000, image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKnUjFRd4cJ5ntbN9J7yjRri-UFsYTz0cdeWegNoZ1nS_FK5ye67hMO8u5zOynZhsiFz5nzZyh3o0xBKb-c' }
      ]
    }
  ];



  const marketItems = [
    { id: 1, name: 'Quantum Karambit', seller: 'CosmicTrader', price: 2450, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg', rarity: 'legendary' },
    { id: 2, name: 'Stellar AK-47', seller: 'GalaxyMerchant', price: 890, image: '/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg', rarity: 'rare' },
    { id: 3, name: 'Void Butterfly Knife', seller: 'StarDealer', price: 1650, image: '/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg', rarity: 'mythical' },
    { id: 4, name: 'Solar Gloves', seller: 'NebulaShop', price: 560, image: '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg', rarity: 'rare' }
  ];

  const topPlayers = [
    { name: 'CosmicCommander', cases: 2580, avatar: '🚀' },
    { name: 'StarLord', cases: 1920, avatar: '⭐' },
    { name: 'GalaxyHunter', cases: 1745, avatar: '🌌' }
  ];

  const getRandomItem = (caseItems: any[]) => {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const item of caseItems) {
      cumulative += item.chance;
      if (random <= cumulative) {
        return item;
      }
    }
    return caseItems[0];
  };

  const handleCaseClick = (caseData: any) => {
    setSelectedCaseDetails(caseData);
    setShowCaseDetails(true);
  };

  const handleSellItem = (itemId: number) => {
    const item = userInventory.find(item => item.id === itemId);
    if (item) {
      // Удаляем предмет из инвентаря
      setUserInventory(prev => prev.filter(invItem => invItem.id !== itemId));
      // Добавляем деньги на баланс (100% стоимости)
      setUserBalance(prev => prev + item.value);
      console.log(`Продан предмет ${item.name} за ${item.value}₽`);
    }
  };

  const generateRollingItems = (caseItems: any[], wonItem: any) => {
    const items = [];
    const totalItems = 50;
    const wonIndex = 35; // Выигрышный предмет будет на 35-й позиции
    
    for (let i = 0; i < totalItems; i++) {
      if (i === wonIndex) {
        // Используем точную копию выигрышного предмета
        items.push({ ...wonItem, rollId: i, isWinner: true });
      } else {
        // Выбираем случайный предмет из кейса с правильными вероятностями
        const randomItem = getRandomItem(caseItems);
        items.push({ ...randomItem, rollId: i, isWinner: false });
      }
    }
    return items;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'ancient': return 'from-red-500 to-orange-500';
      case 'legendary': return 'from-space-purple to-space-pink';
      case 'rare': return 'from-space-cyan to-space-purple';
      case 'uncommon': return 'from-blue-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'ancient': return 'bg-red-500';
      case 'legendary': return 'bg-space-purple';
      case 'rare': return 'bg-space-cyan';
      case 'uncommon': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  const handleCaseOpen = (caseId: number) => {
    const caseData = cases.find(c => c.id === caseId);
    if (!caseData) return;
    
    // Проверяем баланс
    if (userBalance < caseData.price) {
      alert('Недостаточно средств! Пополните баланс.');
      return;
    }
    
    // Списываем стоимость кейса
    setUserBalance(prev => prev - caseData.price);
    
    // Проигрываем звук открытия кейса
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBUSW3O/FciMFl+m4oHl8');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    setSelectedCase(caseId);
    setIsOpening(true);
    setIsRolling(true);
    setShowCaseDetails(false);
    
    const wonItem = getRandomItem(caseData.items);
    const rollingItemsList = generateRollingItems(caseData.items, wonItem);
    setRollingItems(rollingItemsList);
    
    // Анимация прокрутки увеличена на 40% и замедлена на 20%: 7s * 1.4 * 1.2 = 11.76s
    setTimeout(() => {
      setIsRolling(false);
      // Берем точно тот предмет, который на 35-й позиции в прокрутке
      const actualWonItem = rollingItemsList.find(item => item.isWinner) || wonItem;
      setOpenedItem(actualWonItem);
      
      // Добавить выигранный предмет в инвентарь
      const newInventoryItem = {
        ...actualWonItem,
        id: Date.now() // Уникальный ID
      };
      setUserInventory(prev => [newInventoryItem, ...prev]);
      
      // Проигрываем звук выпадения предмета
      const winAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBUSW3O/FciMFl+m4oHl8');
      winAudio.volume = 0.5;
      winAudio.play().catch(e => console.log('Win audio play failed:', e));
      
      // Окно результата остается открытым до выбора действия
    }, 11760); // 7s * 1.4 * 1.2 = 11.76s
  };

  return (
    <div className="min-h-screen bg-space-dark text-white relative overflow-hidden" style={{fontFamily: 'Rajdhani, sans-serif'}}>
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-space-dark via-space-deep to-space-dark">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 opacity-30 animate-stellar-pulse">
            <img src="/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg" alt="Cosmic" className="w-full h-full object-cover blur-md" />
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-20 animate-orbit" style={{animationDuration: '30s'}}>
            <img src="/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg" alt="Nebula" className="w-full h-full object-cover blur-sm rounded-full" />
          </div>
          <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 opacity-15 animate-stellar-pulse" style={{animationDelay: '1s'}}>
            <img src="/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg" alt="Galaxy" className="w-full h-full object-cover blur-sm" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-transparent to-space-dark/80"></div>
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Header */}
      <header className="bg-space-deep/95 backdrop-blur-md border-b border-space-purple/30 sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {(selectedCase || showCaseDetails) && (
                <Button
                  onClick={() => {
                    setSelectedCase(null);
                    setShowCaseDetails(false);
                    setIsOpening(false);
                    setOpenedItem(null);
                    setRollingItems([]);
                  }}
                  variant="outline"
                  className="border-space-purple text-space-purple hover:bg-space-purple hover:text-white"
                >
                  ← Назад
                </Button>
              )}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Icon name="Rocket" className="text-space-purple animate-cosmic-glow" size={36} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-space-cyan rounded-full animate-ping"></div>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-space-purple via-space-cyan to-space-pink bg-clip-text text-transparent" style={{fontFamily: 'Orbitron, monospace'}}>
                  COSMIC CS2
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-space-purple transition-colors">Главная</a>
              <a href="#" className="hover:text-space-cyan transition-colors">Кейсы</a>
              <a href="#" className="hover:text-space-pink transition-colors">Инвентарь</a>
              <a href="#" className="hover:text-space-gold transition-colors">Торговля</a>
              <a href="#" className="hover:text-cosmic-glow transition-colors">Профиль</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-space-purple to-space-cyan border-none text-white px-4 py-2 text-lg">
                <Icon name="Coins" size={18} className="mr-2" />
                {userBalance.toLocaleString()}₽
              </Badge>
              <Dialog open={showPayment} onOpenChange={setShowPayment}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-space-purple to-space-cyan hover:from-space-cyan hover:to-space-purple transition-all duration-300">
                    <Icon name="CreditCard" className="mr-2" />
                    Пополнить
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-space-deep border-space-purple">
                  <DialogHeader>
                    <DialogTitle className="text-space-cyan">Пополнение баланса</DialogTitle>
                  </DialogHeader>
                  <PaymentForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 z-10">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-transparent via-space-deep/90 to-transparent p-12 rounded-3xl backdrop-blur-md border border-space-purple/20">
            <h2 className="text-7xl font-bold mb-8 animate-fade-in bg-gradient-to-r from-space-purple via-space-cyan to-space-pink bg-clip-text text-transparent" style={{fontFamily: 'Orbitron, monospace'}}>
              КОСМИЧЕСКИЕ КЕЙСЫ CS2
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in drop-shadow-lg">
              🚀 Исследуй галактику редких скинов, получай легендарное оружие из далеких миров
            </p>
            <div className="flex justify-center space-x-6 animate-fade-in">
              <Button size="lg" className="bg-gradient-to-r from-space-purple to-space-cyan hover:from-space-cyan hover:to-space-purple animate-cosmic-glow">
                <Icon name="Rocket" className="mr-2" />
                Запустить кейс
              </Button>
              <Button size="lg" variant="outline" className="border-space-purple text-space-purple hover:bg-space-purple hover:text-white">
                <Icon name="Play" className="mr-2" />
                Как играть
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-space-deep/80 backdrop-blur-md border border-space-purple/30">
            <TabsTrigger value="cases" className="text-space-cyan">Кейсы</TabsTrigger>
            <TabsTrigger value="inventory" className="text-space-purple">Инвентарь</TabsTrigger>
            <TabsTrigger value="market" className="text-space-pink">Торговля</TabsTrigger>
            <TabsTrigger value="withdraw" className="text-space-gold">Вывод</TabsTrigger>
            <TabsTrigger value="profile" className="text-cosmic-glow">Профиль</TabsTrigger>
          </TabsList>

          {/* Cases Tab */}
          <TabsContent value="cases" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cases.map((caseItem) => (
                <Card 
                  key={caseItem.id} 
                  className={`bg-space-deep/90 backdrop-blur-md border-space-purple/30 hover:border-space-cyan hover:shadow-2xl hover:shadow-space-purple/30 transition-all cursor-pointer group ${
                    selectedCase === caseItem.id && isOpening ? 'animate-stellar-pulse border-space-gold shadow-2xl shadow-space-gold/50' : 'hover:animate-cosmic-glow'
                  }`}
                  onClick={() => handleCaseClick(caseItem)}
                >
                  <CardHeader>
                    <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-xl mb-4 overflow-hidden relative">
                      <img 
                        src={caseItem.image} 
                        alt={caseItem.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-space-dark/50 to-transparent"></div>
                      {caseItem.id === 7 && (
                        <div className="absolute top-2 right-2 animate-ping">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-white text-lg">{caseItem.name}</CardTitle>
                    <Badge className={`w-fit ${
                      caseItem.rarity === 'ancient' 
                        ? 'bg-gradient-to-r from-red-600 to-orange-500' 
                        : caseItem.rarity === 'legendary' 
                        ? 'bg-gradient-to-r from-space-purple to-space-pink' 
                        : caseItem.rarity === 'rare'
                        ? 'bg-gradient-to-r from-space-cyan to-space-purple'
                        : caseItem.rarity === 'uncommon'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}>
                      {caseItem.rarity === 'ancient' ? 'Древний' :
                       caseItem.rarity === 'legendary' ? 'Легендарный' : 
                       caseItem.rarity === 'rare' ? 'Редкий' :
                       caseItem.rarity === 'uncommon' ? 'Необычный' : 'Обычный'}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-space-gold to-space-cyan bg-clip-text text-transparent">
                        {caseItem.price.toLocaleString()}₽
                      </span>
                      <Icon name="Package" className="text-space-purple animate-stellar-pulse" />
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      {caseItem.items.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center flex-1 min-w-0">
                            <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                              item.rarity === 'ancient' ? 'bg-red-500' :
                              item.rarity === 'legendary' ? 'bg-space-purple' :
                              item.rarity === 'rare' ? 'bg-space-cyan' :
                              item.rarity === 'uncommon' ? 'bg-blue-400' : 'bg-gray-400'
                            }`}></div>
                            <span className="truncate text-xs">{item.name}</span>
                          </div>
                          <div className="text-xs text-space-gold ml-2">{item.chance}%</div>
                        </div>
                      ))}
                      {caseItem.items.length > 4 && (
                        <div className="text-xs text-center text-space-cyan">+{caseItem.items.length - 4} предметов</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {userInventory.map((item, idx) => (
                <Card key={item.id} className="bg-space-deep/90 backdrop-blur-md border-space-purple/30 hover:shadow-lg hover:shadow-space-cyan/20 transition-all group">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-lg mb-3 overflow-hidden relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-space-cyan rounded-full animate-ping"></div>
                      </div>
                    </div>
                    <h3 className="font-medium text-white text-sm mb-2">{item.name}</h3>
                    <Badge size="sm" className={
                      item.rarity === 'legendary' 
                        ? 'bg-gradient-to-r from-space-purple to-space-pink' 
                        : item.rarity === 'rare' 
                        ? 'bg-gradient-to-r from-space-cyan to-space-purple' 
                        : 'bg-space-deep'
                    }>
                      {item.rarity === 'legendary' ? 'Легендарный' : 
                       item.rarity === 'rare' ? 'Редкий' : 'Обычный'}
                    </Badge>
                    <div className="text-space-gold font-bold mt-3 text-lg">{item.value}₽</div>
                    <Button 
                      size="sm" 
                      className="w-full mt-2 bg-gradient-to-r from-space-purple to-space-cyan text-xs"
                      onClick={() => handleSellItem(item.id)}
                    >
                      Продать за {item.value}₽
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Market Tab */}
          <TabsContent value="market" className="mt-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent mb-4">
                Торговая площадка
              </h3>
              <div className="flex gap-4 mb-4">
                <Select>
                  <SelectTrigger className="w-48 bg-space-deep border-space-purple">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent className="bg-space-deep border-space-purple">
                    <SelectItem value="all">Все предметы</SelectItem>
                    <SelectItem value="knives">Ножи</SelectItem>
                    <SelectItem value="rifles">Винтовки</SelectItem>
                    <SelectItem value="pistols">Пистолеты</SelectItem>
                    <SelectItem value="gloves">Перчатки</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Поиск предметов..." className="bg-space-deep border-space-purple" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketItems.map((item) => (
                <Card key={item.id} className="bg-space-deep/90 backdrop-blur-md border-space-purple/30 hover:shadow-lg hover:shadow-space-pink/20 transition-all">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-lg mb-3 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-medium text-white text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-400 mb-2">Продавец: {item.seller}</p>
                    <Badge size="sm" className={
                      item.rarity === 'legendary' 
                        ? 'bg-gradient-to-r from-space-purple to-space-pink' 
                        : item.rarity === 'mythical'
                        ? 'bg-gradient-to-r from-space-pink to-space-purple'
                        : 'bg-gradient-to-r from-space-cyan to-space-purple'
                    }>
                      {item.rarity === 'legendary' ? 'Легендарный' : 
                       item.rarity === 'mythical' ? 'Мифический' : 'Редкий'}
                    </Badge>
                    <div className="text-space-gold font-bold mt-2 mb-3 text-lg">{item.price}₽</div>
                    <Button size="sm" className="w-full bg-gradient-to-r from-space-cyan to-space-purple text-xs">
                      Купить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw" className="mt-8">
            <WithdrawSection />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-space-deep/90 backdrop-blur-md border-space-purple/30">
                <CardHeader>
                  <CardTitle className="text-space-purple">Космический профиль</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="w-20 h-20 border-2 border-space-cyan">
                      <AvatarFallback className="bg-gradient-to-r from-space-purple to-space-cyan text-white text-2xl">
                        🚀
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold text-white">SpaceCommander</h3>
                      <p className="text-space-cyan">Галактический торговец</p>
                      <Badge className="bg-gradient-to-r from-space-gold to-space-cyan mt-1">
                        Ранг: Капитан
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-space-dark/50 rounded-lg border border-space-purple/30">
                      <div className="text-3xl font-bold text-space-purple">247</div>
                      <div className="text-sm text-gray-400">Кейсов открыто</div>
                    </div>
                    <div className="text-center p-4 bg-space-dark/50 rounded-lg border border-space-cyan/30">
                      <div className="text-3xl font-bold text-space-cyan">32</div>
                      <div className="text-sm text-gray-400">Легендарных дропов</div>
                    </div>
                    <div className="text-center p-4 bg-space-dark/50 rounded-lg border border-space-pink/30">
                      <div className="text-3xl font-bold text-space-pink">156</div>
                      <div className="text-sm text-gray-400">Продано предметов</div>
                    </div>
                    <div className="text-center p-4 bg-space-dark/50 rounded-lg border border-space-gold/30">
                      <div className="text-3xl font-bold text-space-gold">89%</div>
                      <div className="text-sm text-gray-400">Рейтинг</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-space-deep/90 backdrop-blur-md border-space-cyan/30">
                <CardHeader>
                  <CardTitle className="text-space-cyan">Последние трофеи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-space-dark/50 border border-space-purple/20">
                      <span className="text-white">Quantum Karambit</span>
                      <Badge className="bg-gradient-to-r from-space-purple to-space-pink">Легендарный</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-space-dark/50 border border-space-cyan/20">
                      <span className="text-white">Stellar AK-47</span>
                      <Badge className="bg-gradient-to-r from-space-cyan to-space-purple">Редкий</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-space-dark/50 border border-space-pink/20">
                      <span className="text-white">Cosmic AWP</span>
                      <Badge className="bg-gradient-to-r from-space-purple to-space-pink">Легендарный</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Case Details Modal */}
      <Dialog open={showCaseDetails} onOpenChange={setShowCaseDetails}>
        <DialogContent className="bg-space-deep border-space-purple max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl text-center bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent">
              {selectedCaseDetails?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedCaseDetails && (
            <div className="space-y-6">
              {/* Case Image and Info */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="aspect-square bg-gradient-to-br from-space-purple/20 to-space-cyan/20 rounded-xl overflow-hidden">
                    <img 
                      src={selectedCaseDetails.image} 
                      alt={selectedCaseDetails.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-space-gold to-space-cyan bg-clip-text text-transparent mb-2">
                      {selectedCaseDetails.price.toLocaleString()}₽
                    </div>
                    <Badge className={`text-lg px-4 py-2 ${
                      selectedCaseDetails.rarity === 'ancient' 
                        ? 'bg-gradient-to-r from-red-600 to-orange-500' 
                        : selectedCaseDetails.rarity === 'legendary' 
                        ? 'bg-gradient-to-r from-space-purple to-space-pink' 
                        : selectedCaseDetails.rarity === 'rare'
                        ? 'bg-gradient-to-r from-space-cyan to-space-purple'
                        : selectedCaseDetails.rarity === 'uncommon'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}>
                      {selectedCaseDetails.rarity === 'ancient' ? 'Древний' :
                       selectedCaseDetails.rarity === 'legendary' ? 'Легендарный' : 
                       selectedCaseDetails.rarity === 'rare' ? 'Редкий' :
                       selectedCaseDetails.rarity === 'uncommon' ? 'Необычный' : 'Обычный'}
                    </Badge>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-space-purple to-space-cyan hover:from-space-cyan hover:to-space-purple py-4 text-lg animate-cosmic-glow" 
                    size="lg"
                    onClick={() => handleCaseOpen(selectedCaseDetails.id)}
                  >
                    <Icon name="Package" className="mr-2" size={20} />
                    Открыть кейс за {selectedCaseDetails.price.toLocaleString()}₽
                  </Button>
                </div>
              </div>
              
              {/* Items List */}
              <div>
                <h3 className="text-2xl font-bold text-space-cyan mb-4">Содержимое кейса</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCaseDetails.items.map((item: any, idx: number) => (
                    <div key={idx} className={`p-4 rounded-lg border-2 bg-gradient-to-br ${getRarityColor(item.rarity)}/10 border-opacity-50 ${
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
                      <h4 className="text-white font-semibold text-sm mb-2">{item.name}</h4>
                      <div className="flex items-center justify-between">
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
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Opening Animation with Rolling Items */}
      {isOpening && (
        <div className="fixed inset-0 bg-space-dark/95 backdrop-blur-md flex items-center justify-center z-50">
          <div className="text-center animate-fade-in">
            {isRolling ? (
              <>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent mb-8 animate-pulse">
                  Открываем кейс...
                </h3>
                
                {/* Rolling Items Animation */}
                <div className="relative w-[800px] h-32 bg-space-deep/50 rounded-lg border-2 border-space-purple overflow-hidden mb-8">
                  {/* Winning Line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-space-gold z-10 shadow-lg shadow-space-gold/50"></div>
                  
                  {/* Items Container */}
                  <div className="flex items-center h-full">
                    <div className="flex items-center h-full animate-roll">
                      {rollingItems.map((item, idx) => (
                        <div 
                          key={idx} 
                          className={`flex-shrink-0 w-24 h-24 mx-2 rounded-lg border-2 bg-gradient-to-br ${getRarityColor(item.rarity)}/20 ${
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
                <div className={`p-8 rounded-2xl border-4 mb-4 animate-cosmic-glow max-w-md mx-auto ${
                  openedItem.rarity === 'ancient' 
                    ? 'border-red-500 bg-gradient-to-br from-red-900/50 to-orange-900/50' 
                    : openedItem.rarity === 'legendary'
                    ? 'border-space-purple bg-gradient-to-br from-space-purple/50 to-space-pink/50'
                    : openedItem.rarity === 'rare'
                    ? 'border-space-cyan bg-gradient-to-br from-space-cyan/50 to-space-purple/50'
                    : 'border-blue-400 bg-gradient-to-br from-blue-900/50 to-purple-900/50'
                }`}>
                  {openedItem.image && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <img 
                        src={openedItem.image} 
                        alt={openedItem.name} 
                        className="w-full h-48 object-cover rounded-xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg';
                        }}
                      />
                    </div>
                  )}
                  <h4 className="text-3xl font-bold text-white mb-3">{openedItem.name}</h4>
                  <Badge className={`text-lg px-6 py-2 mb-4 ${
                    openedItem.rarity === 'ancient' 
                      ? 'bg-gradient-to-r from-red-600 to-orange-500' 
                      : openedItem.rarity === 'legendary'
                      ? 'bg-gradient-to-r from-space-purple to-space-pink'
                      : openedItem.rarity === 'rare'
                      ? 'bg-gradient-to-r from-space-cyan to-space-purple'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    {openedItem.rarity === 'ancient' ? 'Древний' :
                     openedItem.rarity === 'legendary' ? 'Легендарный' :
                     openedItem.rarity === 'rare' ? 'Редкий' : 'Необычный'}
                  </Badge>
                  <div className="text-5xl font-bold text-space-gold">
                    {openedItem.value.toLocaleString()}₽
                  </div>
                  <div className="text-sm text-space-cyan mt-2">
                    Шанс выпадения: {openedItem.chance}%
                  </div>
                </div>
                <p className="text-xl text-space-cyan mb-6">Предмет добавлен в инвентарь! ✨</p>
                
                {/* Кнопки действий */}
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => {
                      // Продать предмет за 100% стоимости
                      const sellPrice = openedItem.value;
                      setUserBalance(prev => prev + sellPrice);
                      
                      // Удаляем предмет из инвентаря (так как он уже был добавлен)
                      setUserInventory(prev => prev.slice(1));
                      
                      // Закрыть модальное окно
                      setIsOpening(false);
                      setSelectedCase(null);
                      setOpenedItem(null);
                      setRollingItems([]);
                    }}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
                  >
                    💰 Продать за {openedItem.value.toLocaleString()}₽
                  </Button>
                  
                  <Button
                    onClick={() => {
                      const currentCaseData = cases.find(c => c.id === selectedCase);
                      if (currentCaseData) {
                        // Закрыть текущий результат
                        setIsOpening(false);
                        setOpenedItem(null);
                        setRollingItems([]);
                        
                        // Запустить новое вскрытие
                        setTimeout(() => {
                          handleCaseOpen(selectedCase);
                        }, 500);
                      }
                    }}
                    className="bg-gradient-to-r from-space-purple to-space-pink hover:from-space-purple/80 hover:to-space-pink/80 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
                  >
                    🎲 Крутить ещё
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-space-deep/95 backdrop-blur-md border-t border-space-purple/30 py-10 mt-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <a href="#" className="text-gray-400 hover:text-space-purple transition-colors">О проекте</a>
            <a href="#" className="text-gray-400 hover:text-space-cyan transition-colors">Правила</a>
            <a href="#" className="text-gray-400 hover:text-space-pink transition-colors">Поддержка</a>
            <a href="#" className="text-gray-400 hover:text-space-gold transition-colors">Контакты</a>
          </div>
          <p className="text-gray-500 text-lg">© 2024 Cosmic CS2. Все права во вселенной защищены. 🌌</p>
        </div>
      </footer>
    </div>
  );
};

// Payment Form Component
const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button
          variant={paymentMethod === 'card' ? 'default' : 'outline'}
          onClick={() => setPaymentMethod('card')}
          className={paymentMethod === 'card' ? 'bg-space-purple' : 'border-space-purple text-space-purple'}
        >
          <Icon name="CreditCard" className="mr-2" />
          Карта
        </Button>
        <Button
          variant={paymentMethod === 'crypto' ? 'default' : 'outline'}
          onClick={() => setPaymentMethod('crypto')}
          className={paymentMethod === 'crypto' ? 'bg-space-cyan' : 'border-space-cyan text-space-cyan'}
        >
          <Icon name="Bitcoin" className="mr-2" />
          Крипта
        </Button>
        <Button
          variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
          onClick={() => setPaymentMethod('wallet')}
          className={paymentMethod === 'wallet' ? 'bg-space-pink' : 'border-space-pink text-space-pink'}
        >
          <Icon name="Wallet" className="mr-2" />
          Кошелек
        </Button>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-space-cyan">Сумма пополнения</Label>
            <Select>
              <SelectTrigger className="bg-space-dark border-space-purple">
                <SelectValue placeholder="Выберите сумму" />
              </SelectTrigger>
              <SelectContent className="bg-space-dark border-space-purple">
                <SelectItem value="500">500₽</SelectItem>
                <SelectItem value="1000">1000₽</SelectItem>
                <SelectItem value="2500">2500₽</SelectItem>
                <SelectItem value="5000">5000₽</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-space-cyan">Номер карты</Label>
            <Input placeholder="1234 5678 9012 3456" className="bg-space-dark border-space-purple" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-space-cyan">MM/YY</Label>
              <Input placeholder="12/25" className="bg-space-dark border-space-purple" />
            </div>
            <div className="space-y-2">
              <Label className="text-space-cyan">CVV</Label>
              <Input placeholder="123" className="bg-space-dark border-space-purple" />
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-space-purple to-space-cyan">
            Пополнить баланс
          </Button>
        </div>
      )}

      {paymentMethod === 'crypto' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-space-cyan">Выберите криптовалюту</Label>
            <Select>
              <SelectTrigger className="bg-space-dark border-space-cyan">
                <SelectValue placeholder="Криптовалюта" />
              </SelectTrigger>
              <SelectContent className="bg-space-dark border-space-cyan">
                <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                <SelectItem value="usdt">Tether (USDT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-4 bg-space-dark/50 rounded border border-space-cyan/30 text-center">
            <p className="text-space-cyan mb-2">Адрес для пополнения:</p>
            <code className="text-xs bg-space-deep p-2 rounded">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code>
          </div>
          <Button className="w-full bg-gradient-to-r from-space-cyan to-space-purple">
            Я отправил платеж
          </Button>
        </div>
      )}
    </div>
  );
};

// Withdraw Section Component
const WithdrawSection = () => {
  const [withdrawMethod, setWithdrawMethod] = useState('money');

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-space-gold to-space-cyan bg-clip-text text-transparent mb-8 text-center">
        Вывод средств и скинов
      </h3>
      
      <div className="flex justify-center space-x-4 mb-8">
        <Button
          variant={withdrawMethod === 'money' ? 'default' : 'outline'}
          onClick={() => setWithdrawMethod('money')}
          className={withdrawMethod === 'money' ? 'bg-space-gold' : 'border-space-gold text-space-gold'}
        >
          <Icon name="DollarSign" className="mr-2" />
          Деньги
        </Button>
        <Button
          variant={withdrawMethod === 'skins' ? 'default' : 'outline'}
          onClick={() => setWithdrawMethod('skins')}
          className={withdrawMethod === 'skins' ? 'bg-space-purple' : 'border-space-purple text-space-purple'}
        >
          <Icon name="Package" className="mr-2" />
          Скины
        </Button>
      </div>

      <Card className="bg-space-deep/90 backdrop-blur-md border-space-gold/30">
        <CardHeader>
          <CardTitle className="text-space-gold">
            {withdrawMethod === 'money' ? 'Вывод денег' : 'Вывод скинов в Steam'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {withdrawMethod === 'money' && (
            <>
              <div className="space-y-2">
                <Label className="text-space-cyan">Способ вывода</Label>
                <Select>
                  <SelectTrigger className="bg-space-dark border-space-gold">
                    <SelectValue placeholder="Выберите способ" />
                  </SelectTrigger>
                  <SelectContent className="bg-space-dark border-space-gold">
                    <SelectItem value="card">Банковская карта</SelectItem>
                    <SelectItem value="qiwi">QIWI кошелек</SelectItem>
                    <SelectItem value="yandex">ЮMoney</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-space-cyan">Сумма к выводу</Label>
                <Input placeholder="0" className="bg-space-dark border-space-gold" />
                <p className="text-xs text-gray-400">Минимум: 500₽, Комиссия: 5%</p>
              </div>
              <div className="space-y-2">
                <Label className="text-space-cyan">Реквизиты</Label>
                <Input placeholder="Номер карты или кошелька" className="bg-space-dark border-space-gold" />
              </div>
              <Button className="w-full bg-gradient-to-r from-space-gold to-space-cyan">
                <Icon name="ArrowUpRight" className="mr-2" />
                Вывести деньги
              </Button>
            </>
          )}

          {withdrawMethod === 'skins' && (
            <>
              <div className="space-y-2">
                <Label className="text-space-cyan">Steam Trade URL</Label>
                <Input placeholder="https://steamcommunity.com/tradeoffer/new/..." className="bg-space-dark border-space-purple" />
                <p className="text-xs text-gray-400">
                  Найдите в настройках Steam → Торговые предложения → Ссылка для торговли
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inventory.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="p-4 bg-space-dark/50 rounded-lg border border-space-purple/30 flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-space-gold text-sm">{item.value}₽</p>
                    </div>
                    <Button size="sm" className="bg-space-purple">
                      Выбрать
                    </Button>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-space-purple to-space-pink">
                <Icon name="ExternalLink" className="mr-2" />
                Отправить скины в Steam
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6 bg-space-dark/50 border-space-cyan/30">
        <CardHeader>
          <CardTitle className="text-space-cyan text-lg">Статистика выводов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-space-gold">45,670₽</div>
              <p className="text-xs text-gray-400">Выведено денег</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-space-purple">127</div>
              <p className="text-xs text-gray-400">Скинов выведено</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-space-cyan">2 мин</div>
              <p className="text-xs text-gray-400">Среднее время</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;