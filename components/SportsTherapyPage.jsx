'use client'

import { Box, Button, Container, Divider, Grid, GridCol, Group, Stack, Text, Textarea, TextInput } from "@mantine/core"
import CmsHtml from "./CmsHtml"
import { isEmail, isNotEmpty, useForm } from "@mantine/form"
import { TbMail } from "react-icons/tb"
import Link from "./Link"
import Image from "./Image"
import PageCrumbs from "./PageCrumbs"
import PageHero from "./PageHero"
import QuoteBand from "./QuoteBand"
import { useState } from "react"
import { notifyError, notifySuccess } from "../lib/notify"

export default function SportsTherapyPage({ hero, massage, sunbeds, quote }) {
    const [loading, setLoading] = useState(false)
    const form = useForm({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            complaints: "",
            when_occurred: "",
            preferred_time: "",
            additional_info: ""
        },
        validate: {
            first_name: isNotEmpty("First name is required"),
            last_name: isNotEmpty("Last name is required"),
            email: isEmail("Please enter a valid email address"),
            phone: isNotEmpty("Phone is required"),
            complaints: isNotEmpty("Please describe your current complaints"),
            when_occurred: isNotEmpty("Please let us know how and when the issue occurred")
        }
    })

    const handleSubmit = () => {
        if (form.validate().hasErrors) return;

        setLoading(true)
        fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({ form_type: "Sports Massage Enquiry", ...form.values })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    notifyError("Error", data.error)
                } else {
                    notifySuccess("Sent", "Thanks, your enquiry has been sent")
                    form.reset()
                }
            }).catch(() => {
                notifyError("Failed to send enquiry", "The enquiry form is not currently available")
            }).finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <PageCrumbs label={hero.breadcrumb} href="/sunbeds-services" />
            <PageHero src={hero.image} kicker={hero.kicker} title={hero.title} />
            <Box py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <Grid gutter="3rem">
                        <GridCol span={{ base: 12, md: 5 }}>
                            <Stack gap="1rem">
                                <CmsHtml heading order={2} fz={{ base: "1.8rem", sm: "2.2rem" }}>{massage.heading}</CmsHtml>
                                <CmsHtml size="lg">
                                    {massage.body}
                                </CmsHtml>
                                <Image baseWidth={1080} baseHeight={1440} h={{ base: "18rem", sm: "24rem" }} w="100%" sizes="(min-width: 62em) 470px, 100vw" src={massage.image_2} alt={massage.image_2_alt} />
                            </Stack>
                        </GridCol>
                        <GridCol span={{ base: 12, md: 7 }}>
                            <Stack>
                                <Group grow>
                                    <TextInput size="md" label="First Name" required withAsterisk {...form.getInputProps("first_name")} />
                                    <TextInput size="md" label="Last Name" required withAsterisk {...form.getInputProps("last_name")} />
                                </Group>
                                <Group grow>
                                    <TextInput size="md" label="Email" required withAsterisk {...form.getInputProps("email")} />
                                    <TextInput size="md" label="Phone Number" required withAsterisk {...form.getInputProps("phone")} />
                                </Group>
                                <Textarea size="md" autosize minRows={3} label="Current Complaints" required withAsterisk {...form.getInputProps("complaints")} />
                                <Textarea size="md" autosize minRows={3} label="How and when did the issue occur?" required withAsterisk {...form.getInputProps("when_occurred")} />
                                <Textarea size="md" autosize minRows={2} label="Preferred time and day for possible appointment?" {...form.getInputProps("preferred_time")} />
                                <Textarea size="md" autosize minRows={2} label="Additional Information" {...form.getInputProps("additional_info")} />
                                <Button w="fit-content" loading={loading} size="md" onClick={handleSubmit}>Submit</Button>
                            </Stack>
                        </GridCol>
                    </Grid>
                </Container>
            </Box>
            <Box bg="#F4F5F7" py={{ base: "3.5rem", sm: "5rem" }}>
                <Container>
                    <Grid gutter="3rem" align="center">
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Image baseWidth={2560} baseHeight={1920} h={{ base: "16rem", sm: "22rem" }} w="100%" src={sunbeds.image} alt={sunbeds.image_alt} />
                        </GridCol>
                        <GridCol span={{ base: 12, md: 6 }}>
                            <CmsHtml heading order={2} mb="1rem" fz={{ base: "1.8rem", sm: "2.2rem" }}>{sunbeds.heading}</CmsHtml>
                            <Stack gap="1rem">
                                <CmsHtml size="lg">
                                    {sunbeds.body_1}
                                </CmsHtml>
                                <Group gap="0.4rem" component={Link} href={sunbeds.email_link}>
                                    <TbMail size="1.2rem" />
                                    <Text c="#000" fw={600} size="lg">{sunbeds.email}</Text>
                                </Group>
                                <Divider />
                                <CmsHtml size="lg">
                                    {sunbeds.body_2}
                                </CmsHtml>
                            </Stack>
                        </GridCol>
                    </Grid>
                </Container>
            </Box>
            <QuoteBand src={quote.image}>
                {quote.text}
            </QuoteBand>
        </>
    )
}
