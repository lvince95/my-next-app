import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { CheckCircleIcon } from '../Icons/CheckCircleIcon';
import { ExclamationCircleIcon } from '../Icons/ExclamationCircleIcon';
import { InformationCircleIcon } from '../Icons/InformationCircleIcon';
import { XCircleIcon } from '../Icons/XCircleIcon';
import { XMarkIcon } from '../Icons/XMarkIcon';

const icons = {
  info: (
    <InformationCircleIcon
      className="h-6 w-6 text-blue-500"
      aria-hidden="true"
    />
  ),
  success: (
    <CheckCircleIcon className="h-6 w-6 text-teal-500" aria-hidden="true" />
  ),
  warning: (
    <ExclamationCircleIcon
      className="h-6 w-6 text-yellow-500"
      aria-hidden="true"
    />
  ),
  error: <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />,
};

export type NotificationProps = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      onDismiss(id);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-600"
      >
        <div className="p-4" role="alert" aria-label={title}>
          <div className="flex items-start">
            <div className="mt-0.5 flex-shrink-0">{icons[type]}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {message}
              </p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-100"
                onClick={() => {
                  onDismiss(id);
                }}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
