import { default as NextImage } from "next/image";
import { Image as MantineImage } from "@mantine/core";

export default function Image({ baseHeight, baseWidth, src, ...props }) {
    if (!src) return null

    return <MantineImage component={NextImage} {...props} src={src} width={baseWidth || null} height={baseHeight || null} style={{ borderRadius: props.radius, objectFit: "cover", width: props.w, height: props.h }} />;
}