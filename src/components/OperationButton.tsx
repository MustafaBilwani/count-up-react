import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OperationButtonProps {
  operation: string;
  symbol: string;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function OperationButton({ 
  operation, 
  symbol, 
  isSelected, 
  onClick, 
  disabled 
}: OperationButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "h-16 w-16 text-2xl font-bold transition-all duration-300",
        "bg-gradient-card border-game-surface hover:border-game-primary hover:shadow-game-hover",
        "hover:scale-105 hover:bg-game-surface-hover",
        isSelected && "bg-gradient-selected border-game-primary shadow-game-selected scale-105 text-game-primary-glow",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100"
      )}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {symbol}
    </Button>
  );
}