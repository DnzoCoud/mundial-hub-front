import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { GroupsApi } from "@/app/infrastructure/api/groups.api";
import { PoolsApi } from "@/app/infrastructure/api/pools.api";
import { Loader2 } from "lucide-react";
import type { Group } from "@/app/infrastructure/models/group.model";

interface CreatePoolModalProps {
  open: boolean;
  onClose: () => void;
  onPoolCreated: () => void;
}

export default function CreatePoolModal({ open, onClose, onPoolCreated }: CreatePoolModalProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState<number | undefined>();
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      GroupsApi.getAll()
        .then(setGroups)
        .catch(() => setGroups([]))
        .finally(() => setLoadingGroups(false));
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroupId) {
      setError("Debes seleccionar un grupo");
      return;
    }
    if (!name.trim()) {
      setError("El nombre de la polla es obligatorio");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await PoolsApi.create(selectedGroupId, {
        name: name.trim(),
        description: description.trim() || undefined,
        maxMembers: maxMembers || undefined,
        isPrivate,
        startsAt: undefined,
        endsAt: undefined,
      });
      onPoolCreated();
      onClose();
      // Resetear formulario
      setSelectedGroupId("");
      setName("");
      setDescription("");
      setMaxMembers(undefined);
      setIsPrivate(false);
    } catch (err: any) {
      setError(err.message || "Error al crear la polla");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-500/50 shadow-2xl rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="pt-6 px-6 pb-2 border-b border-white/10">
          <DialogTitle className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <span>🏆</span> Nueva polla
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            <div>
              <Label className="text-white text-base font-medium">Grupo *</Label>
              <Select value={selectedGroupId} onValueChange={setSelectedGroupId} disabled={loadingGroups}>
                <SelectTrigger className="mt-1.5 h-12 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder={loadingGroups ? "Cargando grupos..." : "Selecciona un grupo"} />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-white/20 text-white">
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="pool-name" className="text-white text-base font-medium">
                Nombre de la polla *
              </Label>
              <Input
                id="pool-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Ganador del Grupo A"
                className="mt-1.5 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 transition-all"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-white text-base font-medium">
                Descripción (opcional)
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Reglas, premios, etc."
                className="mt-1.5 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="max-members" className="text-white text-base font-medium">
                Máximo de miembros (opcional)
              </Label>
              <Input
                id="max-members"
                type="number"
                value={maxMembers ?? ""}
                onChange={(e) => setMaxMembers(e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="Sin límite"
                className="mt-1.5 h-12 bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="is-private" className="text-white text-base font-medium cursor-pointer">
                Polla privada
              </Label>
              <Switch
                id="is-private"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
                className="data-[state=checked]:bg-yellow-500"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
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
              {loading ? "Creando..." : "Crear polla"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}