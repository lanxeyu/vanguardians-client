import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const GuardianCard = ({ guardian }) => {
    const [imgUrl, setImgUrl] = useState("");
    useEffect(() => {
        switch (guardian.name) {
            case "Duncan":
                setImgUrl("images/heavyarmor.gif");
                break;
            case "James":
                setImgUrl("images/fireworm.gif");
                break;
            case "Stephanie":
                setImgUrl("images/huntress.gif");
                break;
            case "Alex":
                setImgUrl("images/fantasywarrior.gif");
                break;
            case "Robbie":
                setImgUrl("images/wizard.gif");
                break;
            case "Lanxe":
                setImgUrl("images/martialhero.gif");
                break;
        }
    }, []);

    return (
        <Link className="guardian-card-link" to={`${guardian.g_id}`}>
            <div className="guardian-card">
                <h4 className="guardian-card-name">{guardian.name}</h4>
                <div className="guardian-card-image-wrapper">
                    <div className="guardian-card-image-bg"></div>
                    <img className="guardian-card-image" src={imgUrl} alt={guardian.name} />
                </div>
                <h5 className="guardian-card-type">Type: {guardian.g_class}</h5>
            </div>
        </Link>
    );
};

export default GuardianCard;
