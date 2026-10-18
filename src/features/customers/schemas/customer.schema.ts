import { z } from 'zod';

/** Limits live in one place so the schema and the UI hints can share them. */
export const CUSTOMER_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  addressMin: 5,
  addressMax: 160,
  cityMin: 2,
  cityMax: 50,
  notesMax: 500,
} as const;

/**
 * Pakistani mobile number: 03XX-XXXXXXX. The hyphen is optional.
 * Matches: 0300-1234567, 03001234567
 */
const MOBILE_REGEX = /^03\d{2}-?\d{7}$/;

/**
 * Pakistani landline: 0 + area code (2 or 3 digits) + 6 to 8 digit number.
 * The hyphen is optional.
 * Matches: 051-5551234, 042-3555678, 0512345678
 */
const LANDLINE_REGEX = /^0\d{2,3}-?\d{6,8}$/;

const isValidPhone = (value: string): boolean =>
  MOBILE_REGEX.test(value) || LANDLINE_REGEX.test(value);

/**
 * Validation rules for the customer form.
 * Every message is written for the end user, because the TextField
 * component displays it exactly as written under the input.
 */
export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CUSTOMER_LIMITS.nameMin, 'Name must be at least 2 characters')
    .max(CUSTOMER_LIMITS.nameMax, 'Name must be 80 characters or fewer'),

  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .refine(isValidPhone, 'Enter a valid number, e.g. 0300-1234567 or 051-5551234'),

  address: z
    .string()
    .trim()
    .min(CUSTOMER_LIMITS.addressMin, 'Address must be at least 5 characters')
    .max(CUSTOMER_LIMITS.addressMax, 'Address must be 160 characters or fewer'),

  city: z
    .string()
    .trim()
    .min(CUSTOMER_LIMITS.cityMin, 'City is required')
    .max(CUSTOMER_LIMITS.cityMax, 'City must be 50 characters or fewer'),

  notes: z
    .string()
    .trim()
    .max(CUSTOMER_LIMITS.notesMax, 'Notes must be 500 characters or fewer')
    .optional(),
});

/** The shape of the form's data, derived from the schema. */
export type CustomerFormValues = z.infer<typeof customerSchema>;

/** Starting values for create mode. Inputs need strings, never undefined. */
export const CUSTOMER_FORM_DEFAULTS: CustomerFormValues = {
  name: '',
  phone: '',
  address: '',
  city: '',
  notes: '',
};