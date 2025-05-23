import React from "react";
import { GoogleMaps} from "./Google maps/GoogleMaps.jsx";
import '../Styles/About us.css';
import myimage from '../assets/blank-profile-picture-973460_1280.webp';

export function AboutUs() {
  return (
      <div>
      <h1 className={"heading"}>About Us</h1>
  <p className={"paragraph"}> At Sippin' Pretty, we believe every cup tells a story. Nestled in the heart of the community, our café is more than just a place to grab coffee—it's a cozy corner where great conversations, fresh flavors, and warm vibes come together. From expertly brewed coffees and handcrafted drinks to delicious bites made with love, we’re all about serving up comfort, quality, and a touch of charm. Whether you're here to catch up with friends, get some work done, or simply sip and unwind, you're always welcome at Sippin' Pretty.</p>

<h1 className={"heading"} >Find us here</h1>
          <GoogleMaps />
          <br />
        <div className={"container"}>
             <div className={"custom-card"}>
                 <div className={"circle-wrapper"}>
                     <img src={myimage}
                          alt={"blank-profile-picture-973460_1280.webp"}
                          className={"circle-image"} />
                     <p>"My name is farhan. </p>
                 </div>
                 <div className={"custom-card"}>

                 </div>


                </div>
        </div>
      </div> );

}
export default AboutUs;

