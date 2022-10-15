import React from "react";
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Cores } from "../../variaveis";
import { Container, ContainerComentario, ContainerComentarioIndividual, ContainerComentarios, ContainerIconeSeta, ContainerScrollView, TextoComentario, Titulo } from "./Styles";

function Comentarios({ navigation }) {

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const tamanhoIcone = width > 480 ? 20 : 25;
  const paddingBottomComentarios = width > height ? "0" : "35%";
  const paddingTopComentarios = width > height ? "0" : "15%";
  const marginBottomComentarios = width > height ? "0" : "10%";

  const comentarios = ["Depois de Deus...tenho o Dr. Guilherme como referência em minha vida!! Ele ajudou muito no tratamento da minha mãe. Apresentava quadros de crises epiléticas parciais, e confusão mental. Como a mudança da medicação ela retornou a ter vida normal e estamos na luta para lhe dar cada dia mais qualidade de vida. Obrigada pela atenção e carinho nesse momento tão dificil em minha vida!! Você é um ser que não existe, literalmente um presente de Deus",
    "O dr. Guilherme é extremamente profissional e atencioso. Recomendo.  Tratou minha mãe com muita atenção e carinho. Ótimo neurologista",
    "Excelente profissional, muito atencioso e competente. Tempo de consulta satisfatório, permitindo uma boa propedêutica de tratamento",
    "Excelente profissional, competente atencioso carinhoso humano, educado paciente. Ele trata meu irmão que tem demência daí devido à atenção dedicada me tornei também paciente.Gostamos muito do Dr Guilherme",
    "Passei por diversos especialistas (angiologista, ortopedista, reumatologista, nutróloga, hematologista e hepatologista) na busca de um diagnóstico para o constante desconforto que sentia nas pernas, que tornava uma tortura assistir a um filme no cinema ou a uma peça no teatro, sem falar na exaustão que sentia pela manhã, por acordar diversas vezes à noite.",
    "Meus exames eram todos inconclusivos: não tinha varizes, não tinha insônia, praticava atividade física regular, alimentação saudável e sem tendência a depressão. Ao pesquisar na internet li o comentário de uma paciente com sintomas parecidos e decidi procurar o Dr. Guilherme. Só tenho a agradecer pela precisão do diagnóstico, assertividade na indicação do medicamento, disponibilidade e profissionalismo com que fui atendida. Que continue sempre assim!!! Estamos carentes de profissionais que de fato se preocupam com seus pacientes e se interessam em acolhê-los nesses momentos de fragilidade.",
    "Excelente médico, atencioso,simpático, educado. Faz uma investigação minuciosa para descobrir o diagnóstico. Estou em tratamento com ele , e só tenho elogios a citar, exemplo de médico a seguir. Super indico",
    "Excelente profissional. Inteligente, estudioso, atencioso, concentrado. Acompanhei minha mãe na consulta. Fez todas as perguntas possíveis, levantou todo o histórico familiar, fez testes, avaliou exames. Atendeu minha mãe com muito carinho, acolhedor. Um exemplo do que deve ser a medicina!",
    "Sou muito grato pela ajuda que tive depois da consulta para conseguir a internação e fazer todos os exames necessários. Tentei por conta própria e não deu certo. Se não fosse pelos telefonemas que ele fez, não teria feito meu tratamento e não estaria bem hoje. Muito obrigado!",
    "Um excelente médico cuidou de mim por muito tempo no HC e um paizão só tenho a agradecer por tudo que fez por mim, pena que saiu do HC mas meu carinho e agradecimento e eterno",
    "Examina muito e responde todas perguntas",
    "Super atencioso, calmo, e a forma de conversar com o paciente é bem clara e objetiva.",
    "Médico muito atencioso e atualizado na área que atua. A consulta durou bastante tempo e ele faz uma entrevista bem completa com o paciente. Recomendo 100%",
    "Profissional extraordinário! Médico de vasto conhecimento, muitíssimo atencioso e humano! Recomendo a todos!",
    "Muito atencioso, educado e humano, fiquei satisfeita com a consulta. Achei o consultório muito bonito também!",
    "Finalmente descobri meu problema. Já passei por vários médicos, achei o dr pela internet e ele fez o diagnóstico de síndrome das pernas inquietas. Nunca tinha ouvido falar. Impressionante, depois de alguns dias o incômodo, tipo uma agonia nas pernas, sumiu com o tratamento. Bem melhor agora :)",
    "Atendimento muito bom, esclareceu todas as dúvidas. Recomendo",
    "Pontos positivos: da propriedade do doutor para falar do assunto",
    "Médico pontual e muito solícito. Minha consulta durou mais de uma hora, fiquei muito satisfeita com a atenção e a paciência em responder todas as minhas dúvidas, demonstrou muito conhecimento na área.",
    "Dr. Guilherme é um excelente profissional. Apresenta total domínio na neurologia e atende com muita atenção. A consulta é completa e todo o histórico é investigado para o melhor diagnóstico. Agradeço muitíssimo o cuidado e a atenção. Retornarei em breve para levar os resultados dos exames pedidos.",
    "Esclarecimento de fácil interpretação",
  ]

  return (
    <Container>
      <ContainerIconeSeta>
        <TouchableOpacity onPress={() => navigation.push("Home")}>
          <Icon name="arrow-left" size={tamanhoIcone} color={Cores.azul} />
        </TouchableOpacity>
      </ContainerIconeSeta>
      <Titulo>Comentários e depoimentos:</Titulo>
      <ContainerScrollView>
        <ContainerComentarios paddingTop={paddingTopComentarios} paddingBottom={paddingBottomComentarios} marginBottom={marginBottomComentarios}>
          {comentarios.map((comentario) => (
            <ContainerComentarioIndividual>
              <TextoComentario>{comentario}</TextoComentario>
            </ContainerComentarioIndividual>
          ))}
        </ContainerComentarios>
      </ContainerScrollView>
    </Container>
  );
}

export default Comentarios;
