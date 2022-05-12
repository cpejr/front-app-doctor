import * as requesterService from "../RequesterService/requesterService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetDadosUsuario = async (emailUrl) => {
  let dadosUsuario = {};
  let dadosEndereco = {};

  await requesterService
    .requisicaoDadosUsuario(emailUrl)
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

export const requisicaoConsultasUsuario = async () => {
  const resposta = await AsyncStorage.getItem("@AirBnbApp:email").then(
    (res) => {
      return requesterService.requisicaoDadosUsuario(res).then((res) => {
        return requesterService
          .getConsultasUsuario(res.data.id)
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            requisicaoErro(error);
            return false;
          });
      });
    }
  );
  return resposta;
};
