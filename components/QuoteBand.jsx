import { Box, Container, Stack, Text } from "@mantine/core";
import NextImage from "next/image";
import CmsHtml from "./CmsHtml";

export default function QuoteBand({ src, children }) {
    return (
        <Box className="testimonials-bg" py={{ base: "4rem", sm: "5.5rem" }}>
            {src ? <NextImage src={src} alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 40%", zIndex: 0 }} /> : null}
            <Container pos="relative" style={{ zIndex: 1 }} size={800}>
                <Stack align="center" gap="0">
                    <Text className="quote-mark">&ldquo;</Text>
                    <CmsHtml
                        className="cms-html-quote"
                        c="#fff"
                        ta="center"
                        fz={{ base: "1.3rem", sm: "1.7rem" }}
                        fw={500}
                        fs="italic"
                        lh={1.4}
                    >
                        {typeof children === "string" ? children : ""}
                    </CmsHtml>
                </Stack>
            </Container>
        </Box>
    )
}
