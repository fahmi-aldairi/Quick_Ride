import "../../styles/dashboard.css";
import SingleCard from "../../components/Dashboard/reuseable/SingleCard";
import axios from 'axios'

import CarStatsChart from "../../charts/CarStatsChart";

import UsersChart from "../../charts/UsersChart";
import { useEffect, useState } from "react";


const Dashboard = () => {
  const [userCount, setuserCount] = useState()
  const [providerCount, setproviderCount] = useState()
  const [carsCount, setcarsCount] = useState()
  const [carsRentedCount, setcarsRentedCount] = useState()
  console.log(localStorage.getItem("token"))

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users_count", {
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = response.data;
      setuserCount(data);

    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get("http://localhost:5000/provider_count", {
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = response.data;
      setproviderCount(data);

    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get("http://localhost:5000/cars_count", {
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = response.data;
      setcarsCount(data);

    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get("http://localhost:5000/rented_cars_count", {
        headers: {
          'authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = response.data;
      setcarsRentedCount(data);

    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    fetchData()
  }, [])

  const clientObj1 = {
    title: "Costumers",
    totalNumber: userCount,
    icon: "ri-user-line",
  };

  const clientObj2 = {
    title: "Service Provider",
    totalNumber: providerCount,
    icon: "ri-user-line",
  };
  const carObj = {
    title: "Total Cars",
    totalNumber: carsCount,
    icon: "ri-car-line",
  };

  const RentedObj = {
    title: "Cars Rented",
    totalNumber: carsRentedCount,
    icon: "ri-car-line",
  };
  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={clientObj1} />
          <SingleCard item={clientObj2} />
          <SingleCard item={carObj} />
          <SingleCard item={RentedObj} />
        </div>

        <div className="statics">
          <div className="stats">
            <h3 className="stats__title">Users Statistics</h3>
            <UsersChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Car Statistics</h3>
            <CarStatsChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;