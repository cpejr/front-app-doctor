import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlterarDados from "./Pages/AlterarDados";
import AlterarSenha from "./Pages/AlterarSenha";
import Cadastro from "./Pages/Cadastro";
import Chat from "./Pages/Chat";
import Comentarios from "./Pages/Comentarios";
import Consultas from "./Pages/Consultas";
import Emergencia from "./Pages/Emergencia";
import Exames from "./Pages/Exames";
import FormaPagamento from "./Pages/FormaPagamento";
import GrupoAMIE from "./Pages/GrupoAMIE";
import Home from "./Pages/Home";
import ListaFormularios from "./Pages/ListaFormularios";
import Login from "./Pages/Login";
import Perfil from "./Pages/Perfil";
import PreencherFormulario from "./Pages/PreencherFormulario";
import Recomendacoes from "./Pages/Recomendacoes";
import RecomendacoesPreConsulta from "./Pages/RecomendacoesPreConsulta";
import SobreMim from "./Pages/SobreMim";
import SolicitarConsulta from "./Pages/SolicitarConsulta";
import SolicitarExame from "./Pages/SolicitarExame";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Alterar Dados" component={AlterarDados} />
        <Stack.Screen name="Alterar Senha" component={AlterarSenha} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Comentarios" component={Comentarios} />
        <Stack.Screen name="Consultas" component={Consultas} />
        <Stack.Screen name="Emergencia" component={Emergencia} />
        <Stack.Screen name="Exames" component={Exames} />
        <Stack.Screen name="FormaPagamento" component={FormaPagamento} />
        <Stack.Screen name="GrupoAMIE" component={GrupoAMIE} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListaFormularios" component={ListaFormularios} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="PreencherFormulario" component={PreencherFormulario} />
        <Stack.Screen name="Recomendacoes" component={Recomendacoes} />
        <Stack.Screen name="RecomendacoesPreConsulta" component={RecomendacoesPreConsulta} />
        <Stack.Screen name="SobreMim" component={SobreMim} />
        <Stack.Screen name="SolicitarConsulta" component={SolicitarConsulta} />
        <Stack.Screen name="SolicitarExame" component={SolicitarExame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
