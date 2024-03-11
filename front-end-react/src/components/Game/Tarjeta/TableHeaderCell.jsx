/* eslint-disable react/prop-types */

export const TableHeaderCell = ({ max_chars, text }) => {
    return (
        <th className="table-head">
            <input className="input-tarjeta" type="text" maxLength={max_chars} defaultValue={text}/>
        </th>
    )
}
