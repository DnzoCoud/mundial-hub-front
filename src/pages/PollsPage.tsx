import { useEffect, useState } from "react";
import { PoolsApi } from "@/app/infrastructure/api/pools.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Lock, Unlock, Users, Trophy, Sparkles, Calendar } from "lucide-react";
import CreatePoolModal from "@/components/CreatePoolModal";
import type { PoolSummary } from "@/app/infrastructure/models/pool.model";
import { toast } from "sonner";

export default function PollsPage() {
  const [pools, setPools] = useState<PoolSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loadPools = async () => {
    try {
      const data = await PoolsApi.getAll();
      setPools(data);
    } catch (error) {
      toast.error("Error al cargar las pollas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPools();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-yellow-400 text-lg">Cargando pollas...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Mis Pollas</h1>
          <p className="text-gray-300 text-lg mt-1">Demuestra tu conocimiento futbolístico</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold shadow-lg transition-all duration-200 px-6 py-2 text-base"
        >
          <Plus className="h-5 w-5" /> Crear polla
        </Button>
      </div>

      {/* Lista de pollas o estado vacío */}
      {pools.length === 0 ? (
        <Card className="border-white/20 bg-white/5 backdrop-blur-md shadow-xl text-center py-12">
          <CardContent>
            <div className="flex justify-center mb-4">
              <Trophy className="h-16 w-16 text-yellow-400/60" />
            </div>
            <p className="text-gray-200 text-xl font-medium">Aún no participas en ninguna polla</p>
            <p className="text-gray-400 mt-2">Crea una nueva polla dentro de uno de tus grupos</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pools.map((pool) => (
            <Card
              key={pool.id}
              className="border-white/20 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-xl font-bold line-clamp-1">{pool.name}</CardTitle>
                  <div className="flex gap-2 items-center">
                    {pool.isPrivate ? (
                      <Lock className="h-4 w-4 text-gray-400" aria-label="Privada" />
                    ) : (
                      <Unlock className="h-4 w-4 text-gray-400" aria-label="Pública" />
                    )}
                    <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      {pool.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                  {pool.description || "Sin descripción"}
                </p>
                <div className="flex justify-between items-center text-sm border-t border-white/10 pt-3">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Users className="h-3.5 w-3.5" />
                    <span>{pool.membersCount} / {pool.maxMembers ?? "∞"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                    <Trophy className="h-3.5 w-3.5" />
                    <span>{pool.totalPoints} pts</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                  <span>Código:</span>
                  <code className="bg-black/30 px-1.5 py-0.5 rounded font-mono">{pool.code}</code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreatePoolModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPoolCreated={loadPools}
      />
    </div>
  );
}