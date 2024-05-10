/* eslint-disable react/prop-types */
import React from 'react';
export const TableHeaderCell = ({ max_chars, text, fila, handleChange }) => {
  return (
    <th className="table-head">
      <input
        className="input-tarjeta"
        type="text"
        maxLength={max_chars}
        defaultValue={text}
        onChange={(e) => {
          handleChange(fila, e.target.value);
        }}
      />
    </th>
  );
};
