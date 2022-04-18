import React from "react";
import { Text, View, Button } from "react-native";

function ListaFormularios({ navigation }) {
  return (
    <View>
      <Text>ListaFormularios</Text>
      <Button
        title="Go to Cadastro"
        onPress={() => navigation.navigate("Cadastro")}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to PreencherFormulario"
        onPress={() => navigation.navigate("PreencherFormularioScreen")}
      />
    </View>
  );
}

export default ListaFormularios;
