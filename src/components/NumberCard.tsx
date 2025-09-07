import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NumberCardProps {
  number: number;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function NumberCard({ number, isSelected, onClick, disabled }: NumberCardProps) {
  return (
    <Card
      className={cn(
        "relative flex items-center justify-center h-20 w-20 cursor-pointer transition-all duration-300 ease-bounce",
        "bg-gradient-card border-game-surface hover:border-game-primary hover:shadow-game-hover",
        "transform hover:scale-105",
        isSelected && "bg-gradient-selected border-game-primary shadow-game-selected scale-105",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none"
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <span
        className={cn(
          "text-2xl font-bold transition-colors duration-300",
          isSelected ? "text-game-primary-glow" : "text-foreground"
        )}
      >
        {number}
      </span>
      
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-game-primary rounded-full animate-pulse" />
      )}
    </Card>
  );
}