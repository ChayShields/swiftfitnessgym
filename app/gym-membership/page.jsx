import { TbDownload, TbMail } from "react-icons/tb";
import Link from "../../components/Link";
import { Box, Button, Container, Group, Stack, Text } from "@mantine/core";
import CmsHtml from "../../components/CmsHtml";
import MembershipPlanGrid from "../../components/MembershipPlanGrid";
import PageCrumbs from "../../components/PageCrumbs";
import PageHero from "../../components/PageHero";
import { cmsMetadata, getCmsMembershipPlans, getCmsPage, mergeSection } from "../../lib/cms";
import { membershipDefaults } from "../../data/cms-defaults";

export async function generateMetadata() {
    const content = await getCmsPage("gym-membership")
    return cmsMetadata(content, {
        title: membershipDefaults.seo.seo_title,
        description: membershipDefaults.seo.seo_description,
        path: "/gym-membership",
    })
}

export default async function GymMembershipPage() {
    const content = await getCmsPage("gym-membership")
    const hero = mergeSection(content?.hero, membershipDefaults.hero)
    const intro = mergeSection(content?.intro, membershipDefaults.intro)
    const cardLabels = mergeSection(content?.card_labels, membershipDefaults.card_labels)
    const after = mergeSection(content?.after, membershipDefaults.after)
    const plans = getCmsMembershipPlans(content)

    return (
        <>
            <PageCrumbs label={hero.breadcrumb} href="/gym-membership" />
            <PageHero src={hero.image} kicker={hero.kicker} title={hero.title} />
            <Box bg="#F4F5F7" py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <Stack gap="1.2rem" mb="2.2rem">
                        <Group wrap="nowrap" align="center" w="fit-content" component={Link} href={intro.email_link}>
                            <TbMail style={{marginBottom: "-0.3rem", marginRight: "0.5rem"}} size="1.2rem" />
                            <Text span c="#000" fw={600} size="lg">{intro.email}</Text>
                        </Group>
                        <CmsHtml size="lg">
                            {intro.body}
                        </CmsHtml>
                        <Button w="fit-content" leftSection={<TbDownload size="1.1rem" />} variant="outline" component={Link} href={intro.form_button.url} target="_blank" size="md">
                            {intro.form_button.text}
                        </Button>
                    </Stack>
                    <MembershipPlanGrid plans={plans} priceSuffix={cardLabels.price_suffix} buttonText={cardLabels.button_text} />
                </Container>
            </Box>
            <Box py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <Stack gap="1.2rem">
                        <CmsHtml size="lg">
                            {after.body}
                        </CmsHtml>
                        <CmsHtml size="md" c="dimmed">
                            {after.note}
                        </CmsHtml>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
