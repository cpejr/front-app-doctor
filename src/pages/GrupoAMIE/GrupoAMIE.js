import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import logoAmie from "./../../assets/logoAmie.jpg";
import medicosAmie from "./../../assets/medicosAmie.webp";
import * as managerService from "../../services/ManagerService/managerService";
import {
  Body,
  CaixaSeta,
  CaixaDescricao,
  Descricao,
  Container,
  ImagemLogo,
  ImagemMedicos,
} from "./Styles";

function GrupoAMIE() {
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();
  const tamanhoIcone = width > 480 ? 55 : 55;
  const WidthImagemMedicos = width > height ? 450 : 280;
  const HeightImagemMedicos = width > height ? 350 : 180;
  const WidthImagemLogo = width > height ? 300 : 250;
  const HeightImagemLogo = width > height ? 200 : 150;
  const larguraBotoesMaior = width < 600 ? "60%" : "50%";
  const larguraBotoes = width < 330 ? "60%" : larguraBotoesMaior;

  const [amies, setAmies] = useState([]);
  const [fotoDePerfil, setFotoDePerfil] = useState("");

  async function getAmies(){
    const resposta = await managerService.GetDadosAmie();
    setAmies(resposta);
    setandoFotoDePerfil(amies.imagem_um)
    console.log("teste: ", resposta);
  }

  useEffect(() => {
    getAmies();
  }, []);

  async function setandoFotoDePerfil() {
    const chave = amies.imagem_um;
    if (chave === null || chave === "" || chave === undefined){
      await sleep(1500);
      return false;
    }

    const arquivo = await managerService.GetArquivoPorChave(chave);
    setFotoDePerfil(arquivo);
    await sleep(1500);
  }

  useEffect(() => {
    setandoFotoDePerfil();
  }, [amies.imagem_um]);


  return (
    <Container>
      <CaixaSeta>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={tamanhoIcone}
            /* color={Cores.azul} */ color="green"
          />
        </TouchableOpacity>
      </CaixaSeta>
      <ScrollView>
        
        <Body>

        <ImagemLogo 
          width={WidthImagemLogo}
          height={HeightImagemLogo}source={logoAmie}>       
        </ImagemLogo>

        {amies?.map((value) => (
          <>
            <CaixaDescricao>
              <Descricao> {value.texto}</Descricao>
            </CaixaDescricao>
            <ImagemMedicos 
              width={WidthImagemMedicos}
              height={HeightImagemMedicos}
              source={fotoDePerfil}>
            </ImagemMedicos>
          {/*
          <CaixaDescricao>
            <Descricao>
              O grupo de Avaliação e Manejo Integrado das Epilepsias (AMIE) foi
              idealizado e fundado pelos Neurologistas e Neurofisiologistas
              Clínicos Dr. Guilherme Marques e Dra. Izabela Feitosa, e pelo
              Neurocirurgião Dr. Pedro Henrique, com o propósito de prestar
              assistência médica de excelência para as pessoas com epilepsia em
              Belo Horizonte e região metropolitana.
            </Descricao>
          </CaixaDescricao>
          <ImagemMedicos 
          width={WidthImagemMedicos}
          height={HeightImagemMedicos}
          source={medicosAmie}></ImagemMedicos> */}
          </>))}
        </Body>
      </ScrollView>
    </Container>
  );
}

export default GrupoAMIE;
