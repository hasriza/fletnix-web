import * as React from 'react';
import { render } from '@testing-library/react';

import { Listing } from '..';

describe('<Listing  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Listing />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
