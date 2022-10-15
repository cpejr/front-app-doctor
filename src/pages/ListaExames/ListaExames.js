import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
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
  CaixaData,
  Data,
  CaixaTipoExame,
  TipoExame,
  CaixaHorario,
  Horario,
  CaixaBaixoCarregando,
  TextoSemExame,
} from "./Styles";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao/ConteudoBotao";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

function ListaExames({ navigation }) {
  const [estadoAgendamentoESugestoes, setEstadoAgendamentoESugestoes] =
    useState(true);
  const [estadoExamesMarcados, setEstadoExamesMarcados] = useState(false);
  const [examesMarcados, setExamesMarcados] = useState([]);
  const [carregando, setCarregando] = useState();

  function alterarEstado() {
    setCarregando(true);
    setEstadoAgendamentoESugestoes(!estadoAgendamentoESugestoes);
    setEstadoExamesMarcados(!estadoExamesMarcados);
  }

  async function PegandoExamesMarcadosdoUsuario() {
    setCarregando(true);
    const resposta = await managerService.PegarExamesMarcadosIndividual();
    setExamesMarcados(resposta);
    setCarregando(false);
  }

  useEffect(() => {
    PegandoExamesMarcadosdoUsuario();
  }, [estadoExamesMarcados]);

  function comparaData(a, b) {
    var data1 = new Date(a.data_criacao);
    var data2 = new Date(b.data_criacao);
    if (data1 > data2) {
      return -1;
    } else {
      return 1;
    }
  }

  return (
    <Body>
      <CaixaCima>
        <TextoExames>Exames</TextoExames>
        <TabFiltro>
          <BotaoFiltro
            campoSelecionado={estadoAgendamentoESugestoes}
            onPress={alterarEstado}
          >
            <TextoTabFiltro campoSelecionado={estadoAgendamentoESugestoes}>
              Agendamento e sugestões
            </TextoTabFiltro>
          </BotaoFiltro>
          <BotaoFiltro
            campoSelecionado={estadoExamesMarcados}
            onPress={alterarEstado}
          >
            <TextoTabFiltro campoSelecionado={estadoExamesMarcados}>
              Exames Marcados
            </TextoTabFiltro>
          </BotaoFiltro>
        </TabFiltro>
      </CaixaCima>
      {estadoAgendamentoESugestoes ? (
        <Scroll>
          <CaixaBaixo>
            <Quadro>
              <TextoQuadro>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
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
                    Sugestões e Indicações (exames & profissionais)
                  </ConteudoBotao>
                </Botao>
              </ContainerBotao>
            </Quadro>
          </CaixaBaixo>
        </Scroll>
      ) : (
        <>
          {carregando ? (
            <CaixaBaixoCarregando>
              <ActivityIndicator animating={true} color={Cores.preto} />
            </CaixaBaixoCarregando>
          ) : (
            <Scroll>
              <CaixaBaixo>
                {examesMarcados.length === 0 ? (
                  <QuadroExames>
                    <TextoSemExame>
                      Você ainda não possui exames marcados!
                    </TextoSemExame>
                  </QuadroExames>
                ) : (
                  <QuadroExames>
                    {examesMarcados?.sort(comparaData).map((value) => (
                      <ContainerExames key={value.id}>
                        <CaixaData>
                          <Data>
                            {value.data_hora.slice(8, 10) +
                              "/" +
                              value.data_hora.slice(5, 7) +
                              "/" +
                              value.data_hora.slice(0, 4)}
                          </Data>
                        </CaixaData>
                        <CaixaTipoExame>
                          <TipoExame>{value.titulo}</TipoExame>
                        </CaixaTipoExame>
                        <CaixaHorario>
                          <Horario>{value.data_hora.slice(11, 16)}</Horario>
                        </CaixaHorario>
                      </ContainerExames>
                    ))}
                  </QuadroExames>
                )}
              </CaixaBaixo>
            </Scroll>
          )}
        </>
      )}
    </Body>
  );
}

export default ListaExames;
