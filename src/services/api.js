import axios from "axios";
import Constants from 'expo-constants'

/* Endereços para cada emulador/simulador:
 ** Genymotion:              http://10.0.3.2:3333/
 ** Emulador Android Studio: http://10.0.2.2:3333/
 ** Simulador IOS:           http://localhost:3333/
 */

const productionHost = "urldeproducao";
const productionPort = "0000";
let uri = `https://${productionHost}:${productionPort}`;


if(_DEV_) {
  const developmentHost = Constants.manifest.hostUri.split(":")[0]
  const developmentPort = 3333;
  
  uri = `http://${developmentHost}:${developmentPort}`;
}

const api = axios.create({
  baseURL: uri,
});


export default api;