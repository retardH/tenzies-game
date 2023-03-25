import { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Container() {
  const { width, height } = useWindowSize();

  const generateNewDice = () => {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  };

  const generateRandomNumberArray = () => {
    let diceObjArray,
      diceNumArray = [];

    diceNumArray = Array(10)
      .fill(0)
      .map((number) => Math.ceil(Math.random() * 6));
    diceObjArray = diceNumArray.map((dice) => {
      return {
        id: nanoid(),
        value: dice,
        isHeld: false,
      };
    });

    return diceObjArray;
  };
  const [tenzies, setTenzies] = useState(false);
  const [numArray, setNumArray] = useState(generateRandomNumberArray());
  const [numberOfRolls, setNumberOfRolls] = useState(0);
  const [bestScore, setBestScore] = useState();

  useEffect(() => {
    if (
      numArray.every((num) => num.isHeld === true) &&
      numArray.every((num) => num.value === numArray[0].value)
    ) {
      setTenzies(true);
      setBestScore((prevScore) =>
        prevScore < numberOfRolls && prevScore !== 0 ? prevScore : numberOfRolls
      );
    }
  }, [numArray]);

  const rollDice = () => {
    if (tenzies) {
      setBestScore((prevScore) =>
        prevScore < numberOfRolls + 1 ? prevScore : numberOfRolls + 1
      );

      setTenzies(!tenzies);
      setNumArray(generateRandomNumberArray());
      setNumberOfRolls(0);
    } else {
      setNumArray((prevNumArray) =>
        prevNumArray.map((num) => {
          return num.isHeld ? num : generateNewDice();
        })
      );
      setNumberOfRolls((rolls) => rolls + 1);
    }
  };

  const holdDice = (id) => {

    setNumArray((prevNumArray) => {
      return prevNumArray.map((num) => {
        if (num.id === id) {
          return {
            ...num,
            isHeld: !num.isHeld,
          };
        } else {
          return num;
        }
      });
    });
  };

  return (
    <div className="main--container">
      {tenzies && (
        <Confetti
          numberOfPieces={500}
          gravity={0.2}
          width={width}
          height={height}
        />
      )}
      <h2>{tenzies ? "Congratulation! You won" : "Tenzies"}</h2>
      <p>
        {tenzies
          ? `Current Score: ${numberOfRolls} | Best Score: ${bestScore}`
          : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
      </p>
      <div className="die--container">
        {numArray.map((num) => (
          <Die
            key={num.id}
            number={num.value}
            isHeld={num.isHeld}
            holdDice={() => holdDice(num.id)}
          />
        ))}
      </div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </div>
  );
}
