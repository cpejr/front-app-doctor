import React from "react";
import { Button, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { Button, Text, View, ScrollView } from "react-native";

function Home({ navigation }) {
  return (
    <ScrollView>
    <View>
      <Text>Home</Text>
      <ScrollView>
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
      <Button title="Go to LGPD" onPress={() => navigation.navigate("LGPD")} />
      <Button
        title="Go to ListaReceitas"
        onPress={() => navigation.navigate("ListaReceitas")}
      />
      <Button
        title="Go to ListaFormularios"
        onPress={() => navigation.navigate("ListaFormularios")}
      />
      <Button
        title="Go to Arquivos"
        onPress={() => navigation.navigate("Arquivos")}
      />
      <Button
        title="Go to Formulário de Emergência"
        onPress={() => navigation.navigate("FormularioEmergencia")}
      />
        <Button
        title="Go to Barra Lateral"
        onPress={() => navigation.navigate("BarraLateral")}
      />
        <Button
        title="Go to Conversa Aberta"
        onPress={() => navigation.navigate("ConversaAberta")}
      />
      <Button
        title="Go to ListaExames"
        onPress={() => navigation.navigate("ListaExames")}
      />
      <Button
        title="Go to Solicitar Exame"
        onPress={() => navigation.navigate("SolicitarExame")}
      />
      </ScrollView>
    </View>
    </ScrollView>
  );
}

export default Home;
