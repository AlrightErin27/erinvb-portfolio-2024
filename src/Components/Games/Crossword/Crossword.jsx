import "./Crossword.css";
import { useState, useEffect } from "react";
import Square from "./Square";
import Modal from "./BuffyModal";
import BuffyLogo from "../../../Images/Games/Crossword/logo.png";

export default function Crossword() {
  // const inputRef = useRef("");
  const [squares, setSquares] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [selModal, setSelModal] = useState(false);
  const [nextGridIdx, setNextGridIdx] = useState(null);

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

  //TO DO: make handleUserInput change nextGridIdx only when fresh char has been entered
  //or if the square's char is already filled-> skip over

  //fills squares instate with data trickled down from questions arr
  useEffect(() => {
    //create a new words array that contains:
    //the word, its direction, its question # & its location on the grid
    const words = answers.map((data) => {
      //change answer to lowercase and any remove white spaces
      let altAnswer = data.a.replace(/ /g, "").toLocaleLowerCase();
      return {
        fullWord: altAnswer,
        q: data.num,
        grid_ID: data.local,
        dir: data.dir,
      };
    });

    //create new letters array that contains:
    //char, word, dir, q, grid_ID & corner piece boolean
    let letters = [];
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words[i].fullWord.length; j++) {
        letters.push({
          char: words[i].fullWord[j],
          word: words[i].fullWord,
          dir: words[i].dir,
          q: words[i].q,
          grid_ID:
            words[i].dir === "hor"
              ? words[i].grid_ID + j
              : words[i].grid_ID + j * 16,
          corner: j === 0,
        });
      }
    }

    //create empty grid of 320 squares
    const emptySquares = Array.from({ length: 320 }, (_, i) => ({
      black: true,
      grid_ID: i + 1,
      chars: [],
      words: [],
      dirs: [],
      questions: [],
      highLight: false,
      corner: false,
    }));
    // console.log(emptySquares[319]);

    //then map through those empty cells adding letters array at correct grid_ID's
    //if two cells have same grid_ID push both words, chars, dirs and q's into the arr's
    const alteredSquares = emptySquares.map((square) => {
      const matchingLetters = letters.filter(
        (letter) => letter.grid_ID === square.grid_ID
      );

      matchingLetters.forEach((matchingLetter) => {
        if (!square.chars.includes(matchingLetter.char)) {
          square.chars.push(matchingLetter.char);
        }
        if (!square.words.includes(matchingLetter.word)) {
          square.words.push(matchingLetter.word);
        }
        if (!square.dirs.includes(matchingLetter.dir)) {
          square.dirs.push(matchingLetter.dir);
        }
        if (!square.questions.includes(matchingLetter.q)) {
          square.questions.push(matchingLetter.q);
        }
        if (matchingLetter.corner) {
          square.corner = true;
        }
        // Set black to false
        square.black = false;
      });

      return square;
    });

    setSquares(alteredSquares);
  }, []);

  function handleUserInput(e, sq) {
    console.log(sq);
    setNextGridIdx(null);
    console.log(e);

    //set currSq and find what will be next squares dom input
    for (let i = 0 + sq.grid_ID; i < squares.length; i++) {
      //if the next id has HL, and square in sq array includes the selSquare's word
      //and if their grid_IDs do not match
      if (
        squares[i].highLight &&
        squares[i].words.includes(sq.words[0] || sq.words[1]) &&
        squares[i].grid_ID !== sq.grid_ID
      ) {
        setNextGridIdx(squares[i].grid_ID);
        break;
      }
    }
  }
  if (nextGridIdx) {
    console.log("NEXT:", nextGridIdx);
    let nextInput = document.querySelector(
      `input.input[data-grid-id="${nextGridIdx}"]`
    );
    nextInput.focus();
  }

  function clickSquare(selSq) {
    // console.log("SELECT", selSq);
    setNextGridIdx(null);

    let arrHL = squares.map((sq) => {
      let direction = clicks === 0 ? "hor" : "vert";
      //does the select cell have one word? -> if yes highlight it
      if (selSq.words.length === 1) {
        if (sq.words.includes(selSq.words[0])) {
          return { ...sq, highLight: true };
        }
      } else if (selSq.words.length === 2) {
        if (
          (selSq.dirs[0] === direction && sq.words.includes(selSq.words[0])) ||
          (selSq.dirs[1] === direction && sq.words.includes(selSq.words[1]))
        ) {
          return { ...sq, highLight: true };
        }
      }
      return { ...sq, highLight: false };
    });

    setSquares(arrHL);
    //set clicks based on 1st or 2nd user click on sq
    clicks === 0 ? setClicks(1) : setClicks(0);
  }

  const displayQs = (dir) => {
    return (
      <div>
        <h3> {dir === "hor" ? "Across" : "Down"}</h3>
        <div>
          {answers
            .sort((a, b) => a.num - b.num)
            .map((question) => {
              if (question.dir === dir) {
                return (
                  <div className="q-li" key={question.num}>
                    {question.num}. {question.q}
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    );
  };

  const handleModal = () => {
    setSelModal(!selModal);
  };

  return (
    <div className="Crossword">
      <div className="crossword-cont">
        <img
          src={BuffyLogo}
          alt="Buffy Logo"
          height="20%"
          className="buffy-logo"
        />
        <div
          className="grid-cont"
          style={!selModal ? { zIndex: "100" } : { zIndex: null }}
        >
          <div className="grid">
            {squares.map((sq) => {
              return (
                <Square
                  sq={sq}
                  key={sq.grid_ID}
                  clickSquare={clickSquare}
                  handleUserInput={handleUserInput}
                />
              );
            })}
          </div>
        </div>

        <div className="questions">
          {displayQs("hor")}
          {displayQs("vert")}
        </div>
        <div className="help" onClick={() => handleModal()}>
          <h2 className="help-txt">[HELP]</h2>
        </div>
        {selModal ? (
          <Modal handleModal={handleModal} answers={answers} />
        ) : null}
      </div>
    </div>
  );
}
