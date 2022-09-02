import styled from "styled-components";
import { Container } from "./Container";
import { IoMoon, IoMoonSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: var(--colors-ui-base);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

const Title = styled(NavLink).attrs({
  to: "/",
})`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  text-decoration: none;
  font-weight: var(--fw-bold);
`;

const ModeSwitcher = styled.div`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  text-transform: capitalize;
  cursor: pointer;
`;

export default function Header() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <HeaderEl>
        <Container>
          <Wrapper>
            <Title>All my world</Title>
            <ModeSwitcher onClick={toggleTheme}>
              {theme === "light" ? (
                <IoMoonSharp size="14px" />
              ) : (
                <IoMoon size="14px" />
              )}{" "}
              <span style={{ marginLeft: "0.70rem" }}>{theme} Theme</span>
            </ModeSwitcher>
          </Wrapper>
        </Container>
      </HeaderEl>
    </div>
  );
}
