/* eslint-disable react/prop-types */
import './TableHead.css'

export const TableHead = ({ title }) => {
    return (
        <tr className="titulos">
            <th>{title}</th>
        </tr>
    )
}
