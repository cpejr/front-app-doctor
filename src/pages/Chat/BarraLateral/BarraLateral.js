import React from "react";
import { Text, View } from "react-native";
import {
  BarraPesquisa,
  Body,
  InputPesquisa,
  IconPesquisa,
  HeaderChat,
} from "./Styles";
import searchIcon from "../../../assets/searchIcon.png";
import { useState } from "react";
import { ScrollView } from "react-native";
import * as managerService from "../../../services/ManagerService/managerService";
import Botao from "../../../styles/Botao";
import ConteudoBotao from "../../../styles/ConteudoBotao";
import { Cores } from "../../../variaveis";

function BarraLateral() {
  const [busca, setBusca] = useState("");
  const lowerBusca = busca.toLowerCase();
  const onChangeBusca = (busca) => setBusca(busca);
  /*  const {
    usuarioId,
    conversas,
    setConversas,
    conversaSelecionada,
    setMensagens,
  } = useContext(ChatContext); */
  const componenteEstaMontadoRef = useRef(null);

  useEffect(() => {
    componenteEstaMontadoRef.current = true;

    async function getConversas() {
      setCarregandoConversas(true);

      await managerService.deletarConversasInativas(usuarioId);
      const resposta = await managerService.GetConversasUsuario(usuarioId);

      if (componenteEstaMontadoRef.current) {
        setConversas(resposta);
        setCarregandoConversas(false);
      }
    }

    getConversas();

    return () => (componenteEstaMontadoRef.current = false);
  }, []);

  return (
    <Body>
      <BarraPesquisa>
        <InputPesquisa
          placeholder="Pesquisar no chat"
          onChangeText={onChangeBusca}
          value={busca}
        />
        <IconPesquisa source={searchIcon} />
      </BarraPesquisa>
      <ScrollView></ScrollView>
      <Botao
        height="40px"
        width="70%"
        backgroundColor={Cores.azul}
        borderRadius="10px"
        borderWidth="1px"
        borderColor={Cores.azul}
      >
        <ConteudoBotao fontSize="15px" color={Cores.branco} width="100%">
          Iniciar Nova Conversa
        </ConteudoBotao>
      </Botao>
    </Body>
  );
}

export default BarraLateral;
