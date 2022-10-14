import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import {
  Body,
  Titulo,
  Subtitulo,
  TituloPrimeiroTopico,
  TextoPrimeiroTopico,
} from "./Styles";
import { Checkbox } from "react-native-paper";
import { useFonts } from "expo-font";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";

function LGPD({navigation}) {
  const width = useWindowDimensions().width
  const height = useWindowDimensions().height

  const fontSizeBotao = height > width ? "13px" : "17px"
  

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
        <Botao
          width="30%"
          height="35px"
          backgroundColor="#838ad0"
          borderRadius="3px"
          borderColor="#151B57"
          borderWidth="1px"
          onPress={() => {
            navigation.navigate("Cadastro");
          }}
        >
          <ConteudoBotao fontSize={fontSizeBotao}color="#151B57" width="100%">
            Voltar ao cadastro
          </ConteudoBotao>
        </Botao>
      </Body>
    </ScrollView>
  );
}

export default LGPD;
