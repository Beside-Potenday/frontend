import { extendTheme } from "@chakra-ui/react"

export const breakpoints = {
  initial: "0",
  xs: "520px",
  sm: "768px",
  md: "1024px",
  lg: "1280px",
}

export const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      "html, body": {},
      body: {
        fontFamily: "Inter, Noto Sans KR,sans-serif",
        maxWidth: "1920px",
      },
      "strong, b": {
        fontWeight: "700",
      },
    },
  },
})
