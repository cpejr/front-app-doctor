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

export const requisicaoArquivo = (chave) => api.get(`/arquivo/${chave}`);

export const requisicaoExamesMarcadosPorId = (id) => api.get(`/exame_marcados/${id}`);

export const requisicaoTodosExames = () => api.get(`/exames/`);

export const requisicaoExameEspecifico = (id) =>
  api.get(`/exames/${id}`);


export const updateFotoDePerfil = (id, base64) =>
  api.post(`/usuariosimagem/${id}`, {
    file: base64
  });

export const deleteFotoDePerfil = (id, base64) =>
  api.put(`/usuariosdeletarimagem/${id}`, {
    file: base64
  });
export const updateMensagensVisualizadas = (id_usuario, id_conversa) =>
  api.put(`/mensagems/${id_conversa}/visualizadas/${id_usuario}`);

export const requisicaoConversasPorUsuario = (id_usuario) =>
  api.get(`/conversas/${id_usuario}/usuario`);

export const requisicaoMensagensPorConversaUsuario = (
  id_usuario,
  id_conversa
) => api.get(`/mensagems/${id_conversa}/conversa/${id_usuario}`);

export const updateMensagemVisualizada = (id, atualizacoes) =>
  api.put(`/mensagems/${id}`, atualizacoes);

export const criarMensagem = (mensagem) => api.post(`/mensagems`, mensagem);

export const updateConversaAtiva = (id) => api.put(`/conversas/ativacao/${id}`);

export const deletarConversasInativas = (id_usuario) =>
  api.delete(`/conversas/${id_usuario}/usuario`);

export const criarConversa = (conversa) => api.post(`/conversas`, conversa);

export const enviarArquivoMensagem = (base64) =>
  api.post(`/arquivofile/`, {
    file: base64
  });

export const requisicaoHome = () => api.get(`/homes/`);

export const requisicaoImagemCarrossel = () => api.get(`/imagem_carrossels/`);

export const pegandoDescricaoPagRecomendacoes = () => api.get(`/indicacaos`);

export const pegandoIndicacoesEspecificas = () => api.get(`/indicacoes_especificas`);

export const medicosIndicadosPorId = (id) => api.get(`/medicos_indicados/${id}`);

export const tokenDispositivo = (id_usuario, token_dispositivo) =>
  api.post("/token_usuarios", {
    id_usuario,
    token_dispositivo,
  });

export const getPdfurl = (id) => api.get(`/receitas/${id}`);
export const enviarImagemMensagem = (imagem) =>
  api.post(`/arquivoimage/`, {
    file: imagem
  })

export const enviarMensagemFinalizarExame = (id_usuario, telefone, endereco) =>
  api.post(`/conversas_whatsapp/finalizar_exame`, {
    id_usuario,
    telefone, 
    endereco
  });


  export const LogouttokenDispositivo = (token_dispositivo) =>
  api.delete(`/token_usuarios`, {
    data:{
      'token_dispositivo': `${token_dispositivo}`
    },
  });
  
  export const getSobremim = () => api.get(`/sobremims`);