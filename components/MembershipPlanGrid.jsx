import { Button, Card, CardSection, SimpleGrid, Stack, Text } from "@mantine/core"
import { TbArrowRight } from "react-icons/tb"
import CmsHtml from "./CmsHtml"
import Image from "./Image"

export default function MembershipPlanGrid({ plans, priceSuffix, buttonText }) {
    return (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="1.2rem">
            {plans.map((plan) => (
                <Card className="membership-card" key={plan.id} bd="1px solid #dcdcdc" bg="#fff" p={0}>
                    <CardSection>
                        <Image className="plan-photo" baseWidth={2560} baseHeight={1920} h="8.5rem" w="100%" sizes="(min-width: 75em) 380px, (min-width: 62em) 33vw, (min-width: 48em) 50vw, 100vw" src={plan.image} alt={plan.title} />
                    </CardSection>
                    <Stack gap="0.3rem" p="1.3rem" h="100%" justify="space-between">
                        <div>
                            <CmsHtml fz="1.2rem" fw={600}>{plan.title}</CmsHtml>
                            {plan.note ? <CmsHtml size="sm" c="dimmed">{plan.note}</CmsHtml> : null}
                        </div>
                        <Stack gap="0.85rem" mt="0.6rem">
                            <div>
                                <Text fz="1.8rem" fw={700} c="primary" span>{plan.price}</Text>
                                <Text c="dimmed" span> {priceSuffix}</Text>
                                {plan.signup_fee && (
                                    <CmsHtml size="sm" mt={4}>{plan.signup_fee}</CmsHtml>
                                )}
                            </div>
                            <Button
                                fullWidth
                                component="a"
                                href={plan.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                rightSection={<TbArrowRight size="1.1rem" />}
                            >
                                {buttonText}
                            </Button>
                        </Stack>
                    </Stack>
                </Card>
            ))}
        </SimpleGrid>
    )
}
