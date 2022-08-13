import React, { useState, useEffect } from "react";
import { sleep } from "../../utils/sleep";
import { ActivityIndicator, Colors, Searchbar } from 'react-native-paper';
import { Alert, ScrollView, Text, TouchableOpacity,View, useWindowDimensions} from "react-native";
import { 
    ContainerBody, 
    ContainerBotoes, 
    ContainerCima,
    TextoCima, 
    TextoBotao,
    CaixaBotao,
} from "./Styles";
import Botao from "../../styles/Botao";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

function Arquivos({ navigation }) {
    
    return(
        <ContainerBody>
            <ContainerCima>
                <TextoCima> Arquivos </TextoCima>
            </ContainerCima>
            <ContainerBotoes>
                <CaixaBotao
                     onPress={() => navigation.navigate("FormulariosStackScreen")}
                   >
                    <TextoBotao>Formulários</TextoBotao>
                </CaixaBotao>
                <CaixaBotao
                     onPress={() => navigation.navigate("ListaReceitas")}
                   >
                    <TextoBotao>Receitas</TextoBotao>
                </CaixaBotao>
            </ContainerBotoes>
        </ContainerBody>
    );
}
export default Arquivos;