import "../../../../../../front-end-shared/css/Game/Tarjeta/Tarjeta.css";

import { useContext, useEffect, useState } from "react";

import { TableRow } from "./TableRow.jsx";
import { TableHead } from "./TableHead.jsx";
import { TableHeaderCell } from "./TableHeaderCell.jsx";
import { Desplegable } from "../Desplegable.jsx";
import { DesplegablesContext } from "../../../context/desplegables.jsx";
import { GameInfoContext } from "../../../context/gameinfo.jsx";

export function Tarjeta() {
  const { tarjetaDesplegado, setTarjetaDesplegado } =
    useContext(DesplegablesContext);
  const { characters, guns, rooms } = useContext(GameInfoContext);

  const style = { right: `${tarjetaDesplegado ? "0px" : "-470px"}` };
  const max_chars = 4;

  useEffect(() => {
    const session = sessionStorage.getItem("tarjeta");
    if (session === null) {
      sessionStorage.setItem("tarjeta", JSON.stringify(Array(28).fill("")));
    }
  }, []);

  const handleChange = (fila, estado) => {
    let ss = sessionStorage.getItem("tarjeta");
    ss = JSON.parse(ss);
    ss = {
      ...ss,
      [fila]: estado,
    };
    sessionStorage.setItem("tarjeta", JSON.stringify(ss));
  };

  const ss =
    JSON.parse(sessionStorage.getItem("tarjeta")) ?? Array(28).fill("");

  return (
    <div className="tarjeta" data-hidden="true" style={style}>
      <Desplegable
        left_initial={true}
        desplegado={tarjetaDesplegado}
        setDesplegado={setTarjetaDesplegado}
      />

      <table className="tabla">
        <thead className="cabecera">
          <tr className="table-row">
            <th className="table-head" />
            <TableHeaderCell
              max_chars={max_chars}
              text={ss[0]}
              handleChange={handleChange}
              fila={0}
            />
            <TableHeaderCell
              max_chars={max_chars}
              text={ss[1]}
              handleChange={handleChange}
              fila={1}
            />
            <TableHeaderCell
              max_chars={max_chars}
              text={ss[2]}
              handleChange={handleChange}
              fila={2}
            />
            <TableHeaderCell
              max_chars={max_chars}
              text={ss[3]}
              handleChange={handleChange}
              fila={3}
            />
            <TableHeaderCell
              max_chars={max_chars}
              text={ss[4]}
              handleChange={handleChange}
              fila={4}
            />
            <TableHeaderCell
              max_chars={max_chars}
              text={ss[5]}
              handleChange={handleChange}
              fila={5}
            />
            <TableHeaderCell
              max_chars={max_chars}
              text={ss[6]}
              handleChange={handleChange}
              fila={6}
            />
          </tr>
        </thead>
        <tbody id="table-body">
          <TableHead title="¿QUIÉN?" />
          <TableRow
            name={characters[0]}
            initialState={ss[7]}
            handleChange={handleChange}
            fila={7}
          />
          <TableRow
            name={characters[1]}
            initialState={ss[8]}
            handleChange={handleChange}
            fila={8}
          />
          <TableRow
            name={characters[2]}
            initialState={ss[9]}
            handleChange={handleChange}
            fila={9}
          />
          <TableRow
            name={characters[3]}
            initialState={ss[10]}
            handleChange={handleChange}
            fila={10}
          />
          <TableRow
            name={characters[4]}
            initialState={ss[11]}
            handleChange={handleChange}
            fila={11}
          />
          <TableRow
            name={characters[5]}
            initialState={ss[12]}
            handleChange={handleChange}
            fila={12}
          />

          <TableHead title="¿CON QUÉ?" />
          <TableRow
            name={guns[0]}
            initialState={ss[13]}
            handleChange={handleChange}
            fila={13}
          />
          <TableRow
            name={guns[1]}
            initialState={ss[14]}
            handleChange={handleChange}
            fila={14}
          />
          <TableRow
            name={guns[2]}
            initialState={ss[15]}
            handleChange={handleChange}
            fila={15}
          />
          <TableRow
            name={guns[3]}
            initialState={ss[16]}
            handleChange={handleChange}
            fila={16}
          />
          <TableRow
            name={guns[4]}
            initialState={ss[17]}
            handleChange={handleChange}
            fila={17}
          />
          <TableRow
            name={guns[5]}
            initialState={ss[18]}
            handleChange={handleChange}
            fila={18}
          />

          <TableHead title="¿DÓNDE?" />
          <TableRow
            name={rooms[0]}
            initialState={ss[19]}
            handleChange={handleChange}
            fila={19}
          />
          <TableRow
            name={rooms[1]}
            initialState={ss[20]}
            handleChange={handleChange}
            fila={20}
          />
          <TableRow
            name={rooms[2]}
            initialState={ss[21]}
            handleChange={handleChange}
            fila={21}
          />
          <TableRow
            name={rooms[3]}
            initialState={ss[22]}
            handleChange={handleChange}
            fila={22}
          />
          <TableRow
            name={rooms[4]}
            initialState={ss[23]}
            handleChange={handleChange}
            fila={23}
          />
          <TableRow
            name={rooms[5]}
            initialState={ss[24]}
            handleChange={handleChange}
            fila={24}
          />
          <TableRow
            name={rooms[6]}
            initialState={ss[25]}
            handleChange={handleChange}
            fila={25}
          />
          <TableRow
            name={rooms[7]}
            initialState={ss[26]}
            handleChange={handleChange}
            fila={26}
          />
          <TableRow
            name={rooms[8]}
            initialState={ss[27]}
            handleChange={handleChange}
            fila={27}
          />
        </tbody>
      </table>

      <span>&#169; 2024 - Desarrollado por Grace Hopper</span>
    </div>
  );
}
