import { Box, Container } from "@mantine/core";
import NextImage from "next/image";
import CmsHtml from "./CmsHtml";

export default function PageHero({ src, kicker, title, children }) {
    return (
        <Box className="hero-bg page-hero">
            {src ? <NextImage src={src} alt="" fill sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} /> : null}
            <Container pos="relative" style={{ zIndex: 1 }} py={{ base: "5rem", sm: "7.5rem" }}>
                <Box w="3.2rem" h="4px" bg="primary" mb="1.1rem" />
                {kicker && (
                    <CmsHtml c="#128DC6" fw={700} tt="uppercase" lts="0.12em" fz="0.85rem" mb="0.5rem">
                        {kicker}
                    </CmsHtml>
                )}
                <CmsHtml heading c="#fff" maw="40rem" fz={{ base: "2.2rem", sm: "3.2rem" }} lh={1.05}>
                    {title}
                </CmsHtml>
                {children}
            </Container>
        </Box>
    )
}
