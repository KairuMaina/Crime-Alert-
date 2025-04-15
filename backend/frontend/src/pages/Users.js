import React, { useState } from "react";
import './User.css';

const EmergencyContactsAndTips = () => {
  // State for Emergency Contacts with Kenyan numbers
  const [contacts] = useState([
    { name: "Police Department", phone: "999" },
    { name: "Fire Department", phone: "020 496 2000" },
    { name: "Ambulance", phone: "0711 314 000" },
    { name: "Kenya Red Cross", phone: "1199" },
    { name: "National Poison Control Centre", phone: "020 271 4141" },
    { name: "Child Helpline", phone: "116" },
    { name: "Kenya Wildlife Service (KWS)", phone: "020 600 8000" },
  ]);

  // State for Crime Prevention Tips
  const [newTip, setNewTip] = useState("");
  const [tips, setTips] = useState([
    "Always lock your doors and windows when leaving home.",
    "Be aware of your surroundings when walking alone at night.",
    "Install security cameras or alarms in your home.",
    "Keep your phone charged and with you when going out.",
    "Avoid sharing personal details with strangers."
  ]);

  // Handlers for Crime Prevention Tips Form
  const handleTipInputChange = (e) => {
    setNewTip(e.target.value);
  };

  const handleTipSubmit = (e) => {
    e.preventDefault();
    if (newTip) {
      setTips((prevTips) => [...prevTips, newTip]);
      setNewTip("");
    }
  };

  return (
    <div className="emergency-contacts-and-tips">
      {/* Emergency Contacts Section */}
      <section className="emergency-contacts">
        <h1>Emergency Contacts</h1>
        <h2>Important Numbers for Your Safety</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              <strong>{contact.name}:</strong> {contact.phone}
            </li>
          ))}
        </ul>
      </section>

      {/* Crime Prevention Tips Section */}
      <section className="crime-prevention-tips">
        <h1>Crime Prevention Tips</h1>
        <h2>Helpful Tips for Staying Safe</h2>
        <ul>
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
        <h3>Share Your Own Tip</h3>
        <form onSubmit={handleTipSubmit}>
          <textarea
            name="tip"
            value={newTip}
            onChange={handleTipInputChange}
            placeholder="Share your tip..."
            required
          />
          <button type="submit">Submit Tip</button>
        </form>
        <div className="video-infographics">
          <h3>Infographics and Videos</h3>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/your_video_id_here"
            title="Crime Prevention Video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default EmergencyContactsAndTips;
