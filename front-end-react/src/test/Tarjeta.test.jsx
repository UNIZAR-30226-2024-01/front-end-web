//PASA

/*
 * Conjunto de test para el componente Tarjeta:
 * COMPRUEBA:
 *        - que se renderiza
 *        - que se llama a finRoll cuando se completa el lanzamiento de los dados
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Tarjeta } from '../components/Game/Tarjeta/Tarjeta';

import { TableRow } from "../components/Game/Tarjeta/TableRow.jsx";
import { TableHead } from "../components/Game/Tarjeta/TableHead.jsx";
import { TableHeaderCell } from "../components/Game/Tarjeta/TableHeaderCell.jsx";
import { Desplegable } from "../components/Game/Desplegable.jsx";
import { DesplegablesContext } from "../context/desplegables.jsx";
import { GameInfoContext } from "../context/gameinfo.jsx";

import '@testing-library/jest-dom';

describe('Tarjeta Component', () => {
    test('Tarjeta renders correctly', () => {
        const mockDesplegablesContext = {
          tarjetaDesplegado: true,
          setTarjetaDesplegado: jest.fn(),
        };
    
        const mockGameInfoContext = {
          characters: ['MrSoper', 'MsFisica', 'MsIa', 'MrProg', 'MsRedes', 'MrDiscreto'], // Simula datos de personajes
          guns: ['cable', 'disco', 'router', 'suspenso', 'taza', 'teclado', 'troyano'], // Simula datos de armas
          rooms: ['cafeteria', 'baños', 'recepcion', 'escaleras', 'biblioteca', 'laboratorio', 'despacho', 'aulanorte', 'aulasur'], // Simula datos de habitaciones
        };
    
        render(
          <DesplegablesContext.Provider value={mockDesplegablesContext}>
            <GameInfoContext.Provider value={mockGameInfoContext}>
              <Tarjeta />
            </GameInfoContext.Provider>
          </DesplegablesContext.Provider>
        );
      });


});
