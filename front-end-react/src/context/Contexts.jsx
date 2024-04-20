import { CeldasProvider } from './celdas';
import { DesplegablesProvider } from './desplegables';
import { TurnoProvider } from './turno';
import { SocketProvider } from './socket';
import { GameInfoProvider } from './gameinfo';
import { ShowCardsContext } from './showcards';

export function Contexts({ children }) {
  return (
    <SocketProvider>
      <DesplegablesProvider>
        <TurnoProvider>
          <ShowCardsContext>
            <GameInfoProvider>
              <CeldasProvider>{children}</CeldasProvider>
            </GameInfoProvider>
          </ShowCardsContext>
        </TurnoProvider>
      </DesplegablesProvider>
    </SocketProvider>
  );
}
