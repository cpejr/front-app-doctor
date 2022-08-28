import * as requesterService from "../RequesterService/requesterService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import requisicaoErro from "../../utils/HttpErros";
import { Alert } from "react-native";

export const requisicaoCriarUsuario = async (estado, endereco) => {
  const resposta = await requesterService
    .CriarEndereco(endereco)
    .then((res) => {
      return requesterService
        .CriarUsuario(estado, res.data.id)
        .then((res) => {
          return true;
        })
        .catch((error) => {
          requisicaoErro(error);
          return false;
        });
    });
  return resposta;
};

export const requisicaoLogin = async (email, senha) => {
  const resposta = await requesterService
    .LoginUsuario(email, senha)
    .then((res) => {
      AsyncStorage.setItem("@AirBnbApp:token", res.data.token);
      AsyncStorage.setItem("@AirBnbApp:email", res.data.email);
      return true;
    })
    .catch((error) => {
      Alert.alert("Erro", "Digite email e senha válidos!");
      return false;
    });
  return resposta;
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
            // requisicaoErro(error);
            return;
          });
      });
    }
  );
  return resposta;
};

export const requisicaoConsultorioById = async (id) => {
  const resposta = await requesterService
    .getConsultorioById(id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return resposta;
};

export const requisicaoVerificarSenha = async (senha) => {
  const resposta = await AsyncStorage.getItem("@AirBnbApp:email")
    .then((res) => {
      return requesterService.verificarSenha(res, senha);
    })
    .catch((error) => {
      Alert.alert("ATENÇÃO", "As senhas não conferem");
    });
  return resposta;
};

export const requisicaoEnderecoById = async (id) => {
  const resposta = await requesterService
    .getEnderecoById(id)
    .then((res) => {
      return res.data;
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
        .catch((error) => {});
    }
  );
  return resposta.data;
};

export const DeletarUsuario = async (id) => {
  await requesterService
    .deletarUsuario(id)
    .then(() => {
      Alert.alert("", "Usuario deletado com sucesso!");
    })
    .catch((error) => {
      //requisicaoErro(error);
      Alert.alert("", "Erro ao deletar usuario.");
      return false;
    });

  return false;
};


export const GetDadosReceitas= async () => {
  const email = await AsyncStorage.getItem("@AirBnbApp:email");
  let dadosUsuario = {};
  
  let dadosReceitas = {};
  
  await requesterService
    .requisicaoDadosUsuario(email)
    .then((res) => {
      dadosUsuario = res.data;
      
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  await requesterService
    .requisicaoDadosReceita(dadosUsuario)
    .then((res) => {
      dadosReceitas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return { dadosReceitas, dadosUsuario };
};

export const GetFormularioPacienteEspecifico = async (id) => {
  let dadosFormulario = {};
  await requesterService
    .requisicaoFormularioPacienteEspecifico(id)
    .then((res) => {
      dadosFormulario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosFormulario;
};

export const UpdateRespostasFormulario = async (id, respostas) => {
  await requesterService
    .updateRespostasFormularioPaciente(id, respostas)
    .then(() => {
      Alert.alert("", "Respostas enviadas com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(error);
    });
};


export const DeletarEnderecoEUsuario = async (id_endereco) => {
  await requesterService
    .deletarEnderecoEUsuario(id_endereco)
    .then(() => {
      Alert.alert("", "Usuario deletado com sucesso!");
      AsyncStorage.removeItem("@AirBnbApp:token");
      AsyncStorage.removeItem("@AirBnbApp:email");
    })
    .catch((error) => {
      //requisicaoErro(error);
      Alert.alert("", "Erro ao deletar usuario.");
      return false;
    });

  return false;
};
