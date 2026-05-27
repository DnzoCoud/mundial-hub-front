import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Sticker } from "@/mocks/stickersData";

interface PackOpeningModalProps {
  open: boolean;
  onClose: () => void;
  stickers: Sticker[];
}

export default function PackOpeningModal({ open, onClose, stickers }: PackOpeningModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-500/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">¡Paquete abierto!</DialogTitle>
          <DialogDescription className="text-gray-300">
            Has obtenido estas láminas:
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
          {stickers.map((sticker, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white/10 rounded-lg p-3 border border-white/20"
            >
              <span className="text-4xl mb-2">{sticker.emoji}</span>
              <span className="text-white text-sm font-medium text-center">{sticker.player}</span>
              <span className="text-gray-400 text-xs">{sticker.country}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-yellow-500 text-black">Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}