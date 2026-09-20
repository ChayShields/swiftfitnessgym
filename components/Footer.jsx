'use client'

import { Box, Container, Divider, Group, SimpleGrid, Stack, Text } from "@mantine/core"
import CmsHtml from "./CmsHtml"
import { interpolateCms } from "../lib/sanitize-html"
import { TbBrandFacebook, TbBrandInstagram, TbClock, TbMail, TbMapPin, TbPhone } from "react-icons/tb"
import Link from "./Link"
import Image from "./Image"
import { openCookieSettings } from "./CookieConsent"

function socialIcon(label) {
    const name = (label || "").toLowerCase()
    if (name.includes("instagram")) return TbBrandInstagram
    return TbBrandFacebook
}

export default function Footer({ details, pageLinks, legalLinks, socials }) {
    const year = new Date().getFullYear()
    const copyright = interpolateCms(details.copyright || "", "year", year)

    return (
        <Box bg="#121212" py="3rem">
            <Container>
                <Image src={details.logo} alt="SwiftFitness Gym" h="4rem" w="auto" baseWidth={160} baseHeight={64} />
                <Divider color="rgba(255,255,255,0.12)" size={1} my="1.4rem" />
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={{ base: "2rem", md: "3rem" }}>
                    <div>
                        <Text fw={700} c="#fff" tt="uppercase" fz="0.9rem" mb="0.6rem">{details.address_heading}</Text>
                        <Group display="flex" td="none" c="#cfcfcf" gap="0.4rem">
                            <TbMapPin size="1.2rem" />
                            <CmsHtml maw="20rem">{details.address}</CmsHtml>
                        </Group>
                        <Group mt="0.6rem" display="flex" td="none" c="#cfcfcf" gap="0.4rem">
                            <TbClock size="1.2rem" />
                            <CmsHtml>{details.opening_hours}</CmsHtml>
                        </Group>
                        <Group mt="1rem" gap="2rem">
                            <Group className="footer-link" display="flex" td="none" c="#cfcfcf" component={Link} href={details.email_link} gap="0.4rem">
                                <TbMail size="1.2rem" />
                                <Text>{details.email}</Text>
                            </Group>
                            <Group className="footer-link" display="flex" td="none" c="#cfcfcf" component={Link} href={details.phone_link} gap="0.4rem">
                                <TbPhone size="1.2rem" />
                                <Text>{details.phone}</Text>
                            </Group>
                        </Group>
                    </div>
                    <Stack gap="0.5rem">
                        <Text fw={700} c="#fff" tt="uppercase" fz="0.9rem" mb="0.2rem">{pageLinks.heading}</Text>
                        {pageLinks.items.map((item) => (
                            <Text key={item.url} className="footer-link" component={Link} c="#cfcfcf" href={item.url}>{item.label}</Text>
                        ))}
                    </Stack>
                    <Stack gap="0.5rem">
                        <Text fw={700} c="#fff" tt="uppercase" fz="0.9rem" mb="0.2rem">{legalLinks.heading}</Text>
                        {legalLinks.items.map((item) => (
                            <Text key={item.url} className="footer-link" component={Link} c="#cfcfcf" href={item.url}>{item.label}</Text>
                        ))}
                        <Text
                            component="button"
                            type="button"
                            className="footer-link"
                            c="#cfcfcf"
                            onClick={openCookieSettings}
                            style={{ background: "none", border: 0, padding: "0.5rem 0", textAlign: "left", cursor: "pointer", font: "inherit" }}
                        >
                            Cookie settings
                        </Text>
                    </Stack>
                </SimpleGrid>
                <Group mt={{ base: "1.4rem", md: "1.4rem" }} gap="1.4rem">
                    {socials.map((item) => {
                        const Icon = socialIcon(item.label)
                        return (
                            <Group key={item.url} className="footer-link" c="#cfcfcf" display="flex" gap="0.4rem" component={Link} href={item.url} target="_blank">
                                <Icon size="1.2rem" />
                                <Text>{item.label}</Text>
                            </Group>
                        )
                    })}
                </Group>
                <Divider color="rgba(255,255,255,0.12)" size={1} my="1.4rem" />
                <Group justify="space-between" gap="0.6rem">
                    <CmsHtml c="#8a8a8a">{copyright}</CmsHtml>
                    <Text c="#8a8a8a" fz="0.9rem">
                        Designed and developed by{" "}
                        <Text
                            component={Link}
                            href="https://hireme.link"
                            target="_blank"
                            c="#cfcfcf"
                            span
                            className="footer-link"
                        >
                            Chay Shields
                        </Text>
                    </Text>
                </Group>
            </Container>
        </Box>
    )
}
