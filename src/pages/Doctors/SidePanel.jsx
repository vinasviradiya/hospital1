import React, { useContext } from 'react';
import convertTime from '../../utils/convertTime';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import { authContext } from '../../context/AuthContext';

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  console.log(doctorId);
  const { user } = useContext(authContext);
  console.log(user._id);
  const userId = user._id;
  const bookinghandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout/session/${doctorId}/${userId}`,
        {
          method: 'POST',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message + 'Please try again');
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 Otext-headingColor font-bold">
          {ticketPrice} BDT
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{' '}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={bookinghandler}
        className="btn px-2 w-full rounded-md text-white"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
