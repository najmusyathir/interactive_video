export const CircledPlayIcon = ({
  className = "",
  size = 24,
}: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 12 2 C 6.477 2 2 6.477 2 12 C 2 17.523 6.477 22 12 22 C 17.523 22 22 17.523 22 12 C 22 6.477 17.523 2 12 2 z M 12 4 C 16.411 4 20 7.589 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 z M 10 7.5 L 10 16.5 L 16 12 L 10 7.5 z"
      fill="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

export const MenuIcon = ({
  className = "",
  size = 24,
}: { className?: string; size?: number }) => (
  <svg
    id='Menu_24'
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="matrix(1 0 0 1 12 12)" >
      <path transform=" translate(-12, -12)"
        fill="currentColor"
        d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" strokeLinecap="round" />
    </g>


  </svg>
);
