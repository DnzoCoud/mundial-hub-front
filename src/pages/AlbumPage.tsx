import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Repeat, Loader2 } from "lucide-react";
import { useAlbum } from "@/hooks/useAlbum";
import PackOpeningModal from "@/components/PackOpeningModal";
import TradeModal from "@/components/TradeModal";
import { toast } from "sonner";

export default function AlbumPage() {
  const {
    loading,
    packs,
    stickers,
    getCount,
    openPack,
    getDuplicates,
    getMissing,
    trade,
    progress,
  } = useAlbum();

  const [openedPackStickers, setOpenedPackStickers] = useState<any[]>([]);
  const [showPackModal, setShowPackModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);

  const handleOpenPack = () => {
    const newStickers = openPack();
    if (newStickers.length === 0) {
      toast.error("No tienes paquetes disponibles.");
      return;
    }
    setOpenedPackStickers(newStickers);
    setShowPackModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  // Agrupar stickers por país (opcional)
  const stickersByCountry = stickers.reduce((acc, sticker) => {
    if (!acc[sticker.country]) acc[sticker.country] = [];
    acc[sticker.country].push(sticker);
    return acc;
  }, {} as Record<string, typeof stickers>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header con progreso y botones */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Álbum Digital</h1>
          <p className="text-gray-300">Colecciona todas las láminas del Mundial</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowTradeModal(true)}
            className="gap-2 border-white/30 text-white hover:bg-white/10"
            disabled={getDuplicates().length === 0 || getMissing().length === 0}
          >
            <Repeat className="h-5 w-5" /> Intercambiar repetidas
          </Button>
          <Button
            onClick={handleOpenPack}
            className="gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold"
          >
            <Gift className="h-5 w-5" /> Abrir paquete ({packs} disponibles)
          </Button>
        </div>
      </div>

      {/* Progreso */}
      <Card className="border-white/20 bg-white/10 backdrop-blur-md mb-8">
        <CardHeader>
          <CardTitle className="text-white">Tu progreso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-yellow-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${(progress.collected / progress.total) * 100}%` }}
            />
          </div>
          <p className="text-gray-300 mt-2">
            {progress.collected} de {progress.total} láminas (
            {Math.round((progress.collected / progress.total) * 100)}%)
          </p>
        </CardContent>
      </Card>

      {/* Álbum por países */}
      {Object.entries(stickersByCountry).map(([country, stickersList]) => (
        <div key={country} className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">{country}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {stickersList.map((sticker) => {
              const count = getCount(sticker.id);
              const isCollected = count > 0;
              const isDuplicate = count > 1;
              return (
                <div
                  key={sticker.id}
                  className={`relative p-4 rounded-xl border transition-all ${
                    isCollected
                      ? 'bg-gradient-to-br from-green-900/40 to-green-800/20 border-green-500/50'
                      : 'bg-white/5 border-white/10 opacity-80'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-5xl">{sticker.emoji}</span>
                    <p className="text-white font-medium mt-2">{sticker.player}</p>
                    {isCollected && (
                      <Badge className="mt-2 bg-yellow-500 text-black">
                        {count === 1 ? 'Pegada' : `x${count}`}
                      </Badge>
                    )}
                    {!isCollected && (
                      <Badge variant="outline" className="mt-2 border-gray-500 text-gray-400">
                        ?
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Modales */}
      <PackOpeningModal
        open={showPackModal}
        onClose={() => setShowPackModal(false)}
        stickers={openedPackStickers}
      />
      <TradeModal
        open={showTradeModal}
        onClose={() => setShowTradeModal(false)}
        duplicates={getDuplicates()}
        missing={getMissing()}
        onTrade={trade}
      />
    </div>
  );
}
