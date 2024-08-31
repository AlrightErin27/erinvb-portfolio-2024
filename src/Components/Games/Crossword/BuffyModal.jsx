import "./BuffyModal.css";
import { useState } from "react";

export default function BuffyModal({ handleModal, answers }) {
  const [selKey, setSelKey] = useState(false);

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
    return <div>ANSE</div>;
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
