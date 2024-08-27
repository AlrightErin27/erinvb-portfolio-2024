import "./Crossword.css";

import { useState, useEffect } from "react";
import Box from "./Box";

export default function Crossword() {
  const [boxes, setBoxes] = useState([]);
  const answers = [
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
  ];

  //get words (answers) in arr
  let words = [];
  answers.map((answer) => {
    let word = "";
    answer.a.split("").forEach((letter) => {
      if (letter !== " ") {
        word = word + letter.toLocaleLowerCase();
      }
    });
    words.push({
      text: word,
      question: answer.num,
      gridIdx: answer.local,
      dir: answer.dir,
    });
  });
  // console.log(...words);

  let letters = [];
  words.map((word) => {
    for (let i = 0; i < word.text.length; i++) {
      if (i !== 0) {
        if (word.dir === "hor") {
          letters.push({
            char: word.text[i],
            word: word.text,
            dir: word.dir,
            q: word.question,
            gridIdx: word.gridIdx + i,
            corner: false,
          });
        } else {
          letters.push({
            char: word.text[i],
            word: word.text,
            dir: word.dir,
            q: word.question,
            gridIdx: word.gridIdx + i * 16,
            corner: false,
          });
        }
      } else {
        if (word.dir === "hor") {
          letters.push({
            char: word.text[i],
            word: word.text,
            dir: word.dir,
            q: word.question,
            gridIdx: word.gridIdx + i,
            corner: true,
          });
        } else {
          letters.push({
            char: word.text[i],
            word: word.text,
            dir: word.dir,
            q: word.question,
            gridIdx: word.gridIdx + i * 16,
            corner: true,
          });
        }
      }
    }
  });

  const initGrid = () => {
    //creates an empty arr of objs
    const initArr = [];
    for (let i = 1; i < 321; i++) {
      initArr.push({
        black: true,
        key: Math.random() - 5,
        id: i,
      });
    }

    //mapps thu empty grid and inserts letters arr-> sets new arr into state
    let fillArr = initArr.map((box) => {
      for (let i = 0; i < letters.length; i++) {
        if (box.id === letters[i].gridIdx) {
          return {
            ...box,
            char: letters[i].char,
            word: letters[i].word,
            dir: letters[i].dir,
            q: letters[i].q,
            corner: letters[i].corner,
            black: false,
          };
        }
      }
      return box;
    });
    setBoxes(fillArr);
  };

  function sortAndDisplayQuestions(inputDir) {
    answers.sort((a, b) => (a.num > b.num ? 1 : b.num > a.num ? -1 : 0));

    return answers.map((answer, i) => {
      if (answer.dir === inputDir) {
        return (
          <div key={i}>
            <div>
              {answer.num}. {answer.q}
            </div>
            <br />
          </div>
        );
      }
    });
  }

  //sets boxes into state on page refresh
  useEffect(() => {
    initGrid();
  }, []);

  return (
    <div className="Crossword">
      <div className="grid-cont">
        {boxes.map((box) => {
          return <Box box={box} key={box.key} />;
        })}
      </div>
      <div className="questions">
        <h3>Across</h3>
        {sortAndDisplayQuestions("hor")}
        <h3>Down</h3>
        {sortAndDisplayQuestions("vert")}
      </div>
    </div>
  );
}
