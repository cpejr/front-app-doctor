import api from "../../services/api";

export const requisicaoDadosUsuario = (emailUrl) =>
  api.get(`/usuarios/${emailUrl}`);

export const requisicaoDadosEndereco = (dadosUsuario) =>
  api.get(`/enderecos/${dadosUsuario.id_endereco}`);

export const updateDadosUsuario = (id_usuario, id_endereco, endereco, estado) =>
  api.put(`/enderecos/${id_endereco}`, endereco).then((res) => {
    api.put(`/usuarios/${id_usuario}`, { ...estado, id_endereco: res.data.id });
  });


export const getConsultasUsuario = (id) => api.get(`/consultasusuario/${id}`);

export const getConsultorioById = (id) => api.get(`/consultorios/${id}`);

export const getEnderecoById = (id) => api.get(`/enderecos/${id}`);

export const verificarSenha = (email, senha) =>
  api.post("/verificar", {
    email,
    senha,
  });
export const alterarSenha = (id, senha) =>
  api.put(`/usuarios/${id}`, { senha: senha });

