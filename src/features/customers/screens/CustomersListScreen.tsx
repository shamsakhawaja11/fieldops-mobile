import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { CustomersStackScreenProps } from '../../../navigation/types';
import { Card } from '../../../shared/components/Card';
import { EmptyState } from '../../../shared/components/EmptyState';
import { FloatingActionButton } from '../../../shared/components/FloatingActionButton';
import { SearchBar } from '../../../shared/components/SearchBar';
import {
  colors,
  fontSize,
  fontWeight,
  radius,
  spacing,
} from '../../../shared/theme/theme';
import { useCustomersStore } from '../store/customers.store';
import { Customer } from '../types/customer.types';

type Props = CustomersStackScreenProps<'CustomersList'>;

/** Space at the bottom of the list so the last card is not hidden by the FAB. */
const LIST_BOTTOM_PADDING = 96;

/**
 * Case-insensitive match on name, phone, city, and address.
 * Kept outside the component because it is a pure function:
 * same input, same output, no dependence on React.
 */
const matchesQuery = (customer: Customer, query: string): boolean => {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) {
    return true;
  }
  return [customer.name, customer.phone, customer.city, customer.address].some(
    (field) => field.toLowerCase().includes(needle),
  );
};

/** "Ahmed Raza" -> "AR", "Al-Noor Pharmacy" -> "AP". */
const getInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

interface CustomerRowProps {
  customer: Customer;
  onPress: (customerId: string) => void;
}

/**
 * One row of the list. React.memo skips re-rendering a row
 * when its props did not change, which keeps typing in the
 * search box smooth as the list grows.
 */
const CustomerRow = React.memo<CustomerRowProps>(({ customer, onPress }) => (
  <Card
    onPress={() => onPress(customer.id)}
    accessibilityLabel={`${customer.name}, ${customer.city}`}
    style={styles.row}
  >
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{getInitials(customer.name)}</Text>
    </View>

    <View style={styles.rowContent}>
      <Text style={styles.name} numberOfLines={1}>
        {customer.name}
      </Text>
      <Text style={styles.detail} numberOfLines={1}>
        {customer.phone}
      </Text>
      <Text style={styles.detail} numberOfLines={1}>
        {customer.city}
      </Text>
    </View>
  </Card>
));

CustomerRow.displayName = 'CustomerRow';

export const CustomersListScreen: React.FC<Props> = ({ navigation }) => {
  // Subscribe to the array only, so this screen re-renders only when it changes.
  const customers = useCustomersStore((state) => state.customers);
  const [query, setQuery] = useState('');

  // Derived value: recomputed only when the array or the query changes.
  const filteredCustomers = useMemo(
    () => customers.filter((customer) => matchesQuery(customer, query)),
    [customers, query],
  );

  const handleOpenDetail = useCallback(
    (customerId: string) => {
      navigation.navigate('CustomerDetail', { customerId });
    },
    [navigation],
  );

  const handleAdd = useCallback(() => {
    navigation.navigate('CustomerForm');
  }, [navigation]);

  const renderItem: ListRenderItem<Customer> = useCallback(
    ({ item }) => <CustomerRow customer={item} onPress={handleOpenDetail} />,
    [handleOpenDetail],
  );

  const isSearching = query.trim().length > 0;

  const renderEmpty = () =>
    isSearching ? (
      <EmptyState
        title="No matches found"
        message={`Nothing matches "${query.trim()}". Try a name, phone number, or city.`}
      />
    ) : (
      <EmptyState
        title="No customers yet"
        message="Add your first customer to start creating work orders."
        actionLabel="Add customer"
        onAction={handleAdd}
      />
    );

  return (
    <View style={styles.screen}>
      <View style={styles.searchWrapper}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search name, phone, or city"
        />
        <Text style={styles.count}>
          {filteredCustomers.length}{' '}
          {filteredCustomers.length === 1 ? 'customer' : 'customers'}
        </Text>
      </View>

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />

      <FloatingActionButton
        onPress={handleAdd}
        accessibilityLabel="Add customer"
      />
    </View>
  );
};

const Separator: React.FC = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchWrapper: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  count: {
    marginTop: spacing.sm,
    marginLeft: spacing.xs,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: LIST_BOTTOM_PADDING,
  },
  separator: {
    height: spacing.sm + 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  rowContent: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  detail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});