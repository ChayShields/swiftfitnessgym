'use client'

import { Link as NextLink } from "next/link"
import { Anchor } from "@mantine/core";

export default function Link({ children, ...props }) {
    return (
        <Anchor td="none" component={NextLink} {...props}>
            {children}
        </Anchor>
    )
}