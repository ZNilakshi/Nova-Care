import React from "react";

const doctors = [
  {
    id: 1,
    name: "Dr Venkata Rao Abbineni",
    experience: "40 years",
    specialty: "Internal Medicine",
    degree: "MBBS, MD",
    languages: "English, Telugu",
    location: "Apollo Health City Jubilee Hills",
    image: "https://via.placeholder.com/150",
    schedule: "Mon - Sat",
    time: "13:00 - 15:00",
  },
  {
    id: 2,
    name: "Dr Rajib Paul",
    experience: "20 years",
    specialty: "Internal Medicine",
    degree: "MBBS; MD (General Medicine)",
    languages: "English, Hindi, Telugu",
    location: "Apollo Health City Jubilee Hills",
    image: "https://via.placeholder.com/150",
    schedule: "Mon - Sat",
    time: "12:30 - 14:15",
  },
];

const DoctorCard = ({ doctor }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex items-center gap-4">
      <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-lg" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{doctor.name}</h3>
        <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
          {doctor.experience}, {doctor.specialty}
        </span>
        <p className="text-sm text-gray-700">{doctor.degree}</p>
        <p className="text-sm text-gray-700">Language: {doctor.languages}</p>
        <p className="text-sm text-gray-700">📍 {doctor.location}</p>
      </div>
      <div className="text-center">
        <p className="text-blue-600 font-bold">{doctor.schedule}</p>
        <p className="text-gray-700">({doctor.time})</p>
        <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded">
          BOOK AN APPOINTMENT
        </button>
      </div>
    </div>
  );
};

const Filters = () => {
  return (
    <div className="w-1/4 p-4 border rounded-lg shadow-md">
      <h2 className="font-semibold text-lg">Filters</h2>
      <select className="w-full p-2 mt-2 border rounded">
        <option>City</option>
      </select>
      <select className="w-full p-2 mt-2 border rounded">
        <option>Speciality</option>
      </select>
      <select className="w-full p-2 mt-2 border rounded">
        <option>Language</option>
      </select>
      <select className="w-full p-2 mt-2 border rounded">
        <option>Gender</option>
      </select>
      <button className="mt-4 text-blue-600 underline">Clear Filters</button>
    </div>
  );
};

const AppointmentPage = () => {
  return (
    <div className="flex gap-6 p-6">
      <Filters />
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold">Best Doctors in India</h1>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentPage;