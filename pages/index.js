import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import rebootPic from "../icons/reboot.png";

export default function Home() {
  const [winner, setWinner] = useState("");
  const [player1Winnigs, setplayer1Winnings] = useState("");
  const [player1wins, setPlayer1wins] = useState(0);
  const [player2wins, setPlayer2wins] = useState(0);
  const [player2Winnigs, setplayer2Winnings] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentHand, setCurrentHand] = useState("");
  const [currentBlock, setCurrentBlock] = useState("");
  const [isPlayed, setIsPlayed] = useState(true);
  const [playedMoves, setPlayedMoves] = useState(0)
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
  ];

  const playBlock = (blockNum, block, location) => {
    if (blockNum.current === "" && winner === "") {
      setCurrentBlock(block);
      setCurrentHand(
        currentPlayer == 1 ? "X" : <span className={styles.Oshape}>O</span>
      );

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

      setPlayedMoves(playedMoves + 1);

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

    let player1WinnigsList = player1Winnigs.split("-");
    let player2WinnigsList = player2Winnigs.split("-");

    winnings.map((e) => {
      let player1WinnigsRearrenged = "";
      for (var try1 = 0; try1 < player1WinnigsList.length - 1; try1++) {
        for (var try2 = 0; try2 < player1WinnigsList.length - 1; try2++) {
          for (var try3 = 0; try3 < player1WinnigsList.length - 1; try3++) {
            player1WinnigsRearrenged +=
              player1WinnigsList[try1] +
              "-" +
              player1WinnigsList[try2] +
              "-" +
              player1WinnigsList[try3] +
              "-";
            if (player1WinnigsRearrenged.includes(e)) {
              setWinner("Player 1");
              setPlayer1wins(player1wins + 0.5);
              winnerLabel.current = "Player 1 won!!!";
            }
          }
        }
      }

      let player2WinnigsRearrenged = "";
      for (var try1 = 0; try1 < player2WinnigsList.length - 1; try1++) {
        for (var try2 = 0; try2 < player2WinnigsList.length - 1; try2++) {
          for (var try3 = 0; try3 < player2WinnigsList.length - 1; try3++) {
            player2WinnigsRearrenged +=
              player2WinnigsList[try1] +
              "-" +
              player2WinnigsList[try2] +
              "-" +
              player2WinnigsList[try3] +
              "-";
            if (player2WinnigsRearrenged.includes(e)) {
              setWinner("Player 2");
              setPlayer2wins(player2wins + 0.5);
              winnerLabel.current = "Player 2 won!!!";
            }
          }
        }
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

    if (winner === "Player 1") {
      player2turn.current = "";
    } else if (winner === "Player 2") {
      player1turn.current = "";
    }

    if(playedMoves === 9 && winner === ""){ //maximum number of moves

      player1turn.current = "Gameover!!!";
      player2turn.current = "Gameover!!!";
    } 

    setIsPlayed(false);
  }, [isPlayed]);

  const newGame = () => {
    setWinner("");
    setplayer1Winnings("");
    setplayer2Winnings("");
    setCurrentBlock("");
    setCurrentHand("");
    setCurrentPlayer(1);
    player1turn.current = "Player 1's turn";
    player2turn.current = "";
    block1.current = "";
    block2.current = "";
    block3.current = "";
    block4.current = "";
    block5.current = "";
    block6.current = "";
    block7.current = "";
    block8.current = "";
    block9.current = "";
    winnerLabel.current = "";
    setIsPlayed(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SM-TicTacToe</title>
        <meta name="description" content="Play TicTacToe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.gameContainer}>
        <div className={styles.headingContainer}>
          <label>TicTacToe</label>
          <label className={styles.winnerLabel}>{winnerLabel.current}</label>
          <Image
            className={styles.rebootButton}
            src={rebootPic}
            alt="pic"
            width={30}
            onClick={newGame}
          />
        </div>
        <div className={styles.playerTurnName}>
          <div className={styles.playersCon}>
            <span>{player1turn.current}</span>
            <span className={styles.Oshape}>{player2turn.current}</span>
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
        <div className={styles.winningsCountContainer}>
          <div className={styles.winningsCountPlayers}>
            <div className={styles.player1winningsCount}>
              <span>Player 1 score:</span>
              <p>{player1wins}</p>
            </div>
            <div className={styles.player2winningsCount}>
              <span>Player 2 score:</span>
              <p>{player2wins}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
