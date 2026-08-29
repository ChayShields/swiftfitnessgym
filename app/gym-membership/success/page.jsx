import { Box, Button, Container, Stack } from "@mantine/core"
import { TbDownload, TbMail } from "react-icons/tb"
import CmsHtml from "../../../components/CmsHtml"
import Link from "../../../components/Link"
import PageCrumbs from "../../../components/PageCrumbs"
import { getStripe } from "../../../lib/stripe"
import { cmsMetadata, getCmsPage, mergeSection } from "../../../lib/cms"
import { interpolateCms } from "../../../lib/sanitize-html"
import { membershipSuccessDefaults } from "../../../data/cms-defaults"

export async function generateMetadata() {
    const cms = await getCmsPage("gym-membership-success")
    return cmsMetadata(cms, {
        title: membershipSuccessDefaults.seo.seo_title,
        description: membershipSuccessDefaults.seo.seo_description,
    })
}

export default async function MembershipSuccessPage({ searchParams }) {
    const params = await searchParams
    const sessionId = typeof params?.session_id === "string" ? params.session_id : ""
    const cms = await getCmsPage("gym-membership-success")
    const copy = mergeSection(cms?.content, membershipSuccessDefaults.content)

    let planTitle = "your membership"
    let paid = false

    if (sessionId && process.env.STRIPE_SECRET_KEY) {
        try {
            const session = await getStripe().checkout.sessions.retrieve(sessionId)
            paid = session.status === "complete"
            if (session.metadata?.plan_title) {
                planTitle = session.metadata.plan_title
            }
        } catch {
            paid = false
        }
    }

    return (
        <>
            <PageCrumbs label="Gym Membership" href="/gym-membership" />
            <Box py={{ base: "3.5rem", sm: "5.5rem" }}>
                <Container size={720}>
                    <Stack gap="1.2rem">
                        <Box w="3.2rem" h="4px" bg="primary" />
                        <CmsHtml heading fz={{ base: "2rem", sm: "2.6rem" }} lh={1.1}>
                            {paid ? copy.paid_heading : copy.unpaid_heading}
                        </CmsHtml>
                        {paid ? (
                            <CmsHtml size="lg">
                                {interpolateCms(copy.paid_body, "plan", planTitle)}
                            </CmsHtml>
                        ) : (
                            <CmsHtml size="lg">
                                {copy.unpaid_body}
                            </CmsHtml>
                        )}
                        <CmsHtml size="lg">
                            {copy.photo_instruction}
                        </CmsHtml>
                        <Button w="fit-content" leftSection={<TbMail size="1.1rem" />} component={Link} href={copy.email_button.url} size="md">
                            {copy.email_button.text}
                        </Button>
                        <CmsHtml size="lg">
                            {copy.form_intro}
                        </CmsHtml>
                        <Button w="fit-content" leftSection={<TbDownload size="1.1rem" />} variant="outline" component={Link} href={copy.form_button.url} target="_blank" size="md">
                            {copy.form_button.text}
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
