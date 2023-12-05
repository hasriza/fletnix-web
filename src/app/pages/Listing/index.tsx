/**
 *
 * Listing
 *
 */
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Input,
  Layout,
  Radio,
  Row,
  Skeleton,
} from 'antd';
import HeaderPrivate from 'app/components/Decorators/HeaderPrivate';
import ContentSubTitle from 'app/components/common/ContentSubTitle';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectListing } from './slice/selectors';
import { useListingSlice } from './slice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InnerLoader } from 'app/components/Loader/InnerLoader';
import {
  MdArrowDownward,
  MdArrowUpward,
  MdCalendarMonth,
} from 'react-icons/md';

interface Props {}

const { Content } = Layout;

export function Listing(props: Props) {
  const scrollRef = React.useRef<any>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { actions } = useListingSlice();

  const tempLoadData = React.useMemo(
    () =>
      Array(15)
        .fill(1)
        .map((_, ind) => ({ id: ind })),
    [],
  );

  const {
    loading: fetchLoading,
    showList = tempLoadData,
    totalShows,
    currPage,
  }: {
    loading: boolean;
    showList?: any;
    totalShows?: number | any;
    currPage?: number | any;
  } = useSelector(selectListing);

  const [showFilterType, setShowFilterType] = React.useState<string>('all');
  const [dateSorter, setDateSorter] = React.useState<number | undefined>(
    undefined,
  );
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [shouldDebounce, setShouldDebounce] = React.useState<boolean>(false);

  const fetchList = ({
    searchVal = searchValue,
    type = showFilterType === 'all' ? undefined : showFilterType,
    page = currPage || 1,
    dateSort = undefined,
  }: {
    searchVal?: string | any;
    type?: string | any;
    page?: number;
    dateSort?: number | any;
  } = {}) => {
    dispatch(
      actions.fetchListStart({
        searchVal: searchVal || undefined,
        type,
        page,
        sortBy: '_id',
        dateSort,
        limit: 30,
      }),
    );
  };

  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.el.scrollTo({ top: 0, behavior: 'smooth' });
    fetchList({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilterType]);

  const getDateSorterNextState = () => {
    console.log(dateSorter);
    switch (dateSorter) {
      case undefined:
        setDateSorter(1);
        return 1;

      case 1:
        setDateSorter(-1);
        return -1;

      case -1:
        setDateSorter(undefined);
        return undefined;
    }
  };

  const handleSearch = (searchVal: string) => {
    fetchList({ searchVal, page: 1 });
  };

  const handleSearchChange = e => {
    setSearchValue(e.target.value.replace(/^\s/, ''));

    if (!shouldDebounce) {
      //&& !props.loading
      setShouldDebounce(true);

      setTimeout(() => {
        handleSearch(e.target.value.trim());

        setShouldDebounce(false);
      }, 1300);
    }
  };

  // eslint-disable-next-line no-restricted-globals
  const ContainerHeight = window.innerHeight - 190;

  return (
    <>
      <HeaderPrivate />
      <div
        style={{
          margin: '1.4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <Radio.Group
            value={showFilterType}
            onChange={e => setShowFilterType(e.target.value)}
            style={{ marginBottom: '1rem', marginRight: '4px' }}
          >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="Movie">Movies</Radio.Button>
            <Radio.Button value="TV Show">TV Shows</Radio.Button>
          </Radio.Group>
          <Button
            type="primary"
            icon={
              <>
                <MdCalendarMonth />
                {!dateSorter ? null : dateSorter === 1 ? (
                  <MdArrowUpward />
                ) : (
                  <MdArrowDownward />
                )}
              </>
            }
            aria-label="Date Sorter"
            onClick={() =>
              fetchList({ dateSort: getDateSorterNextState(), page: 1 })
            }
          />
        </div>
        <Input.Search
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          placeholder={`Search Cast${
            showFilterType === 'all'
              ? ', Movies and TV Shows'
              : ' & ' + showFilterType + 's'
          }`}
          loading={fetchLoading}
          enterButton
          className="formClass"
        />
      </div>

      <Content
        style={{
          display: 'flex',
        }}
      >
        <InfiniteScroll
          dataLength={showList?.length}
          next={fetchList}
          hasMore={totalShows !== showList?.length}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          height={ContainerHeight}
          style={{
            width: '100vw',
            textAlign: 'center',
          }}
          loader={<InnerLoader />}
          ref={scrollRef}
        >
          {!showList?.length && !fetchLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: ContainerHeight + 'px',
              }}
            >
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span style={{ color: '#fff' }}>
                    Sorry, no content found!
                  </span>
                }
                style={{ color: '#fff' }}
              />
            </div>
          ) : (
            <Row gutter={[12, 24]} style={{ margin: '8px' }}>
              {showList.map((item: any) => (
                <Col xs={24} lg={8} key={item?.id || item?.title || 0}>
                  <Card
                    hoverable
                    title={item?.title}
                    bodyStyle={{ padding: '4px' }}
                    onClick={() => navigate(`/detail/${item?.id}`)}
                  >
                    <Skeleton
                      loading={fetchLoading}
                      active
                      paragraph={{ rows: 1 }}
                    >
                      <ContentSubTitle
                        date_added={item?.date_added}
                        duration={item?.duration}
                        type={item?.type}
                        hideType={showFilterType !== 'all'}
                      />
                    </Skeleton>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </InfiniteScroll>
      </Content>
    </>
  );
}
