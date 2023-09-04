import React from 'react';
import './styles.css';
import icon from '../../assets/images/boatIcon.png';

export const PositionIndicator = () => {
  return (
    <div className='positionIndicator'>
      <div className='iconContainer'>
        <img src={icon} alt='Boat icon' />
      </div>
    </div>
  );
};
