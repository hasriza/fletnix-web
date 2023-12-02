/**
 *
 * DetailPage
 *
 */
import { Card, Col, Layout, Row } from 'antd';
import HeaderHelmet from 'app/components/Decorators/HeaderHelmet';
import HeaderPrivate from 'app/components/Decorators/HeaderPrivate';
import * as React from 'react';
import { useDetailPageSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectDetailPage } from './slice/selectors';

const { Content } = Layout;

export function DetailPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { actions } = useDetailPageSlice();

  const {
    showDetails,
    loading,
    error,
  }: { showDetails: any; loading: boolean; error: any } =
    useSelector(selectDetailPage);

  const { showId } = useParams();

  React.useEffect(() => {
    if (showId) dispatch(actions.fetchDetailsStart({ showId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showId]);

  React.useEffect(() => {
    !loading && error && navigate('/not-found');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);

  return (
    <>
      <HeaderHelmet title={showDetails?.title} description="Movie" />
      <HeaderPrivate headerTitle={showDetails?.title} />
      <Content className="flex-scroll-body">
        <Card bodyStyle={{ padding: '12px' }} style={{ margin: '8px' }}>
          <div style={{ fontSize: '1.4rem' }}>
            <span style={{ fontWeight: 'bold' }}>Title:</span>&nbsp;
            {showDetails?.title}
          </div>
          <Row justify="space-between">
            <Col xs={24} lg={8}>
              <div
                style={{
                  display: 'flex',
                  fontSize: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontWeight: 'bold',
                    marginRight: '8px',
                  }}
                >
                  <span>Release:</span>
                  <span>Duration:</span>
                  <span>Type:</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span> {showDetails?.release_year || '-'}</span>
                  <span>{showDetails?.duration || '-'}</span>
                  <span>{showDetails?.type || '-'}</span>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div
                style={{
                  display: 'flex',
                  fontSize: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontWeight: 'bold',
                    marginRight: '8px',
                  }}
                >
                  <span>Rating:</span>
                  <span>Country:</span>
                  <span>Date Added:</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span> {showDetails?.rating || '-'}</span>
                  <span>{showDetails?.country || '-'}</span>
                  <span>{showDetails?.date_added || '-'}</span>
                </div>
              </div>
            </Col>
          </Row>
          <span style={{ padding: '1rem 0', fontSize: '1rem' }}>
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
              Listed in:
            </span>
            {showDetails?.listed_in}
          </span>
          {showDetails?.cast && (
            <div style={{ padding: '1rem 0', fontSize: '1rem' }}>
              <span style={{ fontWeight: 'bold' }}>Cast: </span>
              <span>{showDetails?.cast}</span>
            </div>
          )}

          <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
            {showDetails?.description}
          </p>
        </Card>
      </Content>
    </>
  );
}
