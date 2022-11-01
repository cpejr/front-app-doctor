import React from "react";
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Cores } from "../../variaveis";
import { Container, ContainerComentarios, ContainerComentariosEResposta, ContainerIconeSeta, ContainerScrollView, TextoComentario, Titulo, TextoResposta, ContainerResposta } from "./Styles";

function Comentarios({ navigation }) {

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const tamanhoIcone = width > 480 ? 20 : 25;


  const comentarios = ["\"Depois de Deus...tenho o Dr. Guilherme como referência em minha vida!! Ele ajudou muito no tratamento da minha mãe. Apresentava quadros de crises epiléticas parciais, e confusão mental. Como a mudança da medicação ela retornou a ter vida normal e estamos na luta para lhe dar cada dia mais qualidade de vida. Obrigada pela atenção e carinho nesse momento tão dificil em minha vida!! Você é um ser que não existe, literalmente um presente de Deus. \"",
    "\"O dr. Guilherme é extremamente profissional e atencioso. Recomendo.  Tratou minha mãe com muita atenção e carinho. Ótimo neurologista\"",
    "\"Excelente profissional, muito atencioso e competente. Tempo de consulta satisfatório, permitindo uma boa propedêutica de tratamento\"",
    "\"Excelente profissional, competente atencioso carinhoso humano, educado paciente. Ele trata meu irmão que tem demência daí devido à atenção dedicada me tornei também paciente.Gostamos muito do Dr Guilherme\"",
    "\"Passei por diversos especialistas (angiologista, ortopedista, reumatologista, nutróloga, hematologista e hepatologista) na busca de um diagnóstico para o constante desconforto que sentia nas pernas, que tornava uma tortura assistir a um filme no cinema ou a uma peça no teatro, sem falar na exaustão que sentia pela manhã, por acordar diversas vezes à noite. Meus exames eram todos inconclusivos: não tinha varizes, não tinha insônia, praticava atividade física regular, alimentação saudável e sem tendência a depressão. Ao pesquisar na internet li o comentário de uma paciente com sintomas parecidos e decidi procurar o Dr. Guilherme. Só tenho a agradecer pela precisão do diagnóstico, assertividade na indicação do medicamento, disponibilidade e profissionalismo com que fui atendida. Que continue sempre assim!!! Estamos carentes de profissionais que de fato se preocupam com seus pacientes e se interessam em acolhê-los nesses momentos de fragilidade.\"",
    "\"Excelente médico, atencioso,simpático, educado. Faz uma investigação minuciosa para descobrir o diagnóstico. Estou em tratamento com ele , e só tenho elogios a citar, exemplo de médico a seguir. Super indico\"",
    "\"Excelente profissional. Inteligente, estudioso, atencioso, concentrado. Acompanhei minha mãe na consulta. Fez todas as perguntas possíveis, levantou todo o histórico familiar, fez testes, avaliou exames. Atendeu minha mãe com muito carinho, acolhedor. Um exemplo do que deve ser a medicina!\"",
    "\"Sou muito grato pela ajuda que tive depois da consulta para conseguir a internação e fazer todos os exames necessários. Tentei por conta própria e não deu certo. Se não fosse pelos telefonemas que ele fez, não teria feito meu tratamento e não estaria bem hoje. Muito obrigado!\"",
    "\"Um excelente médico cuidou de mim por muito tempo no HC e um paizão só tenho a agradecer por tudo que fez por mim, pena que saiu do HC mas meu carinho e agradecimento e eterno\"",
    "\"Examina muito e responde todas perguntas\"",
    "\"Super atencioso, calmo, e a forma de conversar com o paciente é bem clara e objetiva.\"",
    "\"Médico muito atencioso e atualizado na área que atua. A consulta durou bastante tempo e ele faz uma entrevista bem completa com o paciente. Recomendo 100%\"",
    "\"Profissional extraordinário! Médico de vasto conhecimento, muitíssimo atencioso e humano! Recomendo a todos!\"",
    "\"Muito atencioso, educado e humano, fiquei satisfeita com a consulta. Achei o consultório muito bonito também!\"",
    "\"Finalmente descobri meu problema. Já passei por vários médicos, achei o dr pela internet e ele fez o diagnóstico de síndrome das pernas inquietas. Nunca tinha ouvido falar. Impressionante, depois de alguns dias o incômodo, tipo uma agonia nas pernas, sumiu com o tratamento. Bem melhor agora :)\"",
    "\"Atendimento muito bom, esclareceu todas as dúvidas. Recomendo",
    "\"Pontos positivos: da propriedade do doutor para falar do assunto",
    "\"Médico pontual e muito solícito. Minha consulta durou mais de uma hora, fiquei muito satisfeita com a atenção e a paciência em responder todas as minhas dúvidas, demonstrou muito conhecimento na área.\"",
    "\"Dr. Guilherme é um excelente profissional. Apresenta total domínio na neurologia e atende com muita atenção. A consulta é completa e todo o histórico é investigado para o melhor diagnóstico. Agradeço muitíssimo o cuidado e a atenção. Retornarei em breve para levar os resultados dos exames pedidos.\"",
    "\"Esclarecimento de fácil interpretação\"",
  ]

  const respostas = [
    "",
    "",
    "",
    "",
    "Dr. Guilherme Marques: fico feliz em poder ajudar! Com os sintomas sob controle, agora é seguir com vida normal!",
    "",
    "Dr. Guilherme Marques: fico feliz em poder ajudar! Abraço!",
    "",
    "Dr. Guilherme Marques: obrigado pela lembrança! Espero que tudo esteja bem, com a Miastenia Gravis sob controle! Grande abraço!",
    "Dr. Guilherme Marques: o exame neurológico deve ser metódico e minucioso sempre! O diagnóstico correto e tratamento eficaz dependem de um bom exame clínico",
    "Dr. Guilherme Marques: obrigado pelo retorno!",
    "Dr. Guilherme Marques: muito obrigado pela sua opinião! Foi um prazer responder as suas dúvidas, sendo que você é um dos familiares mais atualizados no tema que já vi! É muito gratificante cuidar de pacientes tão bem assistidos pela família! Abraço!",
    "Dr. Guilherme Marques: muito obrigado pela avaliação! Estou sempre em busca do melhor atendimento aos meus pacientes!",
    "Dr. Guilherme Marques: muito obrigado por compartilhar sua impressão! Até o retorno!",
    "Dr. Guilherme Marques: boa notícia! Melhoras! Até o retorno!",
    "Dr. Guilherme Marques: fico feliz em ter esclarecido as dúvidas! Até o retorno!",
    "Dr. Guilherme Marques: obrigado pela avaliação! Fico feliz em saber que as explicações foram bem recebidas e úteis para iniciarmos o tratamento! Até o retorno!",
    "Dr. Guilherme Marques: fique sempre à vontade para perguntar e esclarecer todas as dúvidas!",
    "Dr. Guilherme Marques: obrigado pela opinião! Até o retorno!",
    "Dr. Guilherme Marques: fico feliz que tenha sido fácil entender orientações tão complexas! O esclarecimento é o primeiro passo para o sucesso do tratamento!",
  ]

  const comentariosERespostas = [
    {
      comentario: comentarios[0],
      resposta: respostas[0]
    },
    {
      comentario: comentarios[1],
      resposta: respostas[1]
    },
    {
      comentario: comentarios[2],
      resposta: respostas[2]
    },
    {
      comentario: comentarios[3],
      resposta: respostas[3]
    },
    {
      comentario: comentarios[4],
      resposta: respostas[4]
    },
    {
      comentario: comentarios[5],
      resposta: respostas[5]
    },
    {
      comentario: comentarios[6],
      resposta: respostas[6]
    },
    {
      comentario: comentarios[7],
      resposta: respostas[7]
    },
    {
      comentario: comentarios[8],
      resposta: respostas[8]
    },
    {
      comentario: comentarios[9],
      resposta: respostas[9]
    },
    {
      comentario: comentarios[10],
      resposta: respostas[10]
    },
    {
      comentario: comentarios[11],
      resposta: respostas[11]
    },
    {
      comentario: comentarios[12],
      resposta: respostas[12]
    },
    {
      comentario: comentarios[13],
      resposta: respostas[13]
    },
    {
      comentario: comentarios[14],
      resposta: respostas[14]
    },
    {
      comentario: comentarios[15],
      resposta: respostas[15]
    },
    {
      comentario: comentarios[16],
      resposta: respostas[16]
    },
    {
      comentario: comentarios[17],
      resposta: respostas[17]
    },
    {
      comentario: comentarios[18],
      resposta: respostas[18]
    },
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
        <ContainerComentariosEResposta>
          {comentariosERespostas.map((comentarioEResposta) => (
            <ContainerComentarios marginBottom='15%'>
              <TextoComentario>{comentarioEResposta.comentario}</TextoComentario>
              {comentarioEResposta.resposta !== "" ? (
                <ContainerResposta>
                  <TextoResposta>{comentarioEResposta.resposta}</TextoResposta>
                </ContainerResposta>
              ) : (
                <></>
              )}
            </ContainerComentarios>
          ))}
        </ContainerComentariosEResposta>
        <ContainerComentariosEResposta>
          <ContainerComentarios marginBottom='0%'>
            <TextoComentario>{comentarios[19]}</TextoComentario>
            <ContainerResposta>
              <TextoResposta>{respostas[19]}</TextoResposta>
            </ContainerResposta>
          </ContainerComentarios>
        </ContainerComentariosEResposta>
      </ContainerScrollView>
    </Container>
  );
}

export default Comentarios;
