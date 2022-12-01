import axios from "axios";
import Constants from "expo-constants";

/* Endereços para cada emulador/simulador:
 ** Genymotion:              http://10.0.3.2:3333/
 ** Emulador Android Studio: http://10.0.2.2:3333/
 ** Simulador IOS:           http://localhost:3333/
 */

const api = axios.create({
  baseURL: "https://doctor--app.herokuapp.com/",
});

export default api;
