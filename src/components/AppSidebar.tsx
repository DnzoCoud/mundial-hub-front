import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarFooter } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Home, Calendar, Trophy, Album, Users, Settings, User, LogOut } from "lucide-react";
import logoImg from "@/assets/logoMundialBlanco.png";

interface AppSidebarProps {
  setShowPreferences: (show: boolean) => void;
  handleLogout: () => void;
}

export default function AppSidebar({ setShowPreferences, handleLogout }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-yellow-600/30 bg-[#0c1a2a] shadow-2xl shadow-black/50">
      <SidebarHeader>
        <div className="flex h-48 items-center justify-center border-b border-yellow-600/30">
          <img src={logoImg} alt="Mundial 2026" className="h-full w-auto drop-shadow-xl" />
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 px-2">
        <SidebarGroup>
          <SidebarMenu className="space-y-5">
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-gray-200 hover:text-yellow-400 hover:bg-white/10 py-5 text-lg px-4">
                <Link to="/dashboard"><Home className="mr-3 h-6 w-6" /> Inicio</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-gray-200 hover:text-yellow-400 hover:bg-white/10 py-5 text-lg px-4">
                <Link to="/agenda"><Calendar className="mr-3 h-6 w-6" /> Mi Agenda</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-gray-200 hover:text-yellow-400 hover:bg-white/10 py-5 text-lg px-4">
                <Link to="/pollas"><Trophy className="mr-3 h-6 w-6" /> Mis Pollas</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-gray-200 hover:text-yellow-400 hover:bg-white/10 py-5 text-lg px-4">
                <Link to="/album"><Album className="mr-3 h-6 w-6" /> Álbum Digital</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-gray-200 hover:text-yellow-400 hover:bg-white/10 py-5 text-lg px-4">
                <Link to="/grupos"><Users className="mr-3 h-6 w-6" /> Grupos</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setShowPreferences(true)}
                className="text-gray-200 hover:text-yellow-400 hover:bg-white/10 py-5 text-lg px-4"
              >
                <Settings className="mr-3 h-6 w-6" /> Preferencias
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="text-gray-200 hover:text-yellow-400 hover:bg-white/10 py-5 text-lg px-4">
                <Link to="/perfil"><User className="mr-3 h-6 w-6" /> Mi Perfil</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="pt-6 mt-6 border-t border-yellow-600/30">
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="text-red-300 hover:text-red-200 hover:bg-red-900/20 py-5 text-lg px-4"
              >
                <LogOut className="mr-3 h-6 w-6" /> Cerrar Sesión
              </SidebarMenuButton>
            </SidebarMenuItem>
          </div>
      </SidebarFooter>
    </Sidebar>
  );
}