import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NumberCard } from "./NumberCard";
import { OperationButton } from "./OperationButton";
import { ResultDialog } from "./ResultDialog";
import { Trash2, RotateCcw, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmptyCard } from "./EmptyCard";

interface SelectedNumber {
  value: number;
  index: number;
}

interface GameState {
  numbers: (number | null)[];
  target: number;
  selectedNumbers: SelectedNumber[];
  selectedOperation: string | null;
  gameOver: boolean;
  isWin: boolean;
}

interface GameBoardProps {
  target: number;
  initialNumbers: number[];
  onReset: () => void;
}

const operations = [
  { name: "add", symbol: "+" },
  { name: "subtract", symbol: "−" },
  { name: "multiply", symbol: "×" },
  { name: "divide", symbol: "÷" },
];

export function GameBoard({ target, initialNumbers, onReset }: GameBoardProps) {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    numbers: [...initialNumbers],
    target,
    selectedNumbers: [],
    selectedOperation: null,
    gameOver: false,
    isWin: false,
  });
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Check win condition
    if (gameState.numbers.includes(target)) {
      setGameState(prev => ({ ...prev, gameOver: true, isWin: true }));
      setShowResult(true);
      return;
    }

    // Check lose condition - count non-null numbers
    const activeNumbers = gameState.numbers.filter(n => n !== null);
    if (activeNumbers.length === 1 && !activeNumbers.includes(target)) {
      setGameState(prev => ({ ...prev, gameOver: true, isWin: false }));
      setShowResult(true);
    }
  }, [gameState.numbers, target]);

  const handleNumberClick = (number: number, index: number) => {
    if (gameState.gameOver) return;

    if (gameState.selectedNumbers.length === 2) return; // Already have 2 numbers

    const numberWithIndex = { value: number, index };
    
    const newState = {
      ...gameState,
      selectedNumbers: gameState.selectedNumbers.some(n => n.index === index)
        ? gameState.selectedNumbers.filter(n => n.index !== index)
        : [...gameState.selectedNumbers, numberWithIndex],
    }
    setGameState(newState);

    if(gameState.selectedOperation) setTimeout(() => calculateResult(newState), 100)
  };

  const handleOperationClick = (operation: string) => {
    if (gameState.gameOver || gameState.selectedOperation === operation) {
      return;
    }

    // if (gameState.selectedNumbers.length !== 2) {
    //   toast({
    //     description: "Please select exactly 2 numbers first",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    const newState = {...gameState, selectedOperation: operation}
    setGameState(newState);

    // Immediately calculate when we have 2 numbers and 1 operation
    if(gameState.selectedNumbers.length === 2) calculateResult(newState);
  };

  const calculateResult = ({
    selectedNumbers: [num1, num2],
    selectedOperation: operation
  } : {
    selectedNumbers: typeof gameState.selectedNumbers,
    selectedOperation: string
  }) => {
    // if (gameState.selectedNumbers.length !== 2) return;

    const larger = Math.max(num1.value, num2.value);
    const smaller = Math.min(num1.value, num2.value);
    let result: number;

    switch (operation) {
      case "add":
        result = num1.value + num2.value;
        break;
      case "subtract":
        result = larger - smaller;
        break;
      case "multiply":
        result = num1.value * num2.value;
        break;
      case "divide":
        if (smaller === 0 || larger % smaller !== 0) {
          toast({
            description: "Division must result in a whole number",
            variant: "destructive",
          });
          handleDeselect();
          return;
        }
        result = larger / smaller;
        break;
      default:
        return;
    }

    // Update the numbers array - set second number to null instead of removing
    const newNumbers = [...gameState.numbers];
    const firstIndex = Math.min(num1.index, num2.index);
    const secondIndex = Math.max(num1.index, num2.index);
    
    // Replace first selected number with result
    newNumbers[firstIndex] = result;
    
    // Set second selected number to null
    newNumbers[secondIndex] = null;

    setGameState(prev => ({
      ...prev,
      numbers: newNumbers,
      selectedNumbers: [],
      selectedOperation: null,
    }));

    // toast({
    //   description: `${num1.value} ${operations.find(op => op.name === operation)?.symbol} ${num2.value} = ${result}`,
    // });
  };

  const handleDeselect = () => {
    setGameState(prev => ({
      ...prev,
      selectedNumbers: [],
      selectedOperation: null,
    }));
  };

  const handleNewGame = () => {
    setShowResult(false);
    onReset();
  };

  return (
    <div className="flex-1 p-6 space-y-8">
      {/* Target Display */}
      <Card className="mx-auto w-fit bg-gradient-primary border-game-primary shadow-game-card">
        <CardContent className="flex items-center gap-3 py-4 px-6">
          <Target className="h-6 w-6 text-primary-foreground" />
          <div className="text-center">
            <p className="text-sm font-medium text-primary-foreground/80">Target</p>
            <p className="text-4xl font-bold text-primary-foreground">{target}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-8 justify-center">
        {/* Numbers Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Numbers</h3>
          <div className="grid grid-cols-3 gap-4 max-w-xs">
            {gameState.numbers.map((number, index) => 
              number !== null ? (
                <NumberCard
                  key={`${number}-${index}`}
                  number={number}
                  isSelected={gameState.selectedNumbers.some(n => n.index === index)}
                  onClick={() => handleNumberClick(number, index)}
                  disabled={gameState.gameOver || gameState.selectedNumbers.length === 2 && !gameState.selectedNumbers.some(n => n.index === index)}
                />
              ) : <EmptyCard/>
            )}
          </div>
        </div>

        {/* Operations */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Operations</h3>
          <div className="flex flex-col gap-3">
            {operations.map((op) => (
              <OperationButton
                key={op.name}
                operation={op.name}
                symbol={op.symbol}
                isSelected={gameState.selectedOperation === op.name}
                onClick={() => handleOperationClick(op.name)}
                disabled={gameState.gameOver || !!gameState.selectedOperation}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          onClick={handleDeselect}
          disabled={gameState.gameOver || (gameState.selectedNumbers.length === 0 && !gameState.selectedOperation)}
          className="bg-game-surface border-game-surface-hover hover:bg-game-surface-hover"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Deselect
        </Button>
        
        <Button
          onClick={onReset}
          className="bg-gradient-primary hover:shadow-game-hover"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          New Game
        </Button>
      </div>

      <ResultDialog
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        isWin={gameState.isWin}
        target={target}
        onNewGame={handleNewGame}
      />
    </div>
  );
}