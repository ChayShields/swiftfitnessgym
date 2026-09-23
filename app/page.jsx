import { Box, Button, Container, Group, Stack, Text } from "@mantine/core";
import CmsHtml from "../components/CmsHtml";
import Link from "../components/Link";
import Image from "../components/Image";
import QuoteBand from "../components/QuoteBand";
import { cmsMetadata, getCmsPage, mergeSection, pickItems } from "../lib/cms";
import { homeDefaults } from "../data/cms-defaults";

export async function generateMetadata() {
  const content = await getCmsPage("home")
  return cmsMetadata(content, {
    title: homeDefaults.seo.seo_title,
    description: homeDefaults.seo.seo_description,
  }, {
    url: "https://swiftfitnessgym.co.uk/",
    type: "website",
  })
}

export default async function HomePage() {
  const content = await getCmsPage("home")
  const hero = mergeSection(content?.hero, homeDefaults.hero)
  const membership = mergeSection(content?.membership, homeDefaults.membership)
  const trial = mergeSection(content?.trial, homeDefaults.trial)
  const inside = mergeSection(content?.inside, homeDefaults.inside)
  const gallery = pickItems(content?.gallery?.items, homeDefaults.gallery.items)
  const quote = mergeSection(content?.quote, homeDefaults.quote)

  return (
    <Box>
      <Box className="hero-bg home-hero" style={{ backgroundImage: `url("${hero.poster}")` }}>
        <video
          className="home-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={hero.poster}
        >
          <source src={hero.video_url} type="video/mp4" />
        </video>
        <Container py={{ base: "3.5rem", sm: "4.5rem", md: "5.5rem" }} pos="relative" style={{ zIndex: 1 }}>
          <Stack maw="38rem" gap="1.1rem">
            <Box w="3.2rem" h="4px" bg="primary" />
            <CmsHtml heading c="#fff" fz={{ base: "2.6rem", sm: "3.6rem", md: "4.4rem" }} lh={0.95}>{hero.headline}</CmsHtml>
            <CmsHtml className="cms-html-on-dark" c="#fff" fz={{ base: "1.25rem", sm: "1.55rem" }} fw={500} lh={1.3}>
              {hero.subhead}
            </CmsHtml>
            <CmsHtml className="cms-html-on-dark" c="#e8e8e8" size="lg">
              {hero.body}
            </CmsHtml>
            <Group mt="0.4rem">
              <Button size="lg" component={Link} href={hero.primary_button.url}>{hero.primary_button.text}</Button>
              <Button size="lg" variant="white" component={Link} href={hero.secondary_button.url}>{hero.secondary_button.text}</Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      <Box py={{ base: "3.5rem", sm: "5rem" }} bg="#F4F5F7">
        <Container>
          <Group align="center" justify="space-between" gap="3rem">
            <Stack maw="32rem" gap="1rem">
              <Text c="primary" fw={700} tt="uppercase" lts="0.12em" fz="0.85rem">{membership.kicker}</Text>
              <CmsHtml heading order={2} fz={{ base: "2rem", sm: "2.6rem" }} lh={1.1}>{membership.heading}</CmsHtml>
              <CmsHtml size="lg">
                {membership.body}
              </CmsHtml>
              <Button w="fit-content" size="md" component={Link} href={membership.button.url}>{membership.button.text}</Button>
            </Stack>
            <Box className="overlap-wrap" w={{ base: "100%", sm: "28rem" }}>
              <Image className="overlap-main" baseWidth={2560} baseHeight={1920} h="20rem" w="78%" sizes="(min-width: 48em) 360px, 100vw" src={membership.image} alt={membership.image_alt} />
              <Image className="overlap-inset" baseWidth={2560} baseHeight={1920} sizes="(min-width: 48em) 240px, 100vw" src={membership.inset_image} alt={membership.inset_image_alt} />
            </Box>
          </Group>
        </Container>
      </Box>

      <Box py={{ base: "3.5rem", sm: "5rem" }}>
        <Container>
          <Group align="center" justify="space-between" gap="3rem" wrap="wrap-reverse">
            <Image baseWidth={2560} baseHeight={1920} w={{ base: "100%", sm: "28rem" }} h="20rem" sizes="(min-width: 48em) 448px, 100vw" src={trial.image} alt={trial.image_alt} />
            <Stack maw="30rem" gap="0.9rem">
              <Text c="primary" fw={700} tt="uppercase" lts="0.12em" fz="0.85rem">{trial.kicker}</Text>
              <CmsHtml heading order={2} fz={{ base: "2rem", sm: "2.6rem" }} lh={1.1}>{trial.heading}</CmsHtml>
              <CmsHtml size="lg">
                {trial.body}
              </CmsHtml>
              <Button w="fit-content" size="md" component={Link} href={trial.button.url}>{trial.button.text}</Button>
            </Stack>
          </Group>
        </Container>
      </Box>

      <Box py={{ base: "3.5rem", sm: "5rem" }} bg="#121212">
        <Container>
          <Group justify="space-between" align="end" mb="1.6rem">
            <div>
              <Text c="primary" fw={700} tt="uppercase" lts="0.12em" fz="0.85rem" mb="0.4rem">{inside.kicker}</Text>
              <CmsHtml heading className="cms-html-on-dark" c="#fff" order={2} fz={{ base: "2rem", sm: "2.5rem" }}>{inside.heading}</CmsHtml>
            </div>
            <Button variant="white" component={Link} href={inside.button.url}>{inside.button.text}</Button>
          </Group>
          <video
            className="home-demo-video"
            controls
            playsInline
            preload="metadata"
            poster={inside.poster}
          >
            <source src={inside.video_url} type="video/mp4" />
          </video>
          <Box className="photo-bento">
            {gallery.map((photo, index) => (
              <Box key={`${photo.image}-${index}`} className={photo.wide ? "photo-bento-wide" : ""} h="100%">
                <Image baseWidth={2560} baseHeight={1920} h="100%" w="100%" sizes={photo.wide ? "(min-width: 48em) 500px, 100vw" : "(min-width: 48em) 340px, 50vw"} src={photo.image} alt="SwiftFitness Gym" />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <QuoteBand src={quote.image}>
        {quote.text}
      </QuoteBand>
    </Box>
  );
}
