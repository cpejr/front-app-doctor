import * as requesterService from "../RequesterService/requesterService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import requisicaoErro from "../../utils/HttpErros";

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

export const GetFormulariosPaciente = async () => {
  let formulariosPaciente;
  const email = await AsyncStorage.getItem("@AirBnbApp:email");
  const id_usuario = await GetDadosUsuario(email)
    .then((res) => {
      return res.dadosUsuario.id;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  await requesterService
    .requisicaoFormulariosPaciente(id_usuario)
    .then((res) => {
      formulariosPaciente = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return formulariosPaciente;
};

// export const GetFormulariosPaciente = async () => {
//   let formulariosPaciente;
//   let id_usuario;
//   await AsyncStorage.getItem("@AirBnbApp:email")
//     .then((email) => {
//       GetDadosUsuario(email)
//         .then((res) => {
//           id_usuario = res.dadosUsuario.id;
//           requesterService
//             .requisicaoFormulariosPaciente(id_usuario)
//             .then((res) => {
//               formulariosPaciente = res.data;
//             })
//             .catch((error) => {
//               requisicaoErro(error);
//             });
//         })
//         .catch((error) => {
//           requisicaoErro(error);
//         });
//     })
//     .catch((error) => {
//       requisicaoErro(error);
//     });
//     return formulariosPaciente;
// };




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
export const requisicaoVerificarSenha = async (senha) => {
  const resposta = await AsyncStorage.getItem("@AirBnbApp:email")
    .then((res) => {
      return requesterService.verificarSenha(res, senha);
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return resposta;
};
export const requisicaoAlterarSenha = async (senha) => {
  const resposta = await AsyncStorage.getItem("@AirBnbApp:email").then(
    (res) => {
      return GetDadosUsuario(res)
        .then((res) => {
          return requesterService.alterarSenha(res.dadosUsuario.id, senha);
        })
        .catch((error) => {
          requisicaoErro(error);
        });
    }
  );
  return resposta.data;
};
