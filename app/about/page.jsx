import { Box, Container, Grid, GridCol, List, ListItem, SimpleGrid, Stack, Text } from "@mantine/core";
import CmsHtml from "../../components/CmsHtml";
import Image from "../../components/Image";
import Link from "../../components/Link";
import PageCrumbs from "../../components/PageCrumbs";
import PageHero from "../../components/PageHero";
import QuoteBand from "../../components/QuoteBand";
import { cmsMetadata, getCmsPage, mergeSection, pickItems } from "../../lib/cms";
import { aboutDefaults } from "../../data/cms-defaults";

export async function generateMetadata() {
    const content = await getCmsPage("about")
    return cmsMetadata(content, {
        title: aboutDefaults.seo.seo_title,
        description: aboutDefaults.seo.seo_description,
    })
}

export default async function AboutPage() {
    const content = await getCmsPage("about")
    const hero = mergeSection(content?.hero, aboutDefaults.hero)
    const story = mergeSection(content?.story, aboutDefaults.story)
    const space = mergeSection(content?.space, aboutDefaults.space)
    const spaceItems = pickItems(content?.space?.items, aboutDefaults.space.items)
    const equipment = mergeSection(content?.equipment, aboutDefaults.equipment)
    const cardioItems = pickItems(content?.equipment?.cardio_items, aboutDefaults.equipment.cardio_items)
    const resistanceItems = pickItems(content?.equipment?.resistance_items, aboutDefaults.equipment.resistance_items)
    const quote = mergeSection(content?.quote, aboutDefaults.quote)

    return (
        <>
            <PageCrumbs label={hero.breadcrumb} href="/about" />
            <PageHero src={hero.image} kicker={hero.kicker} title={hero.title} />
            <Box py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <Grid gutter="3rem" align="center">
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack gap="1.1rem">
                                <CmsHtml size="lg">
                                    {story.paragraph_1}
                                </CmsHtml>
                                <CmsHtml size="lg">
                                    {story.paragraph_2}
                                </CmsHtml>
                                <CmsHtml size="lg">
                                    {story.paragraph_3}
                                </CmsHtml>
                                <Text size="lg">
                                    {story.what3words_prefix}{" "}
                                    <Text span component={Link} href={story.what3words_url} target="_blank" c="primary" fw={600}>
                                        {story.what3words_label}
                                    </Text>
                                </Text>
                            </Stack>
                        </GridCol>
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Image baseWidth={1080} baseHeight={720} h={{ base: "18rem", sm: "24rem" }} w="100%" sizes="(min-width: 62em) 560px, 100vw" src={story.photo} alt={story.photo_alt} />
                        </GridCol>
                    </Grid>
                </Container>
            </Box>
            <Box bg="#F4F5F7" py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <CmsHtml heading order={2} mb="1.6rem" fz={{ base: "2rem", sm: "2.4rem" }}>{space.heading}</CmsHtml>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="0.8rem">
                        {spaceItems.map((item, index) => (
                            <Box key={`${item.title}-${index}`} className="facility-tile">
                                <Image baseWidth={2560} baseHeight={1920} h={{ base: "14rem", sm: "16rem" }} w="100%" sizes="(min-width: 75em) 580px, (min-width: 48em) 50vw, 100vw" src={item.image} alt={item.title} />
                                <Box className="facility-label">
                                    <CmsHtml>{item.title}</CmsHtml>
                                    <CmsHtml className="facility-copy" fz="0.9rem" fw={400} c="#d8d8d8">{item.text}</CmsHtml>
                                </Box>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
            <Box py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <CmsHtml heading order={2} mb="2rem" fz={{ base: "2rem", sm: "2.4rem" }}>{equipment.heading}</CmsHtml>
                    <Grid gutter="3rem">
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Image mb="1.2rem" baseWidth={2560} baseHeight={1920} h="16rem" w="100%" sizes="(min-width: 62em) 560px, 100vw" src={equipment.cardio_image} alt={equipment.cardio_image_alt} />
                            <CmsHtml heading order={3} fz="1.4rem" mb="0.8rem">{equipment.cardio_heading}</CmsHtml>
                            <List spacing="0.35rem">
                                {cardioItems.map((item, index) => (
                                    <ListItem key={`${item.item}-${index}`}>
                                        <CmsHtml>{item.item}</CmsHtml>
                                    </ListItem>
                                ))}
                            </List>
                        </GridCol>
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Image mb="1.2rem" baseWidth={2560} baseHeight={1920} h="16rem" w="100%" sizes="(min-width: 62em) 560px, 100vw" src={equipment.resistance_image} alt={equipment.resistance_image_alt} />
                            <CmsHtml heading order={3} fz="1.4rem" mb="0.8rem">{equipment.resistance_heading}</CmsHtml>
                            <List spacing="0.35rem">
                                {resistanceItems.map((item, index) => (
                                    <ListItem key={`${item.item}-${index}`}>
                                        <CmsHtml>{item.item}</CmsHtml>
                                    </ListItem>
                                ))}
                            </List>
                        </GridCol>
                    </Grid>
                </Container>
            </Box>
            <QuoteBand src={quote.image}>
                {quote.text}
            </QuoteBand>
        </>
    )
}
