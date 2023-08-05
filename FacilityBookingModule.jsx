import React, {useState, useRef} from 'react';
import {useNavigate} from "react-router-dom"
import ToasterUi from 'toaster-ui';
import "./FacilityBookingModule.css"

function FacilityBookingModule({ onSubmit }) {

  let facility = useRef();
  const toaster = new ToasterUi();
  const [facilityNaming, setFacilityName] = useState("");
  // let navigate = useNavigate();

  let func = (e) => {
    e.preventDefault();
  
    const facilityName = facility.current.value;
  
    if (!facilityName) {
      toaster.addToast("Please select a facility to add.");
      return;
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({ name: facilityName });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(fetch("http://localhost:8080/api/bookings/facilities", requestOptions));
  
    fetch("http://localhost:8080/api/bookings/facilities", requestOptions)
      .then(response => {
        console.log(response);
        console.log(response.status);
  
        if (!response.ok) {
          throw new Error("Facility addition failed.");
        }
  
        // return response.json();
        return response.text();
      })
      .then(result => {
        console.log(result);
        toaster.addToast("Facility added successfully, you can book now");
        onSubmit({ status: 'ok', name: facilityName });
        console.log(facilityName);
      })
      .catch(error => {
        console.log('error', error);
        toaster.addToast("Facility addition failed. Please try again later.");
      });
  };

  const handleNameChange = (e) => {
    setFacilityName(e.target.value);
    console.log(facilityNaming);
  };
  
  return (
    <section className="centerdiv">
      <section className="block">
      <div className='content'>
      <form action="" onSubmit={func}>
        <div className="availableFacility">
          <label htmlFor="Booking">Select the facility to Book</label>
          <select name="name" id="Booking" ref={facility} onChange={handleNameChange}>
            <option value="" selected disabled>Book the Facility</option>
            <option value="Clubhouse">Book clubhouse</option>
            <option value="Tennis Court">Book TennisCourt</option>
          </select>
        </div>
        <div className="submit">
          <button>Add Facility</button>
        </div>
      </form>
    </div>
    </section>
    </section>
  )
}

export default FacilityBookingModule;