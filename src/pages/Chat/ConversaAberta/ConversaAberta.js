import React, { useContext, useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, Image } from "react-native";
import {
  Body,
  HeaderConversaAberta,
  FundoConversaAberta,
  FooterConversaAberta,
  BarraEnviarMensagemConversaAberta,
  TextoMensagem,
  MensagemEnviada,
  TextoMensagemEnviada,
  MensagemRecebida,
  HoraMensagem,
} from "./Styles";
import searchIcon from "../../../assets/searchIcon.png";
import * as managerService from "../../../services/ManagerService/managerService";
import Botao from "../../../styles/Botao";
import ConteudoBotao from "../../../styles/ConteudoBotao";
import { Cores } from "../../../variaveis";
import IconeMaterial from 'react-native-vector-icons/MaterialIcons';
import IconeIon from 'react-native-vector-icons/Ionicons';
import IconeFoundation from 'react-native-vector-icons/Foundation';


function ConversaAberta({navigation}) {
  return (
    <Body>
      <HeaderConversaAberta>
        <IconeIon 
        name="arrow-back-circle-outline" 
        size={32} 
        color={Cores.azulEscuro}
        onPress={() => navigation.navigate("BarraLateral")}
        />
      </HeaderConversaAberta>
      <FundoConversaAberta>
        <MensagemEnviada>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. Eos eaque minima qui aliquid tempora non fuga omnis. 
          </TextoMensagemEnviada>
          <HoraMensagem>
            11:00
          </HoraMensagem>
        </MensagemEnviada>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. Non officiis deserunt ex delectus animi non exercitationem eius aut dolores facere? Qui saepe possimus non earum architecto vel autem nihil ut veniam quos nam fuga odio. Eos eaque minima qui aliquid tempora non fuga omnis. 
          </TextoMensagemEnviada>
          <HoraMensagem>
            11:04
          </HoraMensagem>
        </MensagemRecebida>
      </FundoConversaAberta>
      <FooterConversaAberta>
        <IconeFoundation
          name="paperclip" 
          size={33} 
          color={Cores.azulEscuro}
          />
          <BarraEnviarMensagemConversaAberta>
            <TextoMensagem>Mensagem</TextoMensagem>
          </BarraEnviarMensagemConversaAberta>
        <IconeMaterial
          name="send" 
          size={30} 
          color={Cores.azulEscuro}
          />
      </FooterConversaAberta>
    </Body>
  );
}

export default ConversaAberta;