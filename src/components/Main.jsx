import styled from "styled-components";
import { Container } from "./Container";

const Wrapper = styled.main`
  padding: 2rem 0;
  @media (min-width: 767px) {
    pad: 4rem 0;
  }
`;

export default function Main({ children }) {
  return (
    <div>
      <Wrapper>
        <Container>{children}</Container>
      </Wrapper>
    </div>
  );
}
