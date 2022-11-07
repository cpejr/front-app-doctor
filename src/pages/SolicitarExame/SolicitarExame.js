import React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import {
  Body,
  CaixaSeta,
  CaixaTitulo,
  Titulo,
  CaixaScroll,
  CaixaDescricao,
  CaixaBotao,
  CaixaCentro,
  Descricao,
  TextoBotao,
} from "./Styles";
import Icon from "react-native-vector-icons/Entypo";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import Botao from "../../styles/Botao";

function SolicitarExame({route, navigation}) {

  const { width } = useWindowDimensions();
  const tamanhoIcone = width > 900 ? 48 : 48;
  const larguraBotoesMaior = width < 600 ? "60%" : "50%";
  const larguraBotoes = width < 330 ? "60%" : larguraBotoesMaior;

  const exameEspecifico = route.params.paramKey;
  const [exameClicado, setExameClicado] = useState({});

  // async function pegarExameEspecifico() {
  //   const exameAux = await managerService.GetExameEspecifico(
  //     exameEspecifico.id
  //   );
  //   setExameClicado(exameAux);
  // }

  // useEffect(() => {
  //   pegarExameEspecifico();
  // }, []);

  return (
    <Body>
      <CaixaSeta>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={tamanhoIcone}
            /* color={Cores.azul} */ color="green"
          />
        </TouchableOpacity>
      </CaixaSeta>
      <CaixaTitulo>
        <Titulo>Exame {exameEspecifico.titulo}</Titulo>
      </CaixaTitulo>
      <CaixaCentro>
        <CaixaScroll>
          <CaixaDescricao>
            <ScrollView>          
              <Descricao>
                {exameEspecifico.texto}
              </Descricao>
            </ScrollView>
          </CaixaDescricao>
        </CaixaScroll>
      </CaixaCentro>
      <CaixaBotao>
        <Botao
          width={larguraBotoes}
          height="40px"
          marginTop="0%"
          /*   backgroundColor={Cores.cinza[11]} */
          backgroundColor="green"
          borderRadius="3px"
          borderColor={Cores.azul}
          borderWidth="2px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
        >
          <TextoBotao>Agendar Exame {exameEspecifico.titulo}</TextoBotao>
        </Botao>
      </CaixaBotao>
    </Body>
  );
}

export default SolicitarExame;
