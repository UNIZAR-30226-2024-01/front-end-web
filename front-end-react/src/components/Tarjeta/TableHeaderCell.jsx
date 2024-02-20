/* eslint-disable react/prop-types */

export const TableHeaderCell = ({ max_chars, text }) => {
    return (
        <th>
            <input type="text" maxLength={max_chars} defaultValue={text}/>
        </th>
    )
}
