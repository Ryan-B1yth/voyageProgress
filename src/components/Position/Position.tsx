import React from 'react';
import { Props } from './types';
import './styles.css';
import { PositionIndicator } from '../PositionIndicator/PositionIndicator';

export const Position = ({ distanceTraveled }: Props) => {
  const leftPush = { left: `${distanceTraveled}%` };

  return (
    <div className='positionContainer' style={leftPush}>
      <div className='positionIndicatorWrapper'>
        <PositionIndicator />
      </div>
    </div>
  );
};
