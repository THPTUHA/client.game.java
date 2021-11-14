import styled from "styled-components";
const Input = styled.input`
  border: 2px solid ${(props) => props.theme.main};
  background-color: ${(props) => props.theme.bg};
`;

// const theme = {
//   main: "mediumseagreen",
//   bg: "white",
// };
export default Input;
