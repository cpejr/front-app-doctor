import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AlterarDados from "./pages/AlterarDados";
import AlterarSenha from "./pages/AlterarSenha";
import Cadastro from "./pages/Cadastro";
import Chat from "./pages/Chat";
import Comentarios from "./pages/Comentarios";
import Consultas from "./pages/Consultas";
import Emergencia from "./pages/Emergencia";
import Exames from "./pages/Exames";
import FormaPagamento from "./pages/FormaPagamento";
import GrupoAMIE from "./pages/GrupoAMIE";
import Home from "./pages/Home";
import ListaFormularios from "./pages/ListaFormularios";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import PreencherFormulario from "./pages/PreencherFormulario";
import Recomendacoes from "./pages/Recomendacoes";
import RecomendacoesPreConsulta from "./pages/RecomendacoesPreConsulta";
import SobreMim from "./pages/SobreMim";
import SolicitarConsulta from "./pages/SolicitarConsulta";
import SolicitarExame from "./pages/SolicitarExame";
import Header from "./pages/Header";

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
