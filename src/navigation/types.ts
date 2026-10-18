import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Id } from '../shared/types/common';

/**
 * Screens inside the Customers tab and the params each one needs.
 * `undefined` means "this screen takes no params".
 */
export type CustomersStackParamList = {
  CustomersList: undefined;
  CustomerDetail: { customerId: Id };
  /** No customerId = create mode. With a customerId = edit mode. */
  CustomerForm: { customerId?: Id } | undefined;
};

/**
 * The bottom tabs. The Customers tab contains its own stack,
 * so its params are the nested navigator's params.
 */
export type RootTabParamList = {
  Dashboard: undefined;
  WorkOrders: undefined;
  Customers: NavigatorScreenParams<CustomersStackParamList>;
  Technicians: undefined;
  More: undefined;
};

/** Props received by a screen inside the Customers stack. */
export type CustomersStackScreenProps<T extends keyof CustomersStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CustomersStackParamList, T>,
    BottomTabScreenProps<RootTabParamList>
  >;

/** Tells React Navigation our route names so useNavigation() is typed everywhere. */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}