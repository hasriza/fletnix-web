import * as React from 'react';

import { InnerLoader } from './InnerLoader';
import styled from 'styled-components/macro';

interface Props extends SvgProps {}

export const Loader = (props: Props) => (
  <LoadingWrapper>
    <InnerLoader />
    Free back-end server takes time...
  </LoadingWrapper>
);

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface SvgProps {
  small?: boolean;
}
