import React, { useState, useCallback, useRef } from "react";
import { Button, View, Text, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {WebView} from "react-native-webview";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import logoAmie from "./../../assets/logoAmie.jpg";
import medicosAmie from "./../../assets/medicosAmie.webp";
import {
  Body,
  CaixaSeta,
  CaixaDescricao,
  Descricao,
  Container,
  ImagemLogo,
  ImagemMedicos,
} from "./Styles";

function GrupoAMIE() {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();
  const tamanhoIcone = width > 480 ? 55 : 55;
  const WidthImagemMedicos = width > height ? 450 : 280;
  const HeightImagemMedicos = width > height ? 350 : 180;
  const WidthImagemLogo = width > height ? 300 : 250;
  const HeightImagemLogo = width > height ? 200 : 150;
  const larguraBotoesMaior = width < 600 ? "60%" : "50%";
  const larguraBotoes = width < 330 ? "60%" : larguraBotoesMaior;

  return (
    <Container>
      <CaixaSeta>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={tamanhoIcone}
            /* color={Cores.azul} */ color="green"
          />
        </TouchableOpacity>
      </CaixaSeta>
      <ScrollView>
        <Body>
          <ImagemLogo 
           width={WidthImagemLogo}
           height={HeightImagemLogo}source={logoAmie}></ImagemLogo>
          <CaixaDescricao>
            <Descricao>
              O grupo de Avaliação e Manejo Integrado das Epilepsias (AMIE) foi
              idealizado e fundado pelos Neurologistas e Neurofisiologistas
              Clínicos Dr. Guilherme Marques e Dra. Izabela Feitosa, e pelo
              Neurocirurgião Dr. Pedro Henrique, com o propósito de prestar
              assistência médica de excelência para as pessoas com epilepsia em
              Belo Horizonte e região metropolitana.
            </Descricao>
          </CaixaDescricao>
          <ImagemMedicos 
          width={WidthImagemMedicos}
          height={HeightImagemMedicos}
          source={medicosAmie}></ImagemMedicos>
        </Body>
      </ScrollView>
    </Container>
    <View>
      <Text>GrupoAMIE</Text>
    <YoutubePlayer
    javaScriptEnabled={true}
    height={300}
    play={playing}
    videoId={"LOrALdmPWVU"}
    onChangeState={onStateChange}
  />
  </View>
  );
}

export default GrupoAMIE;
