import React from "react";
import { Text, View, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {
  Body,
  CaixaSeta,
  CaixaTitulo,
  Titulo,
  CaixaSubTitulo,
  SubTitulo,
  CaixaScroll,
  CaixaExames,
  NomeExame,
} from "./Styles";
import { Exames }  from "./nomeExames";


function Recomendacoes() {
  const tamanhoIcone = width > 900 ? 48 : 48;
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const alturaScroll = width > height ? "25%" : "60%";
  


  return (
    <Body>
      <CaixaSeta>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={tamanhoIcone}
            /* color={Cores.azul} */ color="green"
          />
        </TouchableOpacity>
      </CaixaSeta>
      <CaixaTitulo>
        <Titulo>Indicações e Sugestões de Profissionais para
        Exames </Titulo>
      </CaixaTitulo>
      <CaixaSubTitulo>
        <SubTitulo>
        São sugestões de profissionais de confiança
        para realização de exames ou tratamentos
        específicos, não oferecidos em meu consultório:
        </SubTitulo>
      </CaixaSubTitulo>
      <CaixaScroll height={alturaScroll}>
        <ScrollView style={{width:"85%"}}>
          {Exames.map((exame) => (
            <TouchableOpacity>
              <CaixaExames>
                <NomeExame>
                  {exame.nome}
                </NomeExame>
              </CaixaExames>
            </TouchableOpacity>  
          ))}
        </ScrollView>
      </CaixaScroll>
    </Body>
  );
}

export default Recomendacoes;
