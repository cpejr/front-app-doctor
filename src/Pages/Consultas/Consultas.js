import React from "react";
import { Text, View, Button } from "react-native";

function Consultas({ navigation }) {
  return (
    <View>
      <Text> Consultas</Text>
      <Button
        title="Go to Cadastro"
        onPress={() => navigation.navigate("Cadastro")}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to RecomendacoesPreConsulta"
        onPress={() => navigation.navigate("RecomendacoesPreConsultaScreen")}
      />
      <Button
        title="Go to SolicitarConsulta"
        onPress={() => navigation.navigate("SolicitarConsultaScreen")}
      />
    </View>
  );
}

export default Consultas;
