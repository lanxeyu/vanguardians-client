import React, { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom'

const GuardianProfile = ({ guardian }) => {
    // const navigate = useNavigate
    const g = guardian.data;
    const [imgUrl, setImgUrl] = useState("");
    useEffect(() => {
        switch (g.name) {
            case "Duncan":
                setImgUrl("/images/heavyarmor.gif");
                break;
            case "James":
                setImgUrl("/images/fireworm.gif");
                break;
            case "Stephanie":
                setImgUrl("/images/huntress.gif");
                break;
            case "Alex":
                setImgUrl("/images/fantasywarrior.gif");
                break;
            case "Robbie":
                setImgUrl("/images/wizard.gif");
                break;
            case "Lanxe":
                setImgUrl("/images/martialhero.gif");
                break;
        }
    }, []);

    return (
        <div id="guardian-profile-page-container">
            <div className="guardian-profile-wrapper">
                <div className="guardian-profile-card">
                    <h4 className="guardian-profile-card-name">{g.name}</h4>
                    <h5 className="guardian-profile-card-type">Type: {g.g_class}</h5>
                    <img className="guardian-profile-card-image" src={imgUrl} alt={g.name} />
                </div>

                <div className="guardian-profile-bio">
                    <div className="guardian-profile-card-button-wrapper">
                        {
                            <Link className="guardian-profile-card-close-button"
                                to="/guardians"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                    fontSize: "30px",
                                    textAlign: "right",
                                    paddingRight: "7px",
                                }}>
                                X
                            </Link>
                        }
                    </div>
                    
                    <div className="guardian-profile-bio-section">
                        <h3 className="guardian-profile-bio-header">About:</h3>
                        <p className="guardian-profile-bio-text">{g.about}</p>
                    </div>
                    <div className="guardian-profile-bio-section">
                        <h3 className="guardian-profile-bio-header">Attack type:</h3>
                        <p className="guardian-profile-bio-text">{g.attack_type}</p>
                    </div>
                    <div className="guardian-profile-bio-section">
                        <h3 className="guardian-profile-bio-header">Mode 1:</h3>
                        <p className="guardian-profile-bio-text">{g.mode_1}</p>
                    </div>
                    <div className="guardian-profile-bio-section">
                        <h3 className="guardian-profile-bio-header">Mode 2:</h3>
                        <p className="guardian-profile-bio-text">{g.mode_2}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuardianProfile;
