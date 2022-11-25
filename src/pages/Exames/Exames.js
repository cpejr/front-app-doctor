import React, { useState, useCallback, useRef } from "react";
import { Button, View, Text, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {WebView} from "react-native-webview";

function Exames({ navigation }) {

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  

  return (
    <>
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
        onPress={() => navigation.navigate("FormaPagamentoScreen")}
      />
      <Button
        title="Go to SolicitarExame"
        onPress={() => navigation.navigate("SolicitarExameScreen")}
      />

      <Button
        title="Go to ExameNormal"
        onPress={() => navigation.navigate("ExameNormal")}
      />
    </View>

  <View>
  <Text>Video</Text>
  <YoutubePlayer
  javaScriptEnabled={true}
  height={300}
  play={playing}
  videoId={"LOrALdmPWVU"}
  onChangeState={onStateChange}
  />
  </View>
  </>
  );
}

export default Exames;
