let BACKEND_URL = "";
if (import.meta.env.MODE === "development") {
  console.log("Estás en modo de desarrollo");
  BACKEND_URL = "http://localhost:3000";
} else if (import.meta.env.MODE === "production") {
  console.log("Estás en modo de producción");
  BACKEND_URL = "http://51.20.246.74:3000";
}

export { BACKEND_URL };

// // cambiar linea comentada al desplegar en AWS
// export const BACKEND_URL = 'http://localhost:3000'
// export const BACKEND_URL = 'http://51.20.246.74:3000'
