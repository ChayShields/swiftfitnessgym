'use client'

import { notifications } from "@mantine/notifications"
import { TbAlertTriangle, TbCheck } from "react-icons/tb"

export function notifySuccess(title, message) {
    notifications.show({
        title,
        message,
        color: "primary",
        icon: <TbCheck size="1.15rem" />,
    })
}

export function notifyError(title, message) {
    notifications.show({
        title,
        message,
        color: "accent",
        icon: <TbAlertTriangle size="1.15rem" />,
    })
}
