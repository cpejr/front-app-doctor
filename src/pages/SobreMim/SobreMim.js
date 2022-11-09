import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import {
  BotaoVoltar,
  CaixaBotao,
  CaixaImagem,
  CaixaTexto,
  ContainerScroll,
  Corpo,
  Imagem,
  TituloTexto,
} from "./Styles";
import { Cores } from "../../variaveis";
import IconeVoltar from "react-native-vector-icons/Feather";
import GuilhermeMarquesFotoSobreMim from "./Imagens/GuilhermeMarquesFotoSobreMim.webp";
import GuilhermeMarquesTemplateArteSobreMim from "./Imagens/GuilhermeMarquesTemplateArteSobreMim.webp";

//importar fonte e descobrir a dimensão da tela.
function SobreMim() {
  return (
    <ContainerScroll>
      <View style={{ alignItems: "center" }}>
        <CaixaBotao>
          <BotaoVoltar>
            <IconeVoltar
              name="arrow-left-circle"
              size={40}
              color={Cores.lilas[1]}
            />
          </BotaoVoltar>
        </CaixaBotao>

        <CaixaImagem>
          <Imagem
            source={GuilhermeMarquesTemplateArteSobreMim}
            alt={
              "Aqui existe uma imagem da logomarca do doutor Guilherme Marques" +
              30
            }
          ></Imagem>
        </CaixaImagem>

        <CaixaTexto>
          <TituloTexto>Quem sou</TituloTexto>
        </CaixaTexto>

        <CaixaImagem>
          <Imagem
            source={GuilhermeMarquesFotoSobreMim}
            alt={
              "Aqui existe uma foto do doutor Guilherme Marques em seu consultório" +
              30
            }
          ></Imagem>
        </CaixaImagem>

        <CaixaTexto>
          <TituloTexto>Minha Experiência</TituloTexto>
        </CaixaTexto>
        
      </View>
    </ContainerScroll>
  );
}

export default SobreMim;
