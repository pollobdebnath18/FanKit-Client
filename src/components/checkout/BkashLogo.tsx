interface BkashLogoProps {
  className?: string;
  /** White text — used on solid pink/dark backgrounds. */
  onDark?: boolean;
}

/**
 * bKash brand wordmark ("bKash" logotype) built to resemble the official
 * bKash logo: a rounded "b" glyph followed by the "Kash" logotext,
 * rendered in the bKash pink (#E2136E).
 */
const BkashLogo = ({ className, onDark = false }: BkashLogoProps) => {
  const color = onDark ? "#FFFFFF" : "#E2136E";

  return (
    <svg
      viewBox="0 0 148 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="bKash"
    >
      {/* "b" glyph — a rounded bubble 'b' */}
      <path
        d="M12 2h10.8c6 0 10.2 4.3 10.2 10 0 3.1-1.4 5.9-3.7 7.8 3.5 1.8 5.9 5.3 5.9 9.2 0 6-4.9 10.7-11 10.7H12V2Zm12.5 11.2a3.6 3.6 0 0 0 3.6-3.6 3.6 3.6 0 0 0-3.6-3.6h-3.9v7.2h3.9Zm-.5 14.8c0-2.2-1.8-3.9-4-3.9h-3.9v7.8h3.9c2.2 0 4-1.8 4-3.9Z"
        fill={color}
      />
      {/* "Kash" logotext */}
      <text
        x="42"
        y="29"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="26"
        letterSpacing="0.5"
        fill={color}
      >
        Kash
      </text>
    </svg>
  );
};

export default BkashLogo;