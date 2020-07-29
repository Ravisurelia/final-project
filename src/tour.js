import React from "react";

export default function PlaceToVisit() {
    return (
        <div className="tour">
            <div className="box">
                <a href="https://www.shaharidham.org/about-us.html">
                    <img src="haridham.jpg" className="tour-img"></img>
                </a>
                <h5 className="place-name">Haridham</h5>
            </div>
            <div className="box">
                <a href="https://en.wikipedia.org/wiki/Rishikesh">
                    <img src="rishikesh.jpg" className="tour-img"></img>
                </a>
                <h5 className="place-name">Rishikesh</h5>
            </div>
            <div className="box">
                <a href="https://en.wikipedia.org/wiki/Dharamshala">
                    <img src="dharamshala.jpg" className="tour-img"></img>
                </a>

                <h5 className="place-name">Dharamshala</h5>
            </div>

            <div className="box">
                <a href="https://en.wikipedia.org/wiki/Manali,_Himachal_Pradesh">
                    <img src="kullu manali.webp" className="tour-img"></img>
                </a>

                <h5 className="place-name">Kullu Manali</h5>
            </div>
            <div className="box">
                <a href="https://www.thrillophilia.com/places-to-visit-in-mumbai">
                    <img src="mumbai.jpg" className="tour-img"></img>
                </a>

                <h5 className="place-name">Mumbai</h5>
            </div>
        </div>
    );
}
