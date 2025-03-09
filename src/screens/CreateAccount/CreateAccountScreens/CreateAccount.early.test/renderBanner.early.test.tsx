import {MainBanner} from '../../../../components/MainComponents/MainBanner/MainBanner';
import CreateAccount from '../CreateAccount';

import {render} from '@testing-library/react-native';
import React from 'react';

// jest.mock("src/components/MainComponents/MainBanner/MainBanner", () => ({
//   MainBanner: jest.fn(() => null),
// }));

describe('renderBanner() renderBanner method', () => {
  describe('renderBanner', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should render the MainBanner component with correct props', () => {
      // Test to ensure that the MainBanner component is rendered with the correct props
      render(<CreateAccount />);
      expect(MainBanner).toHaveBeenCalledWith(
        expect.objectContaining({
          surfTitle: expect.any(String),
          customStyles: {
            container: expect.any(Object),
          },
        }),
        {},
      );
    });

    it('should render the MainBanner with the correct surfTitle', () => {
      // Test to ensure that the surfTitle prop is passed correctly
      render(<CreateAccount />);
      expect(MainBanner).toHaveBeenCalledWith(
        expect.objectContaining({
          surfTitle: 'Expected Surf Title', // Replace with the actual expected title
        }),
        {},
      );
    });

    it('should apply the correct custom styles to the MainBanner', () => {
      // Test to ensure that the custom styles are applied correctly
      render(<CreateAccount />);
      expect(MainBanner).toHaveBeenCalledWith(
        expect.objectContaining({
          customStyles: {
            container: expect.any(Object), // Replace with the actual expected style object
          },
        }),
        {},
      );
    });
  });
});
