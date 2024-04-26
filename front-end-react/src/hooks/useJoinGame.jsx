import { BACKEND_URL } from '../consts';
// import { useCookies } from 'react-cookie';

export const useJoinGame = async (gameId = null, execute, fromUrl = true, setCookie) => {
  //   const [, setCookie] = useCookies(['username', 'partida_actual']);
  if (execute) {
    console.log('gameId:', gameId);
    if (!gameId) gameId = window.prompt('Introduzca el ID de la partida (6 dígitos):');
    if (gameId) {
      // ver si existe idGam partida llamando a la API/getGame (POST)
      const url = BACKEND_URL + '/getGame?idGame=' + gameId;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      console.log('data:', data);

      if (data.exito === true) {
        if (fromUrl) {
          setCookie('partida_actual', JSON.stringify({ partida: gameId }), { path: '/' });
        } else {
          if (data.tipo === 'l') {
            // partida local
            alert('No se puede unir a una partida local.');
          } else if (data.tipo === 'o') {
            // partida online
            setCookie('partida_actual', JSON.stringify({ partida: gameId }), { path: '/' });
            return { navigateRoute: '/game/' + gameId };
          } else {
            alert('Error al obtener el tipo de partida.');
          }
        }
      } else {
        alert('No se ha podido unirse a la partida. Inténtalo de nuevo.');
        return { navigateRoute: '/' };
      }
    } else {
      alert('ID de partida no válido.');
    }
  }
};
