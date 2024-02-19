/* eslint-disable react/prop-types */
import './TableHead.css'

export const TableHead = ({ title }) => {
    return (
        <thead className="titulos">
        <tr>
            <th>{title}</th>
        </tr>
    </thead>
    )
}
