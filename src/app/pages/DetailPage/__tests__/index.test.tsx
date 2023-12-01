import * as React from 'react';
import { render } from '@testing-library/react';

import { DetailPage } from '..';

describe('<DetailPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<DetailPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
