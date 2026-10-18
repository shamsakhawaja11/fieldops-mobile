import { Id, IsoDateString, Timestamps } from '../../../shared/types/common';

/**
 * A customer is a person or business that requests field services.
 * Equipment and work orders will reference a customer by `id` only,
 * never by embedding a copy of the customer object.
 */
export interface Customer extends Timestamps {
  id: Id;
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

/**
 * Data the user supplies when creating a customer.
 * The store generates `id`, `createdAt`, and `updatedAt`,
 * so the form must never be responsible for them.
 */
export type CreateCustomerInput = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Data the user supplies when editing a customer.
 * Partial because an edit may change only one field.
 */
export type UpdateCustomerInput = Partial<CreateCustomerInput>;

/** Convenience alias used by sorting helpers later. */
export type CustomerSortKey = 'name' | 'createdAt';

export type { IsoDateString };