import LegalPage from "../../components/LegalPage"
import { cmsMetadata, getCmsPage, mergeSection, pickItems } from "../../lib/cms"
import { privacyDefaults } from "../../data/legal-pages"

export async function generateMetadata() {
    const content = await getCmsPage("privacy-policy")
    return cmsMetadata(content, {
        title: privacyDefaults.seo.seo_title,
        description: privacyDefaults.seo.seo_description,
        path: "/privacy-policy",
    })
}

export default async function PrivacyPolicyPage() {
    const content = await getCmsPage("privacy-policy")
    const hero = mergeSection(content?.hero, privacyDefaults.hero)
    const intro = mergeSection(content?.intro, privacyDefaults.intro)
    const sections = pickItems(content?.sections?.items, privacyDefaults.sections.items)

    return <LegalPage href="/privacy-policy" hero={hero} intro={intro} sections={sections} />
}
