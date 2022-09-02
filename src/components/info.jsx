import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { filterByCode } from "../config";

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 1.5rem 0;
  font-weight: var(--fw-normal);
`;

const ListGgroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.8rem;
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5rem;
  cursor: pointer;
`;

const Info = (props) => {
  const {
    name,
    nativeName,
    flag,
    capital,
    population,
    region,
    subregion,
    topLevelDomain,
    currencies = [],
    languages = [],
    borders = [],
    navigate,
  } = props;

  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    if (borders.length) {
      const getData = async () => {
        await axios
          .get(filterByCode(borders))
          .then(({ data }) => setNeighbors(data.map((c) => c.name)))
          .catch((err) => {
            console.log(err);
          });
      };
      getData();
    }
  }, [borders]);

  return (
    <Wrapper>
      <InfoImage src={flag} alt={name} />
      <div>
        <InfoTitle>{name}</InfoTitle>
        <ListGgroup>
          <List>
            <ListItem>
              <b>Native name : </b>
              {nativeName}
            </ListItem>
            <ListItem>
              <b>Population : </b>
              {population}
            </ListItem>
            <ListItem>
              <b>Region : </b>
              {region}
            </ListItem>
            <ListItem>
              <b>Sub Region : </b>
              {subregion}
            </ListItem>
            <ListItem>
              <b>Capital : </b>
              {capital}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domain : </b>
              {topLevelDomain.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Currency : </b>
              {currencies.map((cur) => (
                <span key={cur.code}>
                  {cur.name} - ({cur.symbol})
                </span>
              ))}
            </ListItem>
            <ListItem>
              <b>Languages : </b>
              {languages.map((l) => (
                <span key={l.name}>{l.name}</span>
              ))}
            </ListItem>
          </List>
        </ListGgroup>
        <Meta>
          <b>Border Countries : </b>
          {!borders.length ? (
            <span>There is no border countries</span>
          ) : (
            <TagGroup>
              {neighbors.map((b) => (
                <Tag key={b} onClick={() => navigate(`/country/${b}`)}>
                  {" "}
                  {b}{" "}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};

export default Info;
