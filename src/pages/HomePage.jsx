import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Controls from "../components/Controls";
import List from "../components/List";
import { ALL_COUNTRIES } from "../config";

const HomePage = ({ countries, setCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const navigate = useNavigate();

  const handleSearch = (search, region) => {
    let data = [...countries];
    if (region) {
      data = data.filter((c) => c.region.includes(region));
    }

    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCountries(data);
  };

  useEffect(
    () => {
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [countries]);

  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map((country) => {
          const countryInfo = {
            img: country.flags.png,
            name: country.name,
            info: [
              {
                title: "Population",
                description: country.population.toLocaleString(),
              },
              {
                title: "Region",
                description: country.region,
              },
              {
                title: "Capital",
                description: country.capital,
              },
            ],
          };
          return (
            <Card
              key={country.name}
              onClick={() => navigate(`/country/${country.name}`)}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};

export default HomePage;
