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
        <TurnoProvider>
          <ShowCardsProvider>
            <GameInfoProvider>
              <CeldasProvider>{children}</CeldasProvider>
            </GameInfoProvider>
          </ShowCardsProvider>
        </TurnoProvider>
      </DesplegablesProvider>
    </SocketProvider>
  );
}
