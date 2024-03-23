import { Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function ProtectedRoute({ element, ...rest }) {
  const [cookies] = useCookies(["token"]);

  return (
    <Route
      {...rest}
      element={cookies.token ? element : <Navigate to="/" replace />}
    />
  );
}
