interface BloobirdsLogoProps {
  width?: number;
  height?: number;
  fill?: string;
}

function BloobirdsLogo({ width = 60, height = 60, fill = '#9ACFFF' }: BloobirdsLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 60 60"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M40.163 22.06a2.547 2.547 0 002.55 2.546 2.55 2.55 0 002.553-2.546 2.549 2.549 0 00-2.552-2.544 2.546 2.546 0 00-2.551 2.544z"
        clipRule="evenodd"
      />
      <path
        fill={fill}
        fillRule="evenodd"
        d="M34.138 26.438c-.59 0-1.198.056-1.879.164a.404.404 0 01-.466-.375l-.002-.028a.403.403 0 01.34-.421c3.968-.633 6.87-4.133 6.69-8.19C38.635 13.353 34.896 10 30.49 10H15.572c-.84 0-1.522.68-1.522 1.52v36.96c0 .84.681 1.52 1.522 1.52h18.147c6.386 0 11.805-4.82 12.205-10.996.443-6.829-4.97-12.566-11.786-12.566z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default BloobirdsLogo;
