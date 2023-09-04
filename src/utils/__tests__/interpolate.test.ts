import { interpolate } from '../interpolate';

const data = [
  {
    input: [10, 20],
    output: [100, 300],
    value: 15,
    result: 200,
  },
  {
    input: [124, 345],
    output: [100, 300],
    value: 200,
    result: 169,
  },
  {
    input: [10, 20],
    output: [100, 300],
    value: 5,
    result: 100,
  },
  {
    input: [10, 20],
    output: [100, 300],
    value: 30,
    result: 300,
  },
];

describe('interpolate function', () => {
  test.each(data)(
    'produces correct output',
    ({ input, output, value, result }) => {
      const finalValue = interpolate({
        // @ts-ignore
        input,
        // @ts-ignore
        output,
        value,
      });

      expect(Math.round(finalValue)).toEqual(result);
    }
  );
});
