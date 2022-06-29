import * as requesterService from "../RequesterService/requesterService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import requisicaoErro from "../../utils/HttpErros";

export const requisicaoLogin = async (email, senha) => {
  await requesterService
    .LoginUsuario(email, senha)
    .then((res) => {
      AsyncStorage.setItem("@AirBnbApp:token", res.data.token);
      AsyncStorage.setItem("@AirBnbApp:email", res.data.email);
    })
    .catch((error) => {
      setEmail(null);
      setSenha(null);
      requisicaoErro(error);
    });
};

export const GetDadosUsuario = async () => {
  const email = await AsyncStorage.getItem("@AirBnbApp:email");
  let dadosUsuario = {};
  let dadosEndereco = {};

  await requesterService
    .requisicaoDadosUsuario(email)
    .then((res) => {
      dadosUsuario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  await requesterService
    .requisicaoDadosEndereco(dadosUsuario)
    .then((res) => {
      dadosEndereco = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return { dadosEndereco, dadosUsuario };
};

export const UpdateDadosUsuario = async (
  id_usuario,
  id_endereco,
  endereco,
  estado
) => {
  await requesterService
    .updateDadosUsuario(id_usuario, id_endereco, endereco, estado)
    .then(() => {
      alert("Usuário atualizado com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });

  return false;
};

export const requisicaoAlterarSenha = async (senha) => {
  const resposta = await AsyncStorage.getItem("@AirBnbApp:email").then(
    (res) => {
      return GetDadosUsuario(res)
        .then((res) => {
          return requesterService.alterarSenha(res.dadosUsuario.id, senha);
        })
        .catch((error) => {
        });
          requisicaoErro(error);
    }
  );
  return resposta.data;
};