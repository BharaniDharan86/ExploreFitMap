/* eslint-disable react/prop-types */
import { HiBars4 } from "react-icons/hi2";

import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { getUserLocation } from "../../utils/getUserLocation";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { getSearchCity } from "../../services/searchApi";

const position = {
  london: {
    lat: 0,
    lng: 0,
  },
  mumbai: {
    lat: 1,
    lng: 2,
  },
  chennai: {
    lat: 2,
    lng: 3,
  },
};

const MapView = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { workOut } = useAppContext();
  const { setFormOpen, setSideBarOpen, sideBarOpen, cacheData, setCacheData } =
    useAppContext();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  async function handleSearch(e, city) {
    e.preventDefault();
    setIsLoading(true);

    if (cacheData[searchQuery]) {
      setPosition([cacheData[searchQuery].lat, cacheData[searchQuery].lng]);
      setIsLoading(false);
      return;
    }
    const data = await getSearchCity(city);

    const position = data[0];
    setPosition([position.latitude, position.longitude]);
    setCacheData((data) => {
      return {
        ...data,
        [searchQuery]: {
          lat: position.latitude,
          lng: position.longitude,
        },
      };
    });
    setIsLoading(false);
    setSearchQuery("");
  }

  useEffect(() => {
    async function getUserPosition() {
      try {
        const position = await getUserLocation();
        setPosition([position.latitude, position.longitude]);
      } catch (err) {
        toast.error("Failed to get your location");
        setPosition([51.505, -0.09]);
      } finally {
        setIsLoading(false);
      }
    }

    getUserPosition();
  }, []);

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <div>
      <nav className="flex justify-between items-center">
        <HiBars4
          className="text-green-500 text-[32px] ml-4 cursor-pointer hover:text-green-300 transition-all"
          onClick={() => setSideBarOpen((curr) => !curr)}
        />
        <form
          onSubmit={(e) => handleSearch(e, searchQuery)}
          className="flex items-center justify-end"
        >
          <input
            type="text"
            placeholder="Search for city"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="submit"
            value="Search"
            className="btn bg-green-500 text-stone-100 capitalize font-sans m-3 disabled:bg-green-300 disabled:text-white"
            disabled={!searchQuery}
          />
        </form>
      </nav>
      <div
        className={`w-full ${
          sideBarOpen ? "h-[30vh]" : "h-[90vh]"
        } overflow-hidden`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {workOut.map((work) => {
              return (
                <Marker
                  key={work.id}
                  position={[work.position.latitude, work.position.longitude]}
                >
                  <Popup>{work.notes}</Popup>
                </Marker>
              );
            })}

            <MapCenter pos={position} />
            <DetectClick
              setFormOpen={setFormOpen}
              setSideBarOpen={setSideBarOpen}
            />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

function DetectClick({ setFormOpen, setSideBarOpen }) {
  const navigate = useNavigate();
  useMapEvent({
    click(e) {
      navigate(`?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      setFormOpen(true);
      setSideBarOpen((val) => !val);
    },
  });
}

function MapCenter({ pos }) {
  const map = useMap();
  map.setView([pos[0], pos[1]]);
  return null;
}

export default MapView;
