/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { BottomNavigation, BottomNavigationAction, Tooltip } from '@mui/material';
import ChatBubbleIcon from '@ant-design/icons/MessageTwoTone';
import ContactPhoneIcon from '@ant-design/icons/PhoneTwoTone';
import DocumentIcon from '@ant-design/icons/FileTextTwoTone';
import EmailIcon from '@ant-design/icons/MailTwoTone';

import { useTheme } from '@mui/material/styles';
const FixedBottomNavigation = () => {
  const [hovered, setHovered] = React.useState(null);

  const theme = useTheme();
  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const iconStyles = (index) => ({
    fontSize: '14px',
    transition: 'color 0.3s, transform 0.3s',
    color: hovered === index ? theme.palette.primary.light : 'inherit',
    transform: hovered === index ? 'scale(1.2)' : 'scale(1)'
  });
  const handleKeyPress = (event) => {
    // Check if the Ctrl key and the "K" key are pressed simultaneously
    if (event.ctrlKey && event.key === 'k') {
      // Handle the Ctrl + K key press here
      console.log('Ctrl + K pressed');
    }
  };

  return (
    <>
      <div style={{ boxShadow: '0 0 6px rgba(0,0,0,0.2)', zIndex: 2000 }} onKeyDown={handleKeyPress} tabIndex={0}>
        <BottomNavigation
          sx={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            justifyContent: 'space-between', // Aligns items horizontally
            padding: '8px', // Add some padding for spacing
            zIndex: 2000,
            boxShadow: '0 0 6px rgba(0,0,0,0.2)',
            height: '35px'
          }}
        >
          {/* Left-aligned buttons */}
          <div style={{ float: 'left', padding: '0px', display: 'inherit' }}>
            <Tooltip title="Chat" placement="top">
              <BottomNavigationAction
                label="Chat"
                showLabel
                value="chat"
                icon={
                  <div style={iconStyles(0)} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave}>
                    <ChatBubbleIcon twoToneColor={theme.palette.primary.light} />
                  </div>
                }
              />
            </Tooltip>
            <Tooltip title="Contact" placement="top">
              <BottomNavigationAction
                label="Contact"
                showLabel
                value="contact"
                icon={
                  <div style={iconStyles(1)} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                    <ContactPhoneIcon twoToneColor={theme.palette.primary.light} />
                  </div>
                }
              />
            </Tooltip>
          </div>
          <Tooltip title="Smart Chat" placement="top">
            <span>Here is your Smart Chat (Ctrl+Space)</span>
          </Tooltip>

          {/* Right-aligned buttons */}

          <div style={{ float: 'right', padding: '0px', display: 'inherit' }}>
            <Tooltip title="Document" placement="top">
              <BottomNavigationAction
                label="Document"
                showLabel
                value="document"
                icon={
                  <div style={iconStyles(3)} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
                    <DocumentIcon twoToneColor={theme.palette.primary.light} />
                  </div>
                }
              />
            </Tooltip>
            <Tooltip title="Email" placement="top">
              <BottomNavigationAction
                label="Email"
                showLabel
                value="email"
                icon={
                  <div style={iconStyles(4)} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}>
                    <EmailIcon twoToneColor={theme.palette.primary.light} />
                  </div>
                }
              />
            </Tooltip>
          </div>
        </BottomNavigation>
      </div>
      <div style={{ clearfix: 'both' }}></div>
    </>
  );
};

export default FixedBottomNavigation;
