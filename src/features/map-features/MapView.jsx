/* eslint-disable react/prop-types */
const style = {
  backgroundColor: "red",
  borderRadius: "8px",
  padding: "10px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
};
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

const MapView = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { workOut } = useAppContext();
  const { setFormOpen } = useAppContext();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    async function getUserPosition() {
      try {
        const position = await getUserLocation();
        console.log(position);
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

  if (isLoading) return <Loader />;
  return (
    <div className="w-full  ">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "100vh",
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
              <Popup className={style}>{work.notes}</Popup>
            </Marker>
          );
        })}

        <MapCenter pos={position} />
        <DetectClick setFormOpen={setFormOpen} />
      </MapContainer>
    </div>
  );
};

function DetectClick({ setFormOpen }) {
  const navigate = useNavigate();
  useMapEvent({
    click(e) {
      navigate(`?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      setFormOpen(true);
    },
  });
}

function MapCenter({ pos }) {
  const map = useMap();
  map.setView([pos[0], pos[1]]);
  return null;
}

export default MapView;
