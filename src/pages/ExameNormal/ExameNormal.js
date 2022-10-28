import React, { useCallback, useState, useEffect } from "react";
import { Linking, ScrollView, useWindowDimensions } from "react-native";
import { Cores } from "../../variaveis";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/Ionicons";
import {
    Body,
    CaixaTextoCima,
    Titulo,
    CaixaContato,
    CaixaFaleConosco,
    TextoCaixa,
    TextoCaixaContato,
} from "./Styles";

function ExameNormal({ navigation }) {

  const mensagemPadrao =
    "Olá! Gostaria de marcar um exame com o Doutor Guilherme Marques.";
  const telefoneContato = "5579981375018";
  const [urlWhatsApp, setUrlWhatsApp] = useState(
    `https://api.whatsapp.com/send?phone=${telefoneContato}&text=${mensagemPadrao}`
  );

  useEffect(() => {
    setUrlWhatsApp(encodeURI(urlWhatsApp));
  }, []);

  const renderizarUrl = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlWhatsApp);
    if (checarUrl) {
      await Linking.openURL(urlWhatsApp);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlWhatsApp}`);
    }
  }, [urlWhatsApp]);

  const { width, height } = useWindowDimensions();
  const tamanhoIconeWhatsapp = width > 480 ? 25 : 23;
  const tamanhoIconeSeta = width > 480 ? 36 : 33;
  const tamanhoCaixaContato = height > 480 ? "33%" : "60%";
  const tamanhoCaixaFaleConosco = height > 480 ? "26%" : "42%";
  const larguraCaixaFaleConosco = width > 749 ? "35%" : "55%";
  const margemCaixaFaleConosco = width > 749 ? "5%" : "0%";
  const tamanhoCaixaTextoCima = height > 480 ? "15%" : "35%";
  const margemCaixaTextoCima = height > 480 ? "0%" : "5%";


  const [loaded] = useFonts({
    barlow: require("../../assets/fonts/Barlow-Medium.ttf"),
    barlowLight: require("../../assets/fonts/Barlow-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
        <Body>
          
            <CaixaTextoCima height = {tamanhoCaixaTextoCima} marginBottom = {margemCaixaTextoCima}>
              <Icon 
                    name="arrow-back-circle-outline" 
                    size={tamanhoIconeSeta} 
                    color={Cores.azul} 
                    onPress={() => navigation.navigate("Exames")}/>
              <Titulo>Marcar Exame</Titulo>
            </CaixaTextoCima>

            <CaixaContato height = {tamanhoCaixaContato}>
                <TextoCaixaContato fontFamily = "barlowLight">Entre em contato conosco pelo Whatsapp para marcarmos o seu exame:</TextoCaixaContato>
                <CaixaFaleConosco height = {tamanhoCaixaFaleConosco} width = {larguraCaixaFaleConosco} marginTop = {margemCaixaFaleConosco}>
                  <Icon 
                    name="logo-whatsapp" 
                    size={tamanhoIconeWhatsapp} 
                    color = "green" 
                    onPress={renderizarUrl} />
                  <TextoCaixa>FALE CONOSCO</TextoCaixa>      
                </CaixaFaleConosco>
            </CaixaContato>

        </Body>
  );
}

export default ExameNormal;