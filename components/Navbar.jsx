'use client'

import { usePathname } from 'next/navigation';
import { Anchor, Box, Burger, Button, Container, Drawer, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from './Link';
import Image from './Image';
import { TbMail, TbPhone } from 'react-icons/tb';

function isActive(pathname, href) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
}

export default function Navbar({ brand, links, contact }) {
    const [opened, { toggle, close }] = useDisclosure(false);
    const pathname = usePathname();
    const joinButton = contact.join_button;

    return (
        <header className="site-header">
            <Container>
                <Group justify="space-between" wrap="nowrap" h={76}>
                    <Anchor component={Link} href="/" td="none" className="header-brand">
                        <Image radius="50%" src={brand.logo} alt={brand.logo_alt} w="2.85rem" h="2.85rem" baseWidth={46} baseHeight={46} />
                        <Box visibleFrom="xs">
                            <Text className="header-name">{brand.name}</Text>
                            <Text className="header-place">{brand.place}</Text>
                        </Box>
                    </Anchor>

                    <Group gap="0.15rem" visibleFrom="lg" wrap="nowrap">
                        {links.map((navLink) => (
                            <Anchor
                                key={navLink.url}
                                className={`nav-link${isActive(pathname, navLink.url) ? " nav-link-active" : ""}`}
                                component={Link}
                                href={navLink.url}
                                title={navLink.full_title}
                            >
                                {navLink.title}
                            </Anchor>
                        ))}
                    </Group>

                    <Group gap="0.85rem" wrap="nowrap">
                        <Anchor href={contact.phone_link} className="header-phone" visibleFrom="md">
                            <TbPhone size="1rem" />
                            {contact.phone}
                        </Anchor>
                        <Button component={Link} href={joinButton.url} visibleFrom="sm">
                            {joinButton.text}
                        </Button>
                        <Burger color="#fff" opened={opened} onClick={toggle} size="sm" hiddenFrom="lg" />
                    </Group>
                </Group>
            </Container>

            <Drawer
                hiddenFrom="lg"
                opened={opened}
                onClose={close}
                position="right"
                size="20rem"
                padding="1.5rem"
                withCloseButton={false}
                classNames={{ content: "nav-drawer-content", body: "nav-drawer-body" }}
                overlayProps={{ backgroundOpacity: 0.55 }}
            >
                <Group justify="space-between" mb="1.8rem">
                    <Image src={brand.logo} alt={brand.logo_alt} w="2.8rem" h="2.8rem" radius="50%" baseWidth={45} baseHeight={45} />
                    <Burger color="#fff" opened onClick={close} size="sm" />
                </Group>
                <Stack gap="0.15rem">
                    {links.map((navLink) => (
                        <Anchor
                            key={navLink.url}
                            className={`drawer-link${isActive(pathname, navLink.url) ? " drawer-link-active" : ""}`}
                            onClick={close}
                            component={Link}
                            href={navLink.url}
                        >
                            {navLink.full_title || navLink.title}
                        </Anchor>
                    ))}
                </Stack>
                <Button fullWidth mt="1.6rem" component={Link} href={joinButton.url} onClick={close}>
                    {joinButton.text}
                </Button>
                <Stack gap="0.7rem" mt="1.8rem">
                    <Group gap="0.45rem" component={Anchor} href={contact.phone_link} td="none" c="#cfcfcf">
                        <TbPhone size="1.1rem" color="#128DC6" />
                        <Text size="sm">{contact.phone}</Text>
                    </Group>
                    <Group gap="0.45rem" component={Anchor} href={contact.email_link} td="none" c="#cfcfcf">
                        <TbMail size="1.1rem" color="#128DC6" />
                        <Text size="sm">{contact.email}</Text>
                    </Group>
                </Stack>
            </Drawer>
        </header>
    );
}
