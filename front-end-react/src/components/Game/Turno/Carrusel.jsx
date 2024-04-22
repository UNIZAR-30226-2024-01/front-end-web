export function Carrusel({ options, onChange, type }) {
  return (
    <select
      onChange={(e) => {
        onChange(e.target.value, type);
      }}
    >
      {options.map((option) => (
        <option key={options.indexOf(option)} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
