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
import { ChatContext } from '../../contexts/ChatContext';

const camposVaziosReferencia = {
	id_usuario: false,
};

const estadoIncial = {
	id_usuario: "",
};

function BarraLateral({ navigation, route }) {

  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase();
  const onChangeBusca = (busca) => setBusca(busca);
  const [carregando, setCarregando] = useState(false);
  const [modalNovaMensagem, setModalNovaMensagem] = useState(false);
  const [tooltipVisivel, setTooltipVisivel] = useState(false);
  const [usuario, setUsuario] = useState([]);
  const [secretariaSelecionada, setSecretariaSelecionada] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [camposVazios, setCamposVazios] = useState({});
  const [estado, setEstado] = useState(estadoIncial);
  const [selecionaUsuarioId, setSelecionaUsuarioId] = useState('');
  const { usuarioId, conversas, setConversas, setConversaSelecionada } =
    useContext(ChatContext);
  const componenteEstaMontadoRef = useRef(null);

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const alturaModal = (width > height) ? "70%" : "35%";
  const tamanhoIcone = width > 480 ? 35 : 25;

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
useEffect(() => {
  async function pegandoUsuarios(){

    if (!usuarioId) return;

    componenteEstaMontadoRef.current = true;

    const resposta = await managerService.GetTodosUsuarios();
    const pegaSecretaria = resposta.filter(
        (item) => item.tipo === "SECRETARIA(O)"
    );
    const conversasUsuariosIds = conversas.map(
      ({ conversaCom }) => conversaCom.id
    );
    setUsuario(pegaSecretaria);

    if (componenteEstaMontadoRef.current) {
      setUsuarios(usuarios);
      setCarregando(false);
    }
  }
    
  pegandoUsuarios();

  return () => (componenteEstaMontadoRef.current = false);
}, [conversas, usuarioId]);

function preenchendoDados(value) {
  setSelecionaUsuarioId(value)

  if (camposVazios.id_usuario)
    setCamposVazios({ id_usuario: false });

  setEstado({ id_usuario: value });
}

async function criarNovarConversa(e) {

  e.preventDefault();

  const camposVaziosAtual = {
    id_usuario: !estado.id_usuario,
  };

  setCamposVazios(camposVaziosAtual);

  if (!_.isEqual(camposVaziosAtual, camposVaziosReferencia)) {
    toast.warn("Preencha todos os campos");
    return;
  }

  setCarregando(true);

  const usuarioSelecionadoDados = usuarios.find(
    (usuario) => usuario.id === selecionaUsuarioId
  );
  const dadosParaCriarNovaConversa = {
    id_criador: usuarioId,
    id_receptor: usuarioSelecionadoDados.id,
    ativada: false,
  };
  const { id } = await managerService.CriandoConversa(
    dadosParaCriarNovaConversa,
    {
      mensagemSucesso: "Conversa criada com sucesso",
      tempo: 1500,
    }
  );

  const novaConversa = {
    id,
    ativada: false,
    mensagensNaoVistas: 0,
    conversaCom: {
      id: usuarioSelecionadoDados.id,
      nome: usuarioSelecionadoDados.nome,
      avatar_url: usuarioSelecionadoDados.avatar_url,
    },
  };


  setEstado(camposVaziosReferencia);
  setCamposVazios({});
  setModalAdicionar(false);
  setCarregando(false);
  setSelecionaUsuarioId(null);
  setConversaSelecionada(novaConversa);
  setConversas((conversasLista) => [novaConversa, ...conversasLista]);

}



// useEffect(() => {
//     pegandoUsuarios();
// },[]);

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
              destroyOnClose
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
                        value={secretariaSelecionada}
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
                  onPress={criarNovarConversa}
                >
                  <ConteudoBotao
                    fontSize="15px"
                    color={Cores.branco}
                    width="100%"
                  >
                    Confirmar
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
       <Botao
        height="40px"
        width="70%"
        backgroundColor={Cores.lilas[5]}
        borderRadius="10px"
        borderWidth="1px"
        borderColor={Cores.azul}
        marginTop="15px"
        onPress = {()=> setModalNovaMensagem(true)}
      >
        <ConteudoBotao fontSize="15px" color={Cores.branco} width="100%">
          Iniciar Nova Conversa
        </ConteudoBotao>
      </Botao>
    </Body>
  );
}

export default BarraLateral;
