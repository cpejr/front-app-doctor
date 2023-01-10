import React, { useEffect, useState, useCallback } from "react";
import {
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  Text,
  Linking,
  View,
  RefreshControl
} from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import {
  Body,
  CaixaTitulo,
  Titulo,
  ViewConsultas,
  CaixaConsulta,
  CaixaData,
  CaixaNome,
  CaixaHora,
  ConteudoCaixa,
  Icone,
  ViewBotoes,
  CaixaBotao,
  IconeBotao,
  CaixaModal,
  CaixaModalGrande,
  CaixaConteudoModal,
  CaixaFechar,
  CaixaEndereco,
  CaixaTituloModal,
  TituloModal,
  CaixaEnderecoModal,
  EnderecoModal,
  CaixaDataModal,
  DataModal,
  TextoSemConsulta,
  CaixaDadosModal,
  CaixaAvaliacaoModal,
  CaixaExterna,
} from "./Styles";
import ViewPadrao from "../../styles/ViewPadrao";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import botaoIcone from "./../../assets/botaoIcone.png";
import IconesConsulta from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Cores } from "../../variaveis";
import { Dimensions } from "react-native";
import Botao from "../../styles/Botao";
import * as managerService from "../../services/ManagerService/managerService";

function Consultas({ navigation }) {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;

  const paddingBodyMaior = width < 600 ? "5%" : "10%";
  const larguraBotaoMaior = width < 600 ? "47%" : "40%";
  const fontSizeMaior = width < 600 ? "12px" : "15px";
  const heightModal = width < 600 ? "60%" : "100%";
  const paddingBody = width < 330 ? "1.5%" : paddingBodyMaior;
  const larguraBotao = width < 330 ? "60%" : larguraBotaoMaior;
  const borderWidthCaixaNome = width < 330 ? "0px" : "2.5px";
  const fontSizeConteudo = width < 330 ? "11px" : fontSizeMaior;
  const tamanhoIcone = width > 480 ? 20 : 25;
  const heightCaixaBotao = width > 600 ? "48px" : "42px";

  const heightTela = `${Dimensions.get("window").height}px`;

  const [consultas, setConsultas] = useState({});
  const [ocoridas, setOcorridas] = useState([]);
  const [naoOcorridas, setNaoOcorridas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalOcorrida, setModalOcorrida] = useState(false);
  const [modalNaoOcorrida, setModalNaoOcorrida] = useState(false);
  const [nomeModal, setNomeModal] = useState("");
  const [dataModal, setDataModal] = useState("");
  const [horaModal, setHoraModal] = useState("");
  const [enderecoModal, setEnderecoModal] = useState({});
  const [atualizando, setAtualizando] = useState(false);

  const urlVideo = `https://www.google.com.br/`;
  const urlAvaliacaoConsulta = `https://www.google.com.br/`;

  async function requisicaoEnderecoById(id) {
    const resposta = await managerService.requisicaoEnderecoById(id);
    return resposta;
  }
  async function requisicaoConsultorioById(id) {
    const resposta = await managerService.requisicaoConsultorioById(id);
    return resposta;
  }
  async function requisicaoConsultasUsuario() {
    setCarregando(true);
    const resposta = await managerService.requisicaoConsultasUsuario();
    setConsultas(resposta);
    setCarregando(false);
  }
  function formatarDataHora(data_hora) {
    const aux = new Date(data_hora);
    const dia = aux.getUTCDate();
    const mes = aux.getUTCMonth() + 1;
    const ano = aux.getFullYear();
    if (mes < 10) {
      var dataConsulta = dia + "/" + "0" + mes + "/" + ano;
    } else if (mes >= 10) {
      var dataConsulta = dia + "/" + mes + "/" + ano;
    }

    const horas = aux.getHours();
    const minutos = aux.getMinutes();
    if (minutos < 10) {
      var horaConsulta = horas + ":" + "0" + minutos;
    } else if (minutos >= 10) {
      var horaConsulta = horas + ":" + minutos;
    }

    return { dataConsulta, horaConsulta };
  }

  const renderizarUrlVideo = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlVideo);
    if (checarUrl) {
      await Linking.openURL(urlVideo);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlVideo}`);
    }
  });

  const renderizarUrlAvalicaoConsulta = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlAvaliacaoConsulta);
    if (checarUrl) {
      await Linking.openURL(urlAvaliacaoConsulta);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlAvaliacaoConsulta}`);
    }
  });

  var consultasOcorridas = [];
  var consultasNaoOcorridas = [];

  async function compararData() {
    setCarregando(true);
    if (consultas !== undefined) {
      for (var i = 0; i < consultas.length; i++) {
        var dataAtual = new Date();
        var dataConsulta = new Date(consultas[i].data_hora);
        consultas[i].dataConsulta = formatarDataHora(
          consultas[i].data_hora
        ).dataConsulta;
        consultas[i].horaConsulta = formatarDataHora(
          consultas[i].data_hora
        ).horaConsulta;
        const consultorio = await requisicaoConsultorioById(
          consultas[i].id_consultorio
        );

        const endereco = await requisicaoEnderecoById(consultorio.id_endereco);
        consultas[i].nomeConsultorio = consultorio.nome;
        consultas[i].enderecoConsultorio = endereco;
        if (dataAtual >= dataConsulta) {
          consultasOcorridas.push(consultas[i]);
        }
        if (dataAtual < dataConsulta) {
          consultasNaoOcorridas.push(consultas[i]);
        }
      }
      setOcorridas(consultasOcorridas);
      setNaoOcorridas(consultasNaoOcorridas);
    }

    setCarregando(false);
  }

  useEffect(() => {
    requisicaoConsultasUsuario();
  }, []);
  useEffect(() => {
    compararData();
  }, [consultas]);

  function getDadosOcorridas(consulta) {
    setNomeModal(consulta.nomeConsultorio);
    setDataModal(consulta.dataConsulta);
    setHoraModal(consulta.horaConsulta);
    setEnderecoModal(consulta.enderecoConsultorio);
    setModalOcorrida(true);
  }
  function getDadosNaoOcorridas(consulta) {
    setNomeModal(consulta.nomeConsultorio);
    setDataModal(consulta.dataConsulta);
    setHoraModal(consulta.horaConsulta);
    setEnderecoModal(consulta.enderecoConsultorio);
    setModalNaoOcorrida(true);
  }

  function aoAtualizar(){
    setAtualizando(true);
    setTimeout(()=>{setAtualizando(false)},3000);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={atualizando}
          onRefresh={aoAtualizar}
        />
      }
    >
      <Body
        paddingLeft={paddingBody}
        paddingRight={paddingBody}
        height={heightTela}
      >
        <CaixaTitulo>
          <Titulo>Consultas Marcadas</Titulo>
        </CaixaTitulo>

        <ViewBotoes>
          <CaixaBotao
            width={larguraBotao}
            height={heightCaixaBotao}
            onPress={() => navigation.navigate("SolicitarConsulta")}
          >
            <ConteudoBotao
              fontSize={fontSizeConteudo}
              color={Cores.azul}
              width="90%"
            >
              Marcar Nova Consulta
            </ConteudoBotao>
          </CaixaBotao>

          <CaixaBotao
            width={larguraBotao}
            height={heightCaixaBotao}
            onPress={renderizarUrlVideo}
          >
            <ConteudoBotao
              fontSize={fontSizeConteudo}
              color={Cores.azul}
              width="90%"
            >
              Recomendações pré-consulta
            </ConteudoBotao>
          </CaixaBotao>
        </ViewBotoes>

        {carregando ? (
          <ViewPadrao
            paddingLeft="10px"
            paddingRight="10px"
            paddingTop="2%"
            paddingBottom="2%"
            maxHeight="10%"
          >
            <ActivityIndicator animating={true} color={Colors.black} />
          </ViewPadrao>
        ) : (
          <ViewPadrao
            paddingLeft="10px"
            paddingRight="10px"
            paddingTop="5%"
            paddingBottom="5%"
            maxHeight="70%"
          >
            {consultas.length !== 0 ? (
              <ScrollView>
                <>
                  {ocoridas?.map((value) => (
                    <TouchableOpacity
                      onPress={() => {
                        getDadosOcorridas(value);
                      }}
                      key={value.id}
                    >
                      {width > height ? (
                        
                          <Modal
                            animationType="slide"
                            transparent={false}
                            visible={modalOcorrida}
                          >
                            <CaixaExterna>
                            <CaixaModalGrande>
                              <CaixaFechar>
                                <TouchableOpacity
                                  onPress={() => {
                                    setModalOcorrida(false);
                                  }}
                                >
                                  <Icon name="close" size={tamanhoIcone}></Icon>
                                </TouchableOpacity>
                              </CaixaFechar>
                              <CaixaTituloModal>
                                <TituloModal>
                                  A sua consulta foi no {nomeModal}
                                </TituloModal>
                              </CaixaTituloModal>
                              <CaixaDadosModal>
                                <EnderecoModal>
                                  {enderecoModal.rua}, {enderecoModal.numero} -{" "}
                                  {enderecoModal.bairro} {enderecoModal.cidade}
                                </EnderecoModal>
                                <DataModal>
                                  {dataModal} às {horaModal}
                                </DataModal>
                              </CaixaDadosModal>
                              <CaixaAvaliacaoModal>
                                <Botao
                                  height="40px"
                                  width="70%"
                                  marginTop="0px"
                                  backgroundColor={Cores.cinza[7]}
                                  borderRadius="10px"
                                  borderWidth="1px"
                                  borderColor={Cores.preto}
                                  onPress={renderizarUrlAvalicaoConsulta}
                                >
                                  <ConteudoBotao
                                    fontSize="15px"
                                    color="#000000"
                                    width="100%"
                                  >
                                    Avalie a Consulta
                                  </ConteudoBotao>
                                </Botao>
                              </CaixaAvaliacaoModal>
                            </CaixaModalGrande>
                            </CaixaExterna>
                          </Modal>
                        
                      ) : (
                      
                          <Modal
                            animationType="slide"
                            transparent={false}
                            visible={modalOcorrida}
                          >
                            <CaixaExterna>
                            <CaixaModal>
                              <CaixaFechar>
                                <TouchableOpacity
                                  onPress={() => {
                                    setModalOcorrida(false);
                                  }}
                                >
                                  <Icon name="close" size={tamanhoIcone}></Icon>
                                </TouchableOpacity>
                              </CaixaFechar>

                              <CaixaTituloModal>
                                <TituloModal>
                                  A sua consulta foi no {nomeModal}
                                </TituloModal>
                              </CaixaTituloModal>
                              <CaixaDadosModal>
                                <EnderecoModal>
                                  {enderecoModal.rua}, {enderecoModal.numero} -{" "}
                                  {enderecoModal.bairro} {enderecoModal.cidade}
                                </EnderecoModal>
                                <DataModal>
                                  {dataModal} às {horaModal}
                                </DataModal>
                              </CaixaDadosModal>
                              <CaixaAvaliacaoModal>
                                <Botao
                                  height="40px"
                                  width="70%"
                                  backgroundColor={Cores.cinza[7]}
                                  borderRadius="10px"
                                  borderWidth="1px"
                                  borderColor={Cores.preto}
                                  onPress={renderizarUrlAvalicaoConsulta}
                                >
                                  <ConteudoBotao
                                    fontSize="15px"
                                    color="#000000"
                                    width="100%"
                                  >
                                    Avalie a Consulta
                                  </ConteudoBotao>
                                </Botao>
                              </CaixaAvaliacaoModal>
                            </CaixaModal>
                            </CaixaExterna>
                          </Modal>
                       
                      )}
                      <CaixaConsulta>
                        <CaixaData>
                          <ConteudoCaixa fontSize={fontSizeConteudo}>
                            {value.dataConsulta}
                          </ConteudoCaixa>
                        </CaixaData>
                        <CaixaNome
                          borderRightWidth={borderWidthCaixaNome}
                          borderLeftWidth={borderWidthCaixaNome}
                        >
                          <Icone marginRight="4%" marginLeft="0%">
                            <IconesConsulta
                              name="checkbox-marked-outline"
                              size={20}
                              color={Cores.azul}
                            ></IconesConsulta>
                          </Icone>
                          <ConteudoCaixa fontSize={fontSizeConteudo}>
                            Consulta de Rotina
                          </ConteudoCaixa>
                          <Icone marginRight="0%" marginLeft="4%">
                            <IconesConsulta
                              name="map-marker-outline"
                              size={20}
                              color={Cores.azul}
                            ></IconesConsulta>
                          </Icone>
                        </CaixaNome>
                        <CaixaHora>
                          <ConteudoCaixa fontSize={fontSizeConteudo}>
                            {value.horaConsulta} - {value.duracao_em_minutos}{" "}
                            min
                          </ConteudoCaixa>
                        </CaixaHora>
                      </CaixaConsulta>
                    </TouchableOpacity>
                  ))}
                  {naoOcorridas?.map((value) => (
                    <TouchableOpacity
                      onPress={() => {
                        getDadosNaoOcorridas(value);
                      }}
                      key={value.id}
                    >
                      {width > height ? (
                        <ScrollView>
                          <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalNaoOcorrida}
                          >
                            <CaixaExterna>
                            <CaixaModalGrande>
                              <CaixaFechar>
                                <TouchableOpacity
                                  onPress={() => {
                                    setModalNaoOcorrida(false);
                                  }}
                                >
                                  <Icon name="close" size={tamanhoIcone}></Icon>
                                </TouchableOpacity>
                              </CaixaFechar>
                              <CaixaConteudoModal>
                                <CaixaTituloModal>
                                  <TituloModal>
                                    A sua consulta será no {nomeModal}
                                  </TituloModal>
                                </CaixaTituloModal>
                                <CaixaDadosModal>
                                  <EnderecoModal>
                                    {enderecoModal.rua}, {enderecoModal.numero}{" "}
                                    - {enderecoModal.bairro}{" "}
                                    {enderecoModal.cidade}
                                  </EnderecoModal>
                                  <DataModal>
                                    {dataModal} às {horaModal}
                                  </DataModal>
                                </CaixaDadosModal>
                              </CaixaConteudoModal>
                            </CaixaModalGrande>
                            </CaixaExterna>
                          </Modal>
                        </ScrollView>
                      ) : (
                        <ScrollView>
                          <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalNaoOcorrida}
                          >
                            <CaixaExterna>
                            <CaixaModal>
                              <CaixaFechar>
                                <TouchableOpacity
                                  onPress={() => {
                                    setModalNaoOcorrida(false);
                                  }}
                                >
                                  <Icon name="close" size={tamanhoIcone}></Icon>
                                </TouchableOpacity>
                              </CaixaFechar>
                              <CaixaConteudoModal>
                                <CaixaTituloModal>
                                  <TituloModal>
                                    A sua consulta será no {nomeModal}
                                  </TituloModal>
                                </CaixaTituloModal>
                                <CaixaDadosModal>
                                  <EnderecoModal>
                                    {enderecoModal.rua}, {enderecoModal.numero}{" "}
                                    - {enderecoModal.bairro}{" "}
                                    {enderecoModal.cidade}
                                  </EnderecoModal>
                                  <DataModal>
                                    {dataModal} às {horaModal}
                                  </DataModal>
                                </CaixaDadosModal>
                              </CaixaConteudoModal>
                            </CaixaModal>
                            </CaixaExterna>
                          </Modal>
                        </ScrollView>
                      )}
                      <CaixaConsulta>
                        <CaixaData>
                          <ConteudoCaixa fontSize={fontSizeConteudo}>
                            {value.dataConsulta}
                          </ConteudoCaixa>
                        </CaixaData>
                        <CaixaNome
                          borderRightWidth={borderWidthCaixaNome}
                          borderLeftWidth={borderWidthCaixaNome}
                        >
                          <Icone marginRight="4%" marginLeft="0%">
                            <IconesConsulta
                              name="checkbox-blank-outline"
                              size={20}
                              color={Cores.azul}
                            ></IconesConsulta>
                          </Icone>
                          <ConteudoCaixa fontSize={fontSizeConteudo}>
                            Consulta de Rotina
                          </ConteudoCaixa>
                          <Icone marginRight="0%" marginLeft="4%">
                            <IconesConsulta
                              name="map-marker-outline"
                              size={20}
                              color={Cores.azul}
                            ></IconesConsulta>
                          </Icone>
                        </CaixaNome>
                        <CaixaHora>
                          <ConteudoCaixa fontSize={fontSizeConteudo}>
                            {value.horaConsulta} - {value.duracao_em_minutos}{" "}
                            min
                          </ConteudoCaixa>
                        </CaixaHora>
                      </CaixaConsulta>
                    </TouchableOpacity>
                  ))}
                </>
              </ScrollView>
            ) : (
              <TextoSemConsulta>
                Não há consultas marcadas no momento!
              </TextoSemConsulta>
            )}
          </ViewPadrao>
        )}
      </Body>
    </ScrollView>
  );
}

export default Consultas;
