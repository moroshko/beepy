type Props = {};

const Avatar = ({}: Props) => {
  return (
    <div className="h-8 w-8 overflow-hidden rounded-full">
      <svg
        className="translate-y-[10%] scale-[1.2] bg-grey-300 text-grey-500"
        viewBox="0 0 20 20"
        width="100%"
        height="100%"
        fill="currentColor"
      >
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
      </svg>
    </div>
  );
};

export { Avatar };
