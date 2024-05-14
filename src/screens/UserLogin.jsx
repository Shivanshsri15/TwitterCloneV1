import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "../assets/twitterLogo.png";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { useLoginMutation, useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [registerMode, setRegisterMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  // const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    userInfo ? navigate("/home") : navigate("/login");
  }, []);
  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        firstName,
        surname,
        email,
        password,
        age,
      }).unwrap();
      toast.success("User registered successfully");
      dispatch(setCredentials({ ...res }));
      setFirstName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setAge("");
      setRegisterMode(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User Login successfully");
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundColor: "black",
        backgroundPosition: "center",
      }}
    >
      <Row className="bg-black ">
        <Col
          md={6}
          className="p-5 d-flex justify-content-center align-items-center "
        >
          <Image
            src={logo}
            style={{ filter: "invert(1)", height: "20rem" }}
            fluid
            responsive
          ></Image>
        </Col>

        <Col md={6} className="text-white p-5 ">
          <h1
            className="my-3 font-weight-bold  text-light"
            style={{ fontSize: "64px" }}
          >
            Happening now
          </h1>
          <h3 className="font-weight-bold">Join today.</h3>

          <Form
            onSubmit={registerMode ? registerSubmitHandler : loginSubmitHandler}
          >
            {registerMode ? (
              <Row>
                <Form.Group controlId="firstName" as={Col} md="4">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter firstname"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="surName" as={Col} md="4">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Enter surname"
                  ></Form.Control>
                </Form.Group>
              </Row>
            ) : (
              <></>
            )}

            <Form.Group className="my-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className=" text-light">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-light">
                Your data is safe in your hands.
              </Form.Text>
            </Form.Group>
            {registerMode ? (
              <Form.Group as={Col} md="3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  value={age}
                  name="age"
                  placeholder="Enter your age"
                  onChange={(e) => setAge(e.target.value)}
                ></Form.Control>
              </Form.Group>
            ) : (
              <></>
            )}
            {registerMode ? (
              <p>
                Already a user?
                <span
                  className="text-primary customcss"
                  onClick={() => setRegisterMode(!registerMode)}
                >
                  {" "}
                  Login
                </span>
              </p>
            ) : (
              <p>
                New to this platform?..
                <span
                  className="text-primary link-hover customcss"
                  onClick={() => setRegisterMode(!registerMode)}
                >
                  Register
                </span>
              </p>
            )}

            <Button
              variant="outline-primary px-4"
              type="submit"
              className="my-3"
            >
              Submit
            </Button>
            {registerLoading && <Loader />}
            {loginLoading && <Loader />}
          </Form>
        </Col>

        <Footer />
      </Row>
    </div>
  );
};
export default UserLogin;
