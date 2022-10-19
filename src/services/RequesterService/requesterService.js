import api from "../../services/api";

export const CriarEndereco = (endereco) => api.post("/enderecos", endereco);

export const CriarUsuario = (estado, id_endereco) =>
  api.post("/usuarios", { ...estado, id_endereco: id_endereco });

export const requisicaoDadosUsuario = (emailUrl) =>
  api.get(`/usuarios/${emailUrl}`);

export const requisicaoUsuarios = () => api.get(`/usuarios/`);

export const requisicaoDadosEndereco = (dadosUsuario) =>
  api.get(`/enderecos/${dadosUsuario.id_endereco}`);

export const requisicaoDadosReceita = (dadosUsuario) =>
  api.get(`/usuarios_receitas/${dadosUsuario.id}`);

export const requisicaoFormulariosPaciente = (id_usuario) =>
  api.get(`/formularios_pacientes_usuario/${id_usuario}`);

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

export const recuperarSenha = (email) => api.put(`/alterar_senha/${email}`);

export const deletarEnderecoEUsuario = (id_endereco) =>
  api.delete(`/enderecos/${id_endereco}`);

export const requisicaoFormularioPacienteEspecifico = (id) =>
  api.get(`/formularios_pacientes/${id}`);

export const updateRespostasFormularioPaciente = (id, respostas) =>
  api.put(`/formularios_pacientes/${id}`, {
    respostas: respostas,
    status: true,
  });

export const enviarFormularioPaciente = (
  status,
  notificacao_ativa,
  id_formulario,
  id_usuario
) =>
  api.post("/formularios_pacientes", {
    status,
    notificacao_ativa,
    id_formulario,
    id_usuario,
  });

export const requisicaoFormularioEspecifico = (id) =>
  api.get(`/formularios/${id}`);

export const requisicaoFormularios = () => api.get(`/formularios/`);
