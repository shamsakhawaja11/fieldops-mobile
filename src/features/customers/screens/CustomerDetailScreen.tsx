import React, { useCallback } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { format, parseISO } from 'date-fns';
import { CustomersStackScreenProps } from '../../../navigation/types';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import {
  colors,
  fontSize,
  fontWeight,
  radius,
  spacing,
} from '../../../shared/theme/theme';
import { useCustomersStore } from '../store/customers.store';

type Props = CustomersStackScreenProps<'CustomerDetail'>;

const formatDate = (iso: string): string => format(parseISO(iso), 'd MMM yyyy');

interface InfoRowProps {
  label: string;
  value: string;
}

/** One "label: value" line inside a section card. */
const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export const CustomerDetailScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { customerId } = route.params;

  // Read fresh data by id. After an edit, this screen updates by itself.
  const customer = useCustomersStore((state) =>
    state.customers.find((c) => c.id === customerId),
  );
  const deleteCustomer = useCustomersStore((state) => state.deleteCustomer);

  const handleEdit = useCallback(() => {
    navigation.navigate('CustomerForm', { customerId });
  }, [navigation, customerId]);

  const handleCall = useCallback(() => {
    if (!customer) {
      return;
    }
    Linking.openURL(`tel:${customer.phone}`).catch(() => {
      Alert.alert('Cannot place call', 'This device cannot make phone calls.');
    });
  }, [customer]);

  const handleDelete = useCallback(() => {
    if (!customer) {
      return;
    }
    Alert.alert(
      'Delete customer?',
      `${customer.name} will be permanently removed. This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            navigation.goBack();
            deleteCustomer(customer.id);
          },
        },
      ],
    );
  }, [customer, deleteCustomer, navigation]);

  // Happens if the id is wrong, or the customer was just deleted.
  if (!customer) {
    return (
      <View style={styles.screen}>
        <EmptyState
          title="Customer not found"
          message="This customer may have been deleted."
          actionLabel="Go back"
          onAction={navigation.goBack}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.headerCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {customer.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{customer.name}</Text>
        <Text style={styles.city}>{customer.city}</Text>
      </Card>

      <Text style={styles.sectionTitle}>Contact</Text>
      <Card>
        <InfoRow label="Phone" value={customer.phone} />
        <InfoRow label="Address" value={customer.address} />
        <InfoRow label="City" value={customer.city} />
        <Button
          label="Call customer"
          variant="secondary"
          onPress={handleCall}
          style={styles.callButton}
        />
      </Card>

      {customer.notes ? (
        <>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Card>
            <Text style={styles.notes}>{customer.notes}</Text>
          </Card>
        </>
      ) : null}

      <Text style={styles.sectionTitle}>Record</Text>
      <Card>
        <InfoRow label="Customer since" value={formatDate(customer.createdAt)} />
        <InfoRow label="Last updated" value={formatDate(customer.updatedAt)} />
      </Card>

      <View style={styles.actions}>
        <Button label="Edit customer" onPress={handleEdit} fullWidth />
        <Button
          label="Delete customer"
          variant="danger"
          onPress={handleDelete}
          fullWidth
          style={styles.deleteButton}
        />
      </View>
    </ScrollView>
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
  headerCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  name: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  city: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  infoRow: {
    marginBottom: spacing.md,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  callButton: {
    marginTop: spacing.xs,
  },
  notes: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  actions: {
    marginTop: spacing.xl,
  },
  deleteButton: {
    marginTop: spacing.sm,
  },
});