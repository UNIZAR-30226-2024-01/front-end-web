import '../../../../../../front-end-shared/css/Game/Turno/Carrusel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Carta } from '../Cartas/Carta';
import React from 'react';
export function Carrusel({ options, onChange, type }) {
  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: 0,
    slidesToScroll: type == 'where' ? 0 : 1,

    nextArrow: <NextArrow type={type} />,
    prevArrow: <PrevArrow type={type} />,

    beforeChange: (current, next) => {
      onChange(options[next], type);
    },
  };

  const styleSlider = {
    width: '210px',
    height: 'auto',
  };

  return (
    <div className="slider-container">
      <Slider {...settings} style={styleSlider}>
        {options.map((option) => (
          <div className="slider-conatiner-card" key={options.indexOf(option)}>
            <Carta player_name={option} hover={false} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function NextArrow({ className, style, onClick, type }) {
  return type != 'where' ? (
    <div className={className} style={{ ...style, width: '30px', height: '30px' }} onClick={onClick}>
      <Flecha dir={'r'} />
    </div>
  ) : null;
}

function PrevArrow({ className, style, onClick, type }) {
  return type != 'where' ? (
    <div className={className} style={{ ...style, width: '30px', height: '30px' }} onClick={onClick}>
      <Flecha dir={'l'} />
    </div>
  ) : null;
}

function Flecha({ dir }) {
  let style = {};
  if (dir == 'u') style = { rotate: '270deg' };
  else if (dir == 'd') style = { rotate: '90deg' };
  else if (dir == 'l') style = { rotate: '180deg' };
  else if (dir == 'r') style = { rotate: '0deg' };
  else return dir;

  const size = '30px';
  style = { ...style, width: size, height: size };
  return (
    <svg fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}
