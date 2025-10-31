import { Searchbar } from "react-native-paper";
import theme from "../../theme";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Searchbar
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        margin: 15,
        marginBottom: 0,
      }}
      theme={{ colors: { primary: theme.colors.primary } }}
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchBar;
