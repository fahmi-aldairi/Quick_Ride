/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import "../../styles/table.css";

function Admins() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [adminData, setadminData] = useState();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [password, setpassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:5000/admin",
        {
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        fetchData();
        toast.success(`${email} is added as a new admin!`);
        handleClose;
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/delete_admin/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`Admin with id: ${id} deleted!`);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      console.log(data);
      setadminData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-5">
      <button
        className="btn rounded-lg px-4 py-2 mt-5 ms-3"
        style={{ backgroundColor: "#ef621c" }}
        onClick={handleShow}
      >
        <b className="text-white">
          <i className="ri-add-line">Add Admin</i>
        </b>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Data Of New Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Admin@2"
                autoFocus
                onChange={(event) => setname(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(event) => setemail(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                autoFocus
                onChange={(event) => setpassword(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="0799999999"
                autoFocus
                onChange={(event) => setphone(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zarqa , Jordan"
                autoFocus
                onChange={(event) => setaddress(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <section className="intro">
        <div className="bg-image h-100">
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
                            </tr>
                          </thead>
                          <tbody>
                            {adminData?.map((admin) => (
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    {admin.admin_id}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                      <p className="fw-bold mb-1">
                                        {admin.username}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1">
                                    {admin.email}
                                  </p>
                                </td>

                                <td>{admin.phone}</td>
                                <td>{admin.address}</td>
                                <td>
                                  <i
                                    onClick={() => handleDelete(admin.admin_id)}
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

      <ToastContainer />
    </div>
  );
}

export default Admins;
