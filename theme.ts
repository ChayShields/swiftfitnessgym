"use client";

import { colorsTuple, createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    primary: colorsTuple("#128DC6"),
    accent: colorsTuple("#BE574B"),
    charcoal: colorsTuple("#121212"),
  },
  primaryColor: "primary",
  fontFamily: "var(--font-body), sans-serif",
  fontFamilyMonospace: "var(--font-body), sans-serif",
  headings: {
    fontFamily: "var(--font-display), sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontWeight: "700" },
      h2: { fontWeight: "700" },
      h3: { fontWeight: "600" },
    }
  },
  components: {
    Container: {
      defaultProps: {
        size: 1200
      }
    },
    Grid: {
      defaultProps: {
        overflow: "hidden"
      }
    },
    Image: {
      defaultProps: {
        radius: 6,
      }
    },
    Breadcrumbs: {
      defaultProps: {
        visibleFrom: "xs"
      }
    },
    Paper: {
      defaultProps: {
        radius: 6
      }
    },
    Button: {
      defaultProps: {
        radius: 3,
        fw: 700,
      },
      styles: {
        root: {
          fontFamily: "var(--font-display), sans-serif",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }
      }
    },
    Accordion: {
      defaultProps: {
        radius: 6
      },
      styles: {
        item: {
        },
        label: {
          fontWeight: 700,
          fontFamily: "var(--font-display), sans-serif",
          fontSize: "1.3rem"
        }
      }
    },
    ActionIcon: {
      defaultProps: {
        radius: 4
      }
    },
    Card: {
      defaultProps: {
        radius: 6
      }
    },
    Notification: {
      defaultProps: {
        radius: 3,
        withBorder: false,
      }
    }
  }
});
