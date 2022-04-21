import * as requesterService from "../RequesterService/requesterService";

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
        window.location.href = "/web/perfil";
      })
      .catch((error) => {
        requisicaoErro(error, () => (window.location.href = "/web/editarperfil"));
        return false;
      });
  
    return false;
  };