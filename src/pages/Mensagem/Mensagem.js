import React, { useRef } from "react";
import dayjs from "dayjs";
import {
  MensagemEnviada,
  DataHoraMensagem,
  HoraMensagem,
  CorpoScroll,
  TextoMensagem,
  BotaoImagem
} from "./Styles";
import { View, Text, ScrollView, RefreshControl, Image, Linking, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import * as managerService from "../../services/ManagerService/managerService";
import { sleep } from "../../utils/sleep";
import Icon from 'react-native-vector-icons/AntDesign'; 
import { Cores } from "../../variaveis";


export default function Mensagem({
  //scrollViewRef,
  pertenceAoUsuarioAtual,
  conteudo,
  data_criacao,
  media_url,
}) {
  const scrollViewRef = useRef();
  

  return (
    <MensagemEnviada
      pertenceAoUsuarioAtual={pertenceAoUsuarioAtual}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
    >
      {conteudo === "Imagem" && 
      <TouchableOpacity   
            onPress={() => {
              Linking.openURL(media_url);
            }}>
            <BotaoImagem> 
              
                 <Icon name="picture" size={25} color={Cores.azul} style={{marginRight:5}} />
              <Text>
              Imagem
              </Text>
            </BotaoImagem>
           </TouchableOpacity>
      }
      {conteudo === "Arquivo PDF" && 
      <TouchableOpacity   
            onPress={() => {
              Linking.openURL(media_url);
            }}>
            <BotaoImagem> 
              
                 <Icon name="pdffile1" size={25} color={Cores.azul} style={{marginRight:5}} />
              <Text>
              Arquivo PDF
              </Text>
            </BotaoImagem>
           </TouchableOpacity>
      }
      {(conteudo !== "Arquivo PDF" && conteudo !=="Imagem") && <TextoMensagem>{conteudo}</TextoMensagem>}
      
      <DataHoraMensagem>
        <HoraMensagem>
          {dayjs(data_criacao).format("DD/MM/YYYY HH:mm")}
        </HoraMensagem>
      </DataHoraMensagem>
    </MensagemEnviada>
  );
}
