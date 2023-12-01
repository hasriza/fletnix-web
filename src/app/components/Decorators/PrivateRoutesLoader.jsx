import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Auth/slice/selectors';
import { Layout } from 'antd';
import { Loader } from '../Loader/Loader';

const { Content } = Layout;

export default function PrivateRoutesLoader({ routeProps, ...props }) {
  const { loading, isAuthenticated } = useSelector(selectAuth);

  const prevRoute = useLocation();

  return loading ? (
    <Loader />
  ) : isAuthenticated ? (
    <Layout className="flex-scroll-body">
      <Content className="webEnclosedContent">{props.children}</Content>
    </Layout>
  ) : (
    <Navigate replace to="/auth" state={{ prevRoute }} />
  );
}
