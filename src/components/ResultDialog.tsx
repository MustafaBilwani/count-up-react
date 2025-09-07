import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, X } from "lucide-react";

interface ResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isWin: boolean;
  target: number;
  onNewGame: () => void;
}

export function ResultDialog({ 
  isOpen, 
  onClose, 
  isWin, 
  target, 
  onNewGame 
}: ResultDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-game-surface">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isWin ? (
              <div className="relative">
                <Trophy className="h-16 w-16 text-game-accent animate-bounce" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-game-success rounded-full animate-ping" />
              </div>
            ) : (
              <X className="h-16 w-16 text-game-danger" />
            )}
          </div>
          
          <DialogTitle className={cn(
            "text-2xl font-bold",
            isWin ? "text-game-success" : "text-game-danger"
          )}>
            {isWin ? "Congratulations!" : "Game Over"}
          </DialogTitle>
          
          <DialogDescription className="text-lg">
            {isWin 
              ? `You successfully reached the target number ${target}!` 
              : `You couldn't reach the target number ${target}. Better luck next time!`
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-game-surface border-game-surface-hover hover:bg-game-surface-hover"
          >
            Close
          </Button>
          <Button
            onClick={onNewGame}
            className="flex-1 bg-gradient-primary hover:shadow-game-hover"
          >
            New Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}