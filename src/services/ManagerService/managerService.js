import * as requesterService from "../RequesterService/requesterService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import requisicaoErro from "../../utils/HttpErros";
import { Alert } from "react-native";
import { sleep } from "../../utils/sleep";

export const requisicaoCriarUsuario = async (estado, endereco) => {
  const dadosEmail = await requesterService.requisicaoDadosUsuario(
    estado.email
  );

  if (dadosEmail.status != 204) {
    sleep(1500);
    Alert.alert("Erro", "E-mail já cadastrado!");
    return;
  }

  const resposta = await requesterService
    .CriarEndereco(endereco)
    .then((res) => {
      return requesterService
        .CriarUsuario(estado, res.data.id)
        .then((res) => {
          return res.data;
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

export const GetTodosUsuarios = async () => {
  let dadosUsuario = {};
  await requesterService
    .requisicaoUsuarios()
    .then((res) => {
      dadosUsuario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosUsuario;
};

export const EnviandoEmail = async (email) => {
  const resposta = await requesterService.requisicaoDadosUsuario(email);
  if (resposta.status === 204) {
    Alert.alert("Erro", "E-mail inexistente!");
    return;
  }

  const enviado = await requesterService
    .recuperarSenha(email)
    .then(() => {
      return true;
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
  return enviado;
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
      Alert.alert("Parabéns!", "Dados alterados com sucesso.");
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

export const GetDadosReceitas = async () => {
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

export const EnviandoFormularioPaciente = async (
  status,
  notificacao_ativa,
  id_formulario,
  id_usuario
) => {
  await requesterService
    .enviarFormularioPaciente(
      status,
      notificacao_ativa,
      id_formulario,
      id_usuario
    )
    .then(() => {})
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
  return;
};
export const GetFormularioEspecifico = async (id) => {
  let dadosFormulario = {};
  await requesterService
    .requisicaoFormularioEspecifico(id)
    .then((res) => {
      dadosFormulario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosFormulario;
};


export const GetFormularios = async () => {
  let dadosFormularios = {};
  await requesterService
    .requisicaoFormularios()
    .then((res) => {
      dadosFormularios = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosFormularios;
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


export const UpdateMensagensVisualizadas = async (id_usuario, id_conversa) => {
  let mensagensAtualizadas = {};
  await requesterService
    .updateMensagensVisualizadas(id_usuario, id_conversa)
    .then((res) => {
      mensagensAtualizadas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return mensagensAtualizadas;
};

export const GetConversasUsuario = async (id_usuario) => {
  let dadosConversas = {};
  await requesterService
    .requisicaoConversasPorUsuario(id_usuario)
    .then((res) => {
      dadosConversas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosConversas;
};

export const CriandoMensagem = async (mensagem) => {
  let dadosMensagemCriada = {};
  await requesterService
    .criarMensagem(mensagem)
    .then((res) => {
      dadosMensagemCriada = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosMensagemCriada;
};

export const GetMensagensPorConversaUsuario = async (
  id_usuario,
  id_conversa
) => {
  let dadosMensagens = {};
  await requesterService
    .requisicaoMensagensPorConversaUsuario(id_usuario, id_conversa)
    .then((res) => {
      dadosMensagens = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosMensagens;
};

export const UpdateMensagemVisualizada = async (id, atualizacoes) => {
  let mensagemAtualizada = {};
  await requesterService
    .updateMensagemVisualizada(id, atualizacoes)
    .then((res) => {
      mensagemAtualizada = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  return mensagemAtualizada;
  
};

export const deletarConversasInativas = async (id_usaurio) => {
  let conversasApagadas = {};
  await requesterService
    .deletarConversasInativas(id_usaurio)
    .then((res) => {
      conversasApagadas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return conversasApagadas;
};

export const UpdateConversaAtiva = async (id) => {
  let dadosConversa = {};
  await requesterService
    .updateConversaAtiva(id)
    .then((res) => {
      dadosConversa = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosConversa;
};
export const GetArquivoPorChave= async (chave) => {
  let arquivo = "";
  await requesterService
    .requisicaoArquivo(chave)
    .then((res) => {
      arquivo = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return arquivo;
  
};

export const PegarExamesMarcadosUsuario = async () => {
  const resposta = await AsyncStorage.getItem("@AirBnbApp:email").then(
    (res) => {
      return requesterService.requisicaoDadosUsuario(res).then((res) => {
        return requesterService
          .requisicaoExamesMarcadosPorId(res.data.id)
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            requisicaoErro(error);
            return;
          });
      });
    }
  );
  return resposta;
};

export const UpdateFotoDePerfil = async (id, file) => {
  await requesterService
    .updateFotoDePerfil(id, file)
    .then(() => {
      Alert.alert("", "Foto atualizada com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(error);
      return;
    });
  return;
};



export const deletarFotoDePerfil = async (id, file) => {
  await requesterService
    .deleteFotoDePerfil(id, file)
    .then(() => {
      Alert.alert("", "Foto deletada com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(error);
      return;
    });
  return;
};

export const CriandoConversa = async (
  conversa
) => {
  let dadosConversaCriada = {};
  await requesterService
    .criarConversa(conversa)
    .then((res) => {
      return (dadosConversaCriada = res.data);
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosConversaCriada;
};

export const enviarArquivoMensagem = async (file) => {
  let id;
  await requesterService
    .enviarArquivoMensagem(file)
    .then((res) => {
      Alert.alert("", "Arquivo PDF enviado com sucesso");
      id = res.data;
      
    })
    .catch((error) => {
      requisicaoErro(error);
      return;
    });
  return id;
};

export const enviarImagemMensagem = async (imagem) => {
  let id;
  await requesterService
    .enviarImagemMensagem(imagem)
    .then((res) => {
      Alert.alert("", "Imagem enviada com sucesso");
      id = res.data;
      
    })
    .catch((error) => {
      requisicaoErro(error);
      return;
    });
  return id;
};
