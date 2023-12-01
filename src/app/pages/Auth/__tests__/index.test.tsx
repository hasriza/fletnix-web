import * as React from 'react';
import { render } from '@testing-library/react';

import { Auth } from '..';

describe('<Auth  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Auth />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
