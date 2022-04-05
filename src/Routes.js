import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import Header from "./Pages/Header";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Pages() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Alterar Dados"
        component={AlterarDados}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Alterar Senha"
        component={AlterarSenha}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comentarios"
        component={Comentarios}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Consultas"
        component={Consultas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Emergencia"
        component={Emergencia}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exames"
        component={Exames}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormaPagamento"
        component={FormaPagamento}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GrupoAMIE"
        component={GrupoAMIE}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListaFormularios"
        component={ListaFormularios}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreencherFormulario"
        component={PreencherFormulario}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recomendacoes"
        component={Recomendacoes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecomendacoesPreConsulta"
        component={RecomendacoesPreConsulta}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SobreMim"
        component={SobreMim}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SolicitarConsulta"
        component={SolicitarConsulta}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SolicitarExame"
        component={SolicitarExame}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Header"
        component={Header}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerTitle: (props) => <Header {...props} /> }}
    >
      <Tab.Screen name="NavBar" component={Pages} />
      <Tab.Screen name="NavBa" component={Pages} />
      <Tab.Screen name="NavB" component={Pages} />
    </Tab.Navigator>
  );
}

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Rotas"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
