import React from "react";
import { useState, useEffect } from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import Form from "react-native-jsonschema-form";
import {
  Corpo,
  HeaderFormularios,
  Titulo,
  CaixaTitulo,
  CaixaFormulario,
  CaixaBotao,
  CaixaCima,
  CaixaPagina,
  CorpoScroll,
  Body,
} from "./Styles";
import { Cores } from "../../variaveis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as managerService from "../../services/ManagerService/managerService";
import Icon from "react-native-vector-icons/Entypo";
import {
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import { Dimensions } from "react-native";

function PreencherFormulario({ route, navigation }) {
  const [carregando, setCarregando] = useState(true);
  const [schema, setSchema] = useState({});

  const [uiSchema, setUiSchema] = useState({});
  const FormularioEspecifico = route.params.paramKey;
  const tamanhoIcone = width > 480 ? 20 : 25;
  const { width } = useWindowDimensions();
  const heightTela = `${Dimensions.get("window").height}px`;
  const [formularioPaciente, setFormularioPaciente] = useState({});

  async function getFormularioPaciente() {
    const formulariosAux = await managerService.GetFormularioPacienteEspecifico(
      FormularioEspecifico.id
    );

    setFormularioPaciente(formulariosAux);
    setSchema(FormularioEspecifico.perguntas);
    setCarregando(false);
  }

  useEffect(() => {
    getFormularioPaciente();
  }, []);

  let resposta;
  const preencherRespostas = (res) => (resposta = res);

  async function requisicaoEnviandoRespostas(respostas) {
    var validado = true;
    for (const propriedade_schema in schema.properties) {
      if (schema.properties[propriedade_schema].type === "string") {
        if (respostas[propriedade_schema] === undefined) {
          validado = false;
        }
      } else if (schema.properties[propriedade_schema].type === "boolean") {
        if (respostas[propriedade_schema] === undefined) {
          respostas[propriedade_schema] = false;
        }
      }
    }
    if (validado) {
      await managerService.UpdateRespostasFormulario(
        formularioPaciente.id,
        respostas
      );
      navigation.push("ListaFormularios");
    } else {
      Alert.alert("Erro", "Preencha todos os campos!");
    }
  }

  return (
    <>
      <Body>
        <HeaderFormularios borderColor={Cores.azul}>
          <TouchableOpacity onPress={() => navigation.push("ListaFormularios")}>
            <Icon name="arrow-left" size={tamanhoIcone} color={Cores.azul} />
          </TouchableOpacity>
          <Titulo fontSize="20px" color={Cores.azul}>
            Formulários
          </Titulo>
        </HeaderFormularios>
        <Corpo>
          <CaixaCima>
            <CaixaTitulo>
              <Titulo
                fontSize="24px"
                color={Cores.azulEscuro}
                marginBottom="8px"
              >
                {FormularioEspecifico.titulo}
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
                      // widgets={widgets}
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
          </CaixaCima>
        </Corpo>
        <CaixaBotao>
          <Botao
            width="32%"
            height="40px"
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
      </Body>
    </>
  );
}

export default PreencherFormulario;
