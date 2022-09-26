import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import logoGuilherme from "./../../assets/logoGuilherme.png";
import { Corpo, Perfil, Logo, Botaoo, Foto, AnimacaoCarregandoViewNome } from "./Styles";
import { useNavigation } from '@react-navigation/native';
import  {sleep} from "../../utils/sleep";
import { useWindowDimensions, ScrollView, Alert, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Colors } from "react-native-paper";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";


function Header() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({});
  const [fotoDePerfil, setFotoDePerfil] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [carregandoFoto, setCarregandoFoto] = useState(true);

async function pegandoDados() {
  setCarregando(true);
  const resposta = await managerService.GetDadosUsuario();
  setUsuario(resposta.dadosUsuario);
}

useEffect(() => {
  pegandoDados();
}, []);


async function setandoFotoDePerfil() {
  const chave = usuario.avatar_url;
  
  if (chave === null || chave === "" || chave === undefined)
  {
    await sleep(1500);
    setCarregandoFoto(false);
    return false;
  }

  setCarregandoFoto(true);
  const arquivo = await managerService.GetArquivoPorChave(chave);
  setFotoDePerfil(arquivo);
  await sleep(1500);
  setCarregandoFoto(false);
}

useEffect(() => {
  setandoFotoDePerfil();
}, [usuario.avatar_url]);

  return (
    <Corpo>
      <Botaoo onPress={() => navigation.navigate("Home")}>
        <Logo source={logoGuilherme}/>
      </Botaoo>
      <Botaoo onPress={() => navigation.navigate("Perfil")}>
        <Perfil>
              <>
              {usuario.avatar_url === null || usuario.avatar_url === "" || usuario.avatar_url === undefined ? (
              <Foto>
              {carregandoFoto ? (
              <AnimacaoCarregandoViewNome>
                <Perfil/>
              </AnimacaoCarregandoViewNome>
              ) : (
                <>
                <Icon name="user" size={40} color={Cores.branco}/> 
                </>
              )}
              </Foto>
            ) : (
              <Foto>
              {carregandoFoto ? (
              <AnimacaoCarregandoViewNome>
                <Perfil/>
              </AnimacaoCarregandoViewNome>
              ) : (
                <>
                  <Image
                    source={{uri:(fotoDePerfil)}}
                    style={{
                    height:"50%",
                    borderRadius: 25,
                    width:"50%"}}
                  ></Image>
                </>
              )}
              </Foto>
              )}</>
        </Perfil>
      </Botaoo>
    </Corpo>
  );
}

export default Header;
