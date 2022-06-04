import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import {
  Body,
  Titulo,
  Subtitulo,
  TituloPrimeiroTopico,
  TextoPrimeiroTopico,
} from "./Styles";
import { Checkbox } from "react-native-paper";
import { useFonts } from "expo-font";

function LGPD() {
  const [loaded] = useFonts({
    BarlowSemibold: require("../../assets/fonts/Barlow-SemiBold.ttf"),
    BarlowMedium: require("../../assets/fonts/Barlow-Medium.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <ScrollView>
      <Body>
        <Titulo fontFamily="BarlowSemibold">Termos e Condições</Titulo>
        <Subtitulo fontFamily="BarlowMedium">
          Por meio do presente instrumento, são estabelecidos os termos e as
          condições gerais para a prestação de serviços (as “Condições Gerais”),
          os quais ficam incorporados, para todos os fins e efeitos, ao
          formulário de contratação do iFood (o “Formulário” e, emconjunto com a
          Condições Gerais, o “Contrato”).
        </Subtitulo>
        <TituloPrimeiroTopico fontFamily="BarlowSemibold">
          1) O que é Lorem Ipsum?
        </TituloPrimeiroTopico>
        <TextoPrimeiroTopico fontFamily="BarlowMedium">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </TextoPrimeiroTopico>
      </Body>
    </ScrollView>
  );
}

export default LGPD;
