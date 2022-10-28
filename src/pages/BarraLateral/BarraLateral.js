import React, { useContext, useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, Modal, useWindowDimensions, TouchableHighlight } from "react-native";
import {
  BarraPesquisa,
  Body,
  InputPesquisa,
  IconPesquisa,
  ImagemUsuario,
  CaixaTexto,
  CaixaImagem,
  TextoCaixa,
  CaixaUsuarioMensagem,
  HeaderChat,
  PaginaCarregando,
  ContainerIcone,
  CaixaModal,
  CaixaModalGrande,
  CaixaConteudoModal,
  CaixaFechar,
  CaixaTituloModal,
  TituloModal,
  CaixaExterna,
  PickerView,
  PickerSecretaria,
  CaixaInterna,
} from "./Styles";
import searchIcon from "../../assets/searchIcon.png";
import * as managerService from "../../services/ManagerService/managerService";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import { Cores } from "../../variaveis";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
import IconeAddConversa from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import Tooltip from 'react-native-walkthrough-tooltip';


function BarraLateral({ navigation }) {
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase();
  const onChangeBusca = (busca) => setBusca(busca);
  const [carregando, setCarregando] = useState(false);
  const [modalNovaMensagem, setModalNovaMensagem] = useState(false);
  const [tooltipVisivel, setTooltipVisivel] = useState(false);
  const [usuario, setUsuario] = useState([]);
  const [secretariaSelecionada, setSecretariaSelecionada] = useState();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const alturaModal = (width > height) ? "85%" : "50%";
  const tamanhoIcone = width > 480 ? 20 : 25;

  const imagemPerfilPadrão = require("../../assets/logoGuilherme.png");

  const vetorUsuariosMensagem = [
    {
      id: "41b266f8-5bcd-4e74-94b0-465aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f8-5bcd-4e74-94b0-4d6aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f8-5bcd-4e74-94b0-g65aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41f266f8-5bcd-4e74-94b0-465aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266g8-5bcd-4e74-94b0-465aefb0f9dab",
      nome: "Matheus",
      ultimaMensagem: "teste Mensagem",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f8b5bcd-4e74-94b0-465aefb0f9dac",
      nome: "Adrianus",
      ultimaMensagem: "teste Mensagem dois",
      imagemPerfil: imagemPerfilPadrão,
    },
    {
      id: "41b266f865bcd-4e74-94b0-465aefb0f9da",
      nome: "Laura Maria da Silva Carvalho Alexander Pardini Prado Neto ",
      ultimaMensagem:
        "teste Mensagem três agora com uma mensagem grnade muiti aaaa huttryturjfb ssss sss sss s sss sss sss s ss ss s s s ss ss ss ss s sss ",
      imagemPerfil: imagemPerfilPadrão,
    },
  ];

  const MensagensFiltradas = vetorUsuariosMensagem.filter((msg) => {
    if (lowerBusca === "") return vetorUsuariosMensagem;
    else
      return (
        msg?.nome
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(lowerBusca) || msg?.nome?.toLowerCase().includes(lowerBusca)
      );
  });

  async function abrirMensagemClicada(conversa) {
    if (conversa.id) {
      navigation.push("ConversaAberta", {
        paramKey: conversa,
      });
    } else {
      Alert.alert("Erro ao abrir a conversa.");
    }
  }

  async function pegandoUsuarios(){
    //await sleep(1500);
    const resposta = await managerService.GetTodosUsuarios();
    const pegaSecretaria = resposta.filter(
        (item) => item.tipo === "SECRETARIA(O)"
    );
    setUsuario(pegaSecretaria);
    
}


useEffect(() => {
    pegandoUsuarios();
},[]);

  return (
    <Body>
      <HeaderChat>
        <BarraPesquisa>
          <InputPesquisa
            placeholder="Pesquisar no chat"
            onChangeText={onChangeBusca}
            value={busca}
          />
          <IconPesquisa source={searchIcon} />
        </BarraPesquisa>
        <ContainerIcone>
          <IconeAddConversa name="add-circle-outline" size={40} color={Cores.azulEscuro} marginBot = {10} onPress={() => setModalNovaMensagem(true)}>
          </IconeAddConversa>
        </ContainerIcone>
      </HeaderChat>
      {carregando ? (
        <PaginaCarregando>
          <ActivityIndicator animating={true} color={Colors.black} />
        </PaginaCarregando>
      ) : (
        <ScrollView>
           <Modal
              animationType="slide"
              transparent={true}
              visible={modalNovaMensagem}
            >
              <CaixaExterna width={width} height={height}>
              <CaixaModalGrande  height={alturaModal}>
                <CaixaFechar>
                  <TouchableOpacity
                    onPress={() => {
                      setModalNovaMensagem(false);
                    }}
                  >
                    <Icon name="close" size={tamanhoIcone}></Icon>
                  </TouchableOpacity>
                </CaixaFechar>
                <CaixaInterna>
                <CaixaTituloModal>
                  <TituloModal>
                  Iniciar uma nova Conversa
                  </TituloModal>
                  </CaixaTituloModal>
                <PickerView>
                    <PickerSecretaria
                        selectedValue={secretariaSelecionada}
                        onValueChange={(itemValue) => {
                          setSecretariaSelecionada(itemValue);
                        }}
                    >   
                        <Picker.Item
                        style={{ fontSize: 15, color: "grey" }}
                        value=""
                        label={"Selecione um(a) Secretário(a)"}
                        />
                        
                    {usuario.map((value) => (
                        <Picker.Item
                            key={value.id}
                            style={{ fontSize: 15, color: "black" }}
                            value={value.nome}
                            label={value.nome}
                        />
                    ))}    
                    </PickerSecretaria>
                </PickerView>
                <Botao
                  height="40px"
                  width="50%"
                  marginTop="0px"
                  backgroundColor={Cores.lilas[5]}
                  borderRadius="10px"
                  borderWidth="1px"
                  borderColor={Cores.azul}
                >
                  <ConteudoBotao
                    fontSize="15px"
                    color={Cores.branco}
                    width="100%"
                  >
                    Enviar
                  </ConteudoBotao>
                </Botao>
                </CaixaInterna>
              </CaixaModalGrande>
              </CaixaExterna>
            </Modal>
          {MensagensFiltradas?.map((value) => (
            <TouchableOpacity
              onPress={() => {
                abrirMensagemClicada(value);
              }}
            >
              <CaixaUsuarioMensagem>
                <CaixaImagem>
                  <ImagemUsuario
                    border-radius="3px"
                    source={value.imagemPerfil}
                  ></ImagemUsuario>
                </CaixaImagem>
                <CaixaTexto>
                  <TextoCaixa fontSize="17px">{value.nome} </TextoCaixa>
                  <TextoCaixa fontSize="13px">
                    Última Mensagem: {value.ultimaMensagem}{" "}
                  </TextoCaixa>
                </CaixaTexto>
              </CaixaUsuarioMensagem>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </Body>
  );
}

export default BarraLateral;
