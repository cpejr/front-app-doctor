import React from "react";
import { useState, useEffect } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity, useWindowDimensions,} from "react-native";
import Form from "react-native-jsonschema-form";
import * as managerService from "../../services/ManagerService/managerService";
import Icon from "react-native-vector-icons/Entypo";
import { Cores } from "../../variaveis";


function FormularioEmergencia({ navigation }) {

  const [carregando, setCarregando] = useState(true);
  const [formularioPaciente, setFormularioPaciente] = useState({});
  const [formularioDeEmergencia, setFormularioDeEmergencia] = useState({});
  const tamanhoIcone = width > 480 ? 20 : 25;
  const { width } = useWindowDimensions();
  const [schema, setSchema] = useState({});


  async function getFormularioEmergencia() {

    const id = "37a0151a-e38f-40e9-bce5-7b18087ffdad";
    const formulariosAux = await managerService.GetFormularioEspecifico(id);
    console.log(formulariosAux);
  }


  /*   async function getFormularioPaciente() {
  
      const id = "37a0151a-e38f-40e9-bce5-7b18087ffdad";
  
      const formulariosAux = await managerService.GetFormularioPacienteEspecifico(id);
  
      setFormularioPaciente(formulariosAux);
      setSchema(FormularioEspecifico.perguntas);
      setCarregando(false);
    } */


  return (
    <View>
      <TouchableOpacity onPress={() => navigation.push("Home")}>
        <Icon name="arrow-left" size={tamanhoIcone} color={Cores.azul} />
      </TouchableOpacity>
      <Text> OI </Text>
    </View>
  );
}
export default FormularioEmergencia