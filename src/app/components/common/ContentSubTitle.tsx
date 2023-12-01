import React from 'react';

interface Props {
  release?: number | null;
  type?: string | null;
  duration?: string | null;
  hideType?: boolean;
}

export default function ContentSubTitle(props: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 1rem',
      }}
    >
      <span>{props.release || '-'}</span>
      {!props.hideType && (
        <span style={{ fontWeight: 'bold' }}>{props.type || '-'}</span>
      )}
      <span>{props.duration || '-'}</span>
    </div>
  );
}
