import React from "react";
import { useState, useEffect } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity, useWindowDimensions, ActivityIndicator, Dimensions} from "react-native";
import Form from "react-native-jsonschema-form";
import * as managerService from "../../services/ManagerService/managerService";
import Icon from "react-native-vector-icons/Entypo";
import { Cores } from "../../variaveis";
import { HeaderFormularios, Titulo, Corpo, CorpoScroll, CaixaCima, CaixaFormulario, CaixaTitulo, CaixaBotao, Container, ConteudoBotaoUpload } from "./Styles";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";


function FormularioEmergencia({ navigation }) {

  const [carregando, setCarregando] = useState(true);
  const [formularioPaciente, setFormularioPaciente] = useState({});
  const [formularioDeEmergencia, setFormularioDeEmergencia] = useState({});
  const [formularioPacienteDeEmergencia, setFormularioPacienteDeEmergencia] = useState({});
  const tamanhoIcone = width > 480 ? 20 : 25;
  const { width } = useWindowDimensions();
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});
  const heightCorpo = `${Dimensions.get("window").height - 230}px`;


  async function GetFormulariosEmergenciaPaciente() {
    const formularios = await managerService.GetFormulariosPaciente();
    formularios.forEach((formularioPaciente) => {
      if (formularioPaciente.id_formulario === "aa321e77-0d3c-48b5-ba8c-0bfd7dfe1c33") {
        setFormularioPacienteDeEmergencia(formularioPaciente);
        setSchema(formularioPaciente.perguntas);
      }
    });
    setCarregando(false);
  }

  useEffect(() => {
    GetFormulariosEmergenciaPaciente();
  }, []);



  return (
    <Container>
      <HeaderFormularios>
        <TouchableOpacity onPress={() => navigation.push("Home")}>
          <Icon name="arrow-left" size={tamanhoIcone} color={Cores.azul} />
        </TouchableOpacity>
      </HeaderFormularios>
      <CorpoScroll>
        <Corpo height={heightCorpo}>
          <CaixaCima>
            <CaixaTitulo>
              <Titulo
                fontSize="24px"
                color={Cores.azulEscuro}
                marginBottom="8px"
              >
                {formularioPacienteDeEmergencia.titulo}
              </Titulo>
            </CaixaTitulo>
            <CaixaFormulario>
              {carregando ? (
                <ActivityIndicator
                  animating={true}
                  color={Cores.azulEscuro}
                />
              ) : (
                <View>
                  <Form
                    schema={schema}
                    uiSchema={uiSchema}
                  // widgets={widgets}}
                  >
                    <></>
                  </Form>
                </View>
              )}
            </CaixaFormulario>
            <CaixaBotao>
            <Botao
                width="64%"
                height="45px"
                backgroundColor="green"
                borderRadius="3px"
                borderColor="black"
                borderWidth="3px"
                boxShadow="none"
                marginTop="0"
              >
                <ConteudoBotaoUpload width="90%" fontSize="15px" color={Cores.azul}>
                <ConteudoBotao width="90%" fontSize="15px" color={Cores.azul}>
                  Upload de Arquivo
                </ConteudoBotao>
                  <Icon name = "upload" size = {tamanhoIcone} color={Cores.azul}></Icon>
                </ConteudoBotaoUpload>
              </Botao>
              <Botao
                width="32%"
                height="40px"
                backgroundColor={Cores.lilas[1]}
                borderRadius="3px"
                borderColor={Cores.azul}
                borderWidth="3px"
                boxShadow="none"
                marginTop="0"
              >
                <ConteudoBotao width="90%" fontSize="15px" color={Cores.branco}>
                  ENVIAR
                </ConteudoBotao>
              </Botao>
            </CaixaBotao>
          </CaixaCima>
        </Corpo>
      </CorpoScroll>
    </Container>

  );
}
export default FormularioEmergencia