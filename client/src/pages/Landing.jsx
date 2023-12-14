import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            MrFritz's Job <span>Tracking</span> App{" "}
          </h1>
          <p>
            This is simulated Job Tracking App called Jobify. It is from a UDEMY
            course taught by a great instructor called John Smilga. It is a{" "}
            <a
              href="https://www.udemy.com/course/mern-stack-course-mongodb-express-react-and-nodejs/"
              target="_blank"
            >
              MERN{" "}
            </a>{" "}
            course where you create a Full Stack Application built from Scratch
            with React Router 6.4+, React Query, Mongoose 7+, Cloudinary, Axios.
            This version is strictly for education, learning and practice.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
