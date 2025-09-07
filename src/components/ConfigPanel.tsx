import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Settings } from "lucide-react";

interface GameConfig {
  minTarget: number;
  maxTarget: number;
  maxSmallNumber: number;
  numSmallNumbers: number;
}

interface ConfigPanelProps {
  onGenerateGame: (config: GameConfig) => void;
  isGameActive: boolean;
}

export function ConfigPanel({ onGenerateGame, isGameActive }: ConfigPanelProps) {
  const [config, setConfig] = useState<GameConfig>({
    minTarget: 100,
    maxTarget: 999,
    maxSmallNumber: 10,
    numSmallNumbers: 6,
  });
  const [error, setError] = useState<string>("");

  const handleGenerate = () => {
    setError("");

    // Validation
    if (config.maxTarget < config.minTarget || config.minTarget < 1) {
      setError("Maximum target must be greater than minimum target, and minimum must be at least 1.");
      return;
    }

    if (config.numSmallNumbers <= 1) {
      setError("Number of small numbers must be greater than 1.");
      return;
    }

    if (config.maxSmallNumber < 1) {
      setError("Maximum value for small numbers must be at least 1.");
      return;
    }

    onGenerateGame(config);
  };

  const updateConfig = (field: keyof GameConfig, value: number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user makes changes
  };

  return (
    <Card className="w-80 bg-gradient-card border-game-surface">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-game-primary">
          <Settings className="h-5 w-5" />
          Game Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="minTarget" className="text-sm font-medium">
            Minimum Target Number
          </Label>
          <Input
            id="minTarget"
            type="number"
            value={config.minTarget}
            onChange={(e) => updateConfig("minTarget", parseInt(e.target.value) || 0)}
            className="bg-game-surface border-game-surface-hover focus:border-game-primary"
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxTarget" className="text-sm font-medium">
            Maximum Target Number
          </Label>
          <Input
            id="maxTarget"
            type="number"
            value={config.maxTarget}
            onChange={(e) => updateConfig("maxTarget", parseInt(e.target.value) || 0)}
            className="bg-game-surface border-game-surface-hover focus:border-game-primary"
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxSmallNumber" className="text-sm font-medium">
            Maximum Value for Small Numbers
          </Label>
          <Input
            id="maxSmallNumber"
            type="number"
            value={config.maxSmallNumber}
            onChange={(e) => updateConfig("maxSmallNumber", parseInt(e.target.value) || 0)}
            className="bg-game-surface border-game-surface-hover focus:border-game-primary"
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numSmallNumbers" className="text-sm font-medium">
            Number of Small Numbers
          </Label>
          <Input
            id="numSmallNumbers"
            type="number"
            value={config.numSmallNumbers}
            onChange={(e) => updateConfig("numSmallNumbers", parseInt(e.target.value) || 0)}
            className="bg-game-surface border-game-surface-hover focus:border-game-primary"
            min="2"
            max="10"
          />
        </div>

        {error && (
          <Alert className="border-game-danger bg-game-danger/10">
            <AlertDescription className="text-game-danger text-sm">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleGenerate}
          className="w-full bg-gradient-primary hover:shadow-game-hover transition-all duration-300"
          disabled={isGameActive}
        >
          {isGameActive ? "Game in Progress" : "Generate Game"}
        </Button>
      </CardContent>
    </Card>
  );
}