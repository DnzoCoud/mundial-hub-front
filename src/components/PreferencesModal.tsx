import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { httpClient } from "@/app/infrastructure/http/httpClient";
import { Check } from "lucide-react";

interface PreferencesModalProps {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

// Datos (puedes ampliarlos después)
const COUNTRIES = [
  "Argentina", "Brasil", "Alemania", "Francia", "España", "Inglaterra",
  "Países Bajos", "Portugal", "Colombia", "Uruguay", "Estados Unidos",
  "México", "Canadá", "Japón", "Corea del Sur", "Marruecos"
];

const CITIES = [
  "Atlanta", "Boston", "Dallas", "Houston", "Los Ángeles", "Miami",
  "Nueva York", "Seattle", "Ciudad de México", "Guadalajara",
  "Monterrey", "Toronto", "Vancouver"
];

const STADIUMS = [
  "Mercedes-Benz Stadium", "SoFi Stadium", "MetLife Stadium",
  "Estadio Azteca", "BC Place", "AT&T Stadium", "Hard Rock Stadium",
  "Levi's Stadium"
];

export default function PreferencesModal({ open, onClose, onSaved }: PreferencesModalProps) {
  const [teams, setTeams] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [stadiums, setStadiums] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      httpClient.get("/users/me/preferences")
        .then(res => {
          const data = res.data.data;
          setTeams(data.favoriteTeams || []);
          setCities(data.favoriteCities || []);
          setStadiums(data.favoriteStadiums || []);
        })
        .catch(err => console.error("Error loading preferences", err));
    }
  }, [open]);

  const toggleSelection = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (list.includes(value)) {
      setList(list.filter(v => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await httpClient.put("/users/me/preferences", {
        favoriteTeams: teams,
        favoriteCities: cities,
        favoriteStadiums: stadiums
      });
      onSaved?.();
      onClose();
    } catch (error) {
      console.error("Error saving preferences", error);
    } finally {
      setLoading(false);
    }
  };

  const SelectionGrid = ({ items, selected, onToggle }: { items: string[], selected: string[], onToggle: (val: string) => void }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {items.map(item => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`
            group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200
            ${selected.includes(item)
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 border-transparent text-black shadow-lg shadow-yellow-500/30"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-yellow-400/50"
            }
          `}
        >
          <span className="font-semibold text-base md:text-lg">{item}</span>
          {selected.includes(item) && <Check className="h-5 w-5 text-black" />}
        </button>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-[95vw] w-[95vw] lg:!max-w-[1400px] lg:w-[1400px] max-h-[85vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-yellow-500/30 rounded-2xl p-0 shadow-2xl">
        <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-t-2xl border-b border-yellow-500/30 p-6">
          <DialogHeader>
            <DialogTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 text-center">
              Personaliza tu Mundial
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300 text-base mt-2">
              El tus equipos, ciudades y estadios favoritos para una experiencia única.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="px-6 pt-0 pb-4">
          <Tabs defaultValue="teams" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 rounded-xl p-0 gap-2" style={{ height: '50px' }}>
              <TabsTrigger
                value="teams"
                 className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-lg text-white text-xl font-semibold rounded-lg transition-all h-full flex items-center justify-center"
              >
                Equipos
              </TabsTrigger>
              <TabsTrigger
                value="cities"
                className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-lg text-white text-xl font-semibold rounded-lg transition-all h-full flex items-center justify-center"
              >
                Ciudades
              </TabsTrigger>
              <TabsTrigger
                value="stadiums"
                className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-lg text-white text-xl font-semibold rounded-lg transition-all h-full flex items-center justify-center"
              >
                Estadios
              </TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="teams" className="mt-0">
                <SelectionGrid items={COUNTRIES} selected={teams} onToggle={(val) => toggleSelection(teams, setTeams, val)} />
              </TabsContent>
              <TabsContent value="cities" className="mt-0">
                <SelectionGrid items={CITIES} selected={cities} onToggle={(val) => toggleSelection(cities, setCities, val)} />
              </TabsContent>
              <TabsContent value="stadiums" className="mt-0">
                <SelectionGrid items={STADIUMS} selected={stadiums} onToggle={(val) => toggleSelection(stadiums, setStadiums, val)} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
        <div className="flex justify-end gap-4 p-6 pt-2 border-t border-white/10 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/30 text-white hover:bg-white/10 px-6 py-2 text-base"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-2 text-base shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? "Guardando..." : "Guardar preferencias"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}