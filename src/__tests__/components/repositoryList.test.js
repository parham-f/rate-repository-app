import { FlatList, View, StyleSheet} from 'react-native';
import { render, within, screen } from '@testing-library/react-native';
import RepositoryItem from '../../components/RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes =
      repositories?.edges?.map(e => e.node) ??
      repositories ??
      [];
    return (
        <FlatList
          data={repositoryNodes}
          renderItem={({ item }) => <RepositoryItem item={item} />}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={(item) => item.id}
        />
      );
};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories}/>)

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      
      expect(within(firstRepositoryItem).getByText('jaredpalmer/formik')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('Build forms in React, without the tears')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('TypeScript')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('21.8k')).toBeDefined();
      expect(within(firstRepositoryItem).getByText('1.6k')).toBeDefined();

      expect(within(secondRepositoryItem).getByText('async-library/react-async')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('Flexible promise-based React data loader')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('JavaScript')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('69')).toBeDefined();
      expect(within(secondRepositoryItem).getByText('1.7k')).toBeDefined();

      screen.debug();
    });
  });
});