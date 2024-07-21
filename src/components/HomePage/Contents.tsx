import { Grid, GridItem } from "@chakra-ui/react"

export const Contents = () => {
  return (
    <Grid
      h="3000px"
      w="100%"
      templateRows={{ base: "repeat(3, 1fr)" }}
      templateColumns={{ base: "repeat(1, 1fr)" }}
      gap={4}
    >
      <GridItem rowSpan={1} backgroundColor={"yellow"}>
        new HomePage
      </GridItem>
      <GridItem rowSpan={1} backgroundColor={"yellow"}>
        new HomePage
      </GridItem>
      <GridItem rowSpan={1} backgroundColor={"yellow"}>
        new HomePage
      </GridItem>
    </Grid>
  )
}
