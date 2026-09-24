import { TbBrandFacebook, TbBrandGoogle } from "react-icons/tb";
import Link from "../../components/Link";
import { Box, Button, Container, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import CmsHtml from "../../components/CmsHtml";
import Image from "../../components/Image";
import PageCrumbs from "../../components/PageCrumbs";
import PageHero from "../../components/PageHero";
import { cmsMetadata, getCmsPage, mergeSection, pickItems } from "../../lib/cms";
import { reviewsDefaults } from "../../data/cms-defaults";

export async function generateMetadata() {
    const content = await getCmsPage("reviews")
    return cmsMetadata(content, {
        title: reviewsDefaults.seo.seo_title,
        description: reviewsDefaults.seo.seo_description,
        path: "/reviews",
    })
}

export default async function ReviewsPage() {
    const content = await getCmsPage("reviews")
    const hero = mergeSection(content?.hero, reviewsDefaults.hero)
    const reviewLinks = mergeSection(content?.review_links, reviewsDefaults.review_links)
    const quotes = pickItems(content?.testimonials?.items, reviewsDefaults.testimonials.items)
    const facebook = mergeSection(content?.facebook, reviewsDefaults.facebook)

    return (
        <>
            <PageCrumbs label={hero.breadcrumb} href="/reviews" />
            <PageHero src={hero.image} kicker={hero.kicker} title={hero.title} />
            <Box py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <Stack align="center" gap="1.4rem" mb="2.5rem">
                        <Group>
                            <Button leftSection={<TbBrandFacebook size="1.2rem" />} component={Link} href={reviewLinks.facebook_button.url} target="_blank" size="md">
                                {reviewLinks.facebook_button.text}
                            </Button>
                            <Button leftSection={<TbBrandGoogle size="1.2rem" />} variant="outline" component={Link} href={reviewLinks.google_button.url} target="_blank" size="md">
                                {reviewLinks.google_button.text}
                            </Button>
                        </Group>
                    </Stack>
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="1.6rem" mb="3rem">
                        {quotes.map((quote, index) => (
                            <Box key={`${quote.name}-${index}`} bg="#F4F5F7" p="1.5rem">
                                <Text c="primary" fz="2.4rem" lh={1} fw={800}>&ldquo;</Text>
                                <CmsHtml size="lg" fs="italic" mb="1rem">{quote.text}</CmsHtml>
                                <Text fw={600}>{quote.name}</Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                    <CmsHtml heading order={2} ta="center" mb="1.4rem" fz={{ base: "1.6rem", sm: "2rem" }}>{facebook.heading}</CmsHtml>
                    <Image baseWidth={1200} baseHeight={1600} w="100%" h="auto" src={facebook.image} alt={facebook.image_alt} />
                </Container>
            </Box>
        </>
    )
}
