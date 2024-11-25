"use client";

import "../styles/TakeProfitQuantity.css";
import { useState, useEffect } from "react";

export default function TakeProfitQuantity() {
  const [winCount, setWinCount] = useState(0); // 초기값 0
  const [loseCount, setLoseCount] = useState(0); // 초기값 0
  const [winRate, setWinRate] = useState(0); // 초기값 0
  const [rR, setRR] = useState(0); // 초기값 0
  const [minTPQuantity, setMinTPQuantity] = useState(0); // 초기값 0

  useEffect(() => {
    calcMinTPQuantity();
  }, [winRate, rR]);

  function calcWinRate(win, lose) {
    win = parseInt(win, 10) || 0;
    lose = parseInt(lose, 10) || 0;

    if (win === 0) {
      setWinRate(0);
    } else {
      let rate = parseFloat(((win / (win + lose)) * 100).toFixed(2));
      setWinRate(rate);
    }
  }

  function calcMinTPQuantity() {
    let minQuantity = parseFloat(
      (((100 - winRate) / (winRate * rR)) * 100).toFixed(2)
    );
    setMinTPQuantity(minQuantity); // 소수점 2자리 고정
  }

  return (
    <>
      <div>
        <div className="inputContainer">
          <div>
            <input
              value={winCount}
              onChange={(e) => {
                const value = e.target.value;
                setWinCount(value);
                calcWinRate(value, loseCount); // 최신 loseCount 전달
              }}
              min={0}
              type="number"
            />
            승
          </div>
          <div>
            <input
              value={loseCount}
              onChange={(e) => {
                const value = e.target.value;
                setLoseCount(value);
                calcWinRate(winCount, value); // 최신 winCount 전달
              }}
              min={0}
              type="number"
            />
            패
          </div>
          <div>
            <input
              value={rR}
              onChange={(e) => {
                const value = e.target.value;
                setRR(value);
              }}
              type="number"
              step={0.1}
            />
            손익비
          </div>
        </div>
        <p>승률 : {winRate}%</p>
        <p>최소 익절 수량 : {minTPQuantity}%</p>
      </div>
    </>
  );
}
