import { useState, useEffect } from "react";
import { httpClient } from "@/app/infrastructure/http/httpClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, MapPin, Camera } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ fullName: "", birthDate: "", country: "", avatarUrl: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    httpClient.get("/users/me").then(res => {
      const data = res.data.data;
      setProfile({
        fullName: data.profile?.fullName || data.name,
        birthDate: data.profile?.birthDate?.split("T")[0] || "",
        country: data.profile?.country || "",
        avatarUrl: data.profile?.avatarUrl || "",
      });
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await httpClient.put("/users/me", {
        fullName: profile.fullName,
        birthDate: profile.birthDate,
        country: profile.country,
        avatarUrl: profile.avatarUrl
      });
      setMessage("Perfil actualizado correctamente");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-white/20 bg-white/10 backdrop-blur-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Mi Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-start">
          <Avatar className="h-24 w-24 border-4 border-primary">
            {profile.avatarUrl ? (
              <AvatarImage src={profile.avatarUrl} />
            ) : (
              <AvatarFallback className="bg-primary text-3xl text-white">
                {profile.fullName?.charAt(0) || "U"}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">Avatar de perfil</p>
            <p className="text-xs text-muted-foreground">Usa una ilustración, no foto real</p>
            <Button variant="outline" size="sm" className="gap-2">
              <Camera className="h-4 w-4" /> Cambiar avatar
            </Button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-white">Nombre completo</Label>
            <Input
              id="fullName"
              value={profile.fullName}
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              required
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="birthDate" className="text-white">Fecha de nacimiento</Label>
            <Input
              id="birthDate"
              type="date"
              value={profile.birthDate}
              onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-white">País</Label>
            <Input
              id="country"
              value={profile.country}
              onChange={(e) => setProfile({...profile, country: e.target.value})}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>Guardar cambios</Button>
          </div>
          {message && (
            <p className={`text-center text-sm ${message.includes("correctamente") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}