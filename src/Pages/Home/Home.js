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
        onPress={() => navigation.navigate("Comentarios")}
      />
      <Button
        title="Go to Emergencia"
        onPress={() => navigation.navigate("Emergencia")}
      />
      <Button
        title="Go to GrupoAMIE"
        onPress={() => navigation.navigate("GrupoAMIE")}
      />
      <Button
        title="Go to Perfil"
        onPress={() => navigation.navigate("Perfil")}
      />
      <Button
        title="Go to Recomendacoes"
        onPress={() => navigation.navigate("Recomendacoes")}
      />
      <Button
        title="Go to SobreMim"
        onPress={() => navigation.navigate("SobreMim")}
      />
      <Button
        title="Go to AlterarDados"
        onPress={() => navigation.navigate("AlterarDados")}
      />
      <Button
        title="Go to AlterarSenha"
        onPress={() => navigation.navigate("AlterarSenha")}
      />
      <Button
        title="Go to LGPD"
        onPress={() => navigation.navigate("LGPD")}
      />
    </View>
  );
}

export default Home;
