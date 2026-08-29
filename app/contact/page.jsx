import ContactPage from "../../components/ContactPage"
import { cmsMetadata, getCmsPage, mergeSection, pickItems } from "../../lib/cms"
import { contactDefaults } from "../../data/cms-defaults"

export async function generateMetadata() {
    const content = await getCmsPage("contact")
    return cmsMetadata(content, {
        title: contactDefaults.seo.seo_title,
        description: contactDefaults.seo.seo_description,
    })
}

export default async function Contact() {
    const content = await getCmsPage("contact")
    const header = mergeSection(content?.header, contactDefaults.header)
    const details = pickItems(content?.details?.items, contactDefaults.details.items)

    return <ContactPage header={header} details={details} />
}
