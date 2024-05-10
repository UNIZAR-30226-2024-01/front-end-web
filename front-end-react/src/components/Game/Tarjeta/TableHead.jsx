/* eslint-disable react/prop-types */
import React from "react";
export const TableHead = ({ title }) => {
  return (
    <tr className="titulos">
      <th className="table-head">{title}</th>
    </tr>
  );
};
