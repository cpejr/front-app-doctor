import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Icone from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Body,
  CaixaSeta,
  CaixaTitulo,
  Titulo,
  CaixaSubTitulo,
  SubTitulo,
  CaixaScroll,
  CaixaExames,
  NomeExame,
  CaixaExterna,
  CaixaModal,
  CaixaFechar,
  CaixaTituloModal,
  TituloModal,
  CaixaDescricaoModal,
  DescricaoModal,
  CaixaContatos,
  Contatos,
  CaixaNomeMedica,
  NomeMedica,
  CaixaInfo,
  Info,
  PaginaCarregando,
} from "./Styles";
//import { Exames } from "./nomeExames";
import { Cores } from "../../variaveis";
import { ActivityIndicator,  } from "react-native-paper";
import * as managerService from "../../services/ManagerService/managerService";

function Recomendacoes({ navigation }) {
  const tamanhoIcone = width > 900 ? 48 : 48;
  const tamanhoIconeFechar = width > 900 ? 30 : 30;
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const alturaModal = width > height ? "88%" : "55%";
  const alturaScroll = width > height ? "34%" : "64%";
  const [alturaScrollModal, setAlturaScrollModal] = useState("");
  const [margemDescricao, setMargemDescricao] = useState("0px");


  const [abrirModal, setAbrirModal] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [Subtitulo, setSubtitulo] = useState("");
  const [Exames, setExames] = useState([]);
  const [medicasExame, setMedicasExame] = useState(
    [
      {
        nome:"",
        telefone: "",
        local_atendimento:""
      }
    ]
  );
  const [tituloExame, setTituloExame] = useState("");
  const [descricaoExame, setdescricaoExame] = useState("");
  


  async function abrindoModal(exame) {
    setTituloExame(exame.titulo);
    setdescricaoExame(exame.texto);
    setCarregando(true);

    
    const resposta = await managerService.medicosIndicadosPorId(exame.id);

    if (resposta.lenght === 0 )
    {
      setMedicasExame(
        {
          nome:"",
          telefone: "",
          local_atendimento:""
        }
      )
    }
    else
    {
      setMedicasExame(resposta)
    }


    if (exame.texto === "") {
      setAlturaScrollModal("60%");
      setMargemDescricao("0px");
    } else {
      setAlturaScrollModal("34%");
      setMargemDescricao("20px");
    }
    
    setCarregando(false);
    setAbrirModal(true);
  }

  async function pegandoSubtitulo() {
    setCarregando(true);
    const resposta = await managerService.pegandoDescricaoPagRecomendacoes();
    setSubtitulo(resposta[0].texto);
    setCarregando(false);
  }

  async function pegandoIndicacoesEspecificas() {
    setCarregando(true);
    const resposta = await managerService.pegandoIndicacoesEspecificas();
    setExames(resposta);
    setCarregando(false);
  }



  useEffect(() => {
    pegandoSubtitulo();
    pegandoIndicacoesEspecificas();
  }, []);

  return (
    <Body>
      <CaixaSeta>
        <TouchableOpacity onPress={() => navigation.push("Home")}>
          <Icone name="arrow-left" size={tamanhoIcone} color={Cores.azul} />
        </TouchableOpacity>
      </CaixaSeta>
      { carregando?  
       <PaginaCarregando height={height} width={width}>
            <ActivityIndicator animating={true} color={Cores.azul} />
        </PaginaCarregando>:
      <>
      <CaixaTitulo>
        <Titulo>Indicações e Sugestões de Profissionais para Exames </Titulo>
      </CaixaTitulo>
     
      <CaixaSubTitulo>
        <SubTitulo>
          { Subtitulo }
        </SubTitulo>
      </CaixaSubTitulo>
      <Modal animationType="slide" transparent={true} visible={abrirModal}>
        <CaixaExterna height={height} width={width}>
          <CaixaModal height={alturaModal}>
            <CaixaFechar>
              <TouchableOpacity
                onPress={() => {
                  setAbrirModal(false);
                }}
              >
                <Icon name="close" size={tamanhoIconeFechar}></Icon>
              </TouchableOpacity>
            </CaixaFechar>
            <CaixaTituloModal>
              <TituloModal>{tituloExame}</TituloModal>
            </CaixaTituloModal>
            <CaixaDescricaoModal marginBottom={margemDescricao}>
              <DescricaoModal>{descricaoExame}</DescricaoModal>
            </CaixaDescricaoModal>
            <CaixaContatos height={alturaScrollModal}>
              <ScrollView>
                 {medicasExame.map((contato) => (
                  <Contatos key={contato.id}>
                    <CaixaNomeMedica>
                      <NomeMedica>{contato.nome}</NomeMedica>
                    </CaixaNomeMedica>
                    <CaixaInfo>
                      <Info>Local: {contato.local_atendimento}</Info>
                    </CaixaInfo>
                    <CaixaInfo>
                      <Info>Telefone: {contato.telefone}</Info>
                    </CaixaInfo>
                  </Contatos>
                ))} 
              </ScrollView>
            </CaixaContatos>
          </CaixaModal>
        </CaixaExterna>
      </Modal>
      <CaixaScroll height={alturaScroll}>
        <ScrollView style={{ width: "85%" }}>
          {Exames.map((exame) => (
            <TouchableOpacity
              onPress={() => abrindoModal(exame)}
              key={exame.id}
            >
              <CaixaExames>
                <NomeExame>{exame.titulo}</NomeExame>
              </CaixaExames>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CaixaScroll>
      </>}
    </Body>
  );
}

export default Recomendacoes;
