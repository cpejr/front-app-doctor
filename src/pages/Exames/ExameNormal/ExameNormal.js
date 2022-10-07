import React, { useCallback, useState, useEffect } from "react";
import { Text, View, Button, ScrollView, TouchableOpacity, Linking, useWindowDimensions } from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import {
    Body,
    CaixaTextoCima,
    Titulo,
    CaixaContato,
    CaixaFaleConosco,
    TextoCaixa,
    TextoCaixaContato,
    ContainerVoltarCima,
  } from "./Styles";

function ExameNormal({ navigation }) {

  const mensagemPadrao =
    "Olá! Gostaria de marcar uma consulta com Doutor Guilherme Marques.";
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
  const tamanhoIcone = width > 480 ? 25 : 23;

  return (
        <Body>
            <ContainerVoltarCima></ContainerVoltarCima>
            <CaixaTextoCima><Titulo>Marcar Exame</Titulo></CaixaTextoCima>
            <CaixaContato>
                <TextoCaixaContato>Entre em contato conosco pelo Whatsapp para marcarmos o seu exame:</TextoCaixaContato>
                <CaixaFaleConosco>
                  <Icon 
                    name="logo-whatsapp" 
                    size={tamanhoIcone} 
                    color = "green" 
                    onPress={renderizarUrl} />
                  <TextoCaixa>FALE CONOSCO</TextoCaixa>      
                </CaixaFaleConosco>
            </CaixaContato>   
        </Body>
  );
}

export default ExameNormal;