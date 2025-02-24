import { useEffect, useState } from "react";
import { addRandomBox, checkLose, updateGrid, newBox } from "../scripts/gridLogic";

export function Grid() {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [running, setRunning] = useState(false);

  const [defeat, setDefeat] = useState(false);

  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useState(
    JSON.parse(localStorage.getItem("highScore")) || 0
  );

  useEffect(() => {
    const keyDown = (event) => {
      if (defeat === false && ["w", "a", "s", "d"].includes(event.key)) {
        updateGrid(grid, setGrid, score, setScore, event.key);
        setDefeat(checkLose(grid));
      }
    };
    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", JSON.stringify(score));
    }
  }, [defeat]);

  function getBoxColor(x) {
    switch (x) {
      case 0:
        return "";
      case 2:
        return "#edf7f0";
      case 4:
        return "#c7f0d3";
      case 8:
        return "#e6f5c1";
      case 16:
        return "#f5eec1";
      case 32:
        return "#f5cf9d";
      case 64:
        return "#f7b052";
      case 128:
        return "#f7bca3";
      case 256:
        return "#ff8b59";
      case 512:
        return "#f75711";
      case 1024:
        return "#fa4848";
      case 2048:
        return "#ff1c1c";
      default:
        return "#ff1c1c";
    }
  }

  if (running) {
    return (
      <div className="game-container">
        <div
          className="gameover-container"
          style={{
            opacity: defeat ? 100 : 0,
          }}
        >
          <div className="gameover-message">Game Over</div>
        </div>

        <div className={`grid-container ${defeat && "grid-defeat"}`}>
          <div className="score-display">
            <div className="score-txt">
              Score: <span className="score">{score}</span>
            </div>

            <div className="score-txt">
              HighScore: <span className="score">{highScore}</span>
            </div>
          </div>

          <div className={`grid`}>
            {grid.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="grid-row">
                  {row.map((box, boxIndex) => {
                    return (
                      <div key={boxIndex} className="empty-box">
                        <div
                        className={`grid-box ${box === 0 && "invisible"} ${rowIndex === newBox[0] && boxIndex === newBox[1] ? 'animate animate-fast popIn' : ''}`}
                        style={{
                          backgroundColor: getBoxColor(box),
                        }}
                      >
                        <div
                          className={"box-value"}
                          style={{
                            backgroundColor: getBoxColor(box),
                          }}
                        >
                          {box !== 0 ? box : ""}
                        </div>
                      </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="button-container"
          style={{
            opacity: defeat ? 100 : 0,
          }}
        >
          <button
            className="button play-again-button"
            onClick={() => {
              let newGrid = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
              ];
              newGrid = addRandomBox(newGrid, setGrid);
              addRandomBox(newGrid, setGrid);
              setScore(0);
              setDefeat(false);
            }}
          >
            Play again
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="game-container start-button">
        <div className="button-container">
          <button
            className="button"
            onClick={() => {
              addRandomBox(grid, setGrid);
              addRandomBox(grid, setGrid);
              setRunning(true);
            }}
          >
            Start game
          </button>
        </div>
      </div>
    );
  }
}
