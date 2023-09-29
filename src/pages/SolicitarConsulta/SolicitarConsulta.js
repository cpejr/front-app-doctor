import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import whatsappIcon from "./../../assets/whatsappIcon.png";
import voltarIcon from "./../../assets/voltarIcon.png";
import ViewPadrao from "../../styles/ViewPadrao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import {
  Body,
  CaixaTitulo,
  VoltarIcone,
  Titulo,
  ConteudoView,
  BotaoView,
  Botao,
  BotaoIcone,
  Container
} from "./Styles";
import { Cores } from "../../variaveis"
import Icon from "react-native-vector-icons/Entypo";

function SolicitarConsulta({ navigation }) {
  const mensagemPadrao =
    "Olá! Gostaria de marcar uma consulta com Doutor Guilherme Marques.";
  const telefoneContato = "5579981375018";
  const [urlWhatsApp, setUrlWhatsApp] = useState(
    `https://api.whatsapp.com/send?phone=${telefoneContato}&text=${mensagemPadrao}`
  );

  const { width } = useWindowDimensions();
  const heightTela = `${Dimensions.get("window").height}px`;

  useEffect(() => {
    setUrlWhatsApp(encodeURI(urlWhatsApp));
  }, []);

  const renderizarUrl = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlWhatsApp);
    if (true) {
      await Linking.openURL(urlWhatsApp);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlWhatsApp}`);
    }
  }, [urlWhatsApp]);

  //responsividade paisagem
  const larguraViewMaior = width < 600 ? "80%" : "70%";
  const larguraBotaoMaior = width < 600 ? "60%" : "40%";
  const marginLeftCaixaTitulo = width < 600 ? "5%" : "30%";

  // //responsividade aparelhos
  const larguraView = width < 330 ? "80%" : larguraViewMaior;
  const larguraBotao = width < 330 ? "65%" : larguraBotaoMaior;
  const fontSizeBotao = width < 330 ? "13px" : "16px";
  const fontSizeConteudoView = width < 330 ? "18px" : "20px";
  const fontSizeTitulo = width < 330 ? "25px" : "30px";
  const tamanhoIcone = width > 480 ? 40 : 40;

  return (
    <ScrollView>
      <Body height={heightTela}>
        <CaixaTitulo marginLeft={marginLeftCaixaTitulo}>
          <TouchableOpacity onPress={() => navigation.navigate("Consultas")}>
            <Icon name="arrow-left" size={tamanhoIcone} color={Cores.azul} />
          </TouchableOpacity>

          <Titulo fontSize={fontSizeTitulo}>Marcar Consulta</Titulo>
        </CaixaTitulo>

        <ViewPadrao
          width="90%"
          marginTop="6%"
          paddingLeft="5%"
          paddingRight="5%"
          backgroundColor={Cores.cinza[7]}
        >
          <ConteudoView fontSize={fontSizeConteudoView}>
            Entre em contato conosco pelo WhatsApp para marcarmos sua consulta:
          </ConteudoView>
          <BotaoView>
            <Botao width={larguraBotao} onPress={renderizarUrl}>
              <BotaoIcone source={whatsappIcon} />
              <ConteudoBotao
                fontSize={fontSizeBotao}
                color={Cores.azulEscuro}
                width={"90%"}
              >
                FALE CONOSCO
              </ConteudoBotao>
            </Botao>
          </BotaoView>
        </ViewPadrao>
      </Body>
    </ScrollView>
  );
}

export default SolicitarConsulta;
