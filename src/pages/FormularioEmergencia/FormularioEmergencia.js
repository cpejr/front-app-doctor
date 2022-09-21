import React from "react";
import { useState, useEffect } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity, useWindowDimensions, } from "react-native";
import Form from "react-native-jsonschema-form";
import * as managerService from "../../services/ManagerService/managerService";
import Icon from "react-native-vector-icons/Entypo";
import { Cores } from "../../variaveis";


function FormularioEmergencia({ navigation }) {

  const [carregando, setCarregando] = useState(true);
  const [formularioPaciente, setFormularioPaciente] = useState({});
  const [formularioDeEmergencia, setFormularioDeEmergencia] = useState({});
  const [formularioPacienteDeEmergencia, setFormularioPacienteDeEmergencia] = useState({});
  const tamanhoIcone = width > 480 ? 20 : 25;
  const { width } = useWindowDimensions();
  const [schema, setSchema] = useState({});
  const [schema2, setSchema2] = useState({})
  const [uiSchema, setUiSchema] = useState({});


  //pegar todos os formulários pelo id do usuario logado

  //salvar em formularioPacienteEmergencia o formulario com a a id_formulario = "0c40aa7c-8109-4764-b042-d47280c7143b"


  async function GetFormulariosEmergenciaPaciente() {
    const formularios = await managerService.GetFormulariosPaciente();
    formularios.forEach((formularioPaciente) => {
      if (formularioPaciente.id_formulario === "aa321e77-0d3c-48b5-ba8c-0bfd7dfe1c33") {
        setFormularioPacienteDeEmergencia(formularioPaciente);
        setSchema(formularioPaciente.perguntas);
      }
    });
  }

  useEffect(() => {
    GetFormulariosEmergenciaPaciente();
  }, []);



  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => navigation.push("Home")}>
          <Icon name="arrow-left" size={tamanhoIcone} color={Cores.azul} />
        </TouchableOpacity>
      </View>
      <View>
        <Form
          schema={schema}
          uiSchema={uiSchema}
        >
          <></>
        </Form>
      </View>
    </View>

  );
}
export default FormularioEmergencia