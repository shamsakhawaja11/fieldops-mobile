import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { CustomersStackScreenProps } from '../../../navigation/types';
import { Button } from '../../../shared/components/Button';
import { EmptyState } from '../../../shared/components/EmptyState';
import { TextField } from '../../../shared/components/TextField';
import { colors, spacing } from '../../../shared/theme/theme';
import {
  CUSTOMER_FORM_DEFAULTS,
  CUSTOMER_LIMITS,
  CustomerFormValues,
  customerSchema,
} from '../schemas/customer.schema';
import { useCustomersStore } from '../store/customers.store';

type Props = CustomersStackScreenProps<'CustomerForm'>;

export const CustomerFormScreen: React.FC<Props> = ({ navigation, route }) => {
  // No params at all (create) and params without an id are both create mode.
  const customerId = route.params?.customerId;
  const isEditMode = customerId !== undefined;

  const existingCustomer = useCustomersStore((state) =>
    customerId ? state.customers.find((c) => c.id === customerId) : undefined,
  );
  const addCustomer = useCustomersStore((state) => state.addCustomer);
  const updateCustomer = useCustomersStore((state) => state.updateCustomer);

  // Refs let the keyboard's "Next" key jump to the following field.
  const phoneRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const notesRef = useRef<TextInput>(null);

  // Starting values: the saved customer in edit mode, empty strings in create mode.
  const defaultValues = useMemo<CustomerFormValues>(
    () =>
      existingCustomer
        ? {
            name: existingCustomer.name,
            phone: existingCustomer.phone,
            address: existingCustomer.address,
            city: existingCustomer.city,
            notes: existingCustomer.notes ?? '',
          }
        : CUSTOMER_FORM_DEFAULTS,
    [existingCustomer],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues,
    mode: 'onTouched',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? 'Edit Customer' : 'New Customer',
    });
  }, [navigation, isEditMode]);

  // Runs only when every field passed the Zod schema.
  const onValid = useCallback(
    (values: CustomerFormValues) => {
      // The schema allows an empty notes box. Never store '' in the data.
      const notes = values.notes ? values.notes : undefined;
      const input = { ...values, notes };

      if (isEditMode && customerId) {
        const updated = updateCustomer(customerId, input);
        if (updated) {
          navigation.goBack();
        }
        return;
      }

      const created = addCustomer(input);
      // replace (not navigate) so Back from the detail screen returns to the list.
      navigation.replace('CustomerDetail', { customerId: created.id });
    },
    [addCustomer, updateCustomer, customerId, isEditMode, navigation],
  );

  // Edit mode with an id that does not exist in the store.
  if (isEditMode && !existingCustomer) {
    return (
      <View style={styles.screen}>
        <EmptyState
          title="Customer not found"
          message="This customer may have been deleted."
          actionLabel="Go back"
          onAction={() => navigation.goBack()}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="Name"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
              placeholder="e.g. Ahmed Raza"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => phoneRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              ref={phoneRef}
              label="Phone"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
              hint="Mobile: 0300-1234567. Landline: 051-5551234"
              placeholder="0300-1234567"
              keyboardType="phone-pad"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => addressRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              ref={addressRef}
              label="Address"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.address?.message}
              placeholder="House, street, area"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => cityRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="city"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              ref={cityRef}
              label="City"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.city?.message}
              placeholder="e.g. Rawalpindi"
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => notesRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              ref={notesRef}
              label="Notes"
              value={value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.notes?.message}
              hint={`${(value ?? '').length}/${CUSTOMER_LIMITS.notesMax}`}
              placeholder="Gate code, preferred time, special instructions"
              multiline
            />
          )}
        />

        <Button
          label={isEditMode ? 'Save changes' : 'Create customer'}
          onPress={handleSubmit(onValid)}
          loading={isSubmitting}
          fullWidth
          style={styles.submit}
        />
        <Button
          label="Cancel"
          variant="ghost"
          onPress={() => navigation.goBack()}
          fullWidth
          style={styles.cancel}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  submit: {
    marginTop: spacing.md,
  },
  cancel: {
    marginTop: spacing.sm,
  },
});