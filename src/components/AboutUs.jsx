import React from "react";
import { GoogleMaps } from "./Google maps/GoogleMaps.jsx";
import "../Styles/About us.css";

export function AboutUs() {
  return (
    <div className="aboutuspage">
      {/* Section: About Us Description */}
      <h1 className="heading">About Us</h1>
      <p className="paragraph">
        At Sippin' Pretty, we believe every cup tells a story. Nestled in the
        heart of the community, our café is more than just a place to grab
        coffee – it's a cozy corner where great conversations, fresh flavors,
        and warm vibes come together. From expertly brewed coffees and
        handcrafted drinks to delicious bites made with love, we’re all about
        serving up comfort, quality, and a touch of charm. Whether you're here
        to catch up with friends, get some work done, or simply sip and unwind,
        you're always welcome at Sippin' Pretty.
      </p>

      {/* Section: Google Map Location */}
      <section className="map-section">
        <h1 className="heading">Find us here</h1>
        <GoogleMaps />
      </section>

      {/* Section: Team Members */}
      <section className="team-section">
        <h1 className="heading">Our Team</h1>
        <br />

        {/* Team Member 1 */}
        <div className="container-wrapper">
          <div className="container">
            <div className="circle-wrapper">
              <img
                src={"https://i.ibb.co/zT0BsKxH/Dylan.jpg"}
                alt={"blank-profile-picture"}
                className="circle-image"
              />
            </div>
            <h1>Dylan Cupido</h1>
            <p className="container-text">Fullstack Developer</p>
          </div>
        </div>

        <br />

        {/* Team Member 2 */}
        <div className="container-wrapper">
          <div className="container">
            <div className="circle-wrapper">
              <img
                src={"https://i.ibb.co/4L8pLSj/Farhan.jpg"}
                alt={"team-member-photo"}
                className="circle-image"
              />
            </div>
            <h1>Farhan Waggie</h1>
            <p className="container-text">
              Backend Developer / Product Documentor / Security Specialist
            </p>
          </div>
        </div>

        <br />

        {/* Team Member 3 */}
        <div className="container-wrapper">
          <div className="container">
            <div className="circle-wrapper">
              <img
                src={"https://i.ibb.co/p5D58bF/Mulanga.jpg"}
                alt={"blank-profile-picture"}
                className="circle-image"
              />
            </div>
            <h1>Mulanga Radzilani</h1>
            <p className="container-text">
              Backend Developer / Database Specialist
            </p>
          </div>
        </div>

        <br />

        {/* Team Member 4 */}
        <div className="container-wrapper">
          <div className="container">
            <div className="circle-wrapper">
              <img
                src={"https://i.ibb.co/xqBzS25Q/Sintu.jpg"}
                alt={"blank-profile-picture"}
                className="circle-image"
              />
            </div>
            <h1>Sintu Tabata</h1>
            <p className="container-text">
              UI Designer / Automation Tester / Front-End Developer
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
