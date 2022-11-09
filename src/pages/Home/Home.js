import React from "react";
import { ScrollView, Image, useWindowDimensions } from "react-native";
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
} from "./Styles";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import { Cores } from "../../variaveis";
import AntIcon from "react-native-vector-icons/AntDesign";
import Carousel from "react-native-snap-carousel";

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

  const { height } = useWindowDimensions();

  const CarrosselItens = [
    {
      titulo: "Mini André",
    },
    {
      titulo: "Vermelho André",
    },
    {
      titulo: "Cansado André",
    },
  ];

  function renderizarCarrossel({ item }) {
    return (
      <CorpoCard>
        <TituloCard color={Cores.preto}>{item.titulo}</TituloCard>
        <Image source={require("../../assets/amie_logo.png")} />
      </CorpoCard>
    );
  }

  const alturaVideo = height < 800 ? "50%" : "60%";
  const larguraVideo = height < 800 ? "60%" : "80%";
  const alturaImagem = height < 800 ? "80%" : "40%";
  const alturaCard = height < 800 ? "350px" : "320px";

  return (
    <ScrollView>
      <Corpo>
        <Card backgroundColor={Cores.branco} height={alturaCard}>
          <TituloCard>BEM-VINDO AO DOCTOR APP</TituloCard>
          <TextoCard>Conheça melhor o Doutor Guilherme Marques</TextoCard>
          <Video height={alturaVideo} width={larguraVideo}></Video>
        </Card>

        <Card backgroundColor={Cores.branco} height={alturaCard}>
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
            <ConteudoBotao fontSize="15px" color={Cores.branco} width="100%">
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
            borderColor={Cores.azulEscuro}
            onPress={() => navigation.navigate("Login")}
          >
            <ConteudoBotao fontSize="15px" color={Cores.preto} width="100%">
              ENTRAR
            </ConteudoBotao>
          </Botao>
        </Card>

        <Card backgroundColor={"#7757a0"} height={alturaCard}>
          <CorpoCard>
            <TituloInformacao color={Cores.branco}>Sobre mim</TituloInformacao>
            <TextoInfomacao color={Cores.branco}>
              Com formação em Neurologia e Neurofisiologia Clínica, atuo na
              investigação, diagnóstico e tratamento de variadas doenças e
              transtornos neurológicos. Após especialização no Hospital das
              Clínicas da Universidade de São Paulo - USP - Ribeirão Preto,
              retorno a Belo Horizonte para atuação em neurologia geral tanto
              hospitalar de urgência quanto ambulatorial.
            </TextoInfomacao>

            <BotaoSaibaMais>
              <ConteudoBotao fontSize="16px" color={Cores.branco} width="30%">
                SAIBA MAIS
              </ConteudoBotao>
              <AntIcon name="right" size={25} color={Cores.branco} />
            </BotaoSaibaMais>
          </CorpoCard>
        </Card>

        <Card backgroundColor={Cores.branco} height={"320px"}>
          <Carousel
            data={CarrosselItens}
            sliderWidth={350}
            itemWidth={350}
            renderItem={renderizarCarrossel}
          />
        </Card>

        <Card backgroundColor={"#FBCB4C"} height={alturaCard}>
          <CorpoCard>
            <TituloInformacao color={Cores.preto}>
              Indicações e Sugestões
            </TituloInformacao>
            <TextoInfomacao color={Cores.preto}>
              São sugestões de profissionais de confiança para realização de
              exames ou tratamentos específicos:
              {"\n"}
              {"\n"}- Eletroneuromiografia
              {"\n"}- Ressonância Magnética em Epilepsia
              {"\n"}
              {"\n"}Entre outros ...
            </TextoInfomacao>

            <BotaoSaibaMais>
              <ConteudoBotao fontSize="16px" color={Cores.preto} width="30%">
                SAIBA MAIS
              </ConteudoBotao>
              <AntIcon name="right" size={25} color={Cores.preto} />
            </BotaoSaibaMais>
          </CorpoCard>
        </Card>

        <Card backgroundColor={"#434B97"} height={alturaCard}>
          <CorpoCard>
            <TituloInformacao color={Cores.branco}>
              Comentários e Depoimentos
            </TituloInformacao>
            <TextoInfomacao color={Cores.branco}>
              "O dr. Guilherme é extremamente profissional e atencioso.
              Recomendo. Tratou minha mãe com muita atenção e carinho. Ótimo
              neurologista"
              {"\n"}
              {"\n"}
              "Excelente profissional, muito atencioso e competente. Tempo de
              consulta satisfatório, permitindo uma boa propedêutica de
              tratamento"
            </TextoInfomacao>

            <BotaoSaibaMais>
              <ConteudoBotao fontSize="16px" color={Cores.branco} width="30%">
                SAIBA MAIS
              </ConteudoBotao>
              <AntIcon name="right" size={25} color={Cores.branco} />
            </BotaoSaibaMais>
          </CorpoCard>
        </Card>

        <Card backgroundColor={Cores.branco} height={"320px"}>
          <CorpoCard>
            <TituloInformacao color={Cores.preto}>
              Grupo AMIE (Epilepsia)
            </TituloInformacao>
            <ConteudoAmie>
              <TextoAmie color={Cores.preto}>
                O grupo AMIE foi fundado pela união de três médicos que se
                especializaram no tratamento da epilepsia de difícil controle.
                Em agosto de 2018, foi iniciado o projeto para estruturação da
                equipe. Hoje contamos com vários profissionais, unidos em uma
                equipe multidisciplinar.
              </TextoAmie>
              <ImagemAmie
                height={alturaImagem}
                source={require("../../assets/amie_logo.png")}
              />
            </ConteudoAmie>
            <BotaoSaibaMais>
              <ConteudoBotao fontSize="16px" color={Cores.preto} width="30%">
                SAIBA MAIS
              </ConteudoBotao>
              <AntIcon name="right" size={25} color={Cores.preto} />
            </BotaoSaibaMais>
          </CorpoCard>
        </Card>
      </Corpo>
    </ScrollView>
  );
}

export default Home;
