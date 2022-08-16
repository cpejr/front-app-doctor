import styled from "styled-components/native";

export const ViewPadrao = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: ${(props) => props.maxHeight??"100%"};
  margin-bottom: 5%;
  border-style: solid;
  border-radius: 6px;
  border: #151b57;
  border-width: 2px;
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  padding-top: ${(props) => props.paddingTop??"6%"};
  padding-bottom: ${(props) => props.paddingBottom??"1%"};
`;

export default ViewPadrao;
