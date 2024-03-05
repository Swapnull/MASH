import React from "react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Play, Plus, Trash2 } from "lucide-react";
import Input from "./component/Input";
import { GameState } from "./PlayGame";

export const initialState = [
  {
    name: "MASH",
    options: ["Mansion", "Apartment", "Shack", "Hotel"],
  },
];

const exampleState = [
  ...initialState,
  {
    name: "Partner",
    options: ["Tony Stark", "Steve Rodgers", "Bruce Banner", "Nick Fury"],
  },
  {
    name: "Job",
    options: ["Teacher", "Scientist", "Spy", "Janitor"],
  },
  {
    name: "Car",
    options: ["Ferrari", "Bugatti", "Range Rover", "Fiat Punto"],
  },
  {
    name: "Kids",
    options: ["1", "5", "10", "1000"],
  },
];

interface CreateGameProps {
  play: (gameState: GameState) => void;
}

function CreateGame({ play }: CreateGameProps) {
  const [categories, setCategories] = useState<GameState>(initialState);

  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(initialState) !== JSON.stringify(categories)) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  const autofill = useCallback(() => {
    setCategories(exampleState);
  }, []);

  return (
    <div className="">
      <h1 className="mb-8">Welcome to MASH!</h1>

      <div className="max-w-[725px] mx-auto">
        <div className="flex justify-end">
          <Button
            className="mt-2"
            color="failure"
            onClick={() => {
              setCategories(initialState);
              localStorage.setItem("categories", JSON.stringify(initialState));
            }}
          >
            <Trash2 size="1rem" className="mr-1" />
            Reset game
          </Button>
        </div>
        {categories.map((category, index) => {
          return (
            <div key={category.name} className="mt-8 justify-start text-left">
              <div className="mb-2">Category name</div>
              <div className="flex items-center gap-2">
                <Input
                  value={category.name}
                  update={(newValue) =>
                    setCategories((prev) => {
                      const newArr = [...prev];
                      newArr[index] = {
                        ...newArr[index],
                        name: newValue,
                      };
                      return newArr;
                    })
                  }
                />
                <Trash2
                  size="1rem"
                  className="!cursor-pointer"
                  onClick={() => {
                    setCategories((prev) => {
                      const newArr = [...prev];
                      newArr.splice(index, 1);
                      return newArr;
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <div>Options</div>

                {category.options.map((option, optionIndex) => (
                  <div
                    className="flex items-center gap-2"
                    key={`${category.name}-${option}`}
                  >
                    <Input
                      value={option}
                      update={(newValue) =>
                        setCategories((prev) => {
                          const newArr = [...prev];
                          const newOptions = [...newArr[index].options];
                          newOptions[optionIndex] = newValue;
                          newArr[index] = {
                            ...newArr[index],
                            options: newOptions,
                          };
                          return newArr;
                        })
                      }
                    />
                    <Trash2
                      size="1rem"
                      className="!cursor-pointer"
                      onClick={() => {
                        setCategories((prev) => {
                          const newArr = [...prev];
                          const newOptions = [...newArr[index].options];
                          newOptions.splice(optionIndex, 1);
                          newArr[index] = {
                            ...newArr[index],
                            options: newOptions,
                          };
                          return newArr;
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  className="mt-2"
                  onClick={() => {
                    setCategories((prev) => {
                      const newArr = [...prev];
                      newArr[index] = {
                        ...newArr[index],
                        options: [...newArr[index].options, ""],
                      };
                      return newArr;
                    });
                  }}
                  color="warning"
                >
                  <Plus size="1rem" className="mr-1" />
                  Add another option
                </Button>
              </div>
            </div>
          );
        })}

        <div className="flex justify-end">
          <Button
            className="mt-8"
            onClick={() => {
              setCategories((prev) => {
                const newArr = [...prev];
                return [
                  ...newArr,
                  {
                    name: `category ${newArr.length}`,
                    options: ["Option 1", "Option 2"],
                  },
                ];
              });
            }}
          >
            <Plus />
            Add a category
          </Button>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            className="mt-8 w-full"
            onClick={() => play(categories)}
            color="success"
          >
            <Play />
            Play game
          </Button>
        </div>
        <div className="mt-12 border rounded-xl p-4">
          <h2>Development Tools:</h2>
          <Button onClick={() => autofill()} className="mt-4">
            Autofill options
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateGame;
