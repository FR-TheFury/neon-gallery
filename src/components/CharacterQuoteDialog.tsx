
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

type Character = {
  id: string;
  name: string;
  title?: string;
  quote: string;
  gifUrl: string;
};

interface CharacterQuoteDialogProps {
  character: Character | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CharacterQuoteDialog({ character, open, onOpenChange }: CharacterQuoteDialogProps) {
  if (!character) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-neon-red shadow-[0_0_15px_rgba(212,9,93,0.5)] max-w-4xl w-[95vw] sm:w-[90vw] md:w-[80vw] rounded-md p-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-neon-pink">
            {character.name}
            {character.title && <span className="block text-sm font-normal text-gray-400 mt-1">{character.title}</span>}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-3 w-full">
          <div className="relative w-full h-auto max-h-[70vh] overflow-hidden rounded-md border border-neon-pink">
            <img
              src={character.gifUrl || "/placeholder.svg"}
              alt={`${character.name} animation`}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          </div>
          
          <blockquote className="text-center italic text-white border-l-4 border-neon-pink pl-4 py-2">
            "{character.quote}"
          </blockquote>
        </div>
      </DialogContent>
    </Dialog>
  );
}
