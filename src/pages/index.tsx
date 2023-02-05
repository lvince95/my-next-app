import Head from 'next/head';
import { Container } from '@/components/Layout';
import { getAllArticles } from '@/utils/article';
import { InferGetStaticPropsType } from 'next';
import { motion } from 'framer-motion';
import { Article, Newsletter, Photos } from '@/components/Home';
import { Resume } from '@/components/Home';
import { WavyText } from '@/components/Home/WavyText';

const containerVariants = {
  hidden: {
    y: 200,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Home = ({
  articles,
}: Partial<InferGetStaticPropsType<typeof getStaticProps>>) => {
  return (
    <>
      <Head>
        <title>Vincent Lim</title>
        <meta
          name="description"
          content="I'm Vincent, a software developer based in Kuala Lumpur, Malaysia. I enjoy building React applications. This application is built using Next.js, a meta framework with React at it's core."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <WavyText
            text="Hi, I'm Vincent"
            className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 25,
              },
            }}
            className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
          >
            There isn&#39t much on my website at the moment, but feel free to
            play around with the calculator and the fund deposits if you wish to
            do so. I&#39ve written articles describing their implementation if
            you&#39re interested in learning how they work.
          </motion.p>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles?.map((article, index) => (
              <motion.div
                key={article.slug ? article.slug : Math.random()}
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10 lg:pl-16 xl:pl-24"
          >
            <Newsletter />
            <Resume />
          </motion.div>
        </div>
      </Container>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  return {
    props: {
      articles: (await getAllArticles()).slice(0, 4),
    },
  };
};
