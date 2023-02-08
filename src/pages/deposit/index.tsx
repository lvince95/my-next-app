import Head from 'next/head';
import { SimpleLayout } from '@/components/Layout';
import { Button } from '@/components/Elements';
import { DeviceArrowIcon } from '@/icons/DeviceArrowIcon';
import { DeviceChartIcon } from '@/icons/DeviceChartIcon';
import { DeviceClockIcon } from '@/icons/DeviceClockIcon';
import { DeviceCardsIcon } from '@/icons/DeviceCardsIcon';
import { useRouter } from 'next/router';

const features = [
  {
    name: 'Invest any amount',
    description:
      'Whether it is $1 or $1,000,000, we can put your money to work for you.',
    icon: DeviceArrowIcon,
  },
  {
    name: 'Build a balanced portfolio',
    description:
      'Invest in different industries to find the most opportunities to win huge.',
    icon: DeviceChartIcon,
  },
  {
    name: 'Trade in real-time',
    description:
      'Get insider tips on big stock moves and act on them within seconds.',
    icon: DeviceClockIcon,
  },
  {
    name: 'Portfolio tracking',
    description:
      'Watch your investments grow exponentially, leaving other investors in the dust.',
    icon: DeviceCardsIcon,
  },
];

const Deposit = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Deposit Funds</title>
        <meta
          name="description"
          content="Deposit funds to your portfolios. Investment now goes a long way towards building your portfolios and securing your future."
        />
      </Head>
      <SimpleLayout title="" intro="">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-teal-600">
              Now is the time to build your portfolio.
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              With typical market returns, you have to start young to secure
              your future. With us, it&apos;s never too late to build your nest
              egg.
            </p>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Our application was built for investors like you who play by their
              own rules and aren&apos;t going to let SEC regulations get in the
              way of their dreams. If other investing tools are afraid to build
              it, we have it.
            </p>
            <Button
              className="mt-8 w-full flex-none sm:text-lg lg:w-40"
              variant="teal"
              onClick={() => router.push('/deposit/deposit-plan')}
            >
              Invest Now
            </Button>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-zinc-900 dark:text-zinc-100">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg dark:bg-zinc-300">
                      <feature.icon className="h-8 w-8 " aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SimpleLayout>
    </>
  );
};

export default Deposit;
