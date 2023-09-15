import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import Icone from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";
import logoAmie from "./../../assets/logoAmie.jpg";
import medicosAmie from "./../../assets/medicosAmie.webp";
import {
  Card,
  Corpo,
  CorpoCard,
  BotaoSaibaMais,
  TextoAprendendo,
  ConteudoAprendendo,
  TituloInformacao,
  TextoPagina,
  TituloPagina,
  CaixaSeta,
  TituloMemoria,
  TextoMemoria,
  BotaoSaibaMaisMem,
  TituloDisturbio,
  TextoDisturbio,
  BotaoSaibaMaisDis,
  TituloAVC,
  TextoAVC,
  BotaoSaibaMaisAVC,
  TituloOutros,
  TextoOutros,
  BotaoSaibaMaisOutros,
} from "./Styles";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import { Cores } from "../../variaveis";
import AntIcon from "react-native-vector-icons/AntDesign";
import { ActivityIndicator, Colors } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as managerService from "../../services/ManagerService/managerService";
import { sleep } from "../../utils/sleep";

function AprendendoSobre( { navigation }) {
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();
  const tamanhoIcone = width > 480 ? 55 : 55;
  const tamanhoIconeSeta = width > 480 ? 36 : 33;
  const WidthImagemMedicos = width > height ? 450 : 280;
  const HeightImagemMedicos = width > height ? 350 : 180;
  const WidthImagemLogo = width > height ? 300 : 250;
  const HeightImagemLogo = width > height ? 200 : 150;
  const larguraBotoesMaior = width < 600 ? "60%" : "50%";
  const larguraBotoes = width < 330 ? "60%" : larguraBotoesMaior;
  const [urlEpilepsia, seturlEpilepsia] = useState(
    `https://www.drguilhermemarques.com/sobre-a-epilepsia`
  );

  useEffect(() => {
    seturlEpilepsia(encodeURI(urlEpilepsia));
  }, []);

  const renderizarUrl = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlEpilepsia);
    if (checarUrl) {
      await Linking.openURL(urlEpilepsia);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlEpilepsia}`);
    }
  }, [urlEpilepsia]);
  const [urlSono, seturlSono] = useState(
    `https://www.drguilhermemarques.com/sono`
  );

  useEffect(() => {
    seturlSono(encodeURI(urlSono));
  }, []);

  const renderizarUrl2 = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlSono);
    if (checarUrl) {
      await Linking.openURL(urlSono);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlSono}`);
    }
  }, [urlSono]);
  const [urlCefaleias, seturlCefaleias ] = useState(
    `https://www.drguilhermemarques.com/cefaleias`
  );

  useEffect(() => {
    seturlCefaleias(encodeURI(urlCefaleias));
  }, []);

  const renderizarUrl3 = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlCefaleias);
    if (checarUrl) {
      await Linking.openURL(urlCefaleias);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlCefaleias}`);
    }
  }, [urlCefaleias]);
  const [urlMemoria, seturlMemoria] = useState(
    `https://www.drguilhermemarques.com/memoria-cognicao-demencias`
  );

  useEffect(() => {
    seturlMemoria(encodeURI(urlMemoria));
  }, []);

  const renderizarUrl4 = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlMemoria);
    if (checarUrl) {
      await Linking.openURL(urlMemoria);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlMemoria}`);
    }
  }, [urlMemoria]);
  const [urlMovimento , seturlMovimento ] = useState(
    `https://www.drguilhermemarques.com/disturbios-dos-movimentos-e-parkinson`
  );

  useEffect(() => {
    seturlMovimento(encodeURI(urlMovimento));
  }, []);

  const renderizarUrl5 = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlMovimento);
    if (checarUrl) {
      await Linking.openURL(urlMovimento);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlMovimento}`);
    }
  }, [urlMovimento]);
  const [urlNeuropatias , seturlNeuropatias ] = useState(
    `https://www.drguilhermemarques.com/neuropatias-e-doencas-neuromusculares`
  );

  useEffect(() => {
    seturlNeuropatias(encodeURI(urlNeuropatias));
  }, []);

  const renderizarUrl6 = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlNeuropatias);
    if (checarUrl) {
      await Linking.openURL(urlNeuropatias);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlNeuropatias}`);
    }
  }, [urlNeuropatias]);
  const [urlAVC, seturlAVC] = useState(
    `https://www.drguilhermemarques.com/avc`
  );

  useEffect(() => {
    seturlAVC(encodeURI(urlAVC));
  }, []);

  const renderizarUrl7 = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlAVC);
    if (checarUrl) {
      await Linking.openURL(urlAVC);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlAVC}`);
    }
  }, [urlAVC]);
  const [urlOutros , seturlOutros] = useState(
    `https://www.drguilhermemarques.com/topicos-gerais-neurologia`
  );

  useEffect(() => {
    seturlOutros(encodeURI(urlOutros));
  }, []);

  const renderizarUrl8 = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlOutros);
    if (checarUrl) {
      await Linking.openURL(urlOutros);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlOutros}`);
    }
  }, [urlOutros]);

  const [urlAprendendo, seturlAprendendo] = useState(
    `https://www.drguilhermemarques.com/aprendendo-sobre`
  );

  useEffect(() => {
    seturlAprendendo(encodeURI(urlAprendendo));
  }, []);

  const renderizarUrl0 = useCallback(async () => {
    const checarUrl = await Linking.canOpenURL(urlAprendendo);
    if (checarUrl) {
      await Linking.openURL(urlAprendendo);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${urlAprendendo}`);
    }
  }, [urlAprendendo]);


  return (
    <ScrollView overScrollMode ="never">
        <Corpo>
           
            <>
            <CaixaSeta>
            <TouchableOpacity onPress={() => navigation.push("Home")}>
            <Icon 
                    name="arrow-back-circle-outline" 
                    size={tamanhoIconeSeta} 
                    color="blue"
                    onPress={() => navigation.navigate("Home")}/>
        </TouchableOpacity>
        </CaixaSeta>
            <TituloPagina onPress={renderizarUrl0} color={Cores.azul}>
              Aprendendo Sobre
            </TituloPagina>
            <TextoPagina color={Cores.preto}>Este espaço é destinado ao compartilhamento de algumas informações sobre as principais doenças e condições neurológicas.
            </TextoPagina>
            <TextoPagina color={Cores.preto}>
            Navegando atráves das seções abaixo você poderá acessar informações úteis para os pacientes, familiares e cuidadores.
            </TextoPagina>
            <Card backgroundColor={Cores.branco} height="auto">
                <CorpoCard>
                  <TituloInformacao color={Cores.preto}>
                  Epilepsia
                  </TituloInformacao>
                  <ConteudoAprendendo>
                    <TextoAprendendo color={Cores.preto}>Informações sobre as Epilepsias, seus tipos, causas, implicações, modo de diagnóstico e tratamentos.
                    </TextoAprendendo>
                  </ConteudoAprendendo>
                  <BotaoSaibaMais
                    onPress={renderizarUrl}
                    color={Cores.branco}
                  >
                    <ConteudoBotao
                      fontSize="16px"
                      color={Cores.preto}
                      width="30%"
                    >
                      SAIBA MAIS
                    </ConteudoBotao>
                    <AntIcon name="right" size={25} color={Cores.preto} />
                  </BotaoSaibaMais>
                </CorpoCard>
              </Card>
              <Card backgroundColor={Cores.azul} height="auto">
                <CorpoCard>
                  <TituloInformacao color={Cores.branco}>
                  Distúrbios do Sono 
                  </TituloInformacao>
                  <ConteudoAprendendo>
                    <TextoAprendendo color={Cores.branco}>Informações sobre as patologias mais comuns que podem acometer o sono.
                    </TextoAprendendo>
                  </ConteudoAprendendo>
                  <BotaoSaibaMais
                    onPress={renderizarUrl2}
                    color={Cores.azul}
                  >
                    <ConteudoBotao
                      fontSize="16px"
                      color={Cores.branco}
                      width="30%"
                    >
                      SAIBA MAIS
                    </ConteudoBotao>
                    <AntIcon name="right" size={25} color={Cores.branco} />
                  </BotaoSaibaMais>
                </CorpoCard>
              </Card>
              <Card backgroundColor={Cores.branco} height="auto">
                <CorpoCard>
                  <TituloInformacao color={Cores.preto}>
                  Cefaleias
                  </TituloInformacao>
                  <ConteudoAprendendo>
                    <TextoAprendendo color={Cores.preto}>Informações sobre as Cefaleias, seus tipos, causas, implicações, modo de diagnóstico e tratamentos.
                    </TextoAprendendo>
                  </ConteudoAprendendo>
                  <BotaoSaibaMais
                    onPress={renderizarUrl3}
                    color={Cores.branco}
                  >
                    <ConteudoBotao
                      fontSize="16px"
                      color={Cores.preto}
                      width="30%"
                    >
                      SAIBA MAIS
                    </ConteudoBotao>
                    <AntIcon name="right" size={25} color={Cores.preto} />
                  </BotaoSaibaMais>
                </CorpoCard>
              </Card>
              <Card backgroundColor={Cores.azul} height="auto">
                <CorpoCard>
                  <TituloMemoria color={Cores.branco}>
                  Memória, Cognição e Demências
                  </TituloMemoria>
                  <ConteudoAprendendo>
                    <TextoMemoria color={Cores.branco}>Informações sobre as síndromes demenciais mais comuns.
                    </TextoMemoria>
                  </ConteudoAprendendo>
                  <BotaoSaibaMaisMem
                    onPress={renderizarUrl4}
                    color={Cores.azul}
                  >
                    <ConteudoBotao
                      fontSize="16px"
                      color={Cores.branco}
                      width="30%"
                    >
                      SAIBA MAIS
                    </ConteudoBotao>
                    <AntIcon name="right" size={25} color={Cores.branco} />
                  </BotaoSaibaMaisMem>
                </CorpoCard>
              </Card>
              <Card backgroundColor={Cores.branco} height="auto">
                <CorpoCard>
                  <TituloDisturbio color={Cores.preto}>
                  Distúrbios do Movimento
                  </TituloDisturbio>
                  <ConteudoAprendendo>
                    <TextoDisturbio color={Cores.preto}>Informações sobre os Distúrbios do Movimento, seus tipos, causas, implicações, modo de diagnóstico e tratamentos.
                    </TextoDisturbio>
                  </ConteudoAprendendo>
                  <BotaoSaibaMaisDis
                    onPress={renderizarUrl5}
                    color={Cores.branco}
                  >
                    <ConteudoBotao
                      fontSize="16px"
                      color={Cores.preto}
                      width="30%"
                    >
                      SAIBA MAIS
                    </ConteudoBotao>
                    <AntIcon name="right" size={25} color={Cores.preto} />
                  </BotaoSaibaMaisDis>
                </CorpoCard>
              </Card>
              <Card backgroundColor={Cores.azul} height="auto">
                <CorpoCard>
                  <TituloInformacao color={Cores.branco}>
                  Neuropatias e Doenças Neuromusculares
                  </TituloInformacao>
                  <ConteudoAprendendo>
                    <TextoAprendendo color={Cores.branco}>Informações sobre os Neuropatias e Doenças Neuromusculares, seus tipos, causas, implicações, modo de diagnóstico e tratamentos.
                    </TextoAprendendo>
                  </ConteudoAprendendo>
                  <BotaoSaibaMais
                    onPress={renderizarUrl6}
                    color={Cores.azul}
                  >
                    <ConteudoBotao
                      fontSize="16px"
                      color={Cores.branco}
                      width="30%"
                    >
                      SAIBA MAIS
                    </ConteudoBotao>
                    <AntIcon name="right" size={25} color={Cores.branco} />
                  </BotaoSaibaMais>
                </CorpoCard>
              </Card>
              <Card backgroundColor={Cores.branco} height="auto">
                <CorpoCard>
                  <TituloAVC color={Cores.preto}>
                  AVC - Acidente Vascular Cerebral
                  </TituloAVC>
                  <ConteudoAprendendo>
                    <TextoAVC color={Cores.preto}>Informações sobre os acidentes vasculares cerebrais: significado, tipos, diagnóstico e tratamento.
                    </TextoAVC>
                  </ConteudoAprendendo>
                  <BotaoSaibaMaisAVC
                    onPress={renderizarUrl7}
                    color={Cores.branco}
                  >
                    <ConteudoBotao
                      fontSize="16px"
                      color={Cores.preto}
                      width="30%"
                    >
                      SAIBA MAIS
                    </ConteudoBotao>
                    <AntIcon name="right" size={25} color={Cores.preto} />
                  </BotaoSaibaMaisAVC>
                </CorpoCard>
              </Card>
              <Card backgroundColor={Cores.azul} height="auto">
                <CorpoCard>
                  <TituloOutros color={Cores.branco}>
                  Outros tópicos em Neurologia Geral
                  </TituloOutros>
                  <ConteudoAprendendo>
                    <TextoOutros color={Cores.branco}>Informações sobre outros tópicos em Neurologia Geral.
                    </TextoOutros>
                  </ConteudoAprendendo>
                  <BotaoSaibaMaisOutros
                    onPress={renderizarUrl8}
                    color={Cores.azul}
                  >
                    <ConteudoBotao
                      fontSize="16px"
                      color={Cores.branco}
                      width="30%"
                    >
                      SAIBA MAIS
                    </ConteudoBotao>
                    <AntIcon name="right" size={25} color={Cores.branco} />
                  </BotaoSaibaMaisOutros>
                </CorpoCard>
              </Card>
          </>
        </Corpo>
      </ScrollView>
  );
}

export default AprendendoSobre;
