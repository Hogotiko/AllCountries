import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/Button";
import Info from "../components/info";
import { searchByCountry } from "../config";

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack />
        Back
      </Button>
      {country && <Info {...country} navigate={navigate} />}
    </div>
  );
};

export default Details;
