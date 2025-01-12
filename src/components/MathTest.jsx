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
    const num1 = Math.floor(Math.random() * 10) + 1; // 1-10 arası
    const num2 = Math.floor(Math.random() * 10) + 1; // 1-10 arası
    const randomOp = operations[Math.floor(Math.random() * operations.length)];

    let generatedQuestion = `${num1} ${randomOp} ${num2}`;
    // Bölme işlemi için tam sayı garantisi istemiyorsanız, bu koşulu es geçebilirsiniz.
    // Tam sayı sonuç almak isterseniz, random seçimi tekrar üretebilirsiniz.

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

  if (timeLeft <= 0) {
    return (
      <div className="card">
        <h1 className="heading">Zihinsel Hesaplama Testi</h1>
        <p>Süre Doldu!</p>
        <p>Skorunuz: {score}</p>
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
