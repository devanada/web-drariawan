import { Icon } from '@iconify/react';
import { useDashboard } from '../store/apiDashboard';

type InformationCardProps = {
  title: string;
  value: number;
  gradientColors: string;
  iconClass: string;
};

const InformationCard = ({
  title,
  value,
  gradientColors,
  iconClass,
}: InformationCardProps) => {
  const { error } = useDashboard();

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-row -mx-3">
            <div className="flex-none w-2/3 max-w-full px-3">
              <div>
                <p className="mb-0 font-sans text-sm font-semibold leading-normal dark:text-black dark:opacity-60">
                  {title}
                </p>
                <h5 className="mb-2 font-bold dark:text-black">
                  {value !== undefined ? value : 'Loading...'}
                </h5>
              </div>
            </div>
            <div className="px-3 text-right basis-1/3">
              <div
                className={`inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl ${gradientColors}`}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  className="text-white"
                  icon={iconClass}
                  style={{ fontSize: '24px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
