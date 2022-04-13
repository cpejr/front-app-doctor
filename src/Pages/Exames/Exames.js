import React from "react";
import { Text, View, Button } from "react-native";

function Exames({ navigation }) {
  return (
    <View>
      <Text>Exames</Text>
      <Button
        title="Go to Cadastro"
        onPress={() => navigation.navigate("Cadastro")}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to FormaPagamento"
        onPress={() => navigation.navigate("FormaPagamento")}
      />
      <Button
        title="Go to SolicitarExame"
        onPress={() => navigation.navigate("SolicitarExame")}
      />
    </View>
  );
}

export default Exames;
