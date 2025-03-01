import React, { useState, useEffect } from "react";

const pharmacies = [
  { name: "NOVA CARE Colombo Pharmacy", address: "123 Main Street, Colombo", lat: 6.9271, lon: 79.8612},
  { name: "NOVA CARE Gampaha Pharmacy", address: "456 Main Street, Gampaha", lat: 7.0915, lon: 80.0000 },
  { name: "NOVA CARE Negombo", address: "789 Main Avenue, Negombo", lat: 7.2095, lon: 79.8356 },
  { name: "NOVA CARE Galle", address: "101 St Street, Galle", lat: 6.0325, lon: 80.2170 },
  { name: "NOVA CARE Kalutara", address: "202 Cedar Road, Kalutara", lat: 6.5833, lon: 79.9607 }
];

// Haversine formula to calculate distance (in km) between two latitude/longitude points
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const PharmacyList = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedPharmacies, setSortedPharmacies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });

          // Calculate distances and sort pharmacies
          const sorted = pharmacies
            .map(pharmacy => ({
              ...pharmacy,
              distance: getDistance(latitude, longitude, pharmacy.lat, pharmacy.lon)
            }))
            .sort((a, b) => a.distance - b.distance);

          setSortedPharmacies(sorted);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError("Unable to fetch your location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif",  height: "525px"}}>


      {/* Error Handling */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Near to Me Section */}
      {userLocation && sortedPharmacies.length > 0 ? (
        <div style={{ backgroundColor: "#198754", color: "white", padding: "10px", borderRadius: "5px", marginBottom: "20px"  , marginTop: "45px"}}>
          <h2>Near to Me</h2>
          <p>{sortedPharmacies[0].name} - {sortedPharmacies[0].address} ({sortedPharmacies[0].distance.toFixed(2)} km)</p>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}

      {/* List of Other Pharmacies */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {sortedPharmacies.slice(1).map((pharmacy, index) => (
          <div key={index} style={{ backgroundColor: "white", padding: "15px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "5px" }}>
            <h3 style={{ marginBottom: "5px", color: "#198754" }}>{pharmacy.name}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>{pharmacy.address}</p>
            <p style={{ fontSize: "14px", color: "#888" }}>Distance: {pharmacy.distance.toFixed(2)} km</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyList;
