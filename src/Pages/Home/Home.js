import React from "react";
import { Button, Text, View } from "react-native";

function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to Cadastro"
        onPress={() => navigation.navigate("Cadastro")}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to Comentarios"
        onPress={() => navigation.navigate("ComentariosScreen")}
      />
      <Button
        title="Go to Emergencia"
        onPress={() => navigation.navigate("EmergenciaScreen")}
      />
      <Button
        title="Go to GrupoAMIE"
        onPress={() => navigation.navigate("GrupoAMIEScreen")}
      />
      <Button
        title="Go to Perfil"
        onPress={() => navigation.navigate("PerfilScreen")}
      />
      <Button
        title="Go to Recomendacoes"
        onPress={() => navigation.navigate("RecomendacoesScreen")}
      />
      <Button
        title="Go to SobreMim"
        onPress={() => navigation.navigate("SobreMimScreen")}
      />
      <Button
        title="Go to AlterarDados"
        onPress={() => navigation.navigate("AlterarDadosScreen")}
      />
      <Button
        title="Go to AlterarSenha"
        onPress={() => navigation.navigate("AlterarSenhaScreen")}
      />
    </View>
  );
}

export default Home;
