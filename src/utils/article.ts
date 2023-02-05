/* eslint-disable */

import { Article } from '@/components/Home';
import glob from 'fast-glob';
import * as path from 'path';

async function importArticle(articleFilename: string): Promise<Article> {
  const { meta } = await import(`../pages/articles/${articleFilename}`);
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  });

  const articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort(
    (a, z) => new Date(z.date).valueOf() - new Date(a.date).valueOf(),
  );
}
