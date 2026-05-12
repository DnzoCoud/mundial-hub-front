import { useEffect, useState } from "react";
import { httpClient } from "@/app/infrastructure/http/httpClient";
import { Calendar, Trophy, Album, Star } from "lucide-react";
import styles from "./DashboardHome.module.css";

export default function DashboardHome() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    httpClient.get("/users/me").then(res => {
      setUsername(res.data.data.profile?.fullName || res.data.data.name);
    }).catch(() => {});
  }, []);

  const upcomingMatches = [
    { home: "Argentina", away: "Brasil", date: "26 Jun 2026" },
    { home: "Alemania", away: "Francia", date: "28 Jun 2026" },
  ];

  return (
    <div>
      <div className={styles.welcomeCard}>
        <h1 className={styles.welcomeTitle}>
          ¡Bienvenido, <span className={styles.welcomeName}>{username || "aficionado"}</span>!
        </h1>
        <p className="text-gray-300 mt-2">Vive el Mundial 2026 con una experiencia a tu medida.</p>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.card}>
          <Calendar className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Próximos partidos</h2>
          <div className="mt-2 space-y-2">
            {upcomingMatches.map((match, i) => (
              <div key={i} className="border-t border-white/10 pt-2 flex justify-between text-sm">
                <span className="text-white">{match.home} vs {match.away}</span>
                <span className="text-gray-400">{match.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card}>
          <Trophy className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Mis Pollas</h2>
          <p className={styles.cardText}>Crea o únete a una polla y compite con amigos.</p>
        </div>
        <div className={styles.card}>
          <Album className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Álbum Digital</h2>
          <p className={styles.cardText}>Colecciona las láminas del torneo.</p>
        </div>
      </div>

      <div className={styles.preferencesCard}>
        <div className="flex items-center gap-2 text-yellow-400">
          <Star className="h-5 w-5" /> <span className="font-semibold">Tus preferencias personalizan tu experiencia</span>
        </div>
        <p className="text-gray-300 text-sm mt-1">Configura tus equipos, ciudades y estadios favoritos.</p>
      </div>
    </div>
  );
}