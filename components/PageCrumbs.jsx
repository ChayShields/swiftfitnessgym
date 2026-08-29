import { Box, Breadcrumbs, Container, Text } from "@mantine/core";
import { TbChevronRight, TbHome } from "react-icons/tb";
import { stripCmsHtml } from "../lib/sanitize-html";
import Link from "./Link";

export default function PageCrumbs({ label, href }) {
    const items = [
        { title: <TbHome size="1.3rem" color="#333" />, href: "/" },
        { title: stripCmsHtml(label), href },
    ].map((item, index) => (
        <Box component={item.href ? Link : Text} c="#000" href={item.href} key={index}>
            {item.title}
        </Box>
    ))

    return (
        <Box p="0.55rem 1rem" bg="#fff" bd="0 0 1px 0 solid #ececec">
            <Container>
                <Breadcrumbs separator={<TbChevronRight />}>
                    {items}
                </Breadcrumbs>
            </Container>
        </Box>
    )
}
