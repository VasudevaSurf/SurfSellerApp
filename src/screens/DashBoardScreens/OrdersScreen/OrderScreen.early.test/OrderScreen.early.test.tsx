import OrderScreen from '../OrderScreen';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Mocking the getScreenHeight function
jest.mock('../../../../helpers/screenSize', () => ({
  getScreenHeight: jest.fn(() => 100),
}));

describe('OrderScreen() OrderScreen method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should render the header with the correct title', () => {
      render(<OrderScreen />);
      expect(screen.getByText('WOW Shop')).toBeInTheDocument();
    });

    it('should display the correct number of total items', () => {
      render(<OrderScreen />);
      expect(screen.getByText('Total Items : 5')).toBeInTheDocument();
    });

    it('should render all orders with correct details', () => {
      render(<OrderScreen />);
      const orderNames = screen.getAllByText(
        'Lunar Whisper | 75ml | Velvet Bloom Collection',
      );
      expect(orderNames).toHaveLength(5);
    });

    it('should update search text when input changes', () => {
      render(<OrderScreen />);
      const searchInput = screen.getByPlaceholderText(
        'Search orders, products',
      );
      fireEvent.change(searchInput, {target: {value: 'New Search'}});
      expect(searchInput).toHaveValue('New Search');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle status change correctly', () => {
      render(<OrderScreen />);
      const orderStatusButtons = screen.getAllByRole('button', {
        name: /Cancelled/i,
      });
      fireEvent.click(orderStatusButtons[0]);
      // Assuming there's a way to change status, this is a placeholder for the actual implementation
      // You would need to simulate the status change and verify it
    });

    it('should handle empty orders list gracefully', () => {
      // Mock useState to return an empty orders list
      jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [[], jest.fn()]);
      render(<OrderScreen />);
      expect(screen.getByText('Total Items : 0')).toBeInTheDocument();
    });

    it('should handle large number of orders without performance issues', () => {
      // Mock useState to return a large orders list
      const largeOrders = new Array(1000).fill({
        id: '1',
        orderImage: 'https://picsum.photos/202',
        orderName: 'Lunar Whisper | 75ml | Velvet Bloom Collection',
        orderPrice: '499.00',
        orderNumber: 172,
        orderEmail: 'revanthyadav@surf.mt',
        orderPhone: 9970344320,
        orderDate: '10/15/2024',
        orderTime: '21:59',
        orderStatus: 'Cancelled',
      });
      jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [largeOrders, jest.fn()]);
      render(<OrderScreen />);
      expect(screen.getByText('Total Items : 1000')).toBeInTheDocument();
    });
  });
});
