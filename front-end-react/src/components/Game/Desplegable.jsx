import { useState } from "react";

export function Desplegable({ left_initial, setStyle }) {
  const [left, setLeft] = useState(left_initial);

  const handleClick = () => {
    setLeft(!left);
    setStyle(left == left_initial ? true : false);
  };

  return (
    <div className="desplegable" onClick={handleClick}>
      {left ? (
        <svg
          className="flecha-desplegable"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      ) : (
        <svg
          className="flecha-desplegable"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      )}
    </div>
  );
}
