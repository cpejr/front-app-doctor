import React from "react";
import { FlatList, ScrollView, TextInput, useWindowDimensions } from "react-native";
import {
  Scroll,
  Body,
  BarraPesquisa,
  InputPesquisa,
  IconPesquisa,
  TabView,
  FiltroRespondido,
  FiltroNaoRespondido,
  CaixaLista,
  CaixaItem,
  BotaoForm,
  CaixaNomeUrgencia,
  CaixaUrgenciaEstrela,
  FormNome,
  UrgenciaTexto,
  CaixaEstrela,
  EstrelaIcon,
  CaixaTipoData,
  TextoTipoData,
} from "./Styles";
import Input from "../../styles/Input";
import searchIcon from "../../assets/searchIcon.png";
const dadosFormulario = [
  {
    id: 1,
    nome: "Formulário Pré-consulta",
    urgencia: 2,
    tipo: "Emergência",
    data: "15/05/2002",
  },
];
import Icon from "react-native-vector-icons/Entypo";

// const Formulario = ({ item, onPress }) => (
//   <CaixaLista>
//     <BotaoForm>
//       <CaixaNomeUrgencia>
//         <FormNome>{item.nome}</FormNome>
//         <CaixaUrgenciaEstrela>
//           <UrgenciaTexto>Urgência: {item.urgencia}</UrgenciaTexto>
//           <EstrelaIcon></EstrelaIcon>
//         </CaixaUrgenciaEstrela>
//       </CaixaNomeUrgencia>
//       <CaixaTipoData>
//         <TextoTipoData>{item.tipo}</TextoTipoData>
//         <TextoTipoData>{item.data}</TextoTipoData>
//       </CaixaTipoData>
//     </BotaoForm>
//   </CaixaLista>
// );

function ListaFormularios({ navigation }) {
  const { width } = useWindowDimensions();


  const larguraUrgenciaEstrela = width < 400 ? "42%" : larguraUrgenciaEstrelaMaior;
  const larguraUrgenciaEstrelaMaior = width < 600 ? "37%" : "20%";

  return (
    <Scroll>
      <Body>
        <BarraPesquisa>
          <InputPesquisa placeholder="Pesquisar no chat" />
          <IconPesquisa source={searchIcon} />
        </BarraPesquisa>

        <TabView>
          <FiltroRespondido>Respondido</FiltroRespondido>
          <FiltroNaoRespondido>Não Respondido</FiltroNaoRespondido>
        </TabView>

        <CaixaLista>
          <CaixaItem>
            <CaixaNomeUrgencia>
              <FormNome>Formulário Pré Consulta</FormNome>
              <CaixaUrgenciaEstrela
              width={larguraUrgenciaEstrela}
              >
                <UrgenciaTexto>Urgência</UrgenciaTexto>
                <CaixaEstrela>
                  <Icon name="star" size={18} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                </CaixaEstrela>
              </CaixaUrgenciaEstrela>
            </CaixaNomeUrgencia>
            <CaixaTipoData>
              <TextoTipoData>Tipo</TextoTipoData>
              <TextoTipoData>15/05/2002</TextoTipoData>
            </CaixaTipoData>
          </CaixaItem>

          <CaixaItem>
            <CaixaNomeUrgencia>
              <FormNome>Formulário Pré Consulta de Sono</FormNome>
              <CaixaUrgenciaEstrela
              width={larguraUrgenciaEstrela}
              >
                <UrgenciaTexto>Urgência</UrgenciaTexto>
                <CaixaEstrela>
                  <Icon name="star" size={18} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                </CaixaEstrela>
              </CaixaUrgenciaEstrela>
            </CaixaNomeUrgencia>
            <CaixaTipoData>
              <TextoTipoData>Tipo</TextoTipoData>
              <TextoTipoData>15/05/2002</TextoTipoData>
            </CaixaTipoData>
          </CaixaItem>

          <CaixaItem>
            <CaixaNomeUrgencia>
              <FormNome>Formulário Pré Consulta de Sono e de Eplepsia na Cabeça</FormNome>
              <CaixaUrgenciaEstrela
              width={larguraUrgenciaEstrela}
              >
                <UrgenciaTexto>Urgência</UrgenciaTexto>
                <CaixaEstrela>
                  <Icon name="star" size={18} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                </CaixaEstrela>
              </CaixaUrgenciaEstrela>
            </CaixaNomeUrgencia>
            <CaixaTipoData>
              <TextoTipoData>Tipo</TextoTipoData>
              <TextoTipoData>15/05/2002</TextoTipoData>
            </CaixaTipoData>
          </CaixaItem>

        <CaixaItem>
            <CaixaNomeUrgencia>
              <FormNome>Formulário Pré Consulta</FormNome>
              <CaixaUrgenciaEstrela
              width={larguraUrgenciaEstrela}
              >
                <UrgenciaTexto>Urgência</UrgenciaTexto>
                <CaixaEstrela>
                  <Icon name="star" size={18} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                </CaixaEstrela>
              </CaixaUrgenciaEstrela>
            </CaixaNomeUrgencia>
            <CaixaTipoData>
              <TextoTipoData>Tipo</TextoTipoData>
              <TextoTipoData>15/05/2002</TextoTipoData>
            </CaixaTipoData>
          </CaixaItem>

          <CaixaItem>
            <CaixaNomeUrgencia>
              <FormNome>Formulário Pré Consulta</FormNome>
              <CaixaUrgenciaEstrela
              width={larguraUrgenciaEstrela}
              >
                <UrgenciaTexto>Urgência</UrgenciaTexto>
                <CaixaEstrela>
                  <Icon name="star" size={18} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                  <Icon name="star-outlined" size={20} color="#434B97" />
                </CaixaEstrela>
              </CaixaUrgenciaEstrela>
            </CaixaNomeUrgencia>
            <CaixaTipoData>
              <TextoTipoData>Tipo</TextoTipoData>
              <TextoTipoData>15/05/2002</TextoTipoData>
            </CaixaTipoData>
          </CaixaItem>
          </CaixaLista>

        {/* <FlatList
        data={dadosFormulario}
        renderItem={Formulario}
        keyExtractor={(item) => item.id}
      /> */}
      </Body>
    </Scroll>
  );
}

export default ListaFormularios;
