import { Navigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Auth/slice/selectors';
import { Loader } from '../Loader/Loader';
import BrowseBtn from '../common/BrowseBtn';

const { Header, Content } = Layout;

export default function PublicRoutesLoader(props) {
  const location = useLocation();

  const { loading, isAuthenticated } = useSelector(selectAuth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return props.path !== '/' && props.allowedAfterLogin && loading ? (
    <Loader />
  ) : !props.allowedAfterLogin && isAuthenticated ? (
    <Navigate replace to={location?.state?.prevRoute || '/listing'} />
  ) : (
    <Layout>
      {!props.hideHeader && (
        <Header
          style={{
            justifyContent: 'right',
          }}
        >
          <BrowseBtn />
        </Header>
      )}
      <Content className="webEnclosedContent">{props.children}</Content>
    </Layout>
  );
}
