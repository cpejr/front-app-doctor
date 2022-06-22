import api from "../../services/api";

export const requisicaoDadosUsuario = (emailUrl) =>
  api.get(`/usuarios/${emailUrl}`);

export const requisicaoDadosEndereco = (dadosUsuario) =>
  api.get(`/enderecos/${dadosUsuario.id_endereco}`);

export const requisicaoFormulariosPaciente = (id_usuario) =>
  api.get(`/formularios_pacientesusuario/${id_usuario}`);

export const updateDadosUsuario = (id_usuario, id_endereco, endereco, estado) =>
  api.put(`/enderecos/${id_endereco}`, endereco).then((res) => {
    api.put(`/usuarios/${id_usuario}`, { ...estado, id_endereco: res.data.id });
  });

export const verificarSenha = (email, senha) =>
  api.post("/verificar", {
    email,
    senha,
  });
export const alterarSenha = (id, senha) =>
  api.put(`/usuarios/${id}`, { senha: senha });
