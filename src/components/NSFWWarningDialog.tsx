
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNSFWConsent } from "@/hooks/useNSFWConsent";

export function NSFWWarningDialog() {
  const [open, setOpen] = useState(false);
  const { hasGivenConsent, setConsent } = useNSFWConsent();

  useEffect(() => {
    // Show the dialog if consent hasn't been given
    setOpen(!hasGivenConsent());
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setOpen(false);
  };

  const handleQuit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="border border-neon-red bg-black bg-opacity-90 max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-neon-red text-shadow-neon">
            Avertissement Contenu Adulte
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white text-base">
            <div className="flex flex-col space-y-4">
              <p>
                Ce site contient du contenu destiné aux adultes (NSFW) qui peut inclure des éléments à caractère sexuel ou violent.
              </p>
              <p>
                En continuant, vous confirmez avoir <span className="font-bold text-neon-red">18 ans ou plus</span> et acceptez de visualiser ce contenu.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleQuit}
            variant="outline"
            className="w-full border-gray-500 hover:bg-gray-800"
          >
            Quitter
          </Button>
          <Button
            onClick={handleAccept}
            className="w-full bg-neon-red text-white hover:bg-neon-darkred transition-all neon-glow shadow-[0_0_10px_#D4095D]"
          >
            J'ai 18 ans ou plus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
