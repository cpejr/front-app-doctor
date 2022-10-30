import React, { useState } from "react";
import { Text, View, useWindowDimensions, TouchableOpacity, ScrollView, Modal } from "react-native";
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
} from "./Styles";
import { Exames }  from "./nomeExames";
import { Cores } from "../../variaveis";



function Recomendacoes({ navigation }) {
  const tamanhoIcone = width > 900 ? 48 : 48;
  const tamanhoIconeFechar = width > 900 ? 30 : 30;
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const alturaModal = width > height ? "85%" : "55%";
  const alturaScroll = width > height ? "25%" : "60%";
  const [abrirModal, setAbrirModal] = useState(false);
  const [tituloExame, setTituloExame] = useState("");
  const [descricaoExame, setdescricaoExame] = useState("");
  const [medicasExame, setMedicasExame] = useState(Exames[1].medicos);
  const [alturaScrollModal, setAlturaScrollModal] = useState("");

  function abrindoModal(exame){
    setTituloExame(exame.nome);
    setdescricaoExame(exame.descricao);
    setMedicasExame(exame.medicos)
    

    if(exame.descricao === ""){
      setAlturaScrollModal("60%");
    }
    else{
      setAlturaScrollModal("33%");
    }
  
    setAbrirModal(true);
  }
  


  return (
    <Body>
      <CaixaSeta>
        <TouchableOpacity onPress={() => navigation.push("Home")}>
          <Icone
            name="arrow-left"
            size={tamanhoIcone}
            color={Cores.azul}
          />
        </TouchableOpacity>
      </CaixaSeta>
      <CaixaTitulo>
        <Titulo>Indicações e Sugestões de Profissionais para
        Exames </Titulo>
      </CaixaTitulo>
      <CaixaSubTitulo>
        <SubTitulo>
        São sugestões de profissionais de confiança
        para realização de exames ou tratamentos
        específicos, não oferecidos em meu consultório:
        </SubTitulo>
      </CaixaSubTitulo>
      <Modal
          animationType="slide"
          transparent={true}
          visible={abrirModal}
          
        >
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
              <TituloModal>
                {tituloExame}
              </TituloModal>
            </CaixaTituloModal>  
            <CaixaDescricaoModal>
              <DescricaoModal>
                {descricaoExame}
              </DescricaoModal>
           </CaixaDescricaoModal>
           <CaixaContatos height={alturaScrollModal}>
            <ScrollView>
             {medicasExame.map((contato) => ( 
                <Contatos>
                  <CaixaNomeMedica>
                    <NomeMedica>
                      {contato.nome}
                    </NomeMedica>
                  </CaixaNomeMedica>
                  <CaixaInfo>
                    <Info>
                      Local: {contato.local}
                    </Info>
                  </CaixaInfo>
                  <CaixaInfo>
                    <Info>
                      Telefone: {contato.telefone}
                    </Info>
                  </CaixaInfo>
                </Contatos>
               ))}  
            </ScrollView>
           </CaixaContatos>          
          </CaixaModal>
        </CaixaExterna>
      </Modal>
      <CaixaScroll height={alturaScroll}>
        <ScrollView style={{width:"85%"}}>
          {Exames.map((exame) => (
            <TouchableOpacity onPress={()=> abrindoModal(exame)} key={exame.nome}>
              <CaixaExames>
                <NomeExame>
                  {exame.nome}
                </NomeExame>
              </CaixaExames>
            </TouchableOpacity>  
          ))}
        </ScrollView>
      </CaixaScroll>
    </Body>
  );
}

export default Recomendacoes;
