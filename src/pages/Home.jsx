import { NavLink } from "react-router-dom";
import banner from "../images/banner1.png";
const Home = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Discover a seamless workout tracking experience with interactive
            maps. Effortlessly find and log your workouts using a user-friendly
            interface. Elevate your fitness journey today!"
          </p>
          <NavLink
            to="/map"
            className="btn btn-primary bg-green-600 border-none text-white text-md hover:bg-green-400"
          >
            Start Tracking
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
