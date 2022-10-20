import React from "react";
import { useState, useEffect } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity, useWindowDimensions, ActivityIndicator, Dimensions } from "react-native";
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
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  const [schema, setSchema] = useState({});
  const heightCorpo = width > height ? "80%" : "90%";


  const uiSchema = {
    newInput5: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 5
      }
    },
  }


  async function GetFormulariosEmergenciaPaciente() {
    const formularios = await managerService.GetFormulariosPaciente();
    formularios.forEach((formularioPaciente) => {
      if (formularioPaciente.id_formulario === "046975f7-d7d0-4635-a9d9-25efbe65d7b7") {
        setFormularioPacienteDeEmergencia(formularioPaciente);
        setSchema(formularioPaciente.perguntas);
      }
    });
    setCarregando(false);
  }

  useEffect(() => {
    GetFormulariosEmergenciaPaciente();
    console.log(height);
    console.log(width);
    console.log(heightCorpo);

  }, []);

  let resposta;
  const preencherRespostas = (res) => (resposta = res);

  async function requisicaoEnviandoRespostas(respostas) {
    var campo_vazio = true;
    for (const pergunta in schema.properties) {
      if (respostas[pergunta] === undefined)
        campo_vazio = false;
    }
    if (campo_vazio) {
      await managerService.UpdateRespostasFormulario(
        formularioPacienteDeEmergencia.id,
        respostas
      );
      navigation.push("Home");
    } else {
      Alert.alert("Erro", "Preencha todos os campos!");
    }
  }


  return (
    <Container>
      <HeaderFormularios>
        <TouchableOpacity onPress={() => navigation.push("Home")}>
          <Icon name="arrow-left" size={tamanhoIcone} color={Cores.azul} />
        </TouchableOpacity>
      </HeaderFormularios>

      <Corpo height={heightCorpo}>
        <CaixaCima>
          <CaixaTitulo>
            <Titulo
              fontSize="24px"
              color={Cores.azulEscuro}
              marginBottom="4px"
            >
              {formularioPacienteDeEmergencia.titulo}
            </Titulo>
          </CaixaTitulo>
          <CorpoScroll>
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
                    onChange={(submited) =>
                      preencherRespostas(submited.formData)
                    }
                  >
                    <></>
                  </Form>
                </View>
              )}
            </CaixaFormulario>
          </CorpoScroll>
          <CaixaBotao>
            <Botao
              width="58%"
              height="45px"
              backgroundColor="green"
              borderRadius="3px"
              borderColor="black"
              borderWidth="3px"
              boxShadow="none"
              marginTop="0"
            >
              <ConteudoBotaoUpload width="90%" color={Cores.azul}>
                <ConteudoBotao width="90%" fontSize="14px" color={Cores.azul}>
                  Upload de Arquivo
                </ConteudoBotao>
                <Icon name="upload" size={tamanhoIcone} color={Cores.azul}></Icon>
              </ConteudoBotaoUpload>
            </Botao>
            <Botao
              width="35%"
              height="45px"
              backgroundColor={Cores.lilas[1]}
              borderRadius="3px"
              borderColor={Cores.azul}
              borderWidth="3px"
              boxShadow="none"
              marginTop="0"
              onPress={() => requisicaoEnviandoRespostas(resposta)}
            >
              <ConteudoBotao width="90%" fontSize="15px" color={Cores.branco}>
                ENVIAR
              </ConteudoBotao>
            </Botao>
          </CaixaBotao>
        </CaixaCima>
      </Corpo>
    </Container>

  );
}
export default FormularioEmergencia