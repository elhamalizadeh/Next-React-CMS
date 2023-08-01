import { toast } from 'react-toastify';
import { useState } from "react";

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword ,setConfirmPassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(name === '' || email==='' || password==='' || confirmPassword===''){
            toast.error("please fill all fields");
            return;
        }
        console.log(name, email , password , confirmPassword)
    }
  return (
    <div className="container">
      <div className="row">
        <h3>Register Form</h3>
        <div className="col-md-6">
        <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="name"
                onChange = {e=>setName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="email" className="col-sm-3 col-form-label">
              Email
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="email"
                onChange = {e=>setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
              Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                onChange = {e=>setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">
              ConfirmPassword
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                onChange = {e=>setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
