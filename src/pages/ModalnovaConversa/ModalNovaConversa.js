import React, { useContext, useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import * as managerService from "../../services/ManagerService/managerService";
import {
    Body,
    Modal,
    PickerView,
    PickerSecretaria,
    TextoIniciarConversa,
}from "./Styles";
import { Cores } from "../../variaveis";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { sleep } from "../../utils/sleep";

function ModalNovaConversa({ navigation }) {

    const [usuario, setUsuario] = useState([]);
    const [secretaria, setSecretaria] = useState([]);
    const [secretariaSelecionada, setSecretariaSelecionada] = useState();

    async function pegandoUsuarios(){
        //await sleep(1500);
        const resposta = await managerService.GetTodosUsuarios();
        const pegaSecretaria = resposta.filter(
            (item) => item.tipo === "SECRETARIA(O)"
        );
        setUsuario(pegaSecretaria);
    }

    useEffect(() => {
        pegandoUsuarios();
      },[]);

    return(
        <Body>
            <Modal>
                <TextoIniciarConversa>Iniciar uma nova Conversa</TextoIniciarConversa>
                <PickerView>
                    <PickerSecretaria
                        selectedValue={secretariaSelecionada}
                        onValueChange={(itemValue) => {
                          setSecretariaSelecionada(itemValue);
                        }}
                    >   
                        <Picker.Item
                        style={{ fontSize: 15, color: "grey" }}
                        value=""
                        label={"Selecione um(a) Secretário(a)"}
                        />
                        
                    {usuario.map((value) => (
                        <Picker.Item
                            key={value.id}
                            style={{ fontSize: 15, color: "black" }}
                            value={value.nome}
                            label={value.nome}
                        />
                    ))}    
                    </PickerSecretaria>
                </PickerView>
            </Modal>
        </Body>
    )
}

export default ModalNovaConversa;
