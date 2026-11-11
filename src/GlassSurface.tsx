import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

type GlassSurfaceProps<T extends ElementType = "div"> = {
  as?: T;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

/**
 * GlassSurface applies a translucent "glass" material, polymorphic via `as`.
 *
 * ```tsx
 * <GlassSurface className="rounded-full">…</GlassSurface>
 * <GlassSurface as="button" onClick={…}>Button</GlassSurface>
 * ```
 */
export function GlassSurface<T extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: GlassSurfaceProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={`bg-ui-background/54 bg-[linear-gradient(155deg,#ffffff21_0%,#ffffff08_30%,#ffffff00_55%,#ffffff0d_100%)] backdrop-blur-[10px] backdrop-saturate-[190%] inset-shadow-[0_0_2px_1px_#eef0fb22] supports-[not(backdrop-filter:blur(1px))]:bg-ui-background/94 ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default GlassSurface;
