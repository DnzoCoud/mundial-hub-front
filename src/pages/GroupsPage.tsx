import { useEffect, useState } from "react";
import { GroupsApi } from "@/app/infrastructure/api/groups.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Copy, LogOut, Trash2, LinkIcon, Sparkles } from "lucide-react";
import CreateGroupModal from "@/components/CreateGroupModal";
import JoinGroupModal from "@/components/JoinGroupModal";
import type { Group } from "@/app/infrastructure/models/group.model";
import { toast } from "sonner";

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const loadGroups = async () => {
    try {
      const data = await GroupsApi.getAll();
      setGroups(data);
    } catch (error) {
      toast.error("Error al cargar los grupos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleCopyInviteLink = async (groupId: string, groupName: string) => {
    try {
      const { inviteLink } = await GroupsApi.generateInviteToken(groupId);
      const fullLink = `${window.location.origin}/unirse?token=${inviteLink}`;
      await navigator.clipboard.writeText(fullLink);
      toast.success(`Enlace de invitación para "${groupName}" copiado`);
    } catch {
      toast.error("No se pudo generar el enlace");
    }
  };

  const handleLeaveGroup = async (groupId: string, groupName: string) => {
    if (confirm(`¿Salir del grupo "${groupName}"?`)) {
      try {
        await GroupsApi.leave(groupId);
        toast.success(`Has salido del grupo "${groupName}"`);
        loadGroups();
      } catch {
        toast.error("No se pudo salir del grupo");
      }
    }
  };

  const handleDeleteGroup = async (groupId: string, groupName: string) => {
    if (confirm(`¿Eliminar permanentemente el grupo "${groupName}"?`)) {
      try {
        await GroupsApi.delete(groupId);
        toast.success(`Grupo "${groupName}" eliminado`);
        loadGroups();
      } catch {
        toast.error("Solo el propietario puede eliminar el grupo");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-yellow-400 text-lg">Cargando grupos...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header con título y botones */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Mis Grupos</h1>
          <p className="text-gray-300 text-lg mt-1">Organiza tu experiencia mundialista</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowJoinModal(true)}
            variant="outline"
            className="gap-2 border-white/30 text-white hover:bg-white/10 hover:text-yellow-400 transition-all duration-200 px-5 py-2 text-base"
          >
            <LinkIcon className="h-5 w-5" /> Unirse por código
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-semibold shadow-lg transition-all duration-200 px-6 py-2 text-base"
          >
            <Plus className="h-5 w-5" /> Crear grupo
          </Button>
        </div>
      </div>

      {/* Lista de grupos o estado vacío */}
      {groups.length === 0 ? (
        <Card className="border-white/20 bg-white/5 backdrop-blur-md shadow-xl text-center py-12">
          <CardContent>
            <div className="flex justify-center mb-4">
              <Sparkles className="h-16 w-16 text-yellow-400/60" />
            </div>
            <p className="text-gray-200 text-xl font-medium">Aún no formas parte de ningún grupo</p>
            <p className="text-gray-400 mt-2">Crea tu primer grupo o únete mediante un código de invitación</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => {
            const isOwner = group.users.some((u) => u.role === "OWNER");
            return (
              <Card
                key={group.id}
                className="border-white/20 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white text-xl font-bold">{group.name}</CardTitle>
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      {group.users.length} {group.users.length === 1 ? "miembro" : "miembros"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {group.users.slice(0, 4).map((user) => (
                      <div key={user.id} className="flex justify-between items-center text-sm border-b border-white/10 py-1">
                        <span className="text-gray-200">{user.name}</span>
                        <Badge variant="outline" className="text-xs bg-transparent text-yellow-400 border-yellow-400/50">
                          {user.role}
                        </Badge>
                      </div>
                    ))}
                    {group.users.length > 4 && (
                      <div className="text-xs text-gray-400 pt-1">+{group.users.length - 4} más</div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyInviteLink(group.id, group.name)}
                      className="gap-1 text-xs border-white/30 text-white hover:bg-white/10"
                    >
                      <Copy className="h-3.5 w-3.5" /> Invitar
                    </Button>
                    {!isOwner && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLeaveGroup(group.id, group.name)}
                        className="gap-1 text-xs border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <LogOut className="h-3.5 w-3.5" /> Salir
                      </Button>
                    )}
                    {isOwner && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteGroup(group.id, group.name)}
                        className="gap-1 text-xs"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Eliminar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <CreateGroupModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onGroupCreated={loadGroups}
      />
      <JoinGroupModal
        open={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onGroupJoined={loadGroups}
      />
    </div>
  );
}