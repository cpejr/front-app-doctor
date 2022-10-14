import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Body,
  CaixaBaixo,
  CaixaCima,
  Quadro,
  TabFiltro,
  TextoExames,
  TextoTabFiltro,
  TextoQuadro,
  ContainerBotao,
  BotaoFiltro,
  Scroll,
  QuadroExames,
  ContainerExames,
} from "./Styles";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao/ConteudoBotao";
import { Cores } from "../../variaveis";

function ListaExames({ navigation }) {
  
  const[agendamentoESugestoes, setAgendamentoESugestoes] = useState(true);
  const[examesMarcados, setExamesMarcados] = useState(false);

  function alterarEstado() {
    setAgendamentoESugestoes(!agendamentoESugestoes);
    setExamesMarcados(!examesMarcados);
  }

  return (
    <Body>
      <CaixaCima>
        <TextoExames>Exames</TextoExames>
        <TabFiltro>
          <BotaoFiltro
          campoSelecionado={agendamentoESugestoes}
          onPress={alterarEstado}
          >
            <TextoTabFiltro
            campoSelecionado={agendamentoESugestoes}
            >Agendamento e sugestões</TextoTabFiltro>
          </BotaoFiltro>
          <BotaoFiltro
          campoSelecionado={examesMarcados}
          onPress={alterarEstado}
          >
            <TextoTabFiltro
            campoSelecionado={examesMarcados}
            >Exames Marcados</TextoTabFiltro>
          </BotaoFiltro>
        </TabFiltro>
      </CaixaCima>
      {agendamentoESugestoes? (
      <Scroll>
      <CaixaBaixo>
        <Quadro>
          <TextoQuadro>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </TextoQuadro>
          <ContainerBotao>
            <Botao
              marginTop="0"
              marginRight="0"
              height="15%"
              width="100%"
              backgroundColor={Cores.cinza[7]}
              borderRadius="3px"
              borderColor={Cores.azul}
              borderWidth="2px"
            >
              <ConteudoBotao fontSize="16px" color="green" width="100%">
                EEG (Eletroencefalograma)
              </ConteudoBotao>
            </Botao>
            <Botao
              marginTop="0"
              marginRight="0"
              height="15%"
              width="100%"
              backgroundColor={Cores.cinza[7]}
              borderRadius="3px"
              borderColor={Cores.azul}
              borderWidth="2px"
            >
              <ConteudoBotao fontSize="16px" color="green" width="100%">
                Polissonografia
              </ConteudoBotao>
            </Botao>
            <Botao
              marginTop="0"
              marginRight="0"
              height="15%"
              width="100%"
              backgroundColor={Cores.cinza[7]}
              borderRadius="3px"
              borderColor={Cores.azul}
              borderWidth="2px"
            >
              <ConteudoBotao fontSize="16px" color="green" width="100%">
                Actigrafia
              </ConteudoBotao>
            </Botao>
            <Botao
              marginTop="0"
              marginRight="0"
              height="15%"
              width="100%"
              backgroundColor={Cores.cinza[7]}
              borderRadius="3px"
              borderColor={Cores.azul}
              borderWidth="2px"
            >
              <ConteudoBotao fontSize="16px" color="green" width="100%">
                Outros Exames
              </ConteudoBotao>
            </Botao>
            <Botao
              marginTop="0"
              marginRight="0"
              height="15%"
              width="100%"
              backgroundColor={Cores.cinza[7]}
              borderRadius="3px"
              borderColor={Cores.azul}
              borderWidth="2px"
            >
              <ConteudoBotao fontSize="12px" color="green" width="100%">
                Sugestões e Indicações(exames & profissionais)
              </ConteudoBotao>
            </Botao>
          </ContainerBotao>
        </Quadro>
      </CaixaBaixo>
      </Scroll>
      ):(
        <Scroll>
          <CaixaBaixo>
            <QuadroExames>
              <ContainerExames>
                <></>
              </ContainerExames>
            </QuadroExames>
          </CaixaBaixo>
      </Scroll>
      )}
    </Body>
  );
}

export default ListaExames;
