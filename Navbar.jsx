import React, {useState} from 'react'
import Logo from "./images/AddaLogo.png"
import "./navbar.css"
import FacilityBookingModule from './FacilityBookingModule'
import SlotBookingModule from "./SlotBookingModule"

function Navbar() {

    const [showBooking, setShowBooking] = useState(false);
    const [showSlotBooking, setShowSlotBooking] = useState(false);

    const handleBookSlotClick = () => {
        setShowBooking(true);
      };

      const handleFacilityBookingSubmit = (response) => {
        console.log(typeof(response.status));
        if (response.status === 'ok') {
          setShowBooking(false);
          setShowSlotBooking(true);
        }
      };

  return (
    <section className='BackgroundImage'>
        <section className='NavBar'>
        <section className='navbar_background'>
        <div className='navbar_flex'>
        <div className="navleft">
            <img src={Logo} height={30} alt="" />
        </div>
        <div className="navright">
            <div className="flex_nav">
                <p className='flex_phone'>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAS1JREFUSEtjZBggwDhA9jLgtfjbC2kLZgYGp3//GdlIcSATI8Mttrf8axi1r/7CpQ+nxT+fy9T9Z2BoJMVCNLXn2d/xW+CyHKvF//8zMP18IfOdgYGBJJ+iO5LxP0MIu9STtdgcj93i+woCPzn+vAdr+P+/kEPq6QRiff6fSL2jFkNCl8jgwhb8xOodDerRoB7NxwQLsNHshKucHy1ABncB8vWZnDEzw/8ORsb/u9kln3QhJ3WapuofL2T7Gf7/L2BgZPjAIfFEkG4WD5iP8ZUilAU1pLH3mYGBgYtgUYVHASPD/3B2yaeriG7sgRT+fC5b+5/hfxPZFjMyXGD/zWDFKPsE1FrFAPgb9C+lrJj/Mjv+Y/zPSooDmBgZb7C95VtHVoOeFIvIUTtgfScABqyxLhsv5QgAAAAASUVORK5CYII="/>
                <p className='phone_number'> 022 4890 5764 </p>
                </p>
                <p className='nav'>
                    Contact Us
                </p>
                <button className='Booking_facility' onClick={handleBookSlotClick}>Book Facility</button>
            </div>
        </div>
    </div>
    </section>

    <div className="caption">
        <div className="heading">
            <p>HAPPY</p>
            <p>COMMUNITY LIVING!</p>
        </div>
        <div className="paragraph">
            <p>The <span className='paragraphColor'>Most Recommended Society Management Software</span> for Residential Communities</p>
        </div>
    </div>
        </section>
        <section className='FacilityBookingModule'>
            {showBooking && <FacilityBookingModule onSubmit={handleFacilityBookingSubmit}  />}
            {showSlotBooking && <SlotBookingModule />}
        </section>
    </section>
  )
}

export default Navbar;