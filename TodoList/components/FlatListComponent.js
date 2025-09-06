import { FlatList, StyleSheet } from 'react-native';

const FlatListComponent = ({ 
  data, 
  renderItem, 
  keyExtractor,
  style,
  contentContainerStyle,
  horizontal = false,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  ItemSeparatorComponent,
  ListEmptyComponent,
  ...props 
}) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={[styles.flatList, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      horizontal={horizontal}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ListEmptyComponent}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
});

export default FlatListComponent;
