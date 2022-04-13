import React from "react";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import { Corpo, Perfil, Logo, Botaoo } from "./Styles";
import { useNavigation } from "@react-navigation/native";

function Header() {
  const navigation = useNavigation();

  return (
    <Corpo>
      <Botaoo onPress={() => navigation.navigate("Home")}>
        <Logo source={logoGuilherme} />
      </Botaoo>
      <Botaoo onPress={() => navigation.navigate("Perfil")}>
        <Perfil />
      </Botaoo>
    </Corpo>
  );
}

export default Header;
