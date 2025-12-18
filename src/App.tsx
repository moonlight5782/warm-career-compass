// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { ProfessionsProvider } from "@/contexts/ProfessionsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import CompaniesPage from "./pages/CompaniesPage";
import ContactsPage from "./pages/ContactsPage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useState, useEffect } from "react";
import GlobalLoader from "@/components/GlobalLoader";

// ИЛИ если ErrorBoundary экспортирован как именованный:
// import { ErrorBoundary } from "@/components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          {isLoading ? (
            <GlobalLoader />
          ) : (
            <AuthProvider>
              <SearchProvider>
                <ProfessionsProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/companies" element={<CompaniesPage />} />
                        <Route path="/contacts" element={<ContactsPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </TooltipProvider>
                </ProfessionsProvider>
              </SearchProvider>
            </AuthProvider>
          )}
          </LanguageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

// Экспорт по умолчанию
export default App;