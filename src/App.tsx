
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";
import FloatingCharacter from "./components/FloatingCharacter";
import { NSFWWarningDialog } from "./components/NSFWWarningDialog";
import KeyboardTriggeredAnimation from "./components/KeyboardTriggeredAnimation";
import FullscreenKeyboardAnimation from "./components/FullscreenKeyboardAnimation";

// Create a query client with optimized default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1, // Reduce retry attempts to avoid unnecessary load
      networkMode: 'online', // Don't retry if offline
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NSFWWarningDialog />
      <BrowserRouter basename="/">
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <FloatingCharacter count={4} /> {/* Set global count to 4 */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery/:galleryId" element={<GalleryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <AudioPlayer />
          <KeyboardTriggeredAnimation 
            triggerKey="h" 
            cooldownTime={60000} 
            gifUrl="/image/hello.gif" 
            quote="ARF ARF WARFF BARK UwU !" 
            goodbyeQuote="Your Stupid, Bye <3"
          />
          <FullscreenKeyboardAnimation 
            triggerKey="g"
            cooldownTime={60000}
            gifUrl="/image/gay.gif"
            soundUrl="/music/gay.mp3"
            duration={3000}
          />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
