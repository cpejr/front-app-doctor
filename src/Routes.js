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

import { View, Image } from "react-native";
import { Colors } from "react-native-paper";

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
      initialRouteName="Home"
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
    </HomeStack.Navigator>
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
        headerTitle: (props) => <Header {...props} />,
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
        options={{ tabBarIcon: FormulariosIcon, title: "Formulários" }}
        component={FormulariosStackScreen}
      />
      <Tab.Screen
        name="botao3"
        options={{ tabBarIcon: ExamesIcon, title: "Exames" }}
        component={ExamesStackScreen}
      />
      <Tab.Screen
        name="botao4"
        options={{ tabBarIcon: ConsultasIcon, title: "Consultas" }}
        component={ConsultasStackScreen}
      />
      <Tab.Screen
        name="botao5"
        options={{ tabBarIcon: ChatIcon, title: "Chat" }}
        component={ChatStackScreen}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
