// src/components/CharacterTrackingTest.js
import React, { useState, useEffect } from "react";

function CharacterTrackingTest() {
  const [chars, setChars] = useState([]);
  const [targetChar] = useState("A");
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [status, setStatus] = useState("");

  useEffect(() => {
    generateChars();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus(`Süre Doldu! Toplam ${count} tane ${targetChar} buldunuz.`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [count, targetChar]);

  const generateChars = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newChars = [];
    for (let i = 0; i < 30; i++) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      newChars.push(randomLetter);
    }
    setChars(newChars);
  };

  const handleClick = (char, idx) => {
    if (timeLeft > 0 && char === targetChar) {
      // Tıklanan harf A ise sayıyı arttır, harfi "-" yaparak tekrar tıklanmasını engelle
      setCount(count + 1);
      setChars((prevChars) => {
        const updated = [...prevChars];
        updated[idx] = "-";
        return updated;
      });
    }
  };

  return (
    <div>
      <h1>Karakter İzleme Testi</h1>
      <p>Kalan Süre: {timeLeft}</p>
      <p>Aranacak harf: {targetChar}</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "300px",
          margin: "10px 0",
        }}
      >
        {chars.map((char, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(char, idx)}
            style={{
              width: "30px",
              height: "30px",
              margin: "5px",
              textAlign: "center",
              lineHeight: "30px",
              backgroundColor: "#ddd",
              cursor: "pointer",
            }}
          >
            {char}
          </div>
        ))}
      </div>
      <p>Bulunan {targetChar} sayısı: {count}</p>
      <p>{status}</p>
      <button onClick={() => { generateChars(); setCount(0); setTimeLeft(10); setStatus(""); }}>
        Yeniden Başlat
      </button>
    </div>
  );
}

export default CharacterTrackingTest;
