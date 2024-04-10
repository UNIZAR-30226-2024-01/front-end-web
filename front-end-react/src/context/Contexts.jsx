import { CeldasProvider } from "./celdas";
import { DesplegablesProvider } from "./desplegables";
import { TurnoProvider } from "./turno";
import { SocketProvider } from "./socket";
import { GameInfoProvider } from "./gameinfo";

export function Contexts({ children }) {
  return (
    <SocketProvider>
      <DesplegablesProvider>
        <TurnoProvider>
          <GameInfoProvider>
            <CeldasProvider>{children}</CeldasProvider>
          </GameInfoProvider>
        </TurnoProvider>
      </DesplegablesProvider>
    </SocketProvider>
  );
}
