import React from "react";
import {GoogleMaps} from "./Google maps/GoogleMaps.jsx";
import '../Styles/About us.css';


export function AboutUs() {
    return (
        <div className="aboutuspage">
            <h1 className={"heading"}>About Us</h1>
            <p className={"paragraph"}> At Sippin' Pretty, we believe every cup tells a story. Nestled in the heart of
                the community, our café is more than just a place to grab coffee it's a cozy corner where great
                conversations, fresh flavors, and warm vibes come together. From expertly brewed coffees and handcrafted
                drinks to delicious bites made with love, we’re all about serving up comfort, quality, and a touch of
                charm. Whether you're here to catch up with friends, get some work done, or simply sip and unwind,
                you're always welcome at Sippin' Pretty.</p>

            <h1 className={"heading"}>Find us here</h1>
            <GoogleMaps/>
            <h1 className={"heading"}>Our Team</h1>
            <br/>
            <div>
                <div>
                    <div className={"container-wrapper"}>
                        <div className={"container"}>
                            <div className={"circle-wrapper"}>
                                <img src={"../src/assets/Dylan.jfif"}
                                     alt={"blank-profile-picture-973460_1280.webp"}
                                     className={"circle-image"}/>
                            </div>
                            <p className={"container-text"}>Fullstack Developer</p>
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                    <div className={"container-wrapper"}>
                        <div className={"container"}>
                            <div className={"circle-wrapper"}>
                                <img src={"../src/assets/Farhan.jfif"}
                                     alt={"../assets/"}
                                     className={"circle-image"}/>
                            </div>
                            <p className={"container-text"}>Backend Developer/Product Documentor</p>
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                    <div className={"container-wrapper"}>
                        <div className={"container"}>
                            <div className={"circle-wrapper"}>
                                <img src={"../src/assets/Mulanga.jfif"}
                                     alt={"blank-profile-picture-973460_1280.webp"}
                                     className={"circle-image"}/>
                            </div>
                            <p className={"container-text"}>backend developer/Database Specialist</p>
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                    <div className={"container-wrapper"}>
                        <div className={"container"}>
                            <div className={"circle-wrapper"}>
                                <img src={"../src/assets/Sintu.jfif"}
                                     alt={"blank-profile-picture-973460_1280.webp"}
                                     className={"circle-image"}/>
                            </div>
                            <p className={"container-text"}>UI Designer/Automation Tester</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


