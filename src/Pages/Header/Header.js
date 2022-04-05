import React from "react";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import { Corpo, Perfil, Logo, Botaoo } from "./Styles";

function Header({ navigation }) {
  return (
    <Corpo>
      <Botaoo onPress={() => navigation.navigate("Home")}>
        <Logo source={logoGuilherme}></Logo>
      </Botaoo>
      <Botaoo onPress={() => navigation.navigate("Perfil")}>
        <Perfil />
      </Botaoo>
    </Corpo>
  );
}

export default Header;
