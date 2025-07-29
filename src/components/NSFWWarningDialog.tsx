
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation('nsfw');

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
            {t('warning')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white text-base">
            <div className="flex flex-col space-y-4">
              <p>
                {t('ageWarning')}
              </p>
              <p>
                {t('confirmAge')} <span className="font-bold text-neon-red">{t('yearsOld')}</span> {t('ageConsent')}
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
            {t('quit')}
          </Button>
          <Button
            onClick={handleAccept}
            className="w-full bg-neon-red text-white hover:bg-neon-darkred transition-all neon-glow shadow-[0_0_10px_#D4095D]"
          >
            {t('iAmEighteenPlus')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
