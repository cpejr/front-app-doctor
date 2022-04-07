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
      initialRouteName="HomeScreen"
    >
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="ComentariosScreen" component={Comentarios} />
      <HomeStack.Screen name="EmergenciaScreen" component={Emergencia} />
      <HomeStack.Screen name="GrupoAMIEScreen" component={GrupoAMIE} />
      <HomeStack.Screen name="PerfilScreen" component={Perfil} />
      <HomeStack.Screen name="RecomendacoesScreen" component={Recomendacoes} />
      <HomeStack.Screen name="SobreMimScreen" component={SobreMim} />
      <HomeStack.Screen name="AlterarDadosScreen" component={AlterarDados} />
      <HomeStack.Screen name="AlterarSenhaScreen" component={AlterarSenha} />
    </HomeStack.Navigator>
  );
}

const FormulariosStack = createNativeStackNavigator();

function FormulariosStackScreen() {
  return (
    <FormulariosStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaFormulariosScreen"
    >
      <FormulariosStack.Screen
        name="ListaFormulariosScreen"
        component={ListaFormularios}
      />
      <FormulariosStack.Screen
        name="PreencherFormularioScreen"
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
      initialRouteName="ExamesScreen"
    >
      <ExamesStack.Screen name="ExamesScreen" component={Exames} />
      <ExamesStack.Screen
        name="FormaPagamentoScreen"
        component={FormaPagamento}
      />
      <ExamesStack.Screen
        name="SolicitarExameScreen"
        component={SolicitarExame}
      />
    </ExamesStack.Navigator>
  );
}

const ConsultasStack = createNativeStackNavigator();

function ConsultasStackScreen() {
  return (
    <ConsultasStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ConsultasScreen"
    >
      <ConsultasStack.Screen name="ConsultasScreen" component={Consultas} />
      <ConsultasStack.Screen
        name="RecomendacoesPreConsultaScreen"
        component={RecomendacoesPreConsulta}
      />
      <ConsultasStack.Screen
        name="SolicitarConsultaScreen"
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
      initialRouteName="ChatScreen"
    >
      <ChatStack.Screen name="ChatScreen" component={Chat} />
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
        name="Home"
        options={{
          tabBarIcon: HomeIcon,
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="Formulários"
        options={{ tabBarIcon: FormulariosIcon }}
        component={FormulariosStackScreen}
      />
      <Tab.Screen
        name="Exames"
        options={{ tabBarIcon: ExamesIcon }}
        component={ExamesStackScreen}
      />
      <Tab.Screen
        name="Consultas"
        options={{ tabBarIcon: ConsultasIcon }}
        component={ConsultasStackScreen}
      />
      <Tab.Screen
        name="Chat"
        options={{ tabBarIcon: ChatIcon }}
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
