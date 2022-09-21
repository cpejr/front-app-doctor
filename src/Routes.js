import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AlterarDados from "./pages/AlterarDados";
import AlterarSenha from "./pages/AlterarSenha";
import AlterarSenhaComEmail from "./pages/AlterarSenhaComEmail";
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
import ListaReceitas from "./pages/ListaReceitas";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import PreencherFormulario from "./pages/PreencherFormulario";
import Recomendacoes from "./pages/Recomendacoes";
import RecomendacoesPreConsulta from "./pages/RecomendacoesPreConsulta";
import SobreMim from "./pages/SobreMim";
import SolicitarConsulta from "./pages/SolicitarConsulta";
import SolicitarExame from "./pages/SolicitarExame";
import Header from "./pages/Header";
import LGPD from "./pages/LGPD/Lgpd";
import Arquivos from "./pages/Arquivos";

import { View, Image } from "react-native";

function HomeIcon() {
  return (
    <View>
      <Image source={require("./assets/homeicon.png")} />
    </View>
  );
}
function FormulariosIcon() {
  return (
    <View>
      <Image source={require("./assets/formulariosicon.png")} />
    </View>
  );
}
function ExamesIcon() {
  return (
    <View>
      <Image source={require("./assets/examesicon.png")} />
    </View>
  );
}
function ConsultasIcon() {
  return (
    <View>
      <Image source={require("./assets/consultasicon.png")} />
    </View>
  );
}
function ChatIcon() {
  return (
    <View>
      <Image source={require("./assets/chaticon.png")} />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Comentarios" component={Comentarios} />
      <HomeStack.Screen name="Emergencia" component={Emergencia} />
      <HomeStack.Screen name="GrupoAMIE" component={GrupoAMIE} />
      <HomeStack.Screen name="Perfil" component={Perfil} />
      <HomeStack.Screen name="Recomendacoes" component={Recomendacoes} />
      <HomeStack.Screen name="SobreMim" component={SobreMim} />
      <HomeStack.Screen name="AlterarDados" component={AlterarDados} />
      <HomeStack.Screen name="AlterarSenha" component={AlterarSenha} />
      <HomeStack.Screen name="ListaReceitas" component={ListaReceitas} />
      <HomeStack.Screen name="ListaFormularios" component={ListaFormularios} />
      <HomeStack.Screen name="Arquivos" component={Arquivos} />
      <HomeStack.Screen name="LGPD" component={LGPD} />
    </HomeStack.Navigator>
  );
}

const ArquivosStack = createNativeStackNavigator();

function ArquivosStackScreen() {
  return (
    <ArquivosStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Arquivos"
    >
      <ArquivosStack.Screen
        name="Arquivos"
        component={Arquivos}
      />
      <ArquivosStack.Screen
        name="ListaReceitas"
        component={ListaReceitas}
      />
      <ArquivosStack.Screen
        name="ListaFormularios"
        component={ListaFormularios}
      />
      <ArquivosStack.Screen
        name="PreencherFormulario"
        component={PreencherFormulario}
      />

    </ArquivosStack.Navigator>
  );
}

const FormulariosStack = createNativeStackNavigator();

function FormulariosStackScreen() {
  return (
    <FormulariosStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaFormularios"
    >
      <FormulariosStack.Screen
        name="ListaFormularios"
        component={ListaFormularios}
      />
      <FormulariosStack.Screen
        name="PreencherFormulario"
        component={PreencherFormulario}
      />
    </FormulariosStack.Navigator>
  );
}

const ExamesStack = createNativeStackNavigator();

function ExamesStackScreen() {
  return (
    <ExamesStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Exames"
    >
      <ExamesStack.Screen name="Exames" component={Exames} />
      <ExamesStack.Screen name="FormaPagamento" component={FormaPagamento} />
      <ExamesStack.Screen name="SolicitarExame" component={SolicitarExame} />
    </ExamesStack.Navigator>
  );
}

const ConsultasStack = createNativeStackNavigator();

function ConsultasStackScreen() {
  return (
    <ConsultasStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Consultas"
    >
      <ConsultasStack.Screen name="Consultas" component={Consultas} />
      <ConsultasStack.Screen
        name="RecomendacoesPreConsulta"
        component={RecomendacoesPreConsulta}
      />
      <ConsultasStack.Screen
        name="SolicitarConsulta"
        component={SolicitarConsulta}
      />
    </ConsultasStack.Navigator>
  );
}

const ChatStack = createNativeStackNavigator();

function ChatStackScreen() {
  return (
    <ChatStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Chat"
    >
      <ChatStack.Screen name="Chat" component={Chat} />
    </ChatStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: "",
        headerBackground: (props) => <Header {...props} />,
        headerStyle: {
          backgroundColor: "#151B57",
          height: 100,
        },
        tabBarStyle: {
          backgroundColor: "#151B57",
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopColor: "transparent",
        },
        tabBarActiveTintColor: "#646464",
        tabBarInactiveTintColor: "#F7F7F7",
      }}
    >
      <Tab.Screen
        name="botao1"
        options={{
          tabBarIcon: HomeIcon,
          title: "Home",
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="botao2"
        options={{ tabBarIcon: FormulariosIcon, title: "Arquivos" }}
        component={ArquivosStackScreen}
      />
      <Tab.Screen
        name="botao4"
        options={{ tabBarIcon: ConsultasIcon, title: "Consultas" }}
        component={ConsultasStackScreen}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Tabs" component={TabScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AlterarSenhaComEmail" component={AlterarSenhaComEmail} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
