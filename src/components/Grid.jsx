import { useEffect, useState } from "react";
import { addRandomBox, updateGrid } from "../scripts/gridLogic";

export function Grid() {
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const keyDown = (event) => {
      if (["w", "a", "s", "d"].includes(event.key)) {
        updateGrid(grid, setGrid, event.key);
      }
    };
    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  function getBoxColor(x) {
    switch (x) {
      case 0:
        return ""
      case 2:
        return "#edf7f0"
      case 4:
        return "#c7f0d3"
      case 8:
        return "#e6f5c1"
      case 16:
        return "#f5eec1"
      case 32:
        return "#f5cf9d"
      case 64:
        return "#f7b052"
      case 128:
        return "#f7bca3"
      case 256:
        return "#ff8b59"
      case 512:
        return "#f75711"
      case 1024:
        return "#fa4848"
      case 2048:
        return "#ff1c1c"
      default:
        return "#ff1c1c"
      
    }
  }

  if (running) {
    return (
      <div className="grid">
        {grid.map((row, index) => {
          return (
            <div key={index} className="grid-row">
              {row.map((box, index) => {
                return (
                  <div key={index} className={`grid-box ${box===0 && "empty-box"}`} 
                  style={{
                    backgroundColor: getBoxColor(box)
                  }}>
                    <div className={"box-value"}                 style={{
                    backgroundColor: getBoxColor(box)
                  }}>{box!==0 ? box : ''}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="start-container">
        <button className="start-button" onClick={() => {
          addRandomBox(grid, setGrid);
          addRandomBox(grid, setGrid);
          setRunning(true)
        }}>Start game</button>
      </div>
    )
  }
  
}
