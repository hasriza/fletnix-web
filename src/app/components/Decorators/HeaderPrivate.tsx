import React from 'react';
import { AppDefaults } from 'config/global-enums';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { IoMdArrowRoundBack } from 'react-icons/io';

const { Header } = Layout;

interface Props {
  headerTitle?: string;
  hideUserIcon?: boolean;
}

export default function HeaderPrivate(props: Props) {
  const navigate = useNavigate();

  return (
    <Header style={{ justifyContent: 'space-between' }}>
      <div
        className="wrapTextEllipsis"
        style={{
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.4rem',
          fontWeight: 'bold',
        }}
      >
        <IoMdArrowRoundBack onClick={() => navigate(-1)} />
        <span>{props.headerTitle || AppDefaults.APP_NAME}</span>
      </div>
      {!props.hideUserIcon && (
        <span
          style={{ color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}
          onClick={() => navigate('/my-profile')}
        >
          <FaRegCircleUser />
        </span>
      )}
    </Header>
  );
}
