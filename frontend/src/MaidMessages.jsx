import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MaidMessages = () => {
  const navigate = useNavigate();
  
  const [chats] = useState([
    { id: 1, name: "Mrs. Anjali Kapoor", lastMsg: "can you come tomorrow?", time: "10:30 AM", unread: true },
    { id: 2, name: "Mr. Vikram Singh", lastMsg: "Payment done.", time: "Yesterday", unread: false },
    { id: 3, name: "Priya Sharma", lastMsg: "Address: Sector 15, Gurgaon", time: "2 days ago", unread: false },
  ]);

  const [activeChat, setActiveChat] = useState(chats[0]);

  return (
    <>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
          }

          .full-screen-wrapper {
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }

          /*  NAVBAR  */
          .msg-navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 40px;
            height: 70px;
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            flex-shrink: 0;
          }

          .msg-logo { 
            font-size: 1.5rem; 
            font-weight: 800; 
            color: #2563eb; 
            cursor: pointer; 
          }

          .nav-btn {
            background: #000;
            color: #ffffff !important; /* Button text white color */
            border: none;
            padding: 10px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 700;
            transition: 0.3s;
          }

          .nav-btn:hover {
            background: #2563eb;
          }

          /* --- MAIN CHAT AREA --- */
          .chat-app-body {
            display: flex;
            flex: 1;
            overflow: hidden;
          }

          /* Left Sidebar */
          .chat-sidebar {
            width: 350px;
            background: #ffffff;
            border-right: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
          }

          .sidebar-header {
            padding: 25px;
            font-size: 1.4rem;
            font-weight: 800;
            border-bottom: 1px solid #f1f5f9;
          }

          .chat-list-scroll {
            flex: 1;
            overflow-y: auto;
          }

          .chat-card {
            padding: 20px;
            display: flex;
            gap: 15px;
            cursor: pointer;
            border-bottom: 1px solid #f8fafc;
          }

          .chat-card.active { background: #eff6ff; border-right: 4px solid #2563eb; }

          .avatar {
            width: 48px;
            height: 48px;
            background: #2563eb;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
          }

          /* Right Chat Window */
          .chat-window {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #fbfcfe;
          }

          .chat-window-header {
            height: 70px;
            padding: 0 30px;
            background: white;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 15px;
          }

          /* User name in Header (Black) */
          .header-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: #000000; /* Black Name */
          }

          .chat-messages-scroll {
            flex: 1;
            padding: 40px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .msg-bubble {
            max-width: 50%;
            padding: 14px 20px;
            border-radius: 15px;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          /* Received Messages Text (Black) */
          .received { 
            background: #ffffff; 
            border: 1px solid #e2e8f0; 
            align-self: flex-start; 
            border-bottom-left-radius: 2px;
            color: #000000; /* Black message text */
            font-weight: 500;
          }

          .sent { 
            background: #2563eb; 
            color: white; 
            align-self: flex-end; 
            border-bottom-right-radius: 2px; 
          }

          /* Bottom Input */
          .chat-input-bar {
            height: 90px;
            padding: 0 40px;
            background: white;
            border-top: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .msg-input {
            flex: 1;
            height: 50px;
            padding: 0 25px;
            border: 1px solid #e2e8f0;
            border-radius: 25px;
            outline: none;
            background: #f8fafc;
          }

          .send-button {
            height: 50px;
            padding: 0 35px;
            background: #000;
            color: white;
            border: none;
            border-radius: 25px;
            font-weight: 700;
            cursor: pointer;
          }
        `}
      </style>

      <div className="full-screen-wrapper">
        <nav className="msg-navbar">
          <div className="msg-logo" onClick={() => navigate('/')}>MaisonCare</div>
          <div className="nav-btns">
            <button className="nav-btn" onClick={() => navigate('/maid-dashboard')}>Dashboard</button>
          </div>
        </nav>

        <div className="chat-app-body">
          <aside className="chat-sidebar">
            <div className="sidebar-header">Inbox</div>
            <div className="chat-list-scroll">
              {chats.map(chat => (
                <div 
                  key={chat.id} 
                  className={`chat-card ${activeChat.id === chat.id ? 'active' : ''}`}
                  onClick={() => setActiveChat(chat)}
                >
                  <div className="avatar">{chat.name[0]}</div>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <b style={{color: '#000'}}>{chat.name}</b>
                      <span style={{fontSize: '0.75rem', color: '#94a3b8'}}>{chat.time}</span>
                    </div>
                    <div style={{fontSize: '0.85rem', color: '#64748b'}}>{chat.lastMsg}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <main className="chat-window">
            <div className="chat-window-header">
              <div className="avatar" style={{width: '35px', height: '35px', fontSize: '0.9rem'}}>{activeChat.name[0]}</div>
              <span className="header-name">{activeChat.name}</span>
              <span style={{color: '#10b981', fontSize: '0.8rem', marginLeft: '10px'}}>● Online</span>
            </div>

            <div className="chat-messages-scroll">
              <div className="msg-bubble received">Namaste! I'm Priya .</div>
              <div className="msg-bubble sent">Namaste Priya ji, how can i help you?</div>
              <div className="msg-bubble received">{activeChat.lastMsg}</div>
            </div>

            <div className="chat-input-bar">
              <input type="text" className="msg-input" placeholder="Type your message..." />
              <button className="send-button">Send</button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MaidMessages;