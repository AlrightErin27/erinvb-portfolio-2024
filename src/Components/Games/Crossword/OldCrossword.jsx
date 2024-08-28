import "./Crossword.css";
import { useState, useEffect, useCallback, useMemo } from "react";
import Box from "./Box";
import Buffy from "../../../Images/Games/Crossword/buffy1.png";
import BuffyLogo from "../../../Images/Games/Crossword/logo.png";

export default function Crossword() {
  const [boxes, setBoxes] = useState([]);

  const answers = useMemo(
    () => [
      {
        dir: "hor",
        local: 257,
        num: 12,
        q: "What is the name of the high school that Buffy attends in the first three seasons?",
        a: "Sunnydale High",
      },
      {
        dir: "vert",
        local: 44,
        num: 2,
        q: "What is the full name of Buffy’s best friend who eventually becomes a powerful witch?",
        a: "Willow Rosenberg",
      },
      {
        dir: "hor",
        local: 99,
        num: 5,
        q: "What is the first name of Buffy’s sister who is introduced in Season 5?",
        a: "Dawn",
      },
      {
        dir: "vert",
        local: 52,
        num: 3,
        q: "What is the name of the Hellmouth that Sunnydale is built over?",
        a: "Boca del Infierno",
      },
      {
        dir: "hor",
        local: 232,
        num: 10,
        q: "What is the last name of the principal who replaces Principal Flutie at Sunnydale High and becomes one of Buffy’s adversaries?",
        a: "Snyder",
      },
      {
        dir: "hor",
        local: 187,
        num: 9,
        q: "In Season 5, Buffy's sister is revealed to be The ___, which has the power to open dimensional portals.",
        a: "Key",
      },
      {
        dir: "vert",
        local: 185,
        num: 8,
        q: "The ___ is the name of the local nightclub in Sunnydale where Buffy and her friends often hang out?",
        a: "Bronze",
      },
      {
        dir: "vert",
        local: 120,
        num: 6,
        q: "Which friendly demon, known for his loose, floppy skin and love of kittens, becomes friends with Buffy and the Scooby Gang?",
        a: "Clem",
      },
      {
        dir: "hor",
        local: 73,
        num: 4,
        q: "___ ___ Spike nickname was given to Spike during his human days before he was turned into a vampire?",
        a: "Rail Road",
      },
      {
        dir: "vert",
        local: 9,
        num: 1,
        q: "What is Gile's first name?",
        a: "Rupert",
      },
      {
        dir: "vert",
        local: 247,
        num: 11,
        q: "Who was the vampire that sired Angel, turning him into a vampire in the 18th century?",
        a: "Darla",
      },
      {
        dir: "hor",
        local: 129,
        num: 7,
        q: "Processed ___ matter was the shocking secret ingredient in the burgers served at the Doublemeat Palace",
        a: "Vegetable",
      },
    ],
    []
  ); // Empty dependency array since `answers` does not depend on anything external

  // Get words (answers) in an array
  const words = useCallback(() => {
    return answers.map((answer) => {
      let word = answer.a.replace(/ /g, "").toLocaleLowerCase();
      return {
        text: word,
        question: answer.num,
        gridIdx: answer.local,
        dir: answer.dir,
      };
    });
  }, [answers]);

  const letters = useCallback(() => {
    return words().flatMap((word) => {
      return Array.from(word.text).map((char, i) => {
        return {
          char: char,
          word: word.text,
          dir: word.dir,
          q: word.question,
          gridIdx:
            word.dir === "hor" ? word.gridIdx + i : word.gridIdx + i * 16,
          corner: i === 0,
        };
      });
    });
  }, [words]);

  const initGrid = useCallback(() => {
    const initArr = Array.from({ length: 320 }, (_, i) => ({
      black: true,
      key: i + 1,
      id: i + 1,
      chars: [],
      words: [],
    }));

    const fillArr = initArr.map((box) => {
      const letter = letters().find((letter) => box.id === letter.gridIdx);
      return letter
        ? {
            ...box,
            chars: box.chars ? box.chars.push(letter.char) : box.chars,
            words: box.words ? box.words.push(letter.word) : box.words,
            dir: letter.dir,
            q: letter.q,
            corner: letter.corner,
            black: false,
            highLight: false,
          }
        : box;
    });

    setBoxes(fillArr);
  }, [letters]);

  useEffect(() => {
    initGrid();
  }, [initGrid]);

  //display questions
  const sortAndDisplayQuestions = useCallback(
    (inputDir) => {
      const sortedAnswers = answers
        .filter((answer) => answer.dir === inputDir)
        .sort((a, b) => a.num - b.num);

      return sortedAnswers.map((answer, i) => (
        <div key={i}>
          <div>
            {answer.num}. {answer.q}
          </div>
          <br />
        </div>
      ));
    },
    [answers]
  );

  function handleHL(currBox) {
    // e.preventDefault();
    console.log(currBox);
    // setBoxes(
    //   boxes.map((box) => {
    //     //   if (currBox.words[0].includes(box.words[0])) {
    //     //     console.log("HL", box.words);
    //     //     return { ...box, highLight: true };
    //     //   } else {
    //     //     return { ...box, highLight: false };
    //     //   }
    //     currBox.words.forEach((currWord) => {
    //       box.words.forEach((boxWord) => {
    //         if (currWord === boxWord) {
    //           return { ...box, highLight: true };
    //         } else {
    //           return { ...box, highLight: false };
    //         }
    //       });
    //     });
    //   })
    // );
  }

  return (
    <div className="Crossword">
      <img src={BuffyLogo} alt="buffy logo" className="logo-img" />
      <div className="crossword-cont">
        <div className="grid-cont">
          {boxes.map((box) => (
            <Box box={box} key={box.id} handleHL={handleHL} />
          ))}
        </div>
        <div className="questions">
          <h3>Across</h3>
          {sortAndDisplayQuestions("hor")}
          <h3>Down</h3>
          {sortAndDisplayQuestions("vert")}
        </div>
        <img src={Buffy} alt="buffy" className="buffy-img" />
      </div>
    </div>
  );
}
