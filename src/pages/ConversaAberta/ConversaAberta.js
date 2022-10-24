import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useDebugValue,
} from "react";
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
  CaixaTexto,
  PaginaCarregando
} from "./Styles";
import { Cores } from "../../variaveis";
import IconeMaterial from "react-native-vector-icons/MaterialIcons";
import IconeIon from "react-native-vector-icons/Ionicons";
import IconeFoundation from "react-native-vector-icons/Foundation";
import Icon from "react-native-vector-icons/Entypo";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";

function ConversaAberta({ navigation, route }) {
  const conversaClicada = route.params.paramKey;
  const [carregando, setCarregando] = useState(false);

  return (
    <Body>
      <HeaderConversaAberta>
        <Icon
          name="arrow-left"
          size={32}
          color={Cores.azul}
          onPress={() => navigation.push("BarraLateral")}
        />
        <ImagemUsuario source={conversaClicada.imagemPerfil} />
        <CaixaTexto>
        <TextoMensagem color={Cores.azul} fontSize="20px" fontWeight="bold">
          {conversaClicada.nome}
        </TextoMensagem>
        </CaixaTexto>
      </HeaderConversaAberta>

      <FundoConversaAberta>
      {carregando ? 
        <PaginaCarregando>
          <ActivityIndicator animating={true} color={Colors.black} />
        </PaginaCarregando> :
        <ScrollView>
        <MensagemEnviada>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. Eos eaque minima qui aliquid tempora non
            fuga omnis.
          </TextoMensagemEnviada>
          <HoraMensagem>11:00</HoraMensagem>
        </MensagemEnviada>
        <MensagemEnviada>
          <TextoMensagemEnviada>
            oi.
          </TextoMensagemEnviada>
          <HoraMensagem>11:02</HoraMensagem>
        </MensagemEnviada>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. Non officiis deserunt ex delectus animi
            non exercitationem eius aut dolores facere? Qui saepe possimus non
            earum architecto vel autem nihil ut veniam quos nam fuga odio. Eos
            eaque minima qui aliquid tempora non fuga omnis.
          </TextoMensagemEnviada>
          <HoraMensagem>11:04</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        <MensagemRecebida>
          <TextoMensagemEnviada>
            Lorem ipsum dolor sit amet. 
          </TextoMensagemEnviada>
          <HoraMensagem>11:08</HoraMensagem>
        </MensagemRecebida>
        </ScrollView>}
      </FundoConversaAberta>

      <FooterConversaAberta>
        <IconeFoundation name="paperclip" size={33} color={Cores.azulEscuro} />
        <BarraEnviarMensagemConversaAberta
        placeholder="Mensagem">
        </BarraEnviarMensagemConversaAberta>
        <IconeMaterial name="send" size={30} color={Cores.azulEscuro} />
      </FooterConversaAberta>
    </Body>
  );
}

export default ConversaAberta;
