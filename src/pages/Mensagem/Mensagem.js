import React, { useRef } from "react";
import dayjs from "dayjs";
import {
  MensagemEnviada,
  DataHoraMensagem,
  HoraMensagem,
  CorpoScroll,
} from "./Styles";
import { View, Text, ScrollView, RefreshControl } from "react-native";

export default function Mensagem({
  //scrollViewRef,
  pertenceAoUsuarioAtual,
  conteudo,
  data_criacao,
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
      <Text>{conteudo}</Text>
      <DataHoraMensagem>
        <HoraMensagem>
          {dayjs(data_criacao).format("DD/MM/YYYY HH:mm")}
        </HoraMensagem>
      </DataHoraMensagem>
    </MensagemEnviada>
  );
}
