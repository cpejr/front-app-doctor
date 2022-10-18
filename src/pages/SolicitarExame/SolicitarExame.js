import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import {
  Body,
  CaixaSeta,
  CaixaTitulo,
  Titulo,
  CaixaScroll,
  CaixaDescricao,
  CaixaBotao,
  CaixaCentro,
  Descricao,
  TextoBotao,
} from "./Styles";
import Icon from "react-native-vector-icons/Entypo";
import { Cores } from "../../variaveis";
import Botao from "../../styles/Botao";

function SolicitarExame() {
  const { width } = useWindowDimensions();
  const tamanhoIcone = width > 480 ? 20 : 25;
  const larguraBotoesMaior = width < 600 ? "60%" : "50%";
  const larguraBotoes = width < 330 ? "60%" : larguraBotoesMaior;

  return (
    <Body>
      <CaixaSeta>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={tamanhoIcone}
            /* color={Cores.azul} */   color = "green"  
          />
        </TouchableOpacity>
      </CaixaSeta>
      <CaixaTitulo>
        <Titulo>Exame específico</Titulo>
      </CaixaTitulo>
      <CaixaCentro>
        <ScrollView>
          <CaixaScroll>
            <CaixaDescricao>
              <Descricao>
                Você me ama? Perguntou Alice. — Não, não te amo! Respondeu o
                Coelho Branco. Alice franziu a testa e juntou as mãos como fazia
                sempre que se sentia ferida. —Vês? Retorquiu o Coelho Branco.
                Agora vais começar a perguntar-te o que te torna tão imperfeita
                e o que fizeste de mal para que eu não consiga amar-te pelo
                menos um pouco. Sabes, é por esta razão que não te posso amar.

              </Descricao>
            </CaixaDescricao>
          </CaixaScroll>
        </ScrollView>
      </CaixaCentro>
      <CaixaBotao>
        <Botao
          width={larguraBotoes}
          height="40px"
          marginTop="0%"
        /*   backgroundColor={Cores.cinza[11]} */
        backgroundColor="green"
          borderRadius="3px"
          borderColor={Cores.azul}
          borderWidth="2px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
        >
          <TextoBotao>Agendar Exame Específico</TextoBotao>
        </Botao>
      </CaixaBotao>
    </Body>
  );
}

export default SolicitarExame;
