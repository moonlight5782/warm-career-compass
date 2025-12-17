import { createContext, useContext, useState, ReactNode } from "react";
import { professions as initialProfessions, Profession } from "@/data/mockData";

interface ProfessionsContextType {
  professions: Profession[];
  addProfession: (profession: Profession) => void;
}

const ProfessionsContext = createContext<ProfessionsContextType | undefined>(undefined);

export const ProfessionsProvider = ({ children }: { children: ReactNode }) => {
  const [professions, setProfessions] = useState<Profession[]>(initialProfessions);

  const addProfession = (profession: Profession) => {
    setProfessions(prev => [...prev, profession]);
  };

  return (
    <ProfessionsContext.Provider value={{ professions, addProfession }}>
      {children}
    </ProfessionsContext.Provider>
  );
};

export const useProfessions = () => {
  const context = useContext(ProfessionsContext);
  if (!context) {
    throw new Error("useProfessions must be used within a ProfessionsProvider");
  }
  return context;
};
