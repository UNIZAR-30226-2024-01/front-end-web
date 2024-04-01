import { CeldasProvider } from "./celdas";
import { DesplegablesProvider } from "./desplegables";
import { TurnoProvider } from "./turno";
import { SocketProvider } from "./socket";
import { UserCharProvider } from "./userchar";

export function Contexts({ children }) {
  return (
    <SocketProvider>
      <DesplegablesProvider>
        <TurnoProvider>
          <UserCharProvider>
            <CeldasProvider>{children}</CeldasProvider>
          </UserCharProvider>
        </TurnoProvider>
      </DesplegablesProvider>
    </SocketProvider>
  );
}
