/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../../styles/Button.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

const Providers = () => {
  const [selectedOption, setSelectedOption] = useState("serviceProviders");
  const [providerData, setproviderData] = useState();
  const [providerrequestData, setproviderrequestData] = useState();

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/provider", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setproviderData(data);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/not_active_provider",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      setproviderrequestData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/delete_provider/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`Provider with id: ${id} deleted!`);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/delete_car_Prov/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`All Cars Of Provider with id: ${id} deleted!`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/delete_provider/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`Provider with id: ${id} Not accepted!`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/accept_provider/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`Provider with id: ${id} Accepted!`);
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
              value="serviceProviders"
              checked={selectedOption === "serviceProviders"}
              onChange={handleRadioChange}
            />
            <span className="name">Service Providers</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="joiningRequests"
              checked={selectedOption === "joiningRequests"}
              onChange={handleRadioChange}
            />
            <span className="name">Joining Requests</span>
          </label>
        </div>
      </div>

      {selectedOption === "serviceProviders" ? (
        <section className="intro">
          <div
            className="bg-image h-100"
            style={{ backgroundColor: "#f5f7fa" }}
          >
            <div className="mask d-flex align-items-center h-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 p-0">
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
                              </tr>
                            </thead>
                            <tbody>
                              {providerData?.map((provider) => (
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      {provider.provider_id}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="ms-3">
                                        <p className="fw-bold mb-1">
                                          {provider.username}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="fw-normal mb-1">
                                      {provider.email}
                                    </p>
                                  </td>

                                  <td>{provider.phone}</td>
                                  <td>{provider.address}</td>
                                  <td>
                                    <i
                                      onClick={() =>
                                        handleDelete(provider.provider_id)
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
      ) : selectedOption === "joiningRequests" ? (
        <section className="intro">
          <div
            className="bg-image h-100"
            style={{ backgroundColor: "#f5f7fa" }}
          >
            <div className="mask d-flex align-items-center h-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 p-0">
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
                                <th scope="col">Request Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {providerrequestData?.map((provider) => (
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      {provider.provider_id}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="ms-3">
                                        <p className="fw-bold mb-1">
                                          {provider.username}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="fw-normal mb-1">
                                      {provider.email}
                                    </p>
                                  </td>

                                  <td>{provider.phone}</td>
                                  <td>{provider.address}</td>

                                  <td className="d-flex">
                                    <button
                                      onClick={() =>
                                        handleReject(provider.provider_id)
                                      }
                                      className="btn btn-danger"
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <i className="ri-close-line"></i>
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleAccept(provider.provider_id)
                                      }
                                      className="btn btn-success"
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginLeft: "1rem",
                                      }}
                                    >
                                      <i className="ri-check-line"></i>
                                    </button>
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
      ) : selectedOption === "ProviderHistory" ? (
        <table
          className="table align-middle mb-0 bg-white"
          style={{ marginTop: "2rem" }}
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
              <td>Jordan , Zarqa</td>
            </tr>
            <hr />
          </tbody>
        </table>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default Providers;
