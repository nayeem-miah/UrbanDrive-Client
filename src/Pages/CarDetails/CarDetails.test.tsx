// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { vi } from 'vitest';
// import { BrowserRouter } from 'react-router-dom';
// import CarDetails from './CarDetails';

// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../Hooks/useAuth';

// // Mock the modules
// vi.mock('../../Hooks/useAuth');
// vi.mock('@tanstack/react-query');
// vi.mock('../../Hooks/useAxiosPublic');
// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual('react-router-dom');
//   return {
//     ...actual,
//     useLoaderData: () => mockCarData,
//     useNavigate: () => vi.fn(),
//   };
// });

// // Mock data
// const mockCarData = {
//   _id: '123',
//   make: 'Toyota',
//   model: 'Camry',
//   category: 'Sedan',
//   averageRating: 4.5,
//   reviewCount: 10,
//   description: 'A comfortable sedan',
//   features: ['GPS', 'Bluetooth'],
//   seatCount: 5,
//   rental_price_per_day: 100,
//   categoryRatings: {
//     comfort: 4.5,
//     performance: 4.2,
//     value: 4.0,
//     design: 4.3
//   },
//   name: 'John Doe',
//   date: '2023'
// };

// const mockReviewsData = {
//   reviews: [
//     {
//       _id: '1',
//       rating: 4,
//       userName: 'Test User',
//       createdAt: '2024-03-20',
//       ratingDetails: {
//         comfort: 4,
//         performance: 4,
//         value: 4,
//         design: 4
//       },
//       comment: 'Great car!'
//     }
//   ],
//   currentPage: 1,
//   totalPages: 1,
//   totalReviews: 1
// };

// describe('CarDetails Component', () => {
//   beforeEach(() => {
//     // Mock useAuth hook
//     vi.mocked(useAuth).mockReturnValue({
//       user: {
//         email: 'test@example.com',
//         displayName: 'Test User',
//         emailVerified: true,
//         isAnonymous: false,
//         metadata: {},
//         providerData: [],
//         refreshToken: 'mockRefreshToken',
//         tenantId: 'mockTenantId',
//         delete: vi.fn(),
//         getIdToken: vi.fn(),
//         // Add other required methods and properties with mock values
//       },
//       loading: false,
//     });

//     // Mock useQuery hook
//     vi.mocked(useQuery).mockReturnValue({
//       data: mockReviewsData,
//       isLoading: false,
//       refetch: vi.fn(),
//     } as any);
//   });

//   test('renders basic car information correctly', () => {
//     render(
//       <BrowserRouter>
//         <CarDetails />
//       </BrowserRouter>
//     );

//     // Check if basic car information is rendered
//     expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
//     expect(screen.getByText('Sedan')).toBeInTheDocument();
//     expect(screen.getByText('A comfortable sedan')).toBeInTheDocument();
//   });

//   test('calculates total cost correctly when dates are selected', async () => {
//     render(
//       <BrowserRouter>
//         <CarDetails />
//       </BrowserRouter>
//     );

//     // Find and click the date selector
//     const dateSelector = screen.getByText(/Trip dates/i);
//     fireEvent.click(dateSelector);

//     // Wait for the calendar to appear and select dates
//     // Note: You'll need to modify this based on your date picker implementation
//     await waitFor(() => {
//       expect(screen.getByText(/Total for/i)).toBeInTheDocument();
//     });
//   });

//   test('toggles driver inclusion correctly', () => {
//     render(
//       <BrowserRouter>
//         <CarDetails />
//       </BrowserRouter>
//     );

//     const driverCheckbox = screen.getByLabelText(/Include driver/i);
//     fireEvent.click(driverCheckbox);

//     expect(driverCheckbox).toBeChecked();
//     expect(screen.getByText(/Driver fee/i)).toBeInTheDocument();
//   });

//   test('displays reviews correctly', () => {
//     render(
//       <BrowserRouter>
//         <CarDetails />
//       </BrowserRouter>
//     );

//     expect(screen.getByText('Customer Reviews')).toBeInTheDocument();
//     expect(screen.getByText('Great car!')).toBeInTheDocument();
//   });
// });
