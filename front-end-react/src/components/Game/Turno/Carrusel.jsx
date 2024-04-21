export function Carrusel({ options }) {
  return (
    <select>
      {options.map((option) => (
        <option key={options.indexOf(option)} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
