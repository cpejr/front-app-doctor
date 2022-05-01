import styled from "styled-components/native";

export const ViewPadrao = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  margin-bottom: 5%;
  border-style: solid;
  border-radius: 6px;
  border: #151b57;
  border-width: 2px;
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: 20px;
  padding-bottom: 1%;
  background-color: ${(props) => props.backgroundColor};
`;

export default ViewPadrao;
