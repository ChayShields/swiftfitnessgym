'use client'

import { Anchor, Box, Button, Container, Grid, GridCol, Group, Stack, Textarea, TextInput } from "@mantine/core"
import CmsHtml from "./CmsHtml"
import { isEmail, isNotEmpty, useForm } from "@mantine/form"
import { TbClock, TbMail, TbMapPin, TbPhone } from "react-icons/tb"
import Image from "./Image"
import PageCrumbs from "./PageCrumbs"
import { useState } from "react"
import { notifyError, notifySuccess } from "../lib/notify"

function detailIcon(item) {
    const url = item.url || ""
    const label = (item.label || "").toLowerCase()

    if (url.startsWith("tel:")) return TbPhone
    if (url.startsWith("mailto:")) return TbMail
    if (label.includes("open") || label.includes("week") || label.includes("hour")) return TbClock
    return TbMapPin
}

export default function ContactPage({ header, details }) {
    const [loading, setLoading] = useState(false)
    const form = useForm({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            message: ""
        },
        validate: {
            first_name: isNotEmpty("First name is required"),
            last_name: isNotEmpty("Last name is required"),
            email: isEmail("Please enter a valid email address"),
            phone: isNotEmpty("Phone is required"),
            message: isNotEmpty("Please enter a comment or message")
        }
    })

    const handleSubmit = () => {
        if (form.validate().hasErrors) return;

        setLoading(true)
        fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(form.values)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    notifyError("Error", data.error)
                } else {
                    notifySuccess("Sent", "Thanks, your message has been sent")
                    form.reset()
                }
            }).catch(() => {
                notifyError("Failed to send message", "The contact form is not currently available")
            }).finally(() => {
                setLoading(false)
            })
    }

    return (
        <Box bg="#F4F5F7" mih="60vh">
            <PageCrumbs label={header.breadcrumb} href="/contact" />
            <Container py={{ base: "3rem", sm: "4.5rem" }}>
                <Grid overflow="visible" gutter="3rem">
                    <GridCol span={{ base: 12, md: 5 }}>
                        <CmsHtml heading mb="0.6rem">{header.heading}</CmsHtml>
                        <CmsHtml mb="1.6rem" size="lg">{header.intro}</CmsHtml>
                        <Stack gap="1rem" mb="1.8rem">
                            {details.map((item, index) => {
                                const Icon = detailIcon(item)
                                const row = (
                                    <Group gap="0.8rem" wrap="nowrap" align="flex-start">
                                        <Icon className="contact-icon" size="1.4rem" color="#128DC6" />
                                        <CmsHtml size="lg">{item.label}</CmsHtml>
                                    </Group>
                                )

                                if (!item.url) {
                                    return <Box key={`${item.label}-${index}`}>{row}</Box>
                                }

                                return (
                                    <Anchor key={`${item.label}-${index}`} href={item.url} td="none" c="inherit" className="contact-detail">
                                        {row}
                                    </Anchor>
                                )
                            })}
                        </Stack>
                        <Image baseWidth={2560} baseHeight={1920} h="16rem" w="100%" sizes="(min-width: 62em) 470px, 100vw" src={header.photo} alt={header.photo_alt} />
                    </GridCol>
                    <GridCol span={{ base: 12, md: 7 }}>
                        <Box bg="#fff" p={{ base: "1.4rem", sm: "2rem" }} bd="1px solid #e4e4e4">
                            <Stack>
                                <Group grow>
                                    <TextInput size="md" label="First Name" required withAsterisk {...form.getInputProps("first_name")} />
                                    <TextInput size="md" label="Last Name" required withAsterisk {...form.getInputProps("last_name")} />
                                </Group>
                                <TextInput size="md" label="Email" required withAsterisk {...form.getInputProps("email")} />
                                <TextInput size="md" label="Phone Number" required withAsterisk {...form.getInputProps("phone")} />
                                <Textarea placeholder="How can we help?" autosize minRows={4} label="Comment or Message" required withAsterisk {...form.getInputProps("message")} />
                                <Button w="fit-content" loading={loading} size="md" onClick={handleSubmit}>Submit</Button>
                            </Stack>
                        </Box>
                    </GridCol>
                </Grid>
            </Container>
        </Box>
    )
}
