import { useState } from "react";
import { ConfigPanel } from "./ConfigPanel";
import { GameBoard } from "./GameBoard";

interface GameConfig {
  minTarget: number;
  maxTarget: number;
  maxSmallNumber: number;
  numSmallNumbers: number;
}

interface GameData {
  target: number;
  numbers: number[];
}

export function CountdownGame() {
  const [gameData, setGameData] = useState<GameData | null>(null);

  const generateGame = (config: GameConfig) => {
    // Generate random target
    const target = Math.floor(
      Math.random() * (config.maxTarget - config.minTarget + 1) + config.minTarget
    );

    // Generate small numbers
    const numbers: number[] = [];
    for (let i = 0; i < config.numSmallNumbers; i++) {
      const number = Math.floor(Math.random() * config.maxSmallNumber) + 1;
      numbers.push(number);
    }

    setGameData({ target, numbers });
  };

  const resetGame = () => {
    setGameData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Countdown Numbers Game
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use the small numbers and basic operations (+, −, ×, ÷) to reach the target number. 
            You can only use each number once!
          </p>
        </header>

        <div className="flex gap-6 justify-center">
          <ConfigPanel 
            onGenerateGame={generateGame} 
            isGameActive={gameData !== null} 
          />
          
          {gameData && (
            <GameBoard
              target={gameData.target}
              initialNumbers={gameData.numbers}
              onReset={resetGame}
            />
          )}
          
          {!gameData && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4 max-w-md">
                <div className="w-24 h-24 mx-auto bg-gradient-card rounded-full flex items-center justify-center border border-game-surface">
                  <span className="text-4xl">🎯</span>
                </div>
                <h2 className="text-2xl font-semibold text-game-primary">
                  Ready to Play?
                </h2>
                <p className="text-muted-foreground">
                  Configure your game settings and click "Generate Game" to start playing!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}