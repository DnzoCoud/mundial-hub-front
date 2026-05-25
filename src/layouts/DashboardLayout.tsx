import { httpClient } from "@/app/infrastructure/http/httpClient";
import type { ComponentChild } from "@/app/types/basic.type";
import AppSidebar from "@/components/AppSidebar";
import PreferencesModal from "@/components/PreferencesModal";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import styles from "@/styles/DashboardLayout.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function DashboardLayout({ children }: ComponentChild) {
  const navigate = useNavigate();
  const [showPreferences, setShowPreferences] = useState(false);
  const [hasPrefs, setHasPrefs] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPreferences = async () => {
      try {
        const res = await httpClient.get("/users/me/preferences");
        const data = res.data.data;
        const isEmpty = data.favoriteTeams?.length === 0 && data.favoriteCities?.length === 0 && data.favoriteStadiums?.length === 0;
        setHasPrefs(!isEmpty);
        if (isEmpty) setShowPreferences(true);
      } catch (error) {
        console.error(error);
        
        setHasPrefs(false);
        setShowPreferences(true);
      }
    };
    checkPreferences();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.layout}>
      <SidebarProvider>
        <AppSidebar setShowPreferences={setShowPreferences} handleLogout={handleLogout} />
        <SidebarInset>
          <div className={styles.header}>
            <SidebarTrigger className="text-white" />
            <span className="text-white/70 text-sm tracking-wide">World Cup 2026</span>
          </div>
          <main className={styles.content}>
            {children}
          </main>
        </SidebarInset>
        <PreferencesModal
          open={showPreferences}
          onClose={() => setShowPreferences(false)}
          onSaved={() => setHasPrefs(true)}
        />
      </SidebarProvider>
    </div>
  );
}