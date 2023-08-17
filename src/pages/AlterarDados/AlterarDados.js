import React, { useEffect, useState } from "react";
import Botao from "../../styles/Botao";
import ConteudoBotao from "../../styles/ConteudoBotao";
import Input from "../../styles/Input";
import Icon from "react-native-vector-icons/AntDesign";
import InputMask from "../../styles/InputMask/InputMask";
import {
  useWindowDimensions,
  ScrollView,
  Image,
  Text,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import { Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, Colors, Checkbox } from "react-native-paper";
import {
  Body,
  CaixaAlterarDados,
  CaixaInputs,
  CaixaTitulo,
  CaixaCima,
  Foto,
  Titulo,
  CaixaBotoes,
  Data,
  TituloRotulos,
  CaixaTitulosRotulos,
  Rotulo,
  PickerView,
  PickerEstado,
  CheckboxTexto,
  Lgpd,
  ContainerFotoEAlterarImagem,
  BotaoAlterarEDeletarImagem,
  TextoAlterarEDeleterImagem,
  CaixaBotoesAlterarEDeletarImagem,
  CaixaModal,
  CaixaFechar,
  CaixaTituloModal,
  TituloModal,
  CaixaBotoesCancelarConfirmarModalExcluirFoto,
  CaixaImagemBotao,
  ImagemModal,
  CaixaTituloModalExcluir,
  PaginaCarregando,
  CaixaModalDeleteFoto,
  CaixaModalUpdateFoto,
  CaixaExterna,
  CaixaParaDatadeNascimento
} from "./Styles";
import { brParaPadrao } from "../../utils/date";
import { estados, estadosSelectlist} from "./estados";
import { cep } from "../../utils/masks";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import _, { result, update } from "lodash";
import { isEqual } from "lodash";
import { sleep } from "../../utils/sleep";
import { CaixaRotulo } from "../Cadastro/Styles";
import { apenasLetras, apenasNumeros } from "../../utils/masks";
import { Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from 'react-native-dropdown-select-list'

function AlterarDados({ navigation }) {
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [telefone, setTelefone] = useState("");
  const [telefoneCuidador, setTelefoneCuidador] = useState("");
  const [cpf, setCpf] = useState("");
  const [complemento, setComplemento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [numero, setNumero] = useState("");
  const [estado, setEstado] = useState({});
  const [novoEndereco, setNovoEndereco] = useState({});
  const [cpfMasked, setCpfMasked] = useState("");
  const [dataMasked, setDataMasked] = useState("");
  const [telMasked, setTelMasked] = useState("");
  const [telCuidadorMasked, setTelCuidadorMasked] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState();
  const [checked, setChecked] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [carregandoDeletarFoto, setCarregandoDeletarFoto] = useState(false);
  const [carregandoFoto, setCarregandoFoto] = useState(false);
  const [fotoDePerfil, setFotoDePerfil] = useState("");
  const [modalAdicionarFoto, setModalAdicionarFoto] = useState(false);
  const [modalExcluirFoto, setModalExcluirFoto] = useState(false);
  const [permissaoParaAbrirAGaleria, setPermissaoParaAbrirAGaleria] =
    useState(null);
  const [imagem64, setImagem64] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [CarregandoImagemModal, setCarregandoImagemModal] = useState(false);
  const tamanhoIcone = width > 480 ? 20 : 25;
  const [date, setDate] = useState(new Date(2000, 0, 1));

  const [heightModalDeletarFoto, setHeightModalDeletarFoto] = useState();
  const [heightModalUpdateFoto, setHeightModalUpdateFoto] = useState();
  const [marginTopModais, setMarginTopModais] = useState();
  const [datePicker, setDatePicker] = useState(false);
  const [dataPlaceHolder, setdataPlaceHolder] = useState(0);

  const ListaEstado = [
    {value:"Acre", key:"AC"},
    {value:"Alagoas", key:"AL"},
    {value:"Amapá", key:"AP"},
    {value:"Amazonas", key:"AM"},
    {value:"Bahia", key:"BA"},
    {value:"Ceará", key:"CE"},
    {value:"Distrito Federal", key:"DF"},
    {value:"Espírito Santo", key:"ES"},
    {value:"Goiás", key:"GO"},
    {value:"Maranhão", key:"MA"},
    {value:"Mato Grosso", key:"MT"},
    {value:"Mato Grosso do Sul", key:"MS"},
    {value:"Minas Gerais", key:"MG"},
    {value:"Pará", key:"PA"},
    {value:"Paraíba", key:"PB"},
    {value:"Paraná", key:"PR"},
    {value:"Pernambuco", key:"PE"},
    {value:"Piauí", key:"PI"},
    {value:"Rio de Janeiro", key:"RJ"},
    {value:"Rio Grande do Norte", key:"RN"},
    {value:"Rio Grande do Sul", key:"RS"},
    {value:"Rondônia", key:"RO"},
    {value:"Roraima", key:"RR"},
    {value:"Santa Catarina", key:"SC"},
    {value:"São Paulo", key:"SP"},
    {value:"Sergipe", key:"SE"},
    {value:"Tocantins", key:"TO"},
    {value:"Estrangeiro", key:"EX"}
  ]
  

  function deixandoModaisResponsivos() {
    if (width > height){
      setHeightModalDeletarFoto("55%");
      setHeightModalUpdateFoto("85%");
      setMarginTopModais("0%");
    } 
    else {
      setHeightModalDeletarFoto("35%");
      setHeightModalUpdateFoto("60%");
      setMarginTopModais("0%");
    }
  }

  useEffect(() => {
    deixandoModaisResponsivos();
  }, [width, height]);

  const [camposNulos, setCamposNulos] = useState({
    nome: true,
    telefone: true,
    data_nascimento: true,
    cpf: true,
    cep: true,
    pais: true,
    estado: true,
    cidade: true,
    rua: true,
    numero: true,
    bairro: true,
    complemento: true,
    convenio: true,
    nome_cuidador: true,
    telefone_cuidador: true,
  });

  const referenciaCamposNulos = {
    nome: true,
    telefone: true,
    data_nascimento: true,
    cpf: true,
    cep: true,
    pais: true,
    estado: true,
    cidade: true,
    rua: true,
    numero: true,
    bairro: true,
    complemento: true,
    convenio: true,
    nome_cuidador: true,
    telefone_cuidador: true,
  };
  const [data_nascimentoFront, setData_nascimentoFront] = useState(
    "Data de nascimento:"
  );
  const [selectListEstados, setSelectListEstados] = useState();

  const errors = {};
  const [estadoAtual, setEstadoAtual] = useState({value:"Acre", key:"AC"})

  useEffect(() => {
    if (!estado.nome) errors.nome = true;
    if (!estado.telefone) errors.telefone = true;
    if (!estado.cpf) errors.cpf = true;
    if (!novoEndereco.cep) errors.cep = true;
    if (!novoEndereco.pais) errors.pais = true;
    if (!novoEndereco.estado) errors.estado = true;
    if (!novoEndereco.cidade) errors.cidade = true;
    if (!novoEndereco.bairro) errors.bairro = true;
    if (!novoEndereco.rua) errors.rua = true;
    if (!novoEndereco.numero) errors.numero = true;
    if (!novoEndereco.complemento) errors.complemento = true;
    if (!estado.convenio) errors.convenio = true;
    if (!estado.nome_cuidador) errors.nome_cuidador = true;
    if (!estado.telefone_cuidador) errors.telefone_cuidador = true;

    setCamposNulos({ ...camposNulos, ...errors });
  }, [estado, novoEndereco]);

  const [erro, setErro] = useState({
    cpf: false,
    telefone: false,
    cep: false,
    telefone_cuidador: false,
  });
  const referenciaFormatacao = {
    cpf: false,
    telefone: false,
    cep: false,
    telefone_cuidador: false,
  };

  useEffect(() => {
    (async () => {
      const StatusDaGaleria =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissaoParaAbrirAGaleria(StatusDaGaleria.status === "granted");
    })();
  }, []);

  const selecionaImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0
    });
    
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
      setImagem64(`data:image/png;base64,${resultado.assets[0].base64}`);
    }

    if (permissaoParaAbrirAGaleria === false) {
      Alert.alert("Erro", "Sem permissão de acesso à galeria");
    }
  };

  async function setandoFotoDePerfil() {
    const chave = usuario.avatar_url;

    if (chave === null || chave === "" || chave === undefined) {
      await sleep(1500);
      setCarregandoFoto(false);
      return false;
    }

    setCarregandoFoto(true);
    const arquivo = await managerService.GetArquivoPorChave(chave);
    setFotoDePerfil(arquivo);
    await sleep(1500);
    setCarregandoFoto(false);
  }

  useEffect(() => {
    setandoFotoDePerfil();
  }, [usuario.avatar_url]);

  function formatacaoData() {
    let dataNascimento = data_nascimentoFront;
    const response = brParaPadrao(dataNascimento);
    return response;
  }

  function formatacaodeData(date) {
    return [
      transformaaodeDataem2digitos(date.getDate()),
      transformaaodeDataem2digitos(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  async function updateFoto() {
    if (imagem64) {
      setCarregandoImagemModal(true);
      await managerService.UpdateFotoDePerfil(usuario.id, imagem64);

      setImagem64(null);
      setImagem(null);
      setModalAdicionarFoto(false);
      navigation.push("AlterarDados");
      setCarregandoImagemModal(false);

    } else {
      Alert.alert("Erro", "Selecione uma foto para enviar!");
    }
  }

  async function pegandoDados() {
    setCarregando(true);
    await sleep(500);
    const resposta = await managerService.GetDadosUsuario();
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(resposta.dadosUsuario.cpf);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
    setEstadoAtual(ListaEstado.find(function(estado){
      return estado.key === resposta.dadosEndereco.estado
    }))
    setComplemento(resposta.dadosEndereco.complemento);
    setNumero(resposta.dadosEndereco.numero + " ");
    if (resposta.dadosUsuario.telefone_cuidador !== null) {
      setTelefoneCuidador(resposta.dadosUsuario.telefone_cuidador);
    }
    setCarregando(false);
  }

  useEffect(() => {
    if (cpf !== undefined) {
      setCpfMasked(
        cpf.slice(+0, -8) +
        "." +
        cpf.slice(+3, -5) +
        "." +
        cpf.slice(+6, -2) +
        "-" +
        cpf.slice(-2)
      );
    }
  }, [cpf]);
  useEffect(() => {
    if (telefone !== undefined) {
      setTelMasked(
        "(" +
        telefone.slice(0, -9) +
        ")" +
        telefone.slice(2, -4) +
        "-" +
        telefone.slice(-4)
      );
    }
  }, [telefone]);

  useEffect(() => {
    if (telefoneCuidador !== undefined) {
      setTelCuidadorMasked(
        "(" +
        telefoneCuidador.slice(0, -9) +
        ")" +
        telefoneCuidador.slice(2, -4) +
        "-" +
        telefoneCuidador.slice(-4)
      );
    }
  }, [telefoneCuidador]);

  useEffect(() => {
    if (dataMasked !== undefined) {
      setDataMasked(
        dataNascimento.slice(8, -14) +
        "/" +
        dataNascimento.slice(5, -17) +
        "/" +
        dataNascimento.slice(0, -20)
      );
    }
  }, [dataNascimento]);

  function transformaaodeDataem2digitos(num) {
    return num.toString().padStart(2, "0");
  }

  async function atualizarDados() {
    setCarregando(true);
      estado.data_nascimento = formatacaoData();

    if (!_.isEqual(camposNulos, referenciaCamposNulos)) {
      if (_.isEqual(erro, referenciaFormatacao)) {
        await managerService.UpdateDadosUsuario(
          usuario.id,
          endereco.id,
          novoEndereco,
          estado
        );
        navigation.push("Perfil");
      } else {
        Alert.alert("Erro", "Preencha os campos corretamente.");
      }
    } else {
      Alert.alert("Erro", "Preencha Algum Campo.");
    }
    setCarregando(false);
  }

  function preenchendoDados(identificador, valor) {
    if (identificador === "nome" || identificador === "nome_cuidador") {
      valor = apenasLetras(valor);
    }
    if (identificador === "data_nascimento") {
      setData_nascimentoFront(valor);
    }

    setEstado({ ...estado, [identificador]: valor });
    setCamposNulos({ ...camposNulos, [identificador]: false });
    verificaErros(identificador, valor);
  }

  function preenchendoEndereco(identificador, valor) {
    if (identificador === "cidade" || identificador === "pais") {
      valor = apenasLetras(valor);
    }

    if (identificador === "numero") {
      valor = apenasNumeros(valor);
    }

    setNovoEndereco({ ...novoEndereco, [identificador]: valor });
    setCamposNulos({ ...camposNulos, [identificador]: false });
    verificaErros(identificador, valor);
  }

  function verificaErros(identificador, valor) {
    if (
      identificador === "telefone" ||
      identificador === "cpf" ||
      identificador === "cep" ||
      identificador === "telefone_cuidador"
    ) {
      if (
        (identificador === "telefone" &&
          valor.length > 0 &&
          valor.length < 11) ||
        (identificador === "cpf" && valor.length > 0 && valor.length < 11) ||
        (identificador === "cep" && valor.length > 0 && valor.length < 8) ||
        (identificador === "telefone_cuidador" &&
          valor.length > 0 &&
          valor.length < 11)
      ) {
        setErro({ ...erro, [identificador]: true });
      } else {
        setErro({ ...erro, [identificador]: false });
      }
    }
  }

  useEffect(() => {
    pegandoDados();
  }, []);

  async function deletarFoto() {
    setCarregandoDeletarFoto(true);
    if (
      usuario.avatar_url === null ||
      usuario.avatar_url === "" ||
      usuario.avatar_url === undefined
    ) {
      Alert.alert("Erro", "O usuário não possui foto de perfil");
      setCarregandoDeletarFoto(false);
      return false;
    }
    await managerService.deletarFotoDePerfil(usuario.id, usuario.avatar_url);
    navigation.push("AlterarDados");
    setModalExcluirFoto(false);
    setCarregandoDeletarFoto(false);
  }

  function fechandoModalEditarFoto() {
    setModalAdicionarFoto(false);
    setImagem(null);
    setImagem64(null);
  }

  const { width, height } = useWindowDimensions();
  const tamanhoInputs = width < 400 ? "85%" : "80%";
  const tamanhoFonte = width > 500 ? "18px" : "11px";
  const widthTitulo = width > height ? "100%" : "200px";
  const tamanhoImagem = width > 2000 ? "400" : "180";
  const tamanhoImagemModal = width > 2000 ? "400px" : "180px";
  return (
    <ScrollView>
      {carregando ? (
        <>
          <PaginaCarregando>
            <ActivityIndicator animating={true} color={Colors.black} />
          </PaginaCarregando>
        </>
      ) : (
        <Body>
          <CaixaAlterarDados>
            <CaixaCima>
              {usuario.avatar_url === null ||
                usuario.avatar_url === "" ||
                usuario.avatar_url === undefined ? (
                <ContainerFotoEAlterarImagem>
                  <Foto borderColor={Cores.branco}>
                    {carregandoFoto ? (
                      <ActivityIndicator
                        animating={true}
                        color={Colors.blue900}
                      />
                    ) : (
                      <>
                        <Icon name="adduser" size={100} color={Cores.preto} />
                      </>
                    )}
                  </Foto>
                </ContainerFotoEAlterarImagem>
              ) : (
                <ContainerFotoEAlterarImagem>
                  <Foto borderColor={Cores.branco}>
                    {carregandoFoto ? (
                      <>
                        <ActivityIndicator
                          animating={true}
                          color={Colors.blue900}
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          source={{ uri: fotoDePerfil }}
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        ></Image>
                      </>
                    )}
                  </Foto>
                </ContainerFotoEAlterarImagem>
              )}
              <CaixaTitulo>
                <Titulo width={widthTitulo}>Altere os seus dados:</Titulo>
              </CaixaTitulo>
            </CaixaCima>
            <CaixaBotoesAlterarEDeletarImagem>
              <BotaoAlterarEDeletarImagem
                onPress={() => {
                  setModalAdicionarFoto(true);
                }}
              >
                <TextoAlterarEDeleterImagem>
                  Adicionar ou Alterar Foto de Perfil
                </TextoAlterarEDeleterImagem>
              </BotaoAlterarEDeletarImagem>
              <BotaoAlterarEDeletarImagem
                onPress={() => {
                  setModalExcluirFoto(true);
                }}
              >
                <TextoAlterarEDeleterImagem>
                  Excluir Foto De Perfil
                </TextoAlterarEDeleterImagem>
              </BotaoAlterarEDeletarImagem>
            </CaixaBotoesAlterarEDeletarImagem>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalAdicionarFoto}
            >
              <CaixaExterna height={height} width={width}>
              <CaixaModalUpdateFoto height={heightModalUpdateFoto} marginTop={marginTopModais}>
                <CaixaFechar>
                  <TouchableOpacity
                    onPress={() => {
                      fechandoModalEditarFoto();
                    }}
                  >
                    <Icon name="close" size={tamanhoIcone}></Icon>
                  </TouchableOpacity>
                </CaixaFechar>
                <CaixaTituloModal>
                  <TituloModal>
                    Selecione uma imagem para personalizar seu perfil:
                  </TituloModal>
                    {imagem === null ? (
                      <Botao
                        width={tamanhoImagemModal}
                        height={tamanhoImagemModal}
                        backgroundColor={Cores.cinza[11]}
                        borderRadius="3px"
                        borderColor={Cores.cinza[9]}
                        borderWidth="3px"
                        boxShadow="none"
                        onPress={() => selecionaImagem()}
                      >
                        <ConteudoBotao
                          width="90px"
                          fontSize="20px"
                          color={Cores.azul}
                        >
                          +
                        </ConteudoBotao>
                      </Botao>
                    ) : (
                      <ImagemModal 
                       width={tamanhoImagem}
                       height={tamanhoImagem}
                       source={imagem}></ImagemModal>
                    )}
                  <CaixaBotoesCancelarConfirmarModalExcluirFoto>
                    <Botao
                      width="40%"
                      height="35px"
                      backgroundColor={Cores.branco}
                      borderRadius="3px"
                      borderColor="rgba(255, 0, 0, 0.25)"
                      borderWidth="3px"
                      boxShadow="none"
                      onPress={() => fechandoModalEditarFoto()}
                    >
                      <ConteudoBotao
                        width="100%"
                        fontSize="12px"
                        color={Cores.preto}
                      >
                        CANCELAR
                      </ConteudoBotao>
                    </Botao>
                    <Botao
                      width="40%"
                      height="35px"
                      backgroundColor={Cores.lilas[1]}
                      borderRadius="4px"
                      borderColor={Cores.azul}
                      borderWidth="3px"
                      boxShadow="none"
                      onPress={() => updateFoto()}
                    >
                      {carregandoDeletarFoto ? (
                        <ActivityIndicator
                          animating={true}
                          color={Cores.branco}
                        />
                      ) : (
                        <ConteudoBotao
                          width="100%"
                          fontSize="12px"
                          color={Cores.branco}
                        >
                          CONFIRMAR
                        </ConteudoBotao>
                      )}
                    </Botao>
                  </CaixaBotoesCancelarConfirmarModalExcluirFoto>
                </CaixaTituloModal>
              </CaixaModalUpdateFoto>
              </CaixaExterna>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalExcluirFoto}
            >
              <CaixaExterna height={height} width={width}>
              <CaixaModalDeleteFoto height={heightModalDeletarFoto} marginTop={marginTopModais}>
                <CaixaFechar>
                  <TouchableOpacity
                    onPress={() => {
                      setModalExcluirFoto(false);
                    }}
                  >
                    <Icon name="close" size={tamanhoIcone}></Icon>
                  </TouchableOpacity>
                </CaixaFechar>
                <CaixaTituloModalExcluir>
                  <TituloModal>
                    Tem certeza que quer excluir sua foto de perfil?
                  </TituloModal>
                </CaixaTituloModalExcluir>
                <CaixaBotoesCancelarConfirmarModalExcluirFoto>
                  <Botao
                    width="30%"
                    height="35px"
                    backgroundColor={Cores.branco}
                    borderRadius="3px"
                    borderColor="rgba(255, 0, 0, 0.25)"
                    borderWidth="3px"
                    boxShadow="none"
                    onPress={() => setModalExcluirFoto(false)}
                  >
                    <ConteudoBotao
                      width="100%"
                      fontSize="12px"
                      color={Cores.preto}
                    >
                      CANCELAR
                    </ConteudoBotao>
                  </Botao>
                  <Botao
                    width="30%"
                    height="35px"
                    backgroundColor={Cores.lilas[1]}
                    borderRadius="4px"
                    borderColor={Cores.azul}
                    borderWidth="3px"
                    boxShadow="none"
                    onPress={() => deletarFoto()}
                  >
                    {carregandoDeletarFoto ? (
                      <ActivityIndicator
                        animating={true}
                        color={Cores.branco}
                      />
                    ) : (
                      <ConteudoBotao
                        width="100%"
                        fontSize="12px"
                        color={Cores.branco}
                      >
                        CONFIRMAR
                      </ConteudoBotao>
                    )}
                  </Botao>
                </CaixaBotoesCancelarConfirmarModalExcluirFoto>
              </CaixaModalDeleteFoto>
              </CaixaExterna>
            </Modal>

            <CaixaInputs width={tamanhoInputs} >
              <CaixaTitulosRotulos>
                <TituloRotulos>Nome:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={usuario.nome}
                keyboardType="default"
                width="100%"
                label="nome"
                onChangeText={(text) => {
                  preenchendoDados("nome", text);
                }}
                value={estado.nome}
              />
              <CaixaTitulosRotulos>
                <TituloRotulos>Telefone:</TituloRotulos>
              </CaixaTitulosRotulos>

              <InputMask
                placeholder={telMasked}
                keyboardType="numeric"
                width="100%"
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                textContentType="telephoneNumber"
                dataDetectorTypes="phoneNumber"
                label="Telefone"
                includeRawValueInChangeText={true}
                erro={erro.telefone}
                onChangeText={(maskedText, rawText) => {
                  preenchendoDados("telefone", rawText);
                }}
              />
              {erro.telefone && (
                <CaixaRotulo>
                  <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
                </CaixaRotulo>
              )}
              <CaixaTitulosRotulos>
                <TituloRotulos>Data de nascimento:</TituloRotulos>
              </CaixaTitulosRotulos>

              <CaixaParaDatadeNascimento
              value={dataPlaceHolder}
              width="100%"
              onPress={() => setDatePicker(true)}
            >
              {Platform.OS === "android" ? (
                <>
                  {data_nascimentoFront}
                  {datePicker && (
                    <Data
                    maximumDate={new Date()}
                    showIcon={false}
                      mode="date"
                      value={date}
                      confirmBtnText="Confirmar"
                      cancelBtnText="Cancelar"
                      onChange={(event, value) => {
                        setDatePicker(false);
                        preenchendoDados(
                          "data_nascimento",
                          formatacaodeData(value)
                        );
                        setDate(value);
                        setdataPlaceHolder(1);
                      }}
                    />
                  )}
                </>
              ) : (
                <Data
                  format="DD/MM/YYYY"
                  maximumDate={new Date()}
                  showIcon={false}
                  mode="date"
                  value={date}
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  onChange={(event, value) => {
                    preenchendoDados(
                      "data_nascimento",
                      formatacaodeData(value)
                    );
                    setDate(value);
                  }}
                />
              )}
            </CaixaParaDatadeNascimento>
              <CaixaTitulosRotulos>
                <TituloRotulos>CPF:</TituloRotulos>
              </CaixaTitulosRotulos>

              <InputMask
                placeholder={cpfMasked}
                keyboardType="default"
                width="100%"
                label="cpf"
                type={"cpf"}
                includeRawValueInChangeText={true}
                erro={erro.cpf}
                onChangeText={(maskedText, rawText) => {
                  preenchendoDados("cpf", rawText);
                }}
              />
              {erro.cpf && (
                <CaixaRotulo>
                  <Rotulo>Digite um CPF no formato xxx.xxx.xxx-xx</Rotulo>
                </CaixaRotulo>
              )}

              {usuario.convenio !== null ? (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Convenio:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder={usuario.convenio}
                    keyboardType="default"
                    width="100%"
                    label="convenio"
                    onChangeText={(text) => {
                      preenchendoDados("convenio", text);
                    }}
                  />
                </>
              ) : (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Convenio:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder="Nome do Convênio:"
                    keyboardType="default"
                    width="100%"
                    label="convenio"
                    onChangeText={(text) => {
                      preenchendoDados("convenio", text);
                    }}
                  />
                </>
              )}

              {usuario.nome_cuidador !== null ? (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Nome Cuidador:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder={usuario.nome_cuidador}
                    keyboardType="default"
                    width="100%"
                    label="nome_cuidador"
                    onChangeText={(text) => {
                      preenchendoDados("nome_cuidador", text);
                    }}
                    value={estado.nome_cuidador}
                  />

                  <CaixaTitulosRotulos>
                    <TituloRotulos>Telefone Cuidador:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <InputMask
                    placeholder={telCuidadorMasked}
                    keyboardType="numeric"
                    width="100%"
                    type={"cel-phone"}
                    options={{
                      maskType: "BRL",
                      withDDD: true,
                      dddMask: "(99) ",
                    }}
                    textContentType="telephoneNumber"
                    dataDetectorTypes="phoneNumber"
                    label="telefone_cuidador"
                    includeRawValueInChangeText={true}
                    erro={erro.telefone_cuidador}
                    onChangeText={(maskedText, rawText) => {
                      preenchendoDados("telefone_cuidador", rawText);
                    }}
                  />
                  {erro.telefone_cuidador && (
                    <CaixaRotulo>
                      <Rotulo>
                        Digite um telefone no formato (xx)xxxxx-xxxx
                      </Rotulo>
                    </CaixaRotulo>
                  )}
                </>
              ) : (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Nome Cuidador:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder="Nome do cuidador:"
                    keyboardType="default"
                    width="100%"
                    label="nome_cuidador"
                    onChangeText={(text) => {
                      preenchendoDados("nome_cuidador", text);
                    }}
                  />

                  <CaixaTitulosRotulos>
                    <TituloRotulos>Telefone Cuidador:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <InputMask
                    placeholder="Telefone do Cuidador:"
                    keyboardType="numeric"
                    width="100%"
                    type={"cel-phone"}
                    options={{
                      maskType: "BRL",
                      withDDD: true,
                      dddMask: "(99) ",
                    }}
                    textContentType="telephoneNumber"
                    dataDetectorTypes="phoneNumber"
                    label="telefone_cuidador"
                    includeRawValueInChangeText={true}
                    erro={erro.telefone_cuidador}
                    onChangeText={(maskedText, rawText) => {
                      preenchendoDados("telefone_cuidador", rawText);
                    }}
                  />
                  {erro.telefone_cuidador && (
                    <CaixaRotulo>
                      <Rotulo>
                        Digite um telefone no formato (xx)xxxxx-xxxx
                      </Rotulo>
                    </CaixaRotulo>
                  )}
                </>
              )}

              <CaixaTitulosRotulos>
                <TituloRotulos>CEP:</TituloRotulos>
              </CaixaTitulosRotulos>

              <InputMask
                placeholder={cep(endereco.cep)}
                keyboardType="default"
                type={"zip-code"}
                width="100%"
                label="CEP"
                includeRawValueInChangeText={true}
                erro={erro.cep}
                onChangeText={(maskedText, rawText) => {
                  preenchendoEndereco("cep", rawText);
                }}
              />
              {erro.cep && (
                <CaixaRotulo>
                  <Rotulo>Digite um CEP no formato xxxxx-xxx</Rotulo>
                </CaixaRotulo>
              )}

              <CaixaTitulosRotulos>
                <TituloRotulos>País:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={endereco.pais}
                keyboardType="default"
                width="100%"
                label="pais"
                onChangeText={(text) => {
                  preenchendoEndereco("pais", text);
                }}
                value={novoEndereco.pais}
              />

              <CaixaTitulosRotulos>
                <TituloRotulos>Estado:</TituloRotulos>
              </CaixaTitulosRotulos>

              <PickerView>
                <SelectList
                  data={ListaEstado}
                  save={"key"}
                  defaultOption={ estadoAtual }
                  setSelected={(val) => {
                  setEstadoSelecionado(val);
                  preenchendoEndereco("estado", val);}}
                  label={estadoAtual.value}
                  boxStyles={borderWidth="0"}
                  searchPlaceholder={ estadoAtual.value }
                  />
              </PickerView>

              <CaixaTitulosRotulos>
                <TituloRotulos>Cidade:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={endereco.cidade}
                keyboardType="default"
                width="100%"
                label="cidade"
                onChangeText={(text) => {
                  preenchendoEndereco("cidade", text);
                }}
                value={novoEndereco.cidade}
              />

              <CaixaTitulosRotulos>
                <TituloRotulos>Bairro:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={endereco.bairro}
                keyboardType="default"
                width="100%"
                label="bairro"
                onChangeText={(text) => {
                  preenchendoEndereco("bairro", text);
                }}
              />
              <CaixaTitulosRotulos>
                <TituloRotulos>Rua:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={endereco.rua}
                keyboardType="default"
                width="100%"
                label="rua"
                onChangeText={(text) => {
                  preenchendoEndereco("rua", text);
                }}
              />
              <CaixaTitulosRotulos>
                <TituloRotulos>Número:</TituloRotulos>
              </CaixaTitulosRotulos>

              <Input
                placeholder={numero}
                value={novoEndereco.numero}
                keyboardType="default"
                width="100%"
                label="numero"
                onChangeText={(text) => {
                  preenchendoEndereco("numero", text);
                }}
              />
              {complemento === null ? (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Complemento:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder="Complemento: "
                    keyboardType="default"
                    width="100%"
                    label="complemento"
                    onChangeText={(text) => {
                      preenchendoEndereco("complemento", text);
                    }}
                  />
                </>
              ) : (
                <>
                  <CaixaTitulosRotulos>
                    <TituloRotulos>Complemento:</TituloRotulos>
                  </CaixaTitulosRotulos>

                  <Input
                    placeholder={complemento}
                    keyboardType="default"
                    width="100%"
                    label="complemento"
                    onChangeText={(text) => {
                      preenchendoEndereco("complemento", text);
                    }}
                  />
                </>
              )}
            </CaixaInputs>

            <CaixaBotoes>
              <Botao
                width="40%"
                height="40px"
                backgroundColor={Cores.branco}
                borderRadius="3px"
                borderColor="rgba(255, 0, 0, 0.25)"
                borderWidth="3px"
                boxShadow="none"
                onPress={() => navigation.navigate("Perfil")}
              >
                <ConteudoBotao
                  width="100%"
                  fontSize={tamanhoFonte}
                  color={Cores.preto}
                >
                  CANCELAR
                </ConteudoBotao>
              </Botao>
              <Botao
                width="40%"
                height="40px"
                backgroundColor={Cores.lilas[1]}
                borderRadius="4px"
                borderColor={Cores.azul}
                borderWidth="3px"
                boxShadow="none"
                onPress={() => atualizarDados()}
              >
                <ConteudoBotao
                  width="100%"
                  fontSize={tamanhoFonte}
                  color={Cores.branco}
                >
                  CONFIRMAR
                </ConteudoBotao>
              </Botao>
            </CaixaBotoes>
          </CaixaAlterarDados>
        </Body>
      )}
    </ScrollView>
  );
}

export default AlterarDados;
