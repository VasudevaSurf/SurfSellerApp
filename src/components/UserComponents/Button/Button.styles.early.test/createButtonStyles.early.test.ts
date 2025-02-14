// Unit tests for: createButtonStyles

import {ColorPalette} from '../../../../config/colorPalette';
import {Spacing} from '../../../../config/globalStyles';
import {createButtonStyles} from '../Button.styles';
import {ButtonSize, ButtonState, ButtonVariant} from '../Button.types';

// Mock the getFigmaDimension function
jest.mock('../../../../helpers/screenSize', () => ({
  getFigmaDimension: jest.fn(value => value),
}));

describe('createButtonStyles() createButtonStyles method', () => {
  // Happy paths
  describe('Happy paths', () => {
    it('should create styles for a primary large default button', () => {
      // Test for primary large default button
      const styles = createButtonStyles(
        ButtonVariant.PRIMARY,
        ButtonSize.LARGE,
        ButtonState.DEFAULT,
      );
      expect(styles.baseButton.backgroundColor).toBe(
        ColorPalette.PRIMARY_GRADIENT_SELLER,
      );
      expect(styles.baseButton.height).toBe(58);
      expect(styles.baseButton.paddingVertical).toBe(Spacing.Medium);
      expect(styles.buttonText.color).toBe(ColorPalette.White);
    });

    it('should create styles for a secondary medium hovered button', () => {
      // Test for secondary medium hovered button
      const styles = createButtonStyles(
        ButtonVariant.SECONDARY,
        ButtonSize.MEDIUM,
        ButtonState.HOVERED,
      );
      expect(styles.baseButton.backgroundColor).toBe(ColorPalette.PURPLE_00);
      expect(styles.baseButton.height).toBe(48);
      expect(styles.baseButton.paddingVertical).toBe(Spacing.Small);
      expect(styles.baseButton.borderWidth).toBe(1);
      expect(styles.baseButton.borderColor).toBe(ColorPalette.PURPLE_300);
      expect(styles.buttonText.color).toBe(ColorPalette.PURPLE_400);
    });

    it('should create styles for a tertiary small pressed button', () => {
      // Test for tertiary small pressed button
      const styles = createButtonStyles(
        ButtonVariant.TERTIARY,
        ButtonSize.SMALL,
        ButtonState.PRESSED,
      );
      expect(styles.baseButton.backgroundColor).toBe(ColorPalette.PURPLE_100);
      expect(styles.baseButton.height).toBe(40);
      expect(styles.baseButton.paddingVertical).toBe(Spacing.XSmall);
      expect(styles.buttonText.color).toBe(ColorPalette.GREY_TEXT_500);
    });
  });

  // Edge cases
  describe('Edge cases', () => {
    it('should handle an undefined size by defaulting to medium size', () => {
      // Test for undefined size
      const styles = createButtonStyles(
        ButtonVariant.PRIMARY,
        undefined as any,
        ButtonState.DEFAULT,
      );
      expect(styles.baseButton.height).toBe(48);
      expect(styles.baseButton.paddingVertical).toBe(Spacing.Small);
    });

    it('should handle an undefined variant by not setting a background color', () => {
      // Test for undefined variant
      const styles = createButtonStyles(
        undefined as any,
        ButtonSize.MEDIUM,
        ButtonState.DEFAULT,
      );
      expect(styles.baseButton.backgroundColor).toBeUndefined();
    });

    it('should handle an undefined state by defaulting to default state', () => {
      // Test for undefined state
      const styles = createButtonStyles(
        ButtonVariant.PRIMARY,
        ButtonSize.MEDIUM,
        undefined as any,
      );
      expect(styles.baseButton.backgroundColor).toBe(
        ColorPalette.PRIMARY_GRADIENT_SELLER,
      );
    });

    it('should handle a link variant with all states having transparent background', () => {
      // Test for link variant
      const states = [
        ButtonState.DEFAULT,
        ButtonState.HOVERED,
        ButtonState.PRESSED,
        ButtonState.FOCUSED,
        ButtonState.DISABLED,
      ];
      states.forEach(state => {
        const styles = createButtonStyles(
          ButtonVariant.LINK,
          ButtonSize.MEDIUM,
          state,
        );
        expect(styles.baseButton.backgroundColor).toBe('transparent');
      });
    });
  });
});

// End of unit tests for: createButtonStyles
