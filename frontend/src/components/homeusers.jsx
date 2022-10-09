import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import UserForm from "./user-form";

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const getData = async () => {
      getUsers();
    };
    getData();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (id) => {
    try {
      await axios.patch(`${API_URL}/users/${id}`, {
        is_complete: true,
      });
      await getUsers();
    } catch (err) {
      console.log("epic fail", err);
    }
  };

  const handleNewUser = async (user) => {
    try {
      console.log("User: ", user);
      await axios.post(`${API_URL}/users`, user);
      await getUsers();
      setModalOpen(false);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h1">Users</CardTitle>
          <ListGroup>
            {users.map((user) => {
              return (
                <ListGroupItem
                  title="Click this to complete."
                  key={user._id}
                  action
                  tag="a"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => handleClick(user._id)}
                        value="foobar"
                        defaultChecked={user.is_complete}
                      />
                    </div>
                    <h5>{user.title}</h5>
                    <small>Due: {user.due_date}</small>
                  </div>
                  <p className="mb-1">{user.description}</p>
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <Button onClick={() => setModalOpen(true)} color="primary">
            Add User
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={modalOpen}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Add new User
        </ModalHeader>
        <ModalBody>
          <UserForm saveUser={handleNewUser} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Home;
