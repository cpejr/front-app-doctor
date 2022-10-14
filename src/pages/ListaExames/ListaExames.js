import React from "react";
import { View, Text } from "react-native";
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
} from "./Styles";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao/ConteudoBotao";
import { Cores } from "../../variaveis";

function ListaExames({ navigation }) {
  return (
    <Body>
      <CaixaCima>
        <TextoExames>Exames</TextoExames>
        <TabFiltro>
          <BotaoFiltro>
            <TextoTabFiltro>Agendamento e sugestões</TextoTabFiltro>
          </BotaoFiltro>
          <BotaoFiltro>
            <TextoTabFiltro>Exames Marcados</TextoTabFiltro>
          </BotaoFiltro>
        </TabFiltro>
      </CaixaCima>
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
              <ConteudoBotao fontSize="14px" color="green" width="100%">
                Sugestões e Indicações(exames & profissionais)
              </ConteudoBotao>
            </Botao>
          </ContainerBotao>
        </Quadro>
      </CaixaBaixo>
    </Body>
  );
}

export default ListaExames;
