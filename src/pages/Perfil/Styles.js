import styled from "styled-components/native";
import { Cores } from "../../variaveis";


export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Cores.branco};
  padding-left: ${(props) => props.paddingLeft};;
  padding-right: ${(props) => props.paddingRight};
`;

export const CaixaBotao = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8%;
  margin-top: 6%;
`;

export const ConteudoBotaoPerfil = styled.Text`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:  ${(props) => props.fontSize};
  font-weight: 700;
  color: #0a0e3c;
`;

export const CaixaViews = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ViewFotoNome = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  background-color: ${Cores.cinza[9]};
  border: 2px solid ${Cores.cinza[6]};
  border-radius: 4px;
  padding-top: 30px;
  padding-bottom: 5px;
  margin-bottom: 5%;
`;

export const Foto = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  background-color: green;
`;

export const Nome = styled.Text`
  margin-bottom: 20px;
  font-size: ${(props) => props.fontSize};
  color: ${Cores.azul};
  font-weight: 700;
`;

export const CaixaDataCpf = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 90%;
  align-items: center;
`;

export const CaixaNascidoData = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 50px;
`;

export const TextNascido = styled.Text`
  color: ${Cores.azul};
  margin-bottom: 15px;
  font-weight: normal;
  margin-bottom: 1px;
  font-size:${(props) => props.fontSize};
`;

export const TextData = styled.Text`
  color:${Cores.azul};
  margin-bottom: 15px;
  font-weight: normal;
  font-size: ${(props) => props.fontSize};
`;

export const ViewContatoEndereco = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-left: 8%;
  width:  ${(props) => props.width};
  background-color: ${Cores.cinza[9]};
  border: 2px solid ${Cores.cinza[6]};
  border-radius: 4px;
  padding-top: 25px;
  padding-bottom: 5px;
  margin-bottom: 5%;
`;

export const Titulo = styled.Text`
  margin-bottom: 20px;
  font-size: ${(props) => props.fontSize};
  color: ${Cores.azul};
  font-weight: 700;
`;

export const Dados = styled.Text`
  color: ${Cores.azul};
  margin-bottom: 15px;
  font-weight: normal;
  font-size: ${(props) => props.fontSize};
`;

export const CaixaBotoesAlterar = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-bottom: 2%;
`;

export const CaixaBotoesExcluirESair = styled.View`

  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: center;
  padding-right: 3%;
  padding-left: 3%;
  margin-bottom: 8%;
  margin-right: 1.5%;

`;


export const ExcluirConta = styled.Text`
  color: ${Cores.azul};
  text-decoration: underline;
  font-size:15px
`;

export const Sair = styled.Text`
  text-decoration: underline;
  font-size:15px;
  color: ${Cores.azul};
  
`;

export const AnimacaoCarregando = styled.View`
  position: relative;
  left: 42.5%;
  top: 0%;
  height: 35px;
`;

export const AnimacaoCarregandoViewNome = styled.View`
  position: relative;
  top: 0%;
  height: 35px;
`;


export const ScrollViewBranco = styled.ScrollView`
  background-color: ${Cores.branco};
`;

