import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { GroupsApi } from "@/app/infrastructure/api/groups.api";
import { Loader2 } from "lucide-react";

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onGroupCreated: () => void;
}

export default function CreateGroupModal({ open, onClose, onGroupCreated }: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("El nombre del grupo es obligatorio");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await GroupsApi.create({ name: name.trim() });
      onGroupCreated();
      onClose();
      setName("");
    } catch (err: any) {
      setError(err.message || "Error al crear el grupo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-500/50 shadow-2xl rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="pt-6 px-6 pb-2 border-b border-white/10">
          <DialogTitle className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <span>⚽</span> Crear nuevo grupo
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Ingresa el nombre de tu grupo. Podrás agregar miembros después.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div>
              <Label htmlFor="group-name" className="text-white text-base font-medium">
                Nombre del grupo
              </Label>
              <Input
                id="group-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Los Triunfadores 2026"
                disabled={loading}
                className="mt-1.5 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500/30 transition-all"
                autoFocus
              />
              {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            </div>
          </div>
          <DialogFooter className="px-6 pb-6 pt-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold px-6"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Creando..." : "Crear grupo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}