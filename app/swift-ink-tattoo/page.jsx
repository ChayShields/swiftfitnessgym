import { Box, Button, Container, Grid, GridCol, Group, SimpleGrid, Stack } from "@mantine/core"
import NextImage from "next/image"
import { TbBrandFacebook, TbBrandInstagram, TbMail } from "react-icons/tb"
import CmsHtml from "../../components/CmsHtml"
import Link from "../../components/Link"
import PageCrumbs from "../../components/PageCrumbs"
import PageHero from "../../components/PageHero"
import { cmsMetadata, getCmsPage, mergeSection, pickItems } from "../../lib/cms"
import { tattooDefaults } from "../../data/cms-defaults"

export async function generateMetadata() {
    const content = await getCmsPage("swift-ink-tattoo")
    return cmsMetadata(content, {
        title: tattooDefaults.seo.seo_title,
        description: tattooDefaults.seo.seo_description,
    })
}

export default async function SwiftInkTattooPage() {
    const content = await getCmsPage("swift-ink-tattoo")
    const hero = mergeSection(content?.hero, tattooDefaults.hero)
    const intro = mergeSection(content?.intro, tattooDefaults.intro)
    const gallery = mergeSection(content?.gallery, tattooDefaults.gallery)
    const photos = pickItems(content?.gallery?.items, tattooDefaults.gallery.items)

    return (
        <>
            <PageCrumbs label={hero.breadcrumb} href="/swift-ink-tattoo" />
            <PageHero src={hero.image} kicker={hero.kicker} title={hero.title} />
            <Box py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <Grid gutter={{ base: "2.2rem", md: "3.4rem" }} align="center">
                        <GridCol span={{ base: 12, md: 5 }}>
                            <Box className="tattoo-logo-panel">
                                {intro.logo ? (
                                    <Box pos="relative" w="100%" maw="20rem" mx="auto" className="tattoo-logo">
                                        <NextImage src={intro.logo} alt={intro.logo_alt} fill sizes="20rem" />
                                    </Box>
                                ) : null}
                            </Box>
                        </GridCol>
                        <GridCol span={{ base: 12, md: 7 }}>
                            <Stack gap="1.1rem">
                                <Box w="3.2rem" h="4px" bg="primary" />
                                <CmsHtml heading order={2} fz={{ base: "2rem", sm: "2.5rem" }} lh={1.1}>
                                    {intro.heading}
                                </CmsHtml>
                                <CmsHtml size="lg">
                                    {intro.body}
                                </CmsHtml>
                                <CmsHtml size="lg">
                                    {intro.booking_body}
                                </CmsHtml>
                                <Group mt="0.4rem" gap="0.7rem">
                                    <Button size="md" leftSection={<TbMail size="1.15rem" />} component={Link} href={intro.email_button.url}>
                                        {intro.email_button.text}
                                    </Button>
                                    <Button size="md" variant="outline" leftSection={<TbBrandFacebook size="1.15rem" />} component={Link} href={intro.facebook_button.url} target="_blank">
                                        {intro.facebook_button.text}
                                    </Button>
                                    <Button size="md" variant="outline" leftSection={<TbBrandInstagram size="1.15rem" />} component={Link} href={intro.instagram_button.url} target="_blank">
                                        {intro.instagram_button.text}
                                    </Button>
                                </Group>
                            </Stack>
                        </GridCol>
                    </Grid>
                </Container>
            </Box>
            <Box bg="#121212" py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <CmsHtml heading className="cms-html-on-dark" c="#fff" order={2} mb="1.6rem" fz={{ base: "2rem", sm: "2.4rem" }}>
                        {gallery.heading}
                    </CmsHtml>
                    <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="0.7rem">
                        {photos.map((photo, index) => (
                            <Box key={`${photo.image}-${index}`} className="tattoo-shot">
                                {photo.image ? (
                                    <NextImage
                                        src={photo.image}
                                        alt={photo.alt || "Tattoo by Matt of Swift Ink Tattoo"}
                                        fill
                                        sizes="(min-width: 62em) 25vw, (min-width: 48em) 33vw, 50vw"
                                    />
                                ) : null}
                            </Box>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    )
}
