import api from "../../services/api";

export const requisicaoDadosUsuario = (emailUrl) =>
  api.get(`/usuarios/${emailUrl}`);

export const requisicaoDadosEndereco = (dadosUsuario) =>
  api.get(`/enderecos/${dadosUsuario.id_endereco}`);

export const requisicaoVerificar = (email, senha) =>
  api.post("/verificar", {
    email,
    senha,
  });