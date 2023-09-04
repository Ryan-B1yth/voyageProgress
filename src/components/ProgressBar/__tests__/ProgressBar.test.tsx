import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar component', () => {
  const now = Date.now();
  test('should render invalid text', () => {
    render(
      <ProgressBar
        departureTime={''}
        arrivalTime={''}
        portOfLoading='Place1'
        portOfDischarging='Place2'
      />
    );
    expect(
      screen.getByText('Invalid start or arrival dates, please try again.')
    ).toBeTruthy();
  });

  test('should render place names', () => {
    render(
      <ProgressBar
        departureTime={'09-01-2023'}
        arrivalTime={'09-02-2023'}
        portOfLoading='Place1'
        portOfDischarging='Place2'
      />
    );
    expect(screen.getByText('Place1')).toBeTruthy();
    expect(screen.getByText('Place2')).toBeTruthy();
    expect(
      screen.queryByText('Invalid start or arrival dates, please try again.')
    ).toBeFalsy();
  });

  test('should render correct number of dark blue dots', () => {
    const complete = render(
      <ProgressBar
        departureTime={new Date(now - 2000000)}
        arrivalTime={new Date(now - 1000000)}
        portOfLoading='Place1'
        portOfDischarging='Place2'
      />
    );
    expect(complete.container.getElementsByClassName('dark').length).toBe(14);

    const notStarted = render(
      <ProgressBar
        departureTime={new Date(now + 1000000)}
        arrivalTime={new Date(now + 2000000)}
        portOfLoading='Place1'
        portOfDischarging='Place2'
      />
    );
    expect(notStarted.container.getElementsByClassName('dark').length).toBe(0);

    const inProgress = render(
      <ProgressBar
        departureTime={new Date(now - 1000000)}
        arrivalTime={new Date(now + 1000000)}
        portOfLoading='Place1'
        portOfDischarging='Place2'
      />
    );
    expect(inProgress.container.getElementsByClassName('dark').length).toBe(7);
  });

  const data = [
    {
      minus: 500,
      plus: 900500,
      result: 0,
    },
    {
      minus: 100000,
      plus: 9900000,
      result: 1,
    },
    {
      minus: 1000000,
      plus: 1000000,
      result: 50,
    },
    {
      minus: 50000,
      plus: 1000,
      result: 98,
    },
  ];

  test.each(data)('correct indicator position', ({ minus, plus, result }) => {
    const { container } = render(
      <ProgressBar
        departureTime={new Date(now - minus)}
        arrivalTime={new Date(now + plus)}
        portOfLoading='Place1'
        portOfDischarging='Place2'
      />
    );

    const indicatorStyle = window.getComputedStyle(
      container.getElementsByClassName('positionContainer')[0]
    );

    // Formatted as time taken to run tests changes every time
    // altering the final percentage by 0.1 on some (but not all) runs
    // failing the test only sometimes. This is just to prevent that.
    const formattedNumber = Math.floor(
      Number(indicatorStyle.left.replace('%', ''))
    );

    expect(formattedNumber).toBe(result);
  });
});
