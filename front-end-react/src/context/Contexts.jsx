import { CeldasProvider } from "./celdas";
import { DesplegablesProvider } from "./desplegables";
import { TurnoProvider } from "./turno";
import { SocketProvider } from "./socket";

export function Contexts({ children }) {
  return (
    <DesplegablesProvider>
      <TurnoProvider>
        <CeldasProvider>
          <SocketProvider>{children}</SocketProvider>
        </CeldasProvider>
      </TurnoProvider>
    </DesplegablesProvider>
  );
}
