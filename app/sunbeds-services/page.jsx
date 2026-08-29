import SportsTherapyPage from "../../components/SportsTherapyPage"
import { cmsMetadata, getCmsPage, mergeSection } from "../../lib/cms"
import { therapyDefaults } from "../../data/cms-defaults"

export async function generateMetadata() {
    const content = await getCmsPage("sunbeds-services")
    return cmsMetadata(content, {
        title: therapyDefaults.seo.seo_title,
        description: therapyDefaults.seo.seo_description,
    })
}

export default async function SunbedsServices() {
    const content = await getCmsPage("sunbeds-services")
    const hero = mergeSection(content?.hero, therapyDefaults.hero)
    const massage = mergeSection(content?.massage, therapyDefaults.massage)
    const sunbeds = mergeSection(content?.sunbeds, therapyDefaults.sunbeds)
    const quote = mergeSection(content?.quote, therapyDefaults.quote)

    return <SportsTherapyPage hero={hero} massage={massage} sunbeds={sunbeds} quote={quote} />
}
