import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const LiveMap = () => {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default India
  const [loading, setLoading] = useState(true);

  // Custom marker icon
  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported");
      setLoading(false);
    }
  }, []);

  return (
    <div className="h-[400px] w-full rounded-xl shadow-lg">
      {loading ? (
        <p>Fetching location...</p>
      ) : (
        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={markerIcon}>
            <Popup>
              🌾 You are here <br /> Latitude: {position[0]} <br /> Longitude: {position[1]}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default LiveMap;
