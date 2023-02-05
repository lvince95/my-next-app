import Head from 'next/head';
import { Card } from '@/components/Layout/';
import { SimpleLayoutWithAnimation } from '@/components/Layout/';
import { getAllArticles } from '@/utils/article';
import { formatDate } from '@/utils/formatDate';
import { InferGetStaticPropsType } from 'next';
import { motion } from 'framer-motion';

type Article = {
  slug: string;
  author: string;
  date: string;
  title: string;
  description: string;
};

type ArticleProps = { article: Article };

const Article = ({ article }: ArticleProps) => {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow as="time" className="md:hidden" decorate>
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow as="time" className="mt-1 hidden md:block">
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
};

const ArticlesIndex = ({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Articles - Vincent Lim</title>
        <meta
          name="description"
          content="My thoughts about topics I'm interested in such as programming."
        />
      </Head>
      <SimpleLayoutWithAnimation
        title="Writing on some of the things that I've done, as well as things that pique my interest."
        intro="All of the articles I'll be writing will be collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles?.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ x: -300, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.2,
                  },
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Article key={article.slug} article={article} />
              </motion.div>
            ))}
          </div>
        </div>
      </SimpleLayoutWithAnimation>
    </>
  );
};

export default ArticlesIndex;

export const getStaticProps = async () => {
  return {
    props: {
      articles: (await getAllArticles()).slice(0, 4),
    },
  };
};
