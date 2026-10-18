import { Customer } from '../types/customer.types';

/**
 * Seed data that acts as our "database" during Phase 1.
 * It is intentionally varied so search, sorting, and empty-field
 * handling can be tested properly:
 *  - different cities (for future city filtering)
 *  - some customers without notes (optional field)
 *  - spread-out createdAt dates (for sorting by newest)
 *  - one business and several individuals
 */
export const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: 'cus_001',
    name: 'Ahmed Raza',
    phone: '0300-1234567',
    address: 'House 14, Street 5, Satellite Town',
    city: 'Rawalpindi',
    notes: 'Prefers morning appointments. Dog at the gate.',
    createdAt: '2026-01-10T08:30:00.000Z',
    updatedAt: '2026-01-10T08:30:00.000Z',
  },
  {
    id: 'cus_002',
    name: 'Sana Malik',
    phone: '0321-7654321',
    address: 'Flat 3B, Askari Tower, Gulberg',
    city: 'Lahore',
    createdAt: '2026-01-22T11:15:00.000Z',
    updatedAt: '2026-01-22T11:15:00.000Z',
  },
  {
    id: 'cus_003',
    name: 'Al-Noor Pharmacy',
    phone: '051-5551234',
    address: 'Shop 7, Commercial Market',
    city: 'Rawalpindi',
    notes: 'Business customer. Refrigeration units must stay running; call before shutting power.',
    createdAt: '2026-02-03T09:00:00.000Z',
    updatedAt: '2026-02-18T14:20:00.000Z',
  },
  {
    id: 'cus_004',
    name: 'Bilal Hussain',
    phone: '0333-9876543',
    address: 'House 221, Sector G-10/2',
    city: 'Islamabad',
    createdAt: '2026-02-14T16:45:00.000Z',
    updatedAt: '2026-02-14T16:45:00.000Z',
  },
  {
    id: 'cus_005',
    name: 'Fatima Noor',
    phone: '0345-2468135',
    address: 'House 9, Block C, DHA Phase 2',
    city: 'Karachi',
    notes: 'Elderly parent at home; confirm visit by phone before arriving.',
    createdAt: '2026-03-01T10:10:00.000Z',
    updatedAt: '2026-03-05T12:00:00.000Z',
  },
  {
    id: 'cus_006',
    name: 'City Care Clinic',
    phone: '042-3555678',
    address: 'Plot 45, Main Boulevard, Johar Town',
    city: 'Lahore',
    notes: 'Server room on first floor. Ask for the admin, Mr. Farooq.',
    createdAt: '2026-03-18T13:30:00.000Z',
    updatedAt: '2026-03-18T13:30:00.000Z',
  },
  {
    id: 'cus_007',
    name: 'Usman Tariq',
    phone: '0312-1357924',
    address: 'House 62, Street 12, Bahria Town Phase 4',
    city: 'Rawalpindi',
    createdAt: '2026-04-07T07:50:00.000Z',
    updatedAt: '2026-04-07T07:50:00.000Z',
  },
  {
    id: 'cus_008',
    name: 'Ayesha Siddiqui',
    phone: '0302-8642097',
    address: 'House 18, F-8/3',
    city: 'Islamabad',
    notes: 'Gate code is shared by phone only.',
    createdAt: '2026-05-12T15:05:00.000Z',
    updatedAt: '2026-05-20T09:40:00.000Z',
  },
];