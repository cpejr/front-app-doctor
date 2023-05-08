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
import Icon from "react-native-vector-icons/Entypo";

function SobreMim({ navigation }) {
  const [carregando, setCarregando] = useState(true);
  const [larguraImagem, setLarguraImagem] = useState();
  const [alturaImagem, setAlturaImagem] = useState();

  const larguraTela = useWindowDimensions().width;

  function SetandoDimensoesImagem() {
    setLarguraImagem(100 * larguraTela);
    setAlturaImagem(((27 * 0.88) / 47) * larguraTela);
  }

  useEffect(() => {
    setCarregando(true);
    SetandoDimensoesImagem();
    setCarregando(false);
  }, [larguraTela]);

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
              color={Cores.lilas[1]}
            />
          </BotaoVoltar>
        </CaixaBotao>
        <CaixaTexto>
          <TituloTexto fontFamily="BarlowSemibold">Quem sou</TituloTexto>
          <Texto fontFamily="BarlowLight" textAlign="justify">
            {"\n"}
            Com formação em Neurologia e Neurofisiologia Clínica, atuo na
            investigação, diagnóstico e tratamento de variadas doenças e
            transtornos neurológicos. Após especialização no Hospital das
            Clínicas da Universidade de São Paulo - USP - Ribeirão Preto,
            retorno a Belo Horizonte para atuação em neurologia geral tanto
            hospitalar de urgência quanto ambulatorial, trazendo o conhecimento
            e experiência adquiridos em um dos maiores centros de Neurologia do
            país.
            {"\n"}
            {"\n"}
            O atendimento no pronto-socorro é focado no diagnóstico e
            tratamento rápido de situações associadas a grande sofrimento ou
            risco de lesões, sequelas ou morte. No cenário de urgência, faço
            parte das equipes dos Hospitais Mater Dei de BH e de Betim/Contagem.
            {"\n"}
            {"\n"}
            Já as condições neurológicas crônicas, de longa duração, ou
            que se repetem com frequência e trazem sofrimento e desconforto ao
            paciente, merecem ter acompanhamento regular no consultório, em
            nível ambulatorial. É nesse ambiente, com o tempo reservado e
            atendimento individualizado, que é possível desvendar como a doença
            interage com os fatores sociais e psicológicos em um dado paciente
            e, assim, personalizar o tratamento para obter o melhor resultado
            possível.
            {"\n"}
            {"\n"}
            Nem sempre podemos curar, mas podemos aliviar quase sempre e,
            com certeza, podemos confortar todas vezes. A minha filosofia de
            atendimento envolve a realização de uma consulta mais prolongada,
            pois somente assim é possível dar a atenção que é necessária ao
            paciente e aos familiares, e assim estabelecer o diagnóstico
            correto, o tratamento eficaz, além de poder esclarecer todas as
            dúvidas e aliviar todos os receios que sempre se apresentam quando
            nossa saúde está sob risco.
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
              width: larguraImagem,
              height: alturaImagem,
              borderRadius: 3,
              resizeMode: "contain",
            }}
            source={GuilhermeMarquesFotoSobreMim}
            alt={
              "Aqui existe uma foto do doutor Guilherme Marques em seu consultório" +
              30
            }
          ></Image>
        </CaixaImagem>

        <CaixaTexto>
          <TituloTexto fontFamily="BarlowSemibold">
            Minha Experiência
          </TituloTexto>
          <Texto fontFamily="BarlowLight" textAlign="justify">
            {"\n"}Graduação em Medicina pela Faculdade de Medicina da
            Universidade Federal de Minas Gerais (UFMG), 2006 a 2012
            {"\n"}
            {"\n"}Residência Médica em Neurologia, Hospital das Clínicas da
            UFMG, 2014 a 2017
            {"\n"}
            {"\n"}Título de especialista em Clínica Médica, Sociedade Brasileira
            de Clínica Médica, 2017
            {"\n"}
            {"\n"}Título de especialista em Neurologia, Academia Brasileira de
            Neurologia, 2017
            {"\n"}
            {"\n"}Residência Médica em Neurofisiologia Clínica, Hospital das
            Clínicas de Ribeirão Preto - Universidade de São Paulo - USP, 2017 a
            2018
            {"\n"}
            {"\n"}Título de Especialista em Neurofisiologia Clínica pela
            Sociedade Brasileira de Neurofisiologia Clínica - SBNC, 2018.
            {"\n"}
            {"\n"}Mestre em Neurologia, Hospital das Clínicas de Ribeirão Preto
            - Universidade de São Paulo - USP, em andamento, 2018-2019
            {"\n"}
            {"\n"}Membro fundador do Grupo AMIE - Avaliação e Manejo Integrado
            das Epilepsias
            {"\n"}
            {"\n"}Membro da Liga Mineira do Sono
            {"\n"}
            {"\n"}Médico Neurofisiologista (eletroencefalografia) - Clínica
            Conrad - Belo Horizonte
            {"\n"}
            {"\n"}Médico do Sono - Laboratório do Sono - Belo Horizonte
            {"\n"}
            {"\n"}Chefe da Clínica de Neurologia do Hospital da Polícia Militar
            de Minas Gerais
          </Texto>
        </CaixaTexto>
      </View>)}
    </ContainerScroll>
  );
}

export default SobreMim;
