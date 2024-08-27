import "./Crossword.css";

import { useState, useEffect } from "react";
import Box from "./Box";

export default function Crossword() {
  const answers = [
    {
      dir: "hor",
      local: 241,
      num: 12,
      q: "What is the name of the high school that Buffy attends in the first three seasons?",
      a: "Sunnydale High",
    },
    {
      dir: "vert",
      local: 56,
      num: 2,
      q: "What is the full name of Buffy’s best friend who eventually becomes a powerful witch?",
      a: "Willow Rosenberg",
    },
    {
      dir: "hor",
      local: 123,
      num: 5,
      q: "What is the first name of Buffy’s sister who is introduced in Season 5?",
      a: "Dawn",
    },
    {
      dir: "vert",
      local: 64,
      num: 3,
      q: "What is the name of the Hellmouth that Sunnydale is built over?",
      a: "Boca del Infierno",
    },
    {
      dir: "hor",
      local: 208,
      num: 10,
      q: "What is the last name of the principal who replaces Principal Flutie at Sunnydale High and becomes one of Buffy’s adversaries?",
      a: "Snyder",
    },
    {
      dir: "hor",
      local: 155,
      num: 9,
      q: "In Season 5, Buffy's sister is revealed to be The ___, which has the power to open dimensional portals.",
      a: "Key",
    },
    {
      dir: "vert",
      local: 153,
      num: 8,
      q: "The ___ is the name of the local nightclub in Sunnydale where Buffy and her friends often hang out?",
      a: "Bronze",
    },
    {
      dir: "vert",
      local: 148,
      num: 6,
      q: "Which friendly demon, known for his loose, floppy skin and love of kittens, becomes friends with Buffy and the Scooby Gang?",
      a: "Clem",
    },
    {
      dir: "hor",
      local: 93,
      num: 4,
      q: "___ ___ Spike nickname was given to Spike during his human days before he was turned into a vampire?",
      a: "Rail Road",
    },
    {
      dir: "vert",
      local: 13,
      num: 7,
      q: "What is Gile's first name?",
      a: "Rupert",
    },
    {
      dir: "vert",
      local: 227,
      num: 11,
      q: "Who was the vampire that sired Angel, turning him into a vampire in the 18th century?",
      a: "Darla",
    },
    {
      dir: "hor",
      local: 161,
      num: 7,
      q: "Processed ___ matter was the shocking secret ingredient in the burgers served at the Doublemeat Palace",
      a: "Vegetable",
    },
  ];
  let words = [],
    letters = [];
  const [boxes, setBoxes] = useState([]);

  //map all answer's answers (w/o spaces)) to words arr
  //words arr contains the question num, and teh word's direction
  answers.map((answer) => {
    let noSpaceWord = [];
    for (let i = 0; i < answer.a.length; i++) {
      if (answer.a[i] !== " ") {
        noSpaceWord.push(answer.a[i].toLocaleLowerCase());
      }
    }
    return words.push({
      wholeWord: noSpaceWord,
      idx: answer.num,
      dir: answer.dir,
      local: answer.local,
    });
  });

  //goes thru each word in words arr and adds a letter to
  //the letters arr for each letter of each word
  //each letter will have the words id, an id that says where it is in the word's arr
  //what word it belongs to, and what dir the word is
  words.forEach((word) => {
    //create a letter for each letter of each word
    let newLocal = word.local;
    for (let i = 0; i < word.wholeWord.length; i++) {
      if (word.dir === "hor" && i !== 0) {
        newLocal = newLocal + i;
      } else if (word.dir === "vert" && i !== 0) {
        newLocal = newLocal + i * 20;
      }
      letters.push({
        letter: word.wholeWord[i],
        word: word.wholeWord,
        dir: word.dir,
        qNum: word.idx,
        interiorIdx: i,
        local: newLocal,
      });
    }
  });

  const setGrid = () => {
    //make an empty arr
    const arr = [];
    for (let i = 1; i < 321; i++) {
      arr.push({
        black: true,
        idx: i,
        key: Math.random() - 0.5,
      });
    }

    let filledArr = arr.map((box) => {
      for (let i = 0; i < letters.length; i++) {
        if (box.idx === letters[i].local) {
          return {
            ...box,
            black: false,
            letter: letters[i].letter,
            word: letters[i].word,
            dir: letters[i].dir,
            qNum: letters[i].qNum,
            interiorIdx: letters[i].interiorIdx,
          };
        } else {
          return box;
        }
      }
    });

    setBoxes(filledArr);
  };

  // sets boxes arr when page is refreshed
  useEffect(() => {
    setGrid();
  }, []);

  console.log(...letters);
  return (
    <div className="Crossword">
      <div className="grid-cont">
        {boxes.map((box) => {
          return <Box box={box} key={box.key} />;
        })}
      </div>
    </div>
  );
}
