import api from "../../services/api";

export const CriarEndereco = (endereco) =>
  api.post("/enderecos", endereco);

export const CriarUsuario = (estado, id_endereco) =>
  api.post("/usuarios", { ...estado, id_endereco: id_endereco });

export const requisicaoDadosUsuario = (emailUrl) =>
  api.get(`/usuarios/${emailUrl}`);

export const requisicaoDadosEndereco = (dadosUsuario) =>
  api.get(`/enderecos/${dadosUsuario.id_endereco}`);

  export const requisicaoDadosReceita = (dadosUsuario) =>
  api.get(`/usuarios_receitas/${dadosUsuario.id}`);

export const updateDadosUsuario = (id_usuario, id_endereco, endereco, estado) =>
  api.put(`/enderecos/${id_endereco}`, endereco).then((res) => {
    api.put(`/usuarios/${id_usuario}`, { ...estado, id_endereco: res.data.id });
  });
export const LoginUsuario = (email, senha) =>
  api.post("/login", {
    email,
    senha,
  });


export const getConsultasUsuario = (id) => api.get(`/consultas/${id}`);

export const getConsultorioById = (id) => api.get(`/consultorios/${id}`);

export const getEnderecoById = (id) => api.get(`/enderecos/${id}`);


export const verificarSenha = (email, senha) =>
  api.post("/verificar", {
    email,
    senha,
  });
export const alterarSenha = (id, senha) =>
  api.put(`/usuarios/${id}`, { senha: senha });

export const deletarUsuario = (id) => api.delete(`/usuarios/${id}`);
