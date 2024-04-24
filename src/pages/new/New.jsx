import "./new.scss";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { updateUserDetail } from "../../features/userSlice";
import axiosInstance from "../../services/axiosConfig";

const New = ({ title }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [message,SetMessage] = useState("")
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    Address1: "",
    Address2: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to update Redux state
    dispatch(updateUserDetail(inputs));

    const datawrite = async() => {
      const response = await axiosInstance.post('/accounts/RegisterUserAPI/',inputs)
      console.log(response.data)
      SetMessage("Added User Successfully!")


    }
    ;
    datawrite()
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  value={inputs.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={inputs.last_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={inputs.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Address 1:</label>
                <input
                  type="text"
                  name="Address1"
                  value={inputs.Address1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Address 2:</label>
                <input
                  type="text"
                  name="Address2"
                  value={inputs.Address2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={inputs.pincode}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit">Send</button>
              {message && <div>{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
