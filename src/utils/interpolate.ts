export const interpolate = ({
  input,
  output,
  value,
}: {
  input: [number, number];
  output: [number, number];
  value: number;
}) => {
  const [startInput, endInput] = input;
  const [startOutput, endOutput] = output;
  let result;
  if (value > endInput) {
    result = endOutput;
  } else if (value < startInput) {
    result = startOutput;
  } else {
    result =
      startOutput +
      ((value - startInput) * (endOutput - startOutput)) /
        (endInput - startInput);
  }
  return result;
};

export const interpolateTimeToPercentage = ({
  input,
  value,
}: {
  input: [number, number];
  value: number;
}) => {
  const [lowerBound, upperBound] = input;
  return (
    Math.round(
      interpolate({
        input: [lowerBound, upperBound],
        output: [0, 100],
        value: value,
      }) * 100
    ) / 100
  );
};
