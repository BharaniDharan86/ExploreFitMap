import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/map"
            element={
              <AppProvider>
                <Map />
              </AppProvider>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        containerStyle={{
          margin: "9px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
        }}
      />
    </div>
  );
};

export default App;
