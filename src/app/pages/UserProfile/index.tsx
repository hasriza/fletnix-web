/**
 *
 * UserProfile
 *
 */
import { Button, Card, Layout } from 'antd';
import HeaderHelmet from 'app/components/Decorators/HeaderHelmet';
import HeaderPrivate from 'app/components/Decorators/HeaderPrivate';
import * as React from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../Auth/slice/selectors';
import dayjs from 'dayjs';
import { useAuthSlice } from '../Auth/slice';

interface Props {}

const { Content } = Layout;

export function UserProfile(props: Props) {
  const { userDetails } = useSelector(selectAuth);

  const { actions } = useAuthSlice();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.logoutStart());
  };

  return (
    <>
      <HeaderHelmet
        title={userDetails?.name}
        description={`Profile details of ${userDetails?.name}`}
      />
      <HeaderPrivate headerTitle={userDetails?.name} />
      <Content className="flex-scroll-body">
        <Card
          bodyStyle={{
            padding: '4px',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            fontSize: '1.4rem',
          }}
          style={{ margin: '12px', height: '100%', display: 'flex' }}
        >
          <FaRegCircleUser style={{ fontSize: '20vw' }} />
          <div
            style={{
              display: 'flex',
              marginTop: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginRight: '1rem',
              }}
            >
              <span>Name:</span>
              <span>Age:</span>
              <span>DOB:</span>
              <span>Email:</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span> {userDetails?.name}</span>
              <span>{userDetails?.age}</span>
              <span>{dayjs(userDetails?.dob).format('DD/MM/YYYY')}</span>
              <span>{userDetails?.email}</span>
            </div>
          </div>
          <Button
            icon={<MdLogout style={{ transform: 'scaleX(-1)' }} />}
            style={{ marginTop: '1rem' }}
            onClick={logout}
          >
            Logout
          </Button>
        </Card>
      </Content>
    </>
  );
}
