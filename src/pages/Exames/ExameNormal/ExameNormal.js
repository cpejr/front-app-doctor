import React from "react";
import { Text, View, Button, ScrollView } from "react-native";
import {
    Body,
    CaixaTextoCima,
    Titulo,
    CaixaContato,
    CaixaFaleConosco,
    TextoCaixa,
    TextoCaixaContato,
  } from "./Styles";

function ExameNormal({ navigation }) {
  return (
        <Body>
            <CaixaTextoCima><Titulo>Marcar Exame</Titulo></CaixaTextoCima>
            <CaixaContato>
                <TextoCaixaContato>Entre em contato conosco pelo Whatsapp para marcarmos o seu exame:</TextoCaixaContato>
                <CaixaFaleConosco>
                    <TextoCaixa>FALE CONOSCO(falta seta voltar)</TextoCaixa>
                </CaixaFaleConosco>
            </CaixaContato>   
        </Body>
  );
}

export default ExameNormal;