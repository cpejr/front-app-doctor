import React from "react";
import { useState, useEffect } from "react";
import { Text, View, ScrollView} from "react-native";
import Form from "react-native-jsonschema-form";
import { 
  Corpo,
  HeaderFormularios,
  Titulo,
  CaixaTitulo,
  CaixaFormulario,
  CaixaBotao,

} from "./Styles"
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


function PreencherFormulario({ route }) {
  const [carregando, setCarregando] = useState(true);
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});
  const idFormularioEspecifico = route.params.paramKey;
  const tamanhoIcone = width > 480 ? 20 : 25;
  const { width } = useWindowDimensions();
  const [formularioPaciente, setFormularioPaciente] = useState({})
  

  async function getFormularioPaciente() {
    const formulariosAux =
      await managerService.GetFormularioPacienteEspecifico(
        idFormularioEspecifico
      );
    setFormularioPaciente(formulariosAux);
    setSchema(formulariosAux.perguntas);
    setCarregando(false);
  }

  useEffect(() => {
    getFormularioPaciente();
  }, []);

let resposta;
const preencherRespostas = (res) => (resposta = res);

  async function requisicaoEnviandoRespostas(respostas) {
    await managerService.UpdateRespostasFormulario(
      formularioPaciente.id,
      respostas
    );
  }

  
return (
  <ScrollView>
    <Corpo>
      <HeaderFormularios borderColor={Cores.azul}>
        <TouchableOpacity onPress={() => navigation.navigate("ListaFormularios")}>
          <Icon name="arrow-left" size={tamanhoIcone} color={Cores.azul} />
        </TouchableOpacity>
        <Titulo fontSize="20px" color={Cores.azul}>
          Formulários
        </Titulo>
      </HeaderFormularios>
      <CaixaTitulo>
        <Titulo fontSize="25px" color={Cores.azulEscuro} marginBottom={"8px"}>
          {formularioPaciente.titulo}
        </Titulo>
      </CaixaTitulo>
      <CaixaFormulario>
        {carregando ? (
          <ActivityIndicator animating={true} color={Cores.azulEscuro} />
        ) : (
              <View>
                <Form

                  schema={schema}
                  uiSchema={uiSchema}
                  widgets={widgets}
                  onChange={(submited) =>
                  preencherRespostas(submited.formData)
                  }
                >
                  <></>
              </Form>
              </View>
        )}
      </CaixaFormulario>
      
        <CaixaBotao>
          <Botao
            width="32%"
            height="40px"
            backgroundColor={Cores.lilas[1]}
            borderRadius="3px"
            borderColor={Cores.azul}
            borderWidth="3px"
            boxShadow="none"
            onPress={() => requisicaoEnviandoRespostas(resposta)}
          >
            <ConteudoBotao width="90%" fontSize="15px" color={Cores.branco}>
              ENVIAR
            </ConteudoBotao>
          </Botao>
        </CaixaBotao>
      
    </Corpo>
  </ScrollView>
);
;
}

export default PreencherFormulario;
