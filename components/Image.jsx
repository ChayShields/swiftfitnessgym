import { default as NextImage } from "next/image";
import { Image as MantineImage } from "@mantine/core";

// Content is at most 1170px wide (1200px Container minus padding).
const FULL_WIDTH_SIZES = "(min-width: 75em) 1170px, 100vw";

// Pass `sizes` at the call site whenever the picture is narrower than the
// full content width (a grid column, a card). Without any `sizes`, next/image
// builds its srcset from the fixed width prop alone, and a 2560px width snaps
// to the largest size the optimizer offers for EVERY picture - including one
// shown in a 450px card - which is what drove the Vercel image transformation
// and cache-write usage up (measured 2026-09-23: 42 of 44 images requested at
// 3840px wide). Small fixed-size images (logos) keep the default 1x/2x srcset.
export default function Image({ baseHeight, baseWidth, src, sizes, ...props }) {
    if (!src) return null

    const resolvedSizes = sizes ?? (baseWidth && baseWidth > 600 ? FULL_WIDTH_SIZES : undefined)

    return <MantineImage component={NextImage} {...props} sizes={resolvedSizes} src={src} width={baseWidth || null} height={baseHeight || null} style={{ borderRadius: props.radius, objectFit: "cover", width: props.w, height: props.h }} />;
}
