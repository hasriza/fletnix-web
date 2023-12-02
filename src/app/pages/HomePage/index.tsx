import BrowseBtn from 'app/components/common/BrowseBtn';
import { AppDefaults } from 'config/global-enums';
import * as React from 'react';

export function HomePage() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '2rem',
        }}
        className="homeContent"
      >
        <span style={{ alignSelf: 'center' }}>
          <img src="logo192.png" alt="FletNix Logo" />
        </span>
        <span
          style={{ fontSize: '5rem', fontWeight: 'bold', color: '#579ce0' }}
        >
          {AppDefaults.APP_NAME}
        </span>
        <span style={{ fontSize: '2em', color: 'white', marginBottom: '2rem' }}>
          Does Netflix charge you for browsing? <br /> Fear not! Browse
          worry-free on FletNix!
        </span>
        <BrowseBtn />
      </div>
    </>
  );
}
