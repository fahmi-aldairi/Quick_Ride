/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/about.css";

const FindCarForm = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedEnergyType, setSelectedEnergyType] = useState("");
  const [carsArray, setCarsArray] = useState([]);
  const [uniqueModels, setUniqueModels] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [uniqueEnergyTypes, setUniqueEnergyTypes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars`)
      .then((response) => {
        const carsData = response.data;
        setCarsArray(carsData);

        const models = [...new Set(carsData.map((car) => car.model))];
        setUniqueModels(models);

        const types = [...new Set(carsData.map((car) => car.type))];
        setUniqueTypes(types);

        const energyTypes = [
          ...new Set(carsData.map((car) => car.energy_type)),
        ];
        setUniqueEnergyTypes(energyTypes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleEnergyTypeChange = (event) => {
    setSelectedEnergyType(event.target.value);
  };

  return (
    <div className="amrofahmizaroasmabushraomariyad">
      <div className="text-center pt-5">
        <h4>Find Your Car Here</h4>
      </div>
      <Form className="form">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="select__group">
            <select onChange={handleBrandChange} value={selectedBrand}>
              <option value="SB">Select Brand</option>
              {uniqueModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup className="select__group">
            <select onChange={handleTypeChange} value={selectedType}>
              <option value="ST">Select Type</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup className="select__group">
            <select
              onChange={handleEnergyTypeChange}
              value={selectedEnergyType}
            >
              <option value="SET">Energy Type</option>
              {uniqueEnergyTypes.map((energyType) => (
                <option key={energyType} value={energyType}>
                  {energyType}
                </option>
              ))}
            </select>
          </FormGroup>
        </div>
        <div className="d-flex justify-content-end pt-5">
          <FormGroup className="form__group">
            <Link
              to={`/cars?brand=${selectedBrand}&type=${selectedType}&energyType=${selectedEnergyType}&price=${selectedPrice}`}
            >
              <button className="btn find__car-btn">Find Car</button>
            </Link>
          </FormGroup>
        </div>
      </Form>
    </div>
  );
};

export default FindCarForm;
