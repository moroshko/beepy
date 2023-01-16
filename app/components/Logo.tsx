type Size = 28 | 40;

type Props = {
  size: Size;
};

const sizeMap: Record<Size, string> = {
  28: "w-7 h-7",
  40: "w-10 h-10",
};

const Logo = ({ size }: Props) => {
  return (
    <svg className={sizeMap[size]} viewBox="0 0 80 80" aria-label="Beepy logo">
      <path
        stroke="currentColor"
        fill="none"
        d="M24.392 5.732c-8.21 0-16.244 5-19.992 12.441C.74 25.08 1.754 32.971 3.251 38.369 8.857 57.626 28.21 68.955 39.249 73.995l.598.274.617-.226c2.046-.749 3.951-1.808 5.795-2.832.457-.254.915-.508 1.371-.756 4.184-2.398 8.055-5.034 11.539-7.851l.403-.328c6.759-5.554 11.743-11.552 14.814-17.828 4.69-9.676 6.286-23.25-3.29-32.345-4.198-4.044-9.848-6.367-15.49-6.367-.741 0-1.484.041-2.211.123-5.511.885-9.98 4.491-13.39 7.507-4.007-3.551-8.122-6.662-13.324-7.499a19.502 19.502 0 00-2.289-.135z"
        strokeWidth="4"
      />
      <path
        stroke="currentColor"
        fill="none"
        d="M18.949 41.204h13.238l5.866-13.122 5.744 24.198 5.621-11.305h11.633"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { Logo };
