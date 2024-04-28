import { CeldasProvider } from './celdas';
import { DesplegablesProvider } from './desplegables';
import { TurnoProvider } from './turno';
import { SocketProvider } from './socket';
import { GameInfoProvider } from './gameinfo';
import { ShowCardsProvider } from './showcards';

export function Contexts({ children }) {
  return (
    <SocketProvider>
      <DesplegablesProvider>
          <ShowCardsProvider>
            <GameInfoProvider>
             <TurnoProvider>
              <CeldasProvider>{children}</CeldasProvider>
              </TurnoProvider>
            </GameInfoProvider>
          </ShowCardsProvider>
      </DesplegablesProvider>
    </SocketProvider>
  );
}
