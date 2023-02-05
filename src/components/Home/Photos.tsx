import Image from 'next/image';
import image1 from '@/images/photos/image-1.webp';
import image2 from '@/images/photos/image-2.webp';
import image3 from '@/images/photos/image-3.webp';
import image4 from '@/images/photos/image-4.webp';
import image5 from '@/images/photos/image-5.webp';
import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const Photos = () => {
  const animationControls = useAnimation();
  const animationControlsInversed = useAnimation();

  const sequence = async () => {
    await animationControls.start({
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.2,
      },
    });
    await animationControls.start({
      scale: 1.05,
      transition: { ease: 'easeInOut', duration: 1 },
    });
    await animationControls.start({
      rotate: 3,
      transition: { ease: 'easeInOut', duration: 1 },
    });
    await animationControls.start({
      scale: 1,
      transition: { ease: 'easeInOut', duration: 1 },
    });
    animationControls.start({
      rotate: -3,
      scale: 1.05,
      transition: {
        ease: 'easeInOut',
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    });
  };

  const sequenceReversed = async () => {
    await animationControlsInversed.start({
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    });
    await animationControlsInversed.start({
      scale: 1,
      transition: { ease: 'easeInOut', duration: 1, delay: 0.2 },
    });
    await animationControlsInversed.start({
      rotate: -3,
      transition: { ease: 'easeInOut', duration: 1 },
    });
    await animationControlsInversed.start({
      scale: 1.05,
      transition: { ease: 'easeInOut', duration: 1 },
    });
    animationControlsInversed.start({
      rotate: 3,
      scale: 1,
      transition: {
        ease: 'easeInOut',
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    });
  };

  useEffect(() => {
    sequence();
    sequenceReversed();
  }, []);

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, index) => (
          <motion.div
            key={image.src}
            initial={
              index % 2 === 0 ? { x: -500, opacity: 0 } : { x: 500, opacity: 0 }
            }
            animate={
              index % 2 === 0 ? animationControls : animationControlsInversed
            }
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700/40 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover "
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
