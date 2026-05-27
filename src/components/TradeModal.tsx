import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Sticker } from "@/mocks/stickersData";
import { useState } from "react";

interface TradeModalProps {
  open: boolean;
  onClose: () => void;
  duplicates: Sticker[];
  missing: Sticker[];
  onTrade: (dupId: string, missId: string) => boolean;
}

export default function TradeModal({ open, onClose, duplicates, missing, onTrade }: TradeModalProps) {
  const [selectedDup, setSelectedDup] = useState<string>("");
  const [selectedMiss, setSelectedMiss] = useState<string>("");
  const [error, setError] = useState("");

  const handleTrade = () => {
    if (!selectedDup || !selectedMiss) {
      setError("Selecciona una repetida y una faltante");
      return;
    }
    const success = onTrade(selectedDup, selectedMiss);
    if (success) {
      setSelectedDup("");
      setSelectedMiss("");
      setError("");
      onClose();
    } else {
      setError("No se pudo realizar el intercambio");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-500/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-400">Intercambiar láminas</DialogTitle>
          <DialogDescription>Cambia una lámina repetida por una que te falta.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Repetidas */}
          <div>
            <h3 className="text-white font-semibold mb-2">Tus repetidas</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {duplicates.map(dup => (
                <button
                  key={dup.id}
                  onClick={() => setSelectedDup(dup.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                    selectedDup === dup.id ? 'bg-yellow-500/30 border border-yellow-400' : 'bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{dup.emoji}</span>
                  <div className="text-left">
                    <div className="text-white text-sm">{dup.player}</div>
                    <div className="text-gray-400 text-xs">{dup.country}</div>
                  </div>
                </button>
              ))}
              {duplicates.length === 0 && <p className="text-gray-400">No tienes repetidas.</p>}
            </div>
          </div>
          {/* Faltantes */}
          <div>
            <h3 className="text-white font-semibold mb-2">Láminas que te faltan</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {missing.map(miss => (
                <button
                  key={miss.id}
                  onClick={() => setSelectedMiss(miss.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                    selectedMiss === miss.id ? 'bg-yellow-500/30 border border-yellow-400' : 'bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{miss.emoji}</span>
                  <div className="text-left">
                    <div className="text-white text-sm">{miss.player}</div>
                    <div className="text-gray-400 text-xs">{miss.country}</div>
                  </div>
                </button>
              ))}
              {missing.length === 0 && <p className="text-gray-400">¡Completaste el álbum!</p>}
            </div>
          </div>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleTrade} disabled={!selectedDup || !selectedMiss} className="bg-yellow-500 text-black">
            Intercambiar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}