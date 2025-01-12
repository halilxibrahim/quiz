import React, { useState, useEffect } from "react";

function MathTest() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20); // 20 saniye örnek
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    generateQuestion();
  }, []);

  // Her 1 saniyede bir geri sayım
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatusMessage("Süre Doldu!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateQuestion = () => {
    const operations = ["+", "-", "*", "/"];
    const difficulty = Math.min(Math.floor(score / 5) + 1, 3); // Increase difficulty every 5 points, max 3
    let num1, num2;

    switch (difficulty) {
      case 1:
        num1 = Math.floor(Math.random() * 10) + 1; // 1-10 arası
        num2 = Math.floor(Math.random() * 10) + 1; // 1-10 arası
        break;
      case 2:
        num1 = Math.floor(Math.random() * 50) + 10; // 10-59 arası
        num2 = Math.floor(Math.random() * 50) + 10; // 10-59 arası
        break;
      case 3:
        num1 = Math.floor(Math.random() * 100) + 50; // 50-149 arası
        num2 = Math.floor(Math.random() * 100) + 50; // 50-149 arası
        break;
      default:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    }

    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    let generatedQuestion = `${num1} ${randomOp} ${num2}`;

    // Ensure division results in an integer
    if (randomOp === "/") {
      generatedQuestion = `${num1 * num2} / ${num2}`;
    }

    setQuestion(generatedQuestion);
  };

  const checkAnswer = () => {
    const correctAnswer = eval(question); // Basit yöntem (güvenlik için dikkat!)
    if (parseFloat(answer) === correctAnswer) {
      setScore(score + 1);
      setStatusMessage("Doğru!");
    } else {
      setStatusMessage(`Yanlış! Doğru cevap: ${correctAnswer}`);
    }
    setAnswer("");
    generateQuestion();
  };

  const restartTest = () => {
    setScore(0);
    setTimeLeft(20);
    setStatusMessage("");
    generateQuestion();
  };

  if (timeLeft <= 0) {
    return (
      <div className="card">
        <h1 className="heading">Zihinsel Hesaplama Testi</h1>
        <p>Süre Doldu!</p>
        <p>Skorunuz: {score}</p>
        <button className="btn" onClick={restartTest}>Yeniden Başlat</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h1 className="heading">Zihinsel Hesaplama Testi</h1>
      <p>Kalan Süre: {timeLeft} saniye</p>
      <h2>{question} = ?</h2>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button className="btn" onClick={checkAnswer}>Cevapla</button>
      <p>Skor: {score}</p>
      <p>{statusMessage}</p>
    </div>
  );
}

export default MathTest;
