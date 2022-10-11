import React, { useContext, useState, useEffect, useRef, useDebugValue } from 'react';
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
  ImagemUsuario,
} from "./Styles";
import { Cores } from "../../../variaveis";
import IconeMaterial from 'react-native-vector-icons/MaterialIcons';
import IconeIon from 'react-native-vector-icons/Ionicons';
import IconeFoundation from 'react-native-vector-icons/Foundation';

function ConversaAberta({navigation, route}) {

  const conversaClicada = route.params.paramKey;

  return (
    <Body>

      <HeaderConversaAberta>
        <IconeIon 
        name="arrow-back-circle-outline" 
        size={32} 
        color={Cores.lilas[1]}
        onPress={() => navigation.navigate("BarraLateral")}
        />
        <ImagemUsuario source = {conversaClicada.imagemPerfil}/>
        <TextoMensagem
          color={Cores.lilas[1]}
          fontSize = "20px"
          fontWeight = "bold"
        >
         {conversaClicada.nome}
        </TextoMensagem>
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
            <TextoMensagem
              color={Cores.cinza[2]}
              fontSize = "15px"
              fontWeight = "100"
            > 
              Mensagem
            </TextoMensagem>
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