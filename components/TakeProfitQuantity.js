"use client";

import { useState } from "react";

export default function TakeProfitQuantity() {
  const [winCount, setWinCount] = useState(0); // 초기값 0
  const [loseCount, setLoseCount] = useState(0); // 초기값 0
  const [winRate, setWinRate] = useState(0); // 초기값 0
  const [rR, setRR] = useState(0); // 초기값 0
  const [minTPQuantity, setMinTPQuantity] = useState(0); // 초기값 0

  function calcWinRate(win, lose) {
    win = parseInt(win, 10) || 0;
    lose = parseInt(lose, 10) || 0;

    if (win + lose === 0) {
      setWinRate(0);
    } else {
      let rate = (win / (win + lose)) * 100;
      setWinRate(rate.toFixed(2)); // 소수점 2자리 고정
    }

    let minQuantity = (100 - winRate) / (winRate * rR);
    setMinTPQuantity(minQuantity.toFixed(2)); // 소수점 2자리 고정
    console.log(minTPQuantity);
  }

  return (
    <>
      <div>
        <div>
          <input
            onChange={(e) => {
              const value = e.target.value;
              setWinCount(value);
              calcWinRate(value, loseCount); // 최신 loseCount 전달
            }}
            min={0}
            type="number"
          />
          승
          <input
            onChange={(e) => {
              const value = e.target.value;
              setLoseCount(value);
              calcWinRate(winCount, value); // 최신 winCount 전달
            }}
            min={0}
            type="number"
          />
          패
          <input
            onChange={(e) => {
              const value = e.target.value;
              setRR(value);
            }}
            type="number"
            step={0.1}
          />
          손익비
        </div>
        <p>승률 : {winRate}%</p>s<p>최소 익절 수량 : {minTPQuantity}%</p>
      </div>
    </>
  );
}
