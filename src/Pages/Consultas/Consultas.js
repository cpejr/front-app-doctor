import React from "react";
import { useWindowDimensions, ScrollView } from "react-native";
import {
  Body,
  CaixaTitulo,
  Titulo,
  ViewConsultas,
  CaixaConsulta,
  CaixaData,
  CaixaNome,
  CaixaHora,
  ConteudoCaixa,
  Icone,
  ViewBotao,
  CaixaBotao,
  IconeBotao,
} from "./Styles";
import ConteudoBotao from "./../../styles/ConteudoBotao";
import botaoIcone from "./../../assets/botaoIcone.png";
import iconeAvaliDesabilitado from "./../../assets/iconeAvaliDesabilitado.png";
import iconeAvaliHabilitado from "./../../assets/iconeAvaliHabilitado.png";
import iconeLocal from "./../../assets/iconeLocal.png";


//const larguraBotao = width < 600 ? "50%" : "50%"; 

// const larguraBotoesMaior = width < 600 ? "50%" : "50px"; 
//   const larguraBotao = width < 330 ? "60%" : larguraBotaoMaior; 
//   const paddingBody = width < 330 ? "5%" : "10%"; 
//   const fontSizeTitulos = fontSize < 1080 ? "20px" : "23px"; 
//   const fontSizeDados = fontSize < 1080 ? "15px" : "18px"; 
//   const fontSizeNascido = fontSize <1080 ? "12px" : "14px"; 
//   const larguraViews = width < 750 ? "100%" : "70%"; 

function Consultas({ navigation }) {

  const { width } = useWindowDimensions(); 

  //responsividade paisagem
  const paddingBodyMaior = width < 600 ? "5%" : "10%"; 
  const larguraBotaoMaior = width < 600 ? "50%" : "40%";
  const fontSizeMaior = width < 600 ? "12px" : "15px"; 
  //responsividade aparelhos
  const paddingBody = width < 330 ? "1.5%" : paddingBodyMaior; 
  const larguraBotao = width < 330 ? "60%" : larguraBotaoMaior;
  const bordaCaixaNome = width < 330 ? "0px" : "2.5px"; 
  const fontSize = width < 330 ? "11px" : fontSizeMaior; 
  

  return (
    <ScrollView>
      <Body
      paddingLeft={paddingBody} 
      paddingRight={paddingBody} 
      >
        <CaixaTitulo>
          <Titulo>Consultas Marcadas</Titulo>
        </CaixaTitulo>
        <ViewConsultas>
          <CaixaConsulta>
            <CaixaData>
              <ConteudoCaixa
              fontSize={fontSize}
              >15-05-2002</ConteudoCaixa>
            </CaixaData>
            <CaixaNome
            borderRightWidth={bordaCaixaNome}
            borderLeftWidth={bordaCaixaNome}
            >
              <Icone
                marginRight="4%"
                marginLeft="0"
                source={iconeAvaliDesabilitado}
              />
              <ConteudoCaixa
              fontSize={fontSize}
              >Consulta de Rotina</ConteudoCaixa>
              <Icone marginRight="0" marginLeft="4%" source={iconeLocal} />
            </CaixaNome>
            <CaixaHora>
              <ConteudoCaixa
              fontSize={fontSize}
              >20:20</ConteudoCaixa>
            </CaixaHora>
          </CaixaConsulta>

          <CaixaConsulta>
            <CaixaData>
              <ConteudoCaixa
              fontSize={fontSize}
              >15-05-2002</ConteudoCaixa>
            </CaixaData>
            <CaixaNome
            borderRightWidth={bordaCaixaNome}
            borderLeftWidth={bordaCaixaNome}
            >
              <Icone
                marginRight="4%"
                marginLeft="0"
                source={iconeAvaliHabilitado}
              />
              <ConteudoCaixa
              fontSize={fontSize}
              >Consulta de Rotina</ConteudoCaixa>
              <Icone marginRight="0" marginLeft="4%" source={iconeLocal} />
            </CaixaNome>
            <CaixaHora>
              <ConteudoCaixa
              fontSize={fontSize}
              >20:20</ConteudoCaixa>
            </CaixaHora>
          </CaixaConsulta>
        </ViewConsultas>
        <ViewBotao>
          <CaixaBotao
          width={larguraBotao}
          >
            <ConteudoBotao fontSize={fontSize} color="#151B57" width="90%">
              Marcar Nova Consulta
            </ConteudoBotao>
            <IconeBotao source={botaoIcone} />
          </CaixaBotao>
        </ViewBotao>
      </Body>
    </ScrollView>
  );
}

export default Consultas;
