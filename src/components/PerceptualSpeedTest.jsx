import React, { useState, useEffect } from "react";

function PerceptualSpeedTest() {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [targetNumber] = useState(7);
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    startTest();
    // Temizleme
    return () => clearInterval(intervalId);
  }, []);

  const startTest = () => {
    setStatus("");
    setReactionTime(null);

    const id = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 10); // 0-9
      setCurrentNumber(randomNum);
      if (randomNum === targetNumber) {
        setStartTime(Date.now());
      }
    }, 1000);
    setIntervalId(id);
  };

  const handleClick = () => {
    if (currentNumber === targetNumber && startTime) {
      const timeTaken = Date.now() - startTime;
      setReactionTime(timeTaken);
      setStatus(`Tebrikler! Tepki süreniz: ${timeTaken} ms`);
      clearInterval(intervalId);
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCurrentNumber(0);
    setReactionTime(null);
    setStartTime(null);
    setStatus("");
    startTest();
  };

  return (
    <div className="card">
      <h1 className="heading">Algısal Hız Testi</h1>
      <p>
        {targetNumber} rakamı ekranda göründüğünde <strong>"Şimdi"</strong>{" "}
        butonuna basın.
      </p>
      <h2 style={{ fontSize: "64px", margin: "20px 0" }}>{currentNumber}</h2>
      <button className="btn" onClick={handleClick}>Şimdi</button>
      {status && <p>{status}</p>}
      {reactionTime && <p>Tepki süresi: {reactionTime} ms</p>}
      <button className="btn" onClick={resetTest} style={{ marginLeft: "10px" }}>
        Yeniden Başlat
      </button>
    </div>
  );
}

export default PerceptualSpeedTest;
