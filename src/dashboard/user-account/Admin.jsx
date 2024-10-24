import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'; // Import the CSS file for styles
import { authContext } from '../../context/AuthContext';

import { Navigate, useNavigate } from 'react-router-dom';
const Admin = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorss, setDoctorss] = useState([]);
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch all approved doctors
    const fetchApprovedDoctors = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/doctors/approved'
        );
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching approved doctors:', error);
      }
    };
    fetchApprovedDoctors();
  }, []);

  useEffect(() => {
    // Fetch all pending doctors
    const fetchPendingDoctors = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/doctors/pending'
        );
        setDoctorss(response.data);
      } catch (error) {
        console.error('Error fetching pending doctors:', error);
      }
    };
    fetchPendingDoctors();
  }, []);

  const approveDoctor = async (doctorId) => {
    try {
      await axios.patch(`http://localhost:5000/doctors/${doctorId}/approve`);
      alert('Doctor approved successfully!');
      // Update the pending doctors list after approval
      setDoctorss(doctorss.filter((doctor) => doctor._id !== doctorId));
    } catch (error) {
      console.error('Error approving doctor:', error);
    }
  };
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <h1 style={{ fontSize: '25px' }}>
        <b>Approved Doctors</b>
      </h1>
      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <div className="doctor-card" key={doctor._id}>
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="doctor-photo"
            />
            <p className="doctor-name">{doctor.name}</p>
            <p className="doctor-specialization">{doctor.specialization}</p>
            <p className="doctor-price">Ticket Price: ${doctor.ticketPrice}</p>
          </div>
        ))}
      </div>

      <h1 style={{ fontSize: '25px' }}>
        <b>Approve Doctors</b>
      </h1>
      <div className="doctor-grid">
        {doctorss.map((doctor) => (
          <div className="doctor-card" key={doctor._id}>
            <p className="doctor-name">{doctor.name}</p>
            <p className="doctor-specialization">{doctor.specialization}</p>
            <button
              className="approve-button"
              onClick={() => approveDoctor(doctor._id)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <button
        style={{
          color: 'white',
          backgroundColor: 'red',
          height: '45px',
          width: '85px',
          borderRadius: '24px',
        }}
        onClick={handleLogout}
      >
        Logout{' '}
      </button>
    </div>
  );
};

export default Admin;
