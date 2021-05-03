import React, {useState} from 'react';
import axios from "axios";
import LoginPage from "../components/Auth/Login";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState()

  const login = async () => {
    const data = await axios.post('http://localhost:5000/api/auth/login', {
      email, password
    }, {withCredentials: true})
    console.log(data.data)
    setMessage(data.data)
  }

  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Login;
