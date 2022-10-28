import React from 'react';
import dayjs from 'dayjs';
import { MensagemEnviada, DataHoraMensagem, HoraMensagem } from './Styles';
import { View, Text,ScrollView, RefreshControl } from "react-native";

export default function Mensagem({
  scrollRef,
  pertenceAoUsuarioAtual,
  conteudo,
  data_criacao,
}) {
  return (
    <MensagemEnviada
      pertenceAoUsuarioAtual={pertenceAoUsuarioAtual}
      refreshing = {scrollRef}
    >
       <Text>{conteudo}</Text>
      <DataHoraMensagem>
        <HoraMensagem>{dayjs(data_criacao).format('DD/MM/YYYY HH:mm')}</HoraMensagem>
      </DataHoraMensagem>
    </MensagemEnviada>
  );
}

