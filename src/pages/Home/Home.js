import React, { useState, useCallback, useRef, useEffect } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { ScrollView, Button, Alert, useWindowDimensions, Image, View } from "react-native";
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
  ConteudoAmie,
  ImagemAmie,
  TextoAmie,
  ImagemCarrossel,
  AnimacaoCarregando,
} from "./Styles";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import { Cores } from "../../variaveis";
import AntIcon from "react-native-vector-icons/AntDesign";
import { ActivityIndicator, Colors } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import * as managerService from "../../services/ManagerService/managerService";
import { sleep } from "../../utils/sleep";

function Home({ navigation }) {
  {
    /* <ScrollView>
<Button
title="Go to Cadastro"
onPress={() => navigation.navigate("Cadastro")}
/>
<Button
title="Go to Login"
onPress={() => navigation.navigate("Login")}
/>
<Button
title="Go to Comentarios"
onPress={() => navigation.navigate("Comentarios")}
/>
<Button
  title="Go to Emergencia"
  onPress={() => navigation.navigate("Emergencia")}
  />
  <Button
  title="Go to GrupoAMIE"
  onPress={() => navigation.navigate("GrupoAMIE")}
  />
  <Button
  title="Go to Perfil"
  onPress={() => navigation.navigate("Perfil")}
  />
  <Button
  title="Go to Recomendacoes"
  onPress={() => navigation.navigate("Recomendacoes")}
  />
  <Button
  title="Go to SobreMim"
  onPress={() => navigation.navigate("SobreMim")}
  />
  <Button
  title="Go to AlterarDados"
  onPress={() => navigation.navigate("AlterarDados")}
  />
  <Button
  title="Go to AlterarSenha"
  onPress={() => navigation.navigate("AlterarSenha")}
  />
  <Button title="Go to LGPD" onPress={() => navigation.navigate("LGPD")} />
  <Button
  title="Go to ListaReceitas"
  onPress={() => navigation.navigate("ListaReceitas")}
  />
  <Button
  title="Go to ListaFormularios"
  onPress={() => navigation.navigate("ListaFormularios")}
  />
  <Button
  title="Go to Arquivos"
  onPress={() => navigation.navigate("Arquivos")}
/>
<Button
  title="Go to Formulário de Emergência"
  onPress={() => navigation.push("FormularioEmergencia")}
/>
<Button
title="Go to Barra Lateral"
onPress={() => navigation.navigate("BarraLateral")}
/>
<Button
title="Go to Conversa Aberta"
onPress={() => navigation.navigate("ConversaAberta")}
/>
<Button
title="Go to ListaExames"
onPress={() => navigation.navigate("ListaExames")}
/>
<Button
title="Go to Solicitar Exame"
onPress={() => navigation.navigate("SolicitarExame")}
/>

<Button
title="Go to Exames"
onPress={() => navigation.navigate("Exames")}
/>

<Button
title="Go to ExameNormal"
onPress={() => navigation.navigate("ExameNormal")}
/>
</ScrollView> */
  }

  const { height, width } = useWindowDimensions();
  const [altura, setAltura] = useState();
  const [largura, setLargura] = useState();
  const [home, setHome] = useState({});
  const [fotoAmie, setFotoAmie] = useState("");
  const [imagens, setImagens] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [playing, setPlaying] = useState(false);

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
    console.log("teste ", resposta);
    setHome(info);

    const requests = res.map(({ imagem }) =>
      managerService.GetArquivoPorChave(imagem)
    );
    const responses = await Promise.all(requests);
    setImagens(responses);

    setCarregando(false);
  }

  async function setandoFotoAmie() {
    const chave = home.imagem_quatro;

    const arquivo = await managerService.GetArquivoPorChave(chave);
    setFotoAmie(arquivo);
    await sleep(1500);
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
    setandoFotoAmie();
  }, [home.imagem_quatro]);

  useEffect(() => {
    pegandoDados();
  }, []);

  useEffect(() => {
    setandoImagem();
  }, [width]);

  const alturaVideo = height < 800 ? "50%" : "60%";
  const larguraVideo = height < 800 ? "50%" : "70%";
  const alturaCard = height < 800 ? "350px" : "320px";
  

  return (
    <ScrollView>
      <Corpo>
      <YoutubePlayer
          height={300}
          play={playing}
          videoId={"Y_4jI0_-t_o"}
          onChangeState={onStateChange}
      />
        {carregando ? (
          <AnimacaoCarregando>
            <ActivityIndicator animating={true} color={Colors.blue900} />
          </AnimacaoCarregando>
        ) : (
          <>
            <Card backgroundColor={Cores.branco} height={alturaCard}>
              <TituloCard>BEM-VINDO AO DOCTOR APP</TituloCard>
              <TextoCard>Conheça melhor o Doutor Guilherme Marques</TextoCard>
              <Video height={alturaVideo} width={larguraVideo}>
              </Video>
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

                <BotaoSaibaMais>
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

                <BotaoSaibaMais>
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

                <BotaoSaibaMais>
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
                  {home.titulo_quatro}
                </TituloInformacao>
                <ConteudoAmie>
                  <TextoAmie color={Cores.preto}>{home.texto_quatro}</TextoAmie>
                  <View>
                    <Image
                      style={{
                        width: largura,
                        marginRight: "9%",
                        marginLeft: "3%",
                        //objectFit: "contain",
                        height: altura,
                      }}
                      source={{ uri: fotoAmie }}
                    />
                  </View>
                </ConteudoAmie>
                <BotaoSaibaMais>
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
  );
}

export default Home;
