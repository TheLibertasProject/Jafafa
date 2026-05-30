import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SearchIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M5.5 8h13l-1 12h-11z" />
      <path d="M8.5 8a3.5 3.5 0 0 1 7 0" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5.5 19c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg width="14" height="10" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M1 7h21M16 1l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="M4 12h16" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <path d="M0 1h20M0 7h20M0 13h20" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}
