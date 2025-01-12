import React, { useState, useEffect } from "react";

function VisualMemoryTest() {
  const colors = ["red", "blue", "green"];
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [step, setStep] = useState(0);
  const [showSequence, setShowSequence] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setStatus("");
    const newSequence = [];
    // 3 adımlık basit bir görsel dizi örneği
    for (let i = 0; i < 3; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newSequence.push(randomColor);
    }
    setSequence(newSequence);
    setShowSequence(true);
    setUserSequence([]);
    setStep(0);

    // 3 saniye sonra diziyi sakla
    setTimeout(() => {
      setShowSequence(false);
    }, 3000);
  };

  const handleColorClick = (color) => {
    if (!showSequence && step < sequence.length) {
      setUserSequence((prev) => [...prev, color]);
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (userSequence.length === sequence.length && sequence.length > 0) {
      // Kontrol et
      const isCorrect = sequence.every((col, idx) => col === userSequence[idx]);
      if (isCorrect) {
        setStatus("Tebrikler, doğru hatırladınız!");
      } else {
        setStatus("Maalesef yanlış. Doğru dizi: " + sequence.join(", "));
      }
    }
  }, [userSequence, sequence]);

  return (
    <div className="card">
      <h1 className="heading">Görsel Hafıza Testi</h1>
      {showSequence ? (
        <div>
          <h3>Diziyi aklınızda tutun!</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {sequence.map((color, index) => (
              <div
                key={index}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>Lütfen diziyi hatırlayarak sırasıyla tıklayınız:</h3>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => handleColorClick(color)}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: color,
                  cursor: "pointer",
                  border: "2px solid #000",
                }}
              />
            ))}
          </div>
          <p>Seçiminiz: {userSequence.join(", ")}</p>
        </div>
      )}
      {status && <p>{status}</p>}
      <button className="btn" onClick={startGame}>Baştan Başla</button>
    </div>
  );
}

export default VisualMemoryTest;
