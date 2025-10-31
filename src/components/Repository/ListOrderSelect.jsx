import { Picker } from "@react-native-picker/picker";

const ListOrderSelect = ({ sortKey, setSortKey }) => {
  return (
    <Picker selectedValue={sortKey} onValueChange={setSortKey}>
      <Picker.Item label="Latest repositories" value="latestRepo" />
      <Picker.Item label="Highest rated repositories" value="highestRate" />
      <Picker.Item label="Lowest rated repositories" value="lowestRate" />
    </Picker>
  );
};

export default ListOrderSelect;
