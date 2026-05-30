import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PlaceholderKind } from "@/lib/types";

interface PlaceholderProps {
  src?: string;
  alt?: string;
  label?: string;
  code?: string;
  kind?: PlaceholderKind;
  ratio?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function Placeholder({
  src,
  alt,
  label,
  code,
  kind = "default",
  ratio = "3 / 4",
  className,
  style,
  children,
}: PlaceholderProps) {
  const kindClass =
    kind === "dark" ? "ph-dark" : kind === "sage" ? "ph-sage" : "";

  return (
    <div
      className={cn("ph", !src && kindClass, className)}
      style={{ aspectRatio: ratio, ...style, position: "relative", overflow: "hidden" }}
    >
      {src && (
        <Image
          src={src}
          alt={alt ?? label ?? ""}
          fill
          loading="eager"
          className="object-cover"
          sizes="(max-width: 880px) 100vw, 50vw"
        />
      )}
      {children}
      {!src && (label || code) && (
        <div className="ph-caption">
          <span>{label ?? ""}</span>
          <span>{code ?? ""}</span>
        </div>
      )}
    </div>
  );
}

export function BottleMark({
  width = 80,
  color = "currentColor",
  opacity = 0.35,
}: {
  width?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      width={width}
      viewBox="0 0 80 120"
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity={opacity}
    >
      <rect x="32" y="6" width="16" height="12" />
      <path d="M28 18h24v8a12 12 0 0 0 6 10v74a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V36a12 12 0 0 0 6-10v-8Z" />
      <rect x="30" y="56" width="20" height="28" />
    </svg>
  );
}
