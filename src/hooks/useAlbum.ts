import { useState, useEffect } from 'react';
import type { Sticker } from '@/mocks/stickersData';
import stickers from '@/mocks/stickersData';

type Collection = Record<string, number>; // stickerId -> count

const STORAGE_KEY = 'album_collection';
const PACKS_STORAGE_KEY = 'album_packs';

export function useAlbum() {
  const [collection, setCollection] = useState<Collection>({});
  const [packs, setPacks] = useState<number>(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCollection = localStorage.getItem(STORAGE_KEY);
    const storedPacks = localStorage.getItem(PACKS_STORAGE_KEY);
    if (storedCollection) {
      setCollection(JSON.parse(storedCollection));
    } else {
      const empty: Collection = {};
      stickers.forEach(s => { empty[s.id] = 0; });
      setCollection(empty);
    }
    if (storedPacks) {
      setPacks(parseInt(storedPacks));
    } else {
      setPacks(3);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
      localStorage.setItem(PACKS_STORAGE_KEY, packs.toString());
    }
  }, [collection, packs, loading]);

  const openPack = (): Sticker[] => {
    if (packs <= 0) return [];
    const total = stickers.length;
    const newStickers: Sticker[] = [];
    const newCollection = { ...collection };
    for (let i = 0; i < 5; i++) {
      const idx = Math.floor(Math.random() * total);
      const sticker = stickers[idx];
      newStickers.push(sticker);
      newCollection[sticker.id] = (newCollection[sticker.id] || 0) + 1;
    }
    setCollection(newCollection);
    setPacks(packs - 1);
    return newStickers;
  };

  const getCount = (id: string): number => collection[id] || 0;

  const getDuplicates = (): Sticker[] => {
    return stickers.filter(s => getCount(s.id) > 1);
  };

  const getMissing = (): Sticker[] => {
    return stickers.filter(s => getCount(s.id) === 0);
  };

  const trade = (duplicateId: string, missingId: string): boolean => {
    const dupCount = getCount(duplicateId);
    if (dupCount < 2) return false;
    const missingCount = getCount(missingId);
    if (missingCount > 0) return false;
    const newCollection = { ...collection };
    newCollection[duplicateId] = dupCount - 1;
    newCollection[missingId] = 1;
    setCollection(newCollection);
    return true;
  };

  const progress = {
    collected: stickers.filter(s => getCount(s.id) > 0).length,
    total: stickers.length,
  };

  return {
    loading,
    packs,
    openPack,
    getCount,
    getDuplicates,
    getMissing,
    trade,
    progress,
    stickers,
  };
}