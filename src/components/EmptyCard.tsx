import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function EmptyCard() {
  return (
    <Card className={"relative flex items-center justify-center h-20 w-20"}>
      {/* <span
        className={cn(
          "text-2xl font-bold transition-colors duration-300",
          isSelected ? "text-game-primary-glow" : "text-foreground"
        )}
      >
        {number}
      </span>
      
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-game-primary rounded-full animate-pulse" />
      )} */}
    </Card>
  );
}