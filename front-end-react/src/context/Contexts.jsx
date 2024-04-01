import { CeldasProvider } from "./celdas";
import { DesplegablesProvider } from "./desplegables";
import { TurnoProvider } from "./turno";

export function Contexts({ children }) {
  return (
    <DesplegablesProvider>
      <TurnoProvider>
        <CeldasProvider>{children}</CeldasProvider>
      </TurnoProvider>
    </DesplegablesProvider>
  );
}
