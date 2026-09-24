import LegalPage from "../../components/LegalPage"
import { cmsMetadata, getCmsPage, mergeSection, pickItems } from "../../lib/cms"
import { termsDefaults } from "../../data/legal-pages"

export async function generateMetadata() {
    const content = await getCmsPage("terms")
    return cmsMetadata(content, {
        title: termsDefaults.seo.seo_title,
        description: termsDefaults.seo.seo_description,
        path: "/terms",
    })
}

export default async function TermsPage() {
    const content = await getCmsPage("terms")
    const hero = mergeSection(content?.hero, termsDefaults.hero)
    const intro = mergeSection(content?.intro, termsDefaults.intro)
    const sections = pickItems(content?.sections?.items, termsDefaults.sections.items)

    return <LegalPage href="/terms" hero={hero} intro={intro} sections={sections} />
}
