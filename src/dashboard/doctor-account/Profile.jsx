import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import uploadCloundinary from './../../utils/uploadCloundinary.js';
import { BASE_URL, token } from '../../config.js';
import { toast } from 'react-toastify';

const Profile = ({ doctorData }) => {
  const [FormData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    gender: '',
    specialization: '',
    ticketPrice: 0,
    // qualification: [
    //   { startingDate: '', endingDate: '', degree: '', university: '' },
    // ],
    qualifications: [],
    // experiences: [
    //   { startingDate: '', endingDate: '', position: '', hospital: '' },
    // ],
    experiences: [],
    // timeSlots: [{ day: '', startingTime: '', endingTime: '' }],
    timeSlots: [],

    about: '',
    phtoto: null,
  });
  const handleInputChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/doctor/${doctorData._id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(FormData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadCloundinary(file);

    setFormData({ ...FormData, photo: data?.url });
  };

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };
  const addQualification = (e) => {
    e.preventDefault();
    addItem('qualifications', {
      startingDate: '',
      endingDate: '',
      degree: 'PHD',
      university: 'Dhaka Medical College',
    });
  };
  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc('qualifications', index, event);
  };
  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem('qualifications', index);
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem('experiences', {
      startingDate: '',
      endingDate: '',
      position: 'Senior',
      hospital: 'India',
    });
  };
  const handleExperinceChange = (event, index) => {
    handleReusableInputChangeFunc('experiences', index, event);
  };
  const deleteExperiences = (e, index) => {
    e.preventDefault();
    deleteItem('experiences', index);
  };
  const addTimeSlots = (e) => {
    e.preventDefault();

    addItem('timeSlots', {
      day: 'Sunday',
      startingTime: '10:00',
      endingTime: '04:30',
    });
  };
  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc('timeSlots', index, event);
  };
  const deletetimeSlots = (e, index) => {
    e.preventDefault();
    deleteItem('timeSlots', index);
  };
  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,

      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      phtoto: doctorData?.photo,
    });
  }, [doctorData]);

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={FormData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email**</p>
          <input
            type="email"
            name="email"
            value={FormData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone**</p>
          <input
            type="number"
            name="phone"
            value={FormData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio**</p>
          <input
            type="text"
            name="bio"
            value={FormData.bio}
            onChange={handleInputChange}
            placeholder="bio"
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                value={FormData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">SELECT</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="Other">OTHER</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <select
                name="specialization"
                value={FormData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">SELECT</option>
                <option value="ms">M.S</option>
                <option value="md">M.D</option>
                <option value="dhms">D.H.M.S</option>
              </select>
            </div>

            <div>
              <p className="form__label">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={FormData.ticketPrice}
                className="form__input"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-5">
            <p className="form__label">Qualification</p>
            {FormData.qualifications?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <p className="form__label">Degree*</p>
                      <input
                        type="text"
                        name="degree"
                        value={item.degree}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">University*</p>
                      <input
                        type="text"
                        name="university"
                        value={item.university}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteQualification(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addQualification}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Qualification
            </button>
          </div>
          <div className="mb-5">
            <p className="form__label">Experiences*</p>
            {FormData.experiences?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date*</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) => handleExperinceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Ending Date*</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleExperinceChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <p className="form__label">Position*</p>
                      <input
                        type="text"
                        name="position"
                        value={item.position}
                        className="form__input"
                        onChange={(e) => handleExperinceChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Hospital*</p>
                      <input
                        type="text"
                        name="hospital"
                        value={item.hospital}
                        className="form__input"
                        onChange={(e) => handleExperinceChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteExperiences(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Experiences
            </button>
          </div>
          <div className="mb-5">
            <p className="form__label">Time Slots*</p>
            {FormData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                    <div>
                      <p className="form__label">Day*</p>
                      <select
                        name="day"
                        value={item.day}
                        onChange={(e) => handleTimeSlotChange(e, index)}
                        className="form__input py-3.5"
                        id=""
                      >
                        <option value="">SELECT</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                      </select>
                    </div>
                    <div>
                      <p className="form__label">Starting Time*</p>
                      <input
                        type="time"
                        name="startingDate"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                        value={item.startingTime}
                        className="form__input"
                      />
                    </div>

                    <div>
                      <p className="form__label">Ending Time*</p>
                      <input
                        type="time"
                        name="endingDate"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                        value={item.endingTime}
                        className="form__input"
                      />
                    </div>

                    <div
                      onClick={(e) => deletetimeSlots(e, index)}
                      className="flex items-center"
                    >
                      <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-10 mb-[30px] cursor-pointer">
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addTimeSlots}
              className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer "
            >
              Add TimeSlot
            </button>
          </div>
          <div className="mb-5">
            <p className="form__label">About*</p>
            <textarea
              name="about"
              value={FormData.about}
              placeholder="Write About You"
              onChange={handleInputChange}
              id=""
              rows="5"
              className="form__input"
            ></textarea>
          </div>
          <div className="mb-5 flex items-center gap-3">
            {FormData.photo && (
              <figure
                className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColo:
flex items-center justify-center"
              >
                <img
                  src={FormData.photo}
                  alt=""
                  className="w-full rounded-full"
                />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
              >
                Upload Photo
              </label>
            </div>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
