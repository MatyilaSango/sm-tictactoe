import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [winner, setWinner] = useState("");
  const [player1Winnigs, setplayer1Winnings] = useState("");
  const [player2Winnigs, setplayer2Winnings] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentHand, setCurrentHand] = useState("");
  const [currentBlock, setCurrentBlock] = useState("");
  const [isPlayed, setIsPlayed] = useState(true);
  let block1 = useRef("");
  let block2 = useRef("");
  let block3 = useRef("");
  let block4 = useRef("");
  let block5 = useRef("");
  let block6 = useRef("");
  let block7 = useRef("");
  let block8 = useRef("");
  let block9 = useRef("");
  let winnerLabel = useRef("");
  let player1turn = useRef("Player 1's turn");
  let player2turn = useRef("");

  const blockLocation = [
    {
      b: block1,
      l: "r1c1-",
      n: "1",
    },
    {
      b: block2,
      l: "r1c2-",
      n: "2",
    },
    {
      b: block3,
      l: "r1c3-",
      n: "3",
    },
    {
      b: block4,
      l: "r2c1-",
      n: "4",
    },
    {
      b: block5,
      l: "r2c2-",
      n: "5",
    },
    {
      b: block6,
      l: "r2c3-",
      n: "6",
    },
    {
      b: block7,
      l: "r3c1-",
      n: "7",
    },
    {
      b: block8,
      l: "r3c2-",
      n: "8",
    },
    {
      b: block9,
      l: "r3c3-",
      n: "9",
    },
  ];

  const winnings = [
    "r1c1-r1c2-r1c3-",
    "r2c1-r2c2-r2c3-",
    "r3c1-r3c2-r3c3-",
    "r1c1-r2c1-r3c1-",
    "r1c2-r2c2-r3c2-",
    "r1c3-r2c3-r3c3-",
    "r1c1-r2c2-r3c3-",
    "r1c3-r2c2-r3c1-",
    "r1c3-r1c2-r1c1-",
    "r2c3-r2c2-r2c1-",
    "r3c3-r3c2-r3c1-",
    "r3c1-r2c1-r1c1-",
    "r3c2-r2c2-r1c2-",
    "r3c3-r2c3-r1c3-",
    "r3c3-r2c2-r1c1-",
    "r3c1-r2c2-r1c3-",
    
  ];

  const playBlock = (blockNum, block, location) => {
    if (blockNum.current === "" && winner === "") {
      setCurrentBlock(block);
      setCurrentHand(currentPlayer == 1 ? "X" : "O");

      if (currentPlayer == 1)
        setplayer1Winnings(
          !player1Winnigs.includes(location)
            ? player1Winnigs + location
            : player1Winnigs
        );
      if (currentPlayer == 2)
        setplayer2Winnings(
          !player2Winnigs.includes(location)
            ? player2Winnigs + location
            : player2Winnigs
        );
      setCurrentPlayer(currentPlayer == 1 ? 2 : 1);

      setIsPlayed(true);
    }
  };

  useEffect(() => {
    switch (Number(currentBlock)) {
      case 1:
        block1.current = currentHand;
        break;
      case 2:
        block2.current = currentHand;
        break;
      case 3:
        block3.current = currentHand;
        break;
      case 4:
        block4.current = currentHand;
        break;
      case 5:
        block5.current = currentHand;
        break;
      case 6:
        block6.current = currentHand;
        break;
      case 7:
        block7.current = currentHand;
        break;
      case 8:
        block8.current = currentHand;
        break;
      case 9:
        block9.current = currentHand;
        break;
    }
    winnings.map((e) => {
      if (player1Winnigs.includes(e)) {
        setWinner("Player 1");
        winnerLabel.current = "Player 1 won!!!";
      }
      if (player2Winnigs.includes(e)) {
        setWinner("Player 2");
        winnerLabel.current = "Player 2 won!!!";
      }
    });

    if (currentPlayer === 1) {
      player1turn.current = "Player 1's turn";
      player2turn.current = "";
    }
    if (currentPlayer === 2) {
      player2turn.current = "Player 2's turn";
      player1turn.current = "";
    }

    setIsPlayed(false);
  }, [isPlayed]);

  return (
    <div className={styles.container}>
      <Head>
        <title>SM-TicTacToe</title>
        <meta name="description" content="Global weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.gameContainer}>
        <div className={styles.headingContainer}>
          <label>TicTacToe</label>
          <label className={styles.winnerLabel}>{winnerLabel.current}</label>
        </div>
        <div className={styles.playerTurnName}>
          <div className={styles.playersCon}>
            <span>{player1turn.current}</span>
            <span>{player2turn.current}</span>
          </div>
        </div>
        <div className={styles.mainGameContainer}>
          <div className={styles.tttgameContainer}>
            {blockLocation.map((e) => (
              <div
                className={styles.gameBlock}
                onClick={() => playBlock(e.b, e.n, e.l)}
              >
                <span>{e.b.current}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
