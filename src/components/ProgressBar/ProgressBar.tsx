import React from 'react';
import { Props } from './types';
import './styles.css';
import { Position } from '../Position/Position';
import { interpolateTimeToPercentage } from '../../utils/interpolate';
import { Sizes } from '../../constants/sizes';
import { dateToUnix } from '../../constants/dateToUnix';

export const ProgressBar = ({
  departureTime,
  arrivalTime,
  portOfLoading,
  portOfDischarging,
}: Props) => {
  const now = dateToUnix(new Date());
  const unixDepartureTime = dateToUnix(departureTime);
  const unixArrivalTime = dateToUnix(arrivalTime);

  const invalidInput =
    unixDepartureTime === 0 ||
    unixArrivalTime === 0 ||
    isNaN(unixDepartureTime) ||
    isNaN(unixArrivalTime);

  if (invalidInput) {
    return <h1>Invalid start or arrival dates, please try again.</h1>; // Would be converted to user locale
  }

  const hasDeparted = now > unixDepartureTime ? 'dark' : 'light';
  const hasArrived = now > unixArrivalTime ? 'dark' : 'light';

  const distanceTraveled = interpolateTimeToPercentage({
    input: [unixDepartureTime, unixArrivalTime],
    value: now,
  });

  const renderTerminalDot = ({
    extraClass,
    portName,
  }: {
    extraClass: string;
    portName: string;
  }) => {
    return (
      <div
        className={'dot terminalDotContainer ' + extraClass}
        style={{
          height: Sizes.terminalDotSize,
          width: Sizes.terminalDotSize,
        }}
      >
        <p className='portName'>{portName}</p>
      </div>
    );
  };

  const renderDots = () => {
    const numberOfProgressDots = 12; // This could be a prop - different number of dots for different screen sizes
    const progressDotsIndexLength = numberOfProgressDots + 1;
    const totalNumberOfDots = numberOfProgressDots + 2;

    const dotTimeDifference =
      (unixArrivalTime - unixDepartureTime) / progressDotsIndexLength;

    return Array(totalNumberOfDots)
      .fill(true)
      .map((_, index) => {
        const dotTime = unixDepartureTime + dotTimeDifference * index;
        const percentAgainstDeparture = interpolateTimeToPercentage({
          input: [unixDepartureTime, unixArrivalTime],
          value: dotTime,
        });

        const dotPassed = percentAgainstDeparture <= distanceTraveled;

        const renderDotContent = () => {
          // Departure dot
          if (index === 0) {
            return renderTerminalDot({
              extraClass: hasDeparted,
              portName: portOfLoading,
            });
          }

          // Arrival dot
          if (index === progressDotsIndexLength) {
            return renderTerminalDot({
              extraClass: hasArrived,
              portName: portOfDischarging,
            });
          }

          // Progress dots
          return (
            <div
              className={'dot ' + (dotPassed ? 'dark' : 'light')}
              style={{
                height: Sizes.progressDotSize,
                width: Sizes.progressDotSize,
              }}
            />
          );
        };

        // Dots wrapped in 0 width containers for pinpoint accuracy
        return <div className='singlePointContainer'>{renderDotContent()}</div>;
      });
  };

  return (
    <>
      <div className='progressPoints' style={{ width: Sizes.componentWidth }}>
        <div className='progressBar'>
          <Position distanceTraveled={distanceTraveled} />
        </div>
        {renderDots()}
      </div>
    </>
  );
};
