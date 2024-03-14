import React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';

interface RootContainer {
  children: React.ReactElement | React.ReactElement[];
  backgroundColor: string;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const RootContainer = ({
  children,
  backgroundColor,
  refreshing,
  onRefresh,
}: RootContainer) => {
  return (
    <>
      <ScrollView
        style={[styles.container, {backgroundColor}]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          refreshing !== undefined && onRefresh !== undefined ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }>
        {children}
      </ScrollView>
    </>
  );
};

export default RootContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
