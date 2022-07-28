import styled from "styled-components/native";


export const Body = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  background-color: #ffffff;
`;

export const CaixaView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 5%;
  border-style: solid;
  border-radius: 6px;
  border: #151b57;
  border-width: 2px;
  padding-top: 4%;
  padding-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 5%;
`;
export const CaixaTitulo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const Titulo = styled.Text`
  color: #000000;
  font-size: ${(props) => props.fontSize};
`;
export const CaixaInputs = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10%;
`;
export const CaixaBotao = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 5%;
  justify-content: space-between;
`;

export const Rotulo = styled.View`
  width: 100%;
  height: 20px;
  margin-bottom: 20px;
`;

export const TextoRotulo = styled.Text`
  font-weight: 400;
  font-size: 15px;
  color: red;
`;

export const InputNovaSenha = styled.TextInput`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding-left: 10px;
  margin-top: 6px;
  margin-bottom: 6px;
  border: #151b57;
  border-width: 1.5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  border-color: ${(props) => {
    let cor;
      if((props.novaSenha).length > 0 && (props.novaSenha).length < 8){
        cor = "red";
      } else {
        cor = "blue";
      }
    return cor;
  }};
`;



export const InputConfirmacaoNovaSenha = styled.TextInput`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  padding-left: 10px;
  margin-top: 6px;
  margin-bottom: 6px;
  border: #151b57;
  border-width: 1.5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  font-size: 15px;
  border-color: ${(props) => {
    let cor;
      if((props.confirmarNovaSenha).length > 0 && (props.confirmarNovaSenha).length < 8){
        cor = "red";
      } else {
        cor = "blue";
      }
    return cor;
  }};
`;
