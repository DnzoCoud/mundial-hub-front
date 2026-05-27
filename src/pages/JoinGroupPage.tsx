import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { GroupsApi } from "@/app/infrastructure/api/groups.api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function JoinGroupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Código de invitación no válido");
      return;
    }
    GroupsApi.joinByToken(token)
      .then(() => {
        setStatus("success");
        setMessage("Te has unido al grupo exitosamente");
        setTimeout(() => navigate("/grupos"), 2000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "Error al unirse al grupo");
      });
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="max-w-md w-full border-white/20 bg-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white text-center">Unirse a grupo</CardTitle>
          <CardDescription className="text-center text-gray-300">
            Procesando tu invitación...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === "loading" && <Loader2 className="h-8 w-8 animate-spin mx-auto text-yellow-400" />}
          <p className={`mt-4 ${status === "success" ? "text-green-400" : "text-red-400"}`}>{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}