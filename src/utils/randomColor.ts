const colors = ['bg-success'];

export const randomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];
