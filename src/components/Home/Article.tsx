import { formatDate } from '@/utils/formatDate';
import { Card } from '../Layout';

export type Article = {
  slug: string;
  author: string;
  date: string;
  title: string;
  description: string;
};

type ArticleProps = {
  article: Article;
};

export const Article = ({ article }: ArticleProps) => {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
};
