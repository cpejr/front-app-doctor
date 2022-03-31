import React from "react";
import { Button, Text, View } from "react-native";

function Home({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Cadastro"
        onPress={() => navigation.navigate("Cadastro")}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

export default Home;
