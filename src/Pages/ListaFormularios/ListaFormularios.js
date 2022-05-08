import React from "react";
import { FlatList, ScrollView, TextInput } from "react-native";
import {
  Body,
  BarraPesquisa,
  InputPesquisa,
  IconPesquisa,
  TabView,
  FiltroRespondido,
  FiltroNaoRespondido,
  CaixaLista,
  BotaoForm,
  CaixaNomeUrgencia,
  CaixaUrgenciaEstrela,
  FormNome,
  UrgenciaTexto,
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
  return (
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
    
      <CaixaNomeUrgencia>
        <FormNome>Formulário Pré Consulta</FormNome>
        <CaixaUrgenciaEstrela>
          <UrgenciaTexto>Urgência</UrgenciaTexto>
          <EstrelaIcon></EstrelaIcon>
        </CaixaUrgenciaEstrela>
      </CaixaNomeUrgencia>
      <CaixaTipoData>
        <TextoTipoData>Tipo</TextoTipoData>
        <TextoTipoData>15/05/2002</TextoTipoData>
      </CaixaTipoData>
    
  </CaixaLista>
      

      {/* <FlatList
        data={dadosFormulario}
        renderItem={Formulario}
        keyExtractor={(item) => item.id}
      /> */}
    </Body>
  );
}

export default ListaFormularios;
