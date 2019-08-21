import faker from 'faker';
import { Article } from '../../models/article';

/**
 * Article type for testing
 * @interface ArticleTest
 */
export interface ArticleTest {
  title: Article['title'];
  content: Article['content'];
  image: Article['image'];
  tags: Article['tags'];
}

/**
 * Generate mock data of article
 * @param num Count of generated data, defaults to 3
 * @returns Mock data of article
 */
const mocksGenerator = (num = 3): ArticleTest[] => {
  const mocks: ArticleTest[] = [];
  for (let index = 0; index < num; index += 1) {
    const mock: ArticleTest = {
      title: faker.lorem.words(),
      content: faker.lorem.paragraphs(),
      image: faker.image.image(),
      tags: faker.company.suffixes(),
    };
    mocks.push(mock);
  }
  return mocks;
};

export default mocksGenerator;
