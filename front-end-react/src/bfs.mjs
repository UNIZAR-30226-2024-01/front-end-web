import { infoTablero } from "../../../front-end-shared/infoTablero";

// Comprobación de que una casilla es válida
function checkIndex(indexVecino, index) {
  if (indexVecino < 0 || indexVecino >= infoTablero.length) {
    return false;
  }
  if (indexVecino % 24 === 0 && index % 24 === 23) {
    return false;
  }
  if (indexVecino % 24 === 23 && index % 24 === 0) {
    return false;
  }
  if (
    !infoTablero[indexVecino]["isWalkable"] ||
    (infoTablero[indexVecino]["roomName"] !== "" &&
      !infoTablero[indexVecino]["isDoor"])
  ) {
    return false;
  }
  return true;
}

// Comprobación de qué casillas vecinas son válidas
function checkNeighbours(index, vecinos) {
  const checked = [];
  if (infoTablero[index]["isDoor"] !== false) {
    if (infoTablero[index]["isDoor"] === "d") {
      checked.push(index + vecinos[0]);
    } else if (infoTablero[index]["isDoor"] === "r") {
      checked.push(index + vecinos[1]);
    } else if (infoTablero[index]["isDoor"] === "u") {
      checked.push(index + vecinos[2]);
    } else if (infoTablero[index]["isDoor"] === "l") {
      checked.push(index + vecinos[3]);
    }
  } else {
    for (let i = 0; i < 4; i++) {
      if (checkIndex(index + vecinos[i], index)) {
        if (infoTablero[index + vecinos[i]]["isDoor"] !== false) {
          if (infoTablero[index + vecinos[i]]["isDoor"] === "u") {
            checked.push(index + vecinos[0]);
          } else if (infoTablero[index + vecinos[i]]["isDoor"] === "l") {
            checked.push(index + vecinos[1]);
          } else if (infoTablero[index + vecinos[i]]["isDoor"] === "d") {
            checked.push(index + vecinos[2]);
          } else if (infoTablero[index + vecinos[i]]["isDoor"] === "r") {
            checked.push(index + vecinos[3]);
          }
        }else{
          checked.push(index + vecinos[i]);
        }
      }      
    }
  }
  return checked;
}

function bfs(casilla, dados, vecinos) {
  const visited = [];
  let frontera;
  if (infoTablero[casilla]["roomName"] !== "") {
    // estamos en una habitacion y podemos salir por varias puertas y hay pasadizos
    frontera = infoTablero
      .filter(
        (c) =>
          infoTablero[casilla]["roomName"] === c["roomName"] &&
          c["isDoor"] !== false
      )
      .map((c) => c["idx"]);
    const paths = infoTablero.filter(
      (c) =>
        infoTablero[casilla]["roomName"] === c["roomName"] &&
        c["isPath"] !== false
    );
    paths.forEach((c) => visited.push(parseInt(c["isPath"])));
  } else {
    frontera = [casilla];
  }
  while (dados >= 0) {
    const fronteraLength = frontera.length;
    for (let i = 0; i < fronteraLength; i++) {
      const casilla = frontera.shift();
      visited.push(casilla);
      checkNeighbours(casilla, vecinos).forEach((neighbour) => {
        if (!visited.includes(neighbour) && !frontera.includes(neighbour)) {
          frontera.push(neighbour);
        }
      });
    }
    dados--;
  }

  return visited;
}

// const casilla = 16;
// const dados = 12;

// const n_cols = 24;
// const vecinos = [n_cols, 1, -n_cols, -1];

// console.time("miTiempo");
// const candidatos = bfs(casilla, dados, vecinos);
// console.timeEnd("miTiempo");

// console.log(candidatos.sort((a, b) => a - b));

export const cellsClose = (casilla, dados) => {
  const n_cols = 24;
  const vecinos = [n_cols, 1, -n_cols, -1];
  return bfs(casilla, dados, vecinos);
};
