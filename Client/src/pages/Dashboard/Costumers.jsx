/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

function Customers() {
  const [selectedOption, setSelectedOption] = useState("Customers");
  const [usersData, setusersData] = useState();

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/delete_user/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`User with id: ${id} deleted!`);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/update_car_available/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`availablitiy_returned`);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setusersData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <div
          className="radio-inputs"
          style={{
            marginTop: "5rem",
            marginBottom: "2rem",
            marginLeft: "0.8rem",
            width: "fit-content",
            columnGap: "2rem",
            backgroundColor: "#ef621c",
          }}
        >
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="Customers"
              checked={selectedOption === "Customers"}
              onChange={handleRadioChange}
            />
            <span className="name">Customers</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="CustomersHistory"
              checked={selectedOption === "CustomersHistory"}
              onChange={handleRadioChange}
            />
            <span className="name">Customers History</span>
          </label>
        </div>
      </div>
      {selectedOption === "Customers" ? (
        <section class="intro">
          <div
            className="bg-image h-100"
            style={{ backgroundColor: "#f5f7fa" }}
          >
            <div className="mask d-flex align-items-center h-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="card cardT">
                      <div className="card-body p-0">
                        <div
                          className="table-responsive table-scroll"
                          data-mdb-perfect-scrollbar="true"
                          style={{ position: "relative", height: "700px" }}
                        >
                          <table className="table table-striped mb-0">
                            <thead style={{ backgroundColor: "#002d72" }}>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {usersData?.map((user) => (
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      {user.customers_id}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="ms-3">
                                        <p className="fw-bold mb-1">
                                          {user.username}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="fw-normal mb-1">
                                      {user.email}
                                    </p>
                                  </td>

                                  <td>{user.phone}</td>
                                  <td>{user.address}</td>
                                  <td>
                                    <i
                                      onClick={() =>
                                        handleDelete(user.customers_id)
                                      }
                                      className="ri-delete-bin-line"
                                      style={{ fontSize: "20px", color: "red" }}
                                    ></i>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <table
          className="table align-middle mb-0 bg-white"
          style={{ marginTop: "5rem" }}
        >
          <thead className="bg-light">
            <tr>
              <th>ID</th>
              <th>Move Type</th>
              <th>Car ID</th>
              <th>Action Date</th>
              <th>Movement ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex align-items-center">1</div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">John Doe</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">email@gmail.com</p>
              </td>
              <td>0777777777</td>
              <td>Amman, Jordan</td>
            </tr>
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
}

export default Customers;
