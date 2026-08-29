import { Box, Container, List, ListItem, Stack, Text } from "@mantine/core"
import { looksLikeHtml } from "../lib/sanitize-html"
import CmsHtml from "./CmsHtml"
import PageCrumbs from "./PageCrumbs"
import PageHero from "./PageHero"

function BodyBlock({ body }) {
    if (looksLikeHtml(body)) {
        return <CmsHtml size="lg" lh={1.55}>{body}</CmsHtml>
    }

    const blocks = (body || "").split(/\n{2,}/).map((block) => block.trim()).filter(Boolean)

    return blocks.map((block, index) => {
        const lines = block.split("\n")
        const isList = lines.length > 0 && lines.every((line) => line.startsWith("* "))

        if (isList) {
            return (
                <List key={index} spacing="0.5rem" mb="0.15rem">
                    {lines.map((line) => (
                        <ListItem key={line}>{line.slice(2)}</ListItem>
                    ))}
                </List>
            )
        }

        return (
            <Text key={index} size="lg" lh={1.55}>
                {block}
            </Text>
        )
    })
}

export default function LegalPage({ href, hero, intro, sections }) {
    return (
        <>
            <PageCrumbs label={hero.breadcrumb} href={href} />
            <PageHero src={hero.image} kicker={hero.kicker} title={hero.title} />
            <Box py={{ base: "3.2rem", sm: "4.6rem" }}>
                <Container>
                    <Box className="legal-doc">
                        {intro.updated && (
                            <CmsHtml fz="0.95rem" c="#5c5c5c" mb="2.2rem">
                                {intro.updated}
                            </CmsHtml>
                        )}
                        <Stack gap="2.4rem">
                            {sections.map((section, index) => (
                                <Box key={`${section.heading}-${index}`} className="legal-section">
                                    <CmsHtml heading order={2} fz={{ base: "1.45rem", sm: "1.7rem" }} mb="0.85rem">
                                        {section.heading}
                                    </CmsHtml>
                                    <Stack gap="0.85rem">
                                        <BodyBlock body={section.body} />
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
