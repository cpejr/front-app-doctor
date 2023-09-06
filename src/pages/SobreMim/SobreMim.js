import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import {
  BotaoVoltar,
  CaixaBotao,
  CaixaImagem,
  CaixaTexto,
  ContainerScroll,
  PaginaCarregando,
  Texto,
  TituloTexto,
} from "./Styles";
import { Cores } from "../../variaveis";
import IconeVoltar from "react-native-vector-icons/Feather";
import GuilhermeMarquesFotoSobreMim from "./Imagens/GuilhermeMarquesFotoSobreMim.webp";
import GuilhermeMarquesTemplateArteSobreMim from "./Imagens/GuilhermeMarquesTemplateArteSobreMim.webp";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native-paper";
import * as managerService from "../../services/ManagerService/managerService";
import Icon from "react-native-vector-icons/Entypo";

function SobreMim({ navigation }) {
  const [carregando, setCarregando] = useState(true);
  const [larguraImagem, setLarguraImagem] = useState();
  const [alturaImagem, setAlturaImagem] = useState();
  const [sobreMim, setSobreMim] = useState();

  const larguraTela = useWindowDimensions().width;

  function SetandoDimensoesImagem() {
    setLarguraImagem(100 * larguraTela);
    setAlturaImagem(((27 * 0.88) / 47) * larguraTela);
  }

  useEffect(() => {
    setCarregando(true);
    SetandoDimensoesImagem();
    SetandoSobreMim();
    setCarregando(false);
  }, [larguraTela]);

  async function SetandoSobreMim(){
    let Sobremim = await managerService.GetSobremim();
    Sobremim.imagem_um = await managerService.GetArquivoPorChave(Sobremim.imagem_um)
    Sobremim.imagem_dois = await managerService.GetArquivoPorChave(Sobremim.imagem_dois)
    setSobreMim(Sobremim)
  }

  const [loaded] = useFonts({
    BarlowSemibold: require("../../assets/fonts/Barlow-SemiBold.ttf"),
    BarlowLight: require("../../assets/fonts/Barlow-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <ContainerScroll>
      {carregando ? (
        <>
          <PaginaCarregando>
            <ActivityIndicator animating={true} color={Colors.black} />
          </PaginaCarregando>
        </>
      ) : (
      <View style={{ alignItems: "center" }}>
        <CaixaBotao>
          <BotaoVoltar onPress={() => navigation.navigate("Home")}>
          <Icon
              name="arrow-left"
              size={40}
              color={Cores.azul}
            />
          </BotaoVoltar>
        </CaixaBotao>

        <CaixaImagem>
          <Image
            style={{
              width: larguraImagem,
              height: alturaImagem,
              borderRadius: 3,
              resizeMode: "contain",
            }}
            source={{ uri: sobreMim?.imagem_um }}
            alt={
              "Aqui existe uma imagem da logomarca do doutor Guilherme Marques" +
              30
            }
          ></Image>
        </CaixaImagem>

        <CaixaTexto>
          <TituloTexto fontFamily="BarlowSemibold">{sobreMim?.titulo_um}</TituloTexto>
          <Texto fontFamily="BarlowLight" textAlign="justify">
            {sobreMim?.texto_um}
          </Texto>
          <Texto fontFamily="BarlowLight" textAlign="center">
            {"\n"}Dr. Guilherme Marques
            {"\n"}CRM-MG 56.888
            {"\n"}
            {"\n"}Neurologia - RQE Nº: 38808
            {"\n"}Neurofisiologia Clínica - RQE Nº: 41054
            {"\n"}Clínica Médica - RQE Nº: 40153
            {"\n"}Mestre em Ciências pela USP
            {"\n"}
            {"\n"}Contato do consultório particular:
            {"\n"}Rua Matias Cardoso, 129 - Pilotis, Santo Agostinho - Belo
            Horizonte
          </Texto>
          <Texto fontFamily="BarlowSemibold" textAlign="center">
            {"\n"}Tel.: (31) 97248-8306
          </Texto>
          <Texto fontFamily="BarlowLight" textAlign="center">
            Secretárias: Larissa e Júlia
          </Texto>
        </CaixaTexto>

        <CaixaImagem>
          <Image
            style={{
              width: larguraImagem ,
              height: alturaImagem * 1.24,
              borderRadius: 3,
              resizeMode: "contain",
            }}
            source={{ uri: sobreMim?.imagem_dois }}
            alt={
              "Aqui existe uma foto do doutor Guilherme Marques em seu consultório" +
              30
            }
          ></Image>
        </CaixaImagem>

        <CaixaTexto>
          <TituloTexto fontFamily="BarlowSemibold">
          {sobreMim?.titulo_dois}
          </TituloTexto>
          <Texto fontFamily="BarlowLight" textAlign="justify">
          {sobreMim?.texto_dois}
          </Texto>
        </CaixaTexto>
      </View>)}
    </ContainerScroll>
  );
}

export default SobreMim;
