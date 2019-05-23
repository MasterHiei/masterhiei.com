import faker from 'faker';
import { ArticleInput } from '../../models/article';

/**
 * Generate random data
 * @param num dataCount defaults to 3
 * @returns List of articles
 */
const mockGenerator = (num = 3): ArticleInput[] => {
  const mocks: ArticleInput[] = [];
  for (let index = 0; index < num; index += 1) {
    const mock: ArticleInput = {
      title: faker.lorem.words(),
      content: faker.lorem.paragraphs(),
      image: faker.image.image(),
      tags: faker.company.suffixes(),
    };
    mocks.push(mock);
  }
  return mocks;
};

export default mockGenerator;
