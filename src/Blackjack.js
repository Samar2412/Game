import React, { useState } from 'react';
import './Blackjack.css';

const Blackjack = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [playerChips, setPlayerChips] = useState(100);
  const [bet, setBet] = useState(0);

  const dealCard = () => {
    const card = {
      value: Math.floor(Math.random() * 13) + 1,
      suit: Math.floor(Math.random() * 4),
    };
    return card;
  };

  const calculateScore = (hand) => {
    let score = 0;
    let aceCount = 0;
    hand.forEach((card) => {
      if (card.value === 1) {
        aceCount++;
        score += 11;
      } else if (card.value > 10) {
        score += 10;
      } else {
        score += card.value;
      }
    });
    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }
    return score;
  };

  const deal = () => {
    const playerCard = dealCard();
    const dealerCard = dealCard();
    setPlayerHand([...playerHand, playerCard]);
    setDealerHand([...dealerHand, dealerCard]);
    setPlayerScore(calculateScore([playerCard]));
    setDealerScore(calculateScore([dealerCard]));
  };

  const hit = () => {
    const card = dealCard();
    setPlayerHand([...playerHand, card]);
    setPlayerScore(calculateScore([...playerHand, card]));
  };

  const stand = () => {
    while (dealerScore < 17) {
      const card = dealCard();
      setDealerHand([...dealerHand, card]);
      setDealerScore(calculateScore([...dealerHand, card]));
    }
  };

  const reset = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setPlayerChips(playerChips - bet);
    setBet(0);
  };

  return (
    <div className="blackjack">
      <h1>Blackjack</h1>
      <div className="chips">
        <div className="player-chips">Player Chips: {playerChips}</div>
        <div className="bet">Bet: {bet}</div>
      </div>
      <div className="hands">
        <div className="dealer-hand">
          <div className="hand">
            {dealerHand.map((card, index) => (
              <div key={index} className="card">
                {card.value}
              </div>
            ))}
          </div>
          <div className="score">Dealer Score: {dealerScore}</div>
        </div>
        <div className="player-hand">
          <div className="hand">
            {playerHand.map((card, index) => (
              <div key={index} className="card">
                {card.value}
              </div>
            ))}
          </div>
          <div className="score">Player Score: {playerScore}</div>
        </div>
      </div>
      <div className="controls">
        {bet === 0 && (
          <button onClick={() => setBet(playerChips > 0 ? 10 : 0)}>
            Bet 10
          </button>
        )}
        {bet > 0 && (
          <>
            <button onClick={deal}>Deal</button>
            <button onClick={hit}>Hit</button>
            <button onClick={stand}>Stand</button>
            <button onClick={reset}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Blackjack;