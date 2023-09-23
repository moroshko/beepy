import Image from "next/image";

type Props = {
  name: string | null;
  url: string | null;
};

const Avatar = ({ name, url }: Props) => {
  return (
    <div className="border-gray-200 h-7 w-7 overflow-hidden rounded-full border">
      {url === null ? (
        <svg
          className="bg-gray-100 text-gray-500 translate-y-[10%] scale-[1.2]"
          viewBox="0 0 20 20"
          width="100%"
          height="100%"
          fill="currentColor"
          aria-label={
            name === null ? "Avatar placeholder" : `${name} avatar placeholder`
          }
        >
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      ) : (
        <Image
          className="h-full w-full object-cover hover:brightness-95"
          width={28}
          height={28}
          src={url}
          alt={name === null ? "Avatar" : `${name} avatar`}
          priority
        />
      )}
    </div>
  );
};

export { Avatar };
