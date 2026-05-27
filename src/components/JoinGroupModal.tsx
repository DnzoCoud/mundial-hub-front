import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { GroupsApi } from "@/app/infrastructure/api/groups.api";
import { Loader2 } from "lucide-react";

interface JoinGroupModalProps {
  open: boolean;
  onClose: () => void;
  onGroupJoined: () => void;
}

export default function JoinGroupModal({ open, onClose, onGroupJoined }: JoinGroupModalProps) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para extraer el token si el usuario pega una URL completa
  const extractToken = (input: string): string => {
    const trimmed = input.trim();
    if (trimmed.startsWith('http')) {
      try {
        const url = new URL(trimmed);
        const t = url.searchParams.get('token');
        return t || trimmed;
      } catch {
        return trimmed;
      }
    }
    return trimmed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawToken = token.trim();
    if (!rawToken) {
      setError("El código de invitación es obligatorio");
      return;
    }
    const cleanToken = extractToken(rawToken);
    setLoading(true);
    setError("");
    try {
      await GroupsApi.joinByToken(cleanToken);
      onGroupJoined();
      onClose();
      setToken("");
    } catch (err: any) {
      setError(err.message || "Código inválido o expirado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-500/50 shadow-2xl rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="pt-6 px-6 pb-2 border-b border-white/10">
          <DialogTitle className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <span>🔗</span> Unirse a un grupo
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Ingresa el código de invitación o pega el enlace completo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div>
              <Label htmlFor="invite-code" className="text-white text-base font-medium">
                Código o enlace de invitación
              </Label>
              <Input
                id="invite-code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Ej: ABC123XYZ  o  http://localhost:5173/unirse?token=..."
                disabled={loading}
                className="mt-1.5 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 transition-all"
                autoFocus
              />
              {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            </div>
            <p className="text-xs text-gray-400">
              El código suele tener 8 caracteres alfanuméricos. Puedes pegar el enlace completo.
            </p>
          </div>
          <DialogFooter className="px-6 pb-6 pt-2 gap-3">
            <Button variant="outline" onClick={onClose} disabled={loading} className="border-white/30 text-white">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Uniendo..." : "Unirse"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}