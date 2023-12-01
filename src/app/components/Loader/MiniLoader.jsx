import { InnerLoader } from './InnerLoader';
import React from 'react';

export default function MiniLoader() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <InnerLoader />
    </div>
  );
}
