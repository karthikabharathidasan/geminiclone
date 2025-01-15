import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt } = useContext(Context);

  const loadPrompt =async (prompt) =>{
    setRecentPrompt(prompt)
    await onSent(prompt)

  }
  const handleRecentClick = (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt); // Trigger the prompt to be sent again
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="Menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p> New chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div onClickCapture={()=>loadPrompt(item)}
                  key={index}
                  className="recent-entry"
                  onClick={() => handleRecentClick(item)}
                >
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.slice(0,18)}...</p>
                </div>
              ))
            ) : (
              <p>No recent prompts</p>
            )}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent_entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent_entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent_entry">
          <img src={assets.send_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
