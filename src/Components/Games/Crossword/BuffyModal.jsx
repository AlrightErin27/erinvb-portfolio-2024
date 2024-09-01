import "./BuffyModal.css";
import { useState } from "react";

export default function BuffyModal({ handleModal, answers }) {
  const [selKey, setSelKey] = useState(false);

  function removeAnswerSpaces(ans) {
    let ansArr = ans.split("");
    let word = "";
    // console.log(ansArr);
    ansArr.forEach((char) => {
      if (char !== " ") {
        word = word.concat(char);
      }
    });

    return word;
  }

  const displayOptions = () => {
    return (
      <>
        <ol>
          <li>To reveal letter, double click square.</li>
          <li>Select key for answer sheet.</li>
        </ol>

        <div className="key" onClick={() => setSelKey(!selKey)} />
      </>
    );
  };

  const displayAnswers = () => {
    return (
      <div className="answers">
        {answers.map((answer) => {
          return (
            <div key={answer.num}>
              {answer.num}. {removeAnswerSpaces(answer.a)} [
              {answer.dir === "vert" ? "down" : "across"}]
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="BuffyModal">
      <div className="exit-cont">
        <div className="exit" onClick={() => handleModal()}>
          [X]
        </div>
      </div>
      {!selKey ? displayOptions() : displayAnswers()}
    </div>
  );
}
