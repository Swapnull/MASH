import React from "react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "flowbite-react";
import { initialState } from "./CreateGame";
import { Recycle, RotateCcw } from "lucide-react";

interface Category {
  name: string;
  options: Array<string>;
}

export type GameState = Array<Category>;

export interface PlayGameProps {
  gameData: GameState;
  reset: () => void;
}

function PlayGame({ gameData, reset }: PlayGameProps) {
  const [highlighted, setHighlighted] = useState([0, 0]);
  const [gameState, setGameState] = useState<GameState>(gameData);
  const [result, setResult] = useState<GameState>([]);
  const [steps] = useState(Math.floor(Math.random() * 10) + 1);

  useEffect(() => {
    if (gameData.length) {
      const result = [];

      const categories = structuredClone(gameData);
      let currentIndex = 0;
      let currentCategory = 0;
      let currentOption = 0;

      const interval = setInterval(() => {
        if ((currentIndex + 1) % steps === 0) {
          // the option was chosen to be discarded
          if (categories[currentCategory].options.length === 2) {
            // this is the last option to be discarded to get the categories result
            categories[currentCategory].options.splice(currentOption, 1);
            result.push(categories[currentCategory]);
            categories.splice(currentCategory, 1);

            if (categories.length - 1 > currentCategory) {
              currentCategory++;
            } else {
              currentCategory = 0;
            }
            currentOption = 0;
          } else {
            categories[currentCategory].options.splice(currentOption, 1);

            if (
              categories[currentCategory].options.length - 1 <
              currentOption
            ) {
              currentOption = 0;
              if (categories.length - 1 > currentCategory) {
                currentCategory++;
              } else {
                currentCategory = 0;
              }
            }
          }
          currentIndex = 0;

          // game over
          if (categories.length === 0) {
            clearInterval(interval);
          }
        } else {
          if (categories[currentCategory].options.length - 1 > currentOption) {
            currentOption = currentOption + 1;
          } else {
            currentOption = 0;
            if (categories.length - 1 > currentCategory) {
              currentCategory = currentCategory + 1;
            } else {
              currentCategory = 0;
            }
          }
          currentIndex++;
        }

        setHighlighted([currentCategory, currentOption]);
        setGameState(categories);
        setResult(result);
      }, 1000);
    }
  }, [gameData]);

  return (
    <div className="">
      <h1 className="mb-8">Let&apos;s play MASH!</h1>

      <h2 className="text-xl font-semibold">Magic number: {steps}</h2>

      {result.length === gameData?.length ? (
        <div className="max-w-[725px] mx-auto">
          {result.map((res) => (
            <div key={`result-${res.name}`} className="text-left">
              <strong className="text-xl">{res.name}</strong>: {res.options[0]}
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              className="mt-2"
              color="success"
              onClick={() => {
                localStorage.setItem(
                  "categories",
                  JSON.stringify(initialState)
                );
                reset();
              }}
            >
              <RotateCcw size="1rem" className="mr-1" />
              Play again
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-[725px] mx-auto">
          {gameData.map((category, index) => {
            return (
              <div key={category.name} className="mt-8 justify-start text-left">
                <h2 className="mb-2 font-semibold text-2xl">{category.name}</h2>

                <div className="flex flex-col gap-2 mt-4">
                  {category.options.map((option, optionIndex) => {
                    const currState = gameState?.find(
                      (res) => res.name === category.name
                    )?.options;
                    const res = result.find(
                      (res) => res.name === category.name
                    )?.options;
                    return (
                      <div
                        className={clsx(
                          "flex items-center gap-2 p-2 rounded-md",
                          {
                            "bg-yellow-400":
                              gameState?.[highlighted[0]]?.options[
                                highlighted[1]
                              ] === gameData[index].options[optionIndex],
                            "!bg-red-400": res
                              ? true
                              : !currState?.includes(
                                  gameData[index].options[optionIndex]
                                ),
                            "!bg-green-500":
                              res?.[0] === gameData[index].options[optionIndex],
                          }
                        )}
                        key={`${category.name}-${option}`}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PlayGame;
