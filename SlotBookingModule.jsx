import React from 'react'
import { useRef } from "react"
import ToasterUi from 'toaster-ui';
import "./SlotBookingModule.css"

function SlotBookingModule() {

    let name = useRef();
    let date = useRef();
    let starttime = useRef();
    let endtime = useRef();
    const toaster = new ToasterUi();


    let func = (e) => {
        e.preventDefault();

        const facilityName = name.current.value;
        const facilityBookingDate = date.current.value;
        const facilityBookingStartTime = starttime.current.value;
        const facilityBookingEndTime = endtime.current.value;

        if (!facilityName || !facilityBookingDate || !facilityBookingStartTime || !facilityBookingEndTime ) {
            toaster.addToast("Please add the fields properly");
            return;
          }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "facility": {
            "name": facilityName
        },
          "date": facilityBookingDate,
          "startTime": facilityBookingStartTime,
          "endTime": facilityBookingEndTime
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        console.log(fetch("http://localhost:8080/api/bookings", requestOptions));

        fetch("http://localhost:8080/api/bookings", requestOptions)
          .then(response => {
            console.log(response);
            console.log(response.status);
            
            if (!response.ok) {
                throw new Error("Booking failed.");
              }

              return response.text();
          })
          .then(result => {
            console.log(result);
            toaster.addToast("slot booked successfully");
          })
          .catch(error => {
            console.log('error', error);
            toaster.addToast("slot booking failed, try again");
          });


        }

  return (
    <div className='booking_block'>
        <div className="booking_content">
          <p className='slotBooking'>Slot Booking Module</p>
        <form action="" onSubmit={func}>
        <div className="name">
          <label htmlFor="" className='name'>Name:</label>
        <select name="name" id="Booking" ref={name}>
            <option value="" selected disabled>Book the Facility</option>
            <option value="Clubhouse">Book clubhouse</option>
            <option value="Tennis Court">Book TennisCourt</option>
          </select>
        </div>
        <div className="date">
            <label htmlFor="" className='date'>Date: </label>
            <input type="date" ref={date} />
        </div>
        <div className="name">
            <label htmlFor="" className='startTime'>StartTime: </label>
            <input type="time" ref={starttime} />
        </div>
        <div className="name">
            <label htmlFor="" className='endTime'>EndTime: </label>
            <input type="time" ref={endtime} />
        </div>
        <button>Book the slot</button>
        </form>
        </div>
    </div>
  )
}

export default SlotBookingModule;