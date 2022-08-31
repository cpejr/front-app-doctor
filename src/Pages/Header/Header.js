import React from "react";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import { Corpo, Perfil, Logo, Botaoo } from "./Styles";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Cores } from "../../variaveis";

function Header() {
  const navigation = useNavigation();
  
  return (
    <Corpo>
      <Botaoo onPress={() => navigation.navigate("Home")}>
        <Logo source={logoGuilherme}/>
      </Botaoo>
      <Botaoo onPress={() => navigation.navigate("Perfil")}>
         <Perfil>
           <Icon name="user" size={30} color={Cores.azul} />
           </Perfil>
      
      </Botaoo>
    </Corpo>
  );
}

export default Header;
