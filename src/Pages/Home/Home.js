import React from "react";
import { Button, Text, View } from "react-native";

function Home({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Go to Cadastro"
        onPress={() => navigation.navigate("Cadastro")}
      />
      <Button
        title="Go to Header"
        onPress={() => navigation.navigate("Header")}
      />
    </View>
  );
}

export default Home;
