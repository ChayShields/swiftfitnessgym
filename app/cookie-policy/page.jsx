import LegalPage from "../../components/LegalPage"
import { cmsMetadata, getCmsPage, mergeSection, pickItems } from "../../lib/cms"
import { cookieDefaults } from "../../data/legal-pages"

export async function generateMetadata() {
    const content = await getCmsPage("cookie-policy")
    return cmsMetadata(content, {
        title: cookieDefaults.seo.seo_title,
        description: cookieDefaults.seo.seo_description,
    })
}

export default async function CookiePolicyPage() {
    const content = await getCmsPage("cookie-policy")
    const hero = mergeSection(content?.hero, cookieDefaults.hero)
    const intro = mergeSection(content?.intro, cookieDefaults.intro)
    const sections = pickItems(content?.sections?.items, cookieDefaults.sections.items)

    return <LegalPage href="/cookie-policy" hero={hero} intro={intro} sections={sections} />
}
