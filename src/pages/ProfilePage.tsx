import { useState, useEffect } from "react";
import { httpClient } from "@/app/infrastructure/http/httpClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Camera } from "lucide-react";

// Importar las 8 imágenes locales
import avatar1 from "@/assets/avatars/avatar1.png";
import avatar2 from "@/assets/avatars/avatar2.png";
import avatar3 from "@/assets/avatars/avatar3.png";
import avatar4 from "@/assets/avatars/avatar4.png";
import avatar5 from "@/assets/avatars/avatar5.png";
import avatar6 from "@/assets/avatars/avatar6.png";
import avatar7 from "@/assets/avatars/avatar7.png";
import avatar8 from "@/assets/avatars/avatar8.png";

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    birthDate: "",
    country: "",
    city: "",
    avatarUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await httpClient.get("/users/me");
        const data = response.data.data;
        setProfile({
          fullName: data.fullName || data.name || "",
          birthDate: data.birthDate ? data.birthDate.split("T")[0] : "",
          country: data.country || "",
          city: data.city || "",
          avatarUrl: data.avatarUrl || ""
        });
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        setMessage({ text: "Error al cargar los datos del perfil", type: "error" });
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    setProfile({ ...profile, avatarUrl: avatarImages[randomIndex] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!profile.fullName.trim()) {
      setMessage({ text: "El nombre completo es obligatorio", type: "error" });
      setLoading(false);
      return;
    }

    try {
      await httpClient.put("/users/me", {
        fullName: profile.fullName,
        birthDate: profile.birthDate || null,
        country: profile.country || null,
        city: profile.city || null,
        avatarUrl: profile.avatarUrl || null
      });
      setMessage({ text: "Perfil actualizado correctamente", type: "success" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error al actualizar:", error);
      setMessage({ text: "Error al actualizar el perfil", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-5xl border-white/20 bg-white/10 backdrop-blur-md shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-white">Mi Perfil</CardTitle>
          <p className="text-gray-300">Administra tu información personal</p>
        </CardHeader>
        <CardContent className="space-y-8 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center md:items-start space-y-6">
              <Avatar className="h-32 w-32 border-4 border-yellow-500 shadow-lg">
                {profile.avatarUrl ? (
                  <AvatarImage src={profile.avatarUrl} alt="Avatar" className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-yellow-500 text-black text-4xl">
                    {profile.fullName?.charAt(0) || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-300">Avatar de perfil</p>
                <p className="text-xs text-gray-400">Ilustración, no foto real</p>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="mt-3 gap-2 border-white/30 text-white hover:bg-white/10"
                  onClick={handleRandomAvatar}
                >
                  <Camera className="h-4 w-4" /> Generar avatar aleatorio
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="text-white text-base">Nombre completo</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  required
                  className="mt-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-base"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <Label htmlFor="birthDate" className="text-white text-base">Fecha de nacimiento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                  className="mt-1 h-12 bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="country" className="text-white text-base">País</Label>
                <Input
                  id="country"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="mt-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Ej: Colombia"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-white text-base">Ciudad</Label>
                <Input
                  id="city"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="mt-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Ej: Bogotá"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                  {loading ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>

              {message && (
                <p className={`text-center text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {message.text}
                </p>
              )}
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}