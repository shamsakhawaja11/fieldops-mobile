import { create } from 'zustand';
import {
  CreateCustomerInput,
  Customer,
  UpdateCustomerInput,
} from '../types/customer.types';
import { Id } from '../../../shared/types/common';
import { SAMPLE_CUSTOMERS } from '../data/customers.sample';

/**
 * Generates a unique customer id such as "cus_1718524800000_x7k2".
 * Timestamp + random suffix avoids collisions with seed ids (cus_001...).
 */
const generateCustomerId = (): Id =>
  `cus_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

interface CustomersState {
  customers: Customer[];

  addCustomer: (input: CreateCustomerInput) => Customer;
  updateCustomer: (id: Id, changes: UpdateCustomerInput) => Customer | null;
  deleteCustomer: (id: Id) => boolean;
  getCustomerById: (id: Id) => Customer | undefined;
}

export const useCustomersStore = create<CustomersState>((set, get) => ({
  customers: SAMPLE_CUSTOMERS,

  addCustomer: (input) => {
    const now = new Date().toISOString();
    const newCustomer: Customer = {
      ...input,
      id: generateCustomerId(),
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({ customers: [newCustomer, ...state.customers] }));
    return newCustomer;
  },

  updateCustomer: (id, changes) => {
    const existing = get().customers.find((c) => c.id === id);
    if (!existing) {
      return null;
    }

    const updated: Customer = {
      ...existing,
      ...changes,
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      customers: state.customers.map((c) => (c.id === id ? updated : c)),
    }));
    return updated;
  },

  deleteCustomer: (id) => {
    const exists = get().customers.some((c) => c.id === id);
    if (!exists) {
      return false;
    }

    // TODO (Work Orders feature): block deletion when the customer
    // has active work orders, and remove their equipment.
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id),
    }));
    return true;
  },

  getCustomerById: (id) => get().customers.find((c) => c.id === id),
}));