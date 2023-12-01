import * as React from 'react';
import { render } from '@testing-library/react';

import { UserProfile } from '..';

describe('<UserProfile  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UserProfile />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
