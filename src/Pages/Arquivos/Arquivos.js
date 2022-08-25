import React, { useState, useEffect } from "react";
import { sleep } from "../../utils/sleep";
import { ActivityIndicator, Colors, Searchbar } from 'react-native-paper';
import { Alert, ScrollView, Text, TouchableOpacity,View, useWindowDimensions} from "react-native";
import { 
    ContainerBody, 
    ContainerBotoes, 
    ContainerCima,
    ContainerBaixo,
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
            <ContainerBaixo>
            <ContainerBotoes>
                <CaixaBotao
                     onPress={() => navigation.push("ListaFormularios")}
                   >
                    <TextoBotao>Formulários</TextoBotao>
                </CaixaBotao>
                <CaixaBotao
                     onPress={() => navigation.push("ListaReceitas")}
                   >
                    <TextoBotao>Receitas</TextoBotao>
                </CaixaBotao>
            </ContainerBotoes>
            </ContainerBaixo>
        </ContainerBody>
    );
}
export default Arquivos;