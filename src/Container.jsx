import { useState } from "react"
import Die from "./Die"
export default function Container() {
    const [numArray, setNumArray] = useState(Array(10).fill(0));


    const generateRandomNumberArray = () => {
        setNumArray(prevArray => {
           return prevArray.map(number => Math.round(Math.random() * 6));
           
        })
        console.log(numArray);
    }

    return (
       <div className="main--container">
            <h2>
              Tenzies
            </h2>
            <p>
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
         <div className="die--container">
            {
                numArray.map((num,idx) => (
                    <Die key={idx} number={num}/>
                ))
            }
           
         </div>
         <button onClick={generateRandomNumberArray}>Roll</button>
       </div>
    )
}