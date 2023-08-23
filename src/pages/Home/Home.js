import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { ScrollView, Button, Alert, useWindowDimensions, Image, View, Platform } from "react-native";
import {
  Corpo,
  Card,
  TextoCard,
  TituloCard,
  Video,
  TituloInformacao,
  TextoInfomacao,
  CorpoCard,
  BotaoSaibaMais,
  ConteudoAprendendo,
  ImagemAprendendo,
  TextoAprendendo,
  ImagemCarrossel,
  AnimacaoCarregando,
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

function Home({ navigation }) {

  const { height, width } = useWindowDimensions();
  const [altura, setAltura] = useState();
  const [largura, setLargura] = useState();
  const [home, setHome] = useState({});
  const [homeVideo, setHomeVideo] = useState();
  const [idVideo, setIdVideo] = useState();
  const [imagens, setImagens] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [playing, setPlaying] = useState(false);
  //const [alturaCard, setAlturaCard] = useState(false);
  const emaillogado =  AsyncStorage.getItem("@AirBnbApp:email");
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  async function pegandoDados() {
    setCarregando(true);

    const resposta = await managerService.GetHomeInfo();
    const res = await managerService.GetImagemCarrossel();
    const info = resposta[0];
    setHome(info);
    await sleep(1500);

    const youtubeID = home.video.split('v=')[1].substring(0, 11);
    setIdVideo(youtubeID);

    const requests = res.map(({ imagem }) =>
      managerService.GetArquivoPorChave(imagem)
    );
    const responses = await Promise.all(requests);
    setImagens(responses);

    setCarregando(false);
  }

  function renderizarCarrossel({ item }) {
    return (
      <CorpoCard>
        <ImagemCarrossel source={{ uri: `${item}` }} />
      </CorpoCard>
    );
  }

  function setandoImagem() {
    setAltura((150 / 305) * 0.3 * width);
    setLargura(0.3 * width);
  }


  useEffect(() => {
    pegandoDados();
  }, [home.video]);

  useEffect(() => {
    setandoImagem();
  }, [width]);

  // useEffect(() => {
  //   verificaDispositivo();
  // }, []);

  // function verificaDispositivo(){
  //   if (Platform === 'ios') {
  //     altura = height < 800 ? "350px" : "320px"
  //     setAlturaCard(altura)
  //   } else {
  //     altura = height < 800 ? "350px" : "320px"
  //     setAlturaCard(altura)
  //   }
  // }

  const alturaVideo = height < 800 ? "90%" : "70%";
  const larguraVideo = height < 800 ? "80%" : "80%";
  const alturaCard = height < 1000 ? "280px" : height < 1200 ? "550px" : "650px";

  //  const idVideo = videoId.split('v=')[1].substring(0, 11);
  
  async function paginaSobreMim() {
    const email = await AsyncStorage.getItem("@AirBnbApp:email");
    if (email !== undefined && email !== null) {
      navigation.navigate("SobreMim");
    }else{
      navigation.navigate("Login");
    }
  }
  async function paginaRecomendacoes() {
    const email = await AsyncStorage.getItem("@AirBnbApp:email");
    if (email !== undefined && email !== null) {
      navigation.navigate("Recomendacoes");
    }else{
      navigation.navigate("Login");
    }
  }
  async function paginaComentarios() {
    const email = await AsyncStorage.getItem("@AirBnbApp:email");
    if (email !== undefined && email !== null) {
      navigation.navigate("Comentarios");
    }else{
      navigation.navigate("Login");
    }
  }
  async function paginaAprendendoSobre() {
    const email = await AsyncStorage.getItem("@AirBnbApp:email");
    if (email !== undefined && email !== null) {
      navigation.navigate("AprendendoSobre");
    }else{
      navigation.navigate("Login");
    }
  }
 
  return (
    <>
      <ScrollView overScrollMode ="never">
        <Corpo>
          {carregando ? (
            <AnimacaoCarregando>
              <ActivityIndicator animating={true} color={Colors.blue900} />
            </AnimacaoCarregando>
          ) : (
            <>
              <Card backgroundColor={Cores.branco} height={alturaCard}>
                <TituloCard>BEM-VINDO AO DOCTOR APP</TituloCard>
                <TextoCard>Conheça melhor o Doutor Guilherme Marques</TextoCard>
                  <YoutubePlayer
                  height={alturaVideo}
                  width={larguraVideo}
                  play={playing}
                  videoId={idVideo}
                  onChangeState={onStateChange}
                />
              </Card>

              <Card backgroundColor={Cores.branco} height="auto">
                <TituloCard>VENHA FAZER PARTE DO TIME</TituloCard>
                <TextoCard>
                  Para ter acesso a chat com o doutor, marcar exames e muito mais
                </TextoCard>
                <Botao
                  height="40px"
                  width="50%"
                  backgroundColor={Cores.lilas[5]}
                  borderRadius="10px"
                  borderWidth="2px"
                  borderColor={Cores.azulEscuro}
                  onPress={() => navigation.navigate("Cadastro")}
                >
                  <ConteudoBotao
                    fontSize="15px"
                    color={Cores.branco}
                    width="100%"
                  >
                    INSCREVA-SE
                  </ConteudoBotao>
                </Botao>
                <TextoCard>Já possui conta?</TextoCard>
                <Botao
                  height="40px"
                  width="30%"
                  backgroundColor={Cores.lilas[3]}
                  borderRadius="10px"
                  borderWidth="2px"
                  marginBottom="30px"
                  borderColor={Cores.azulEscuro}
                  onPress={() => navigation.navigate("Login")}
                >
                  <ConteudoBotao fontSize="15px" color={Cores.preto} width="100%">
                    ENTRAR
                  </ConteudoBotao>
                </Botao>
              </Card>

              <Card backgroundColor={"#7757a0"} height="auto">
                <CorpoCard>
                  <TituloInformacao color={Cores.branco}>
                    {home.titulo_um}
                  </TituloInformacao>
                  <TextoInfomacao color={Cores.branco}>
                    {home.texto_um}
                  </TextoInfomacao>

                  <BotaoSaibaMais backgroundColor={"#7757a0"} onPress={paginaSobreMim}>
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

              <Card backgroundColor={Cores.branco} height={"320px"}>
                <Carousel
                  data={imagens}
                  sliderWidth={350}
                  itemWidth={350}
                  renderItem={renderizarCarrossel}
                />
              </Card>

              <Card backgroundColor={"#FBCB4C"} height="auto">
                <CorpoCard>
                  <TituloInformacao color={Cores.preto}>
                    {home.titulo_dois}
                  </TituloInformacao>
                  <TextoInfomacao color={Cores.preto}>
                    {home.texto_dois}
                  </TextoInfomacao>

                  <BotaoSaibaMais backgroundColor={"#FBCB4C"} onPress={paginaRecomendacoes}>
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

              <Card backgroundColor={"#434B97"} height="auto">
                <CorpoCard>
                  <TituloInformacao color={Cores.branco}>
                    {home.titulo_tres}
                  </TituloInformacao>
                  <TextoInfomacao color={Cores.branco}>
                    {home.texto_tres}
                  </TextoInfomacao>

                  <BotaoSaibaMais backgroundColor={"#434B97"} onPress={paginaComentarios}>
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
                    Aprendendo Sobre...
                  </TituloInformacao>
                  <ConteudoAprendendo>
                    <TextoAprendendo color={Cores.preto}>Aprenda sobre as principais doenças e condições neurológicas
                    </TextoAprendendo>
                  </ConteudoAprendendo>
                  <BotaoSaibaMais
                    onPress={paginaAprendendoSobre}
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
            </>
          )}
        </Corpo>
      </ScrollView>
    </>
  )
}

export default Home;
