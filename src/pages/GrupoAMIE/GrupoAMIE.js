import React, { useState, useCallback, useRef } from "react";
import { Button, View, Text, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {WebView} from "react-native-webview";

function GrupoAMIE() {
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
    <View>
      <Text>GrupoAMIE</Text>
    <YoutubePlayer
    javaScriptCanOpenWindowsAutomatically={true}
    mediaPlaybackRequiresUserAction={true}
    javaScriptEnabled={true}
    width={350}
    height={300}
    play={playing}
    videoId={"z-0AMvyarjE"}
    onChangeState={onStateChange}
  />
  <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
  </View>
  );
}

export default GrupoAMIE;
