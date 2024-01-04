
import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList'
describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = [
                {
                    "fullName": "jaredpalmer/formik",
                    "description": "Build forms in React, without the tears 😭 ",
                    "language": "TypeScript",
                    "forksCount": 2773,
                    "stargazersCount": 33176,
                    "ratingAverage": 90,
                    "reviewCount": 5,
                },
                {
                    "fullName": "async-library/react-async",
                    "description": "🍾 Flexible promise-based React data loader",
                    "language": "JavaScript",
                    "forksCount": 94,
                    "stargazersCount": 2140,
                    "ratingAverage": 72,
                    "reviewCount": 3,
                },
            ]
            render(<RepositoryListContainer repositories={repositories} />)

            screen.debug();

            const repositoryItems = screen.getAllByTestId('repositoryItem');
            const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

            const contents = repositories.map(i => Object.values(i))
            for (let item of contents[0]) {
                expect(firstRepositoryItem).toHaveTextContent(item);
            }
            for (let item of contents[1]) {
                expect(secondRepositoryItem).toHaveTextContent(item);
            }
            
        });
    });
});