import { Grid, GridItem } from "@chakra-ui/react"
import { ContentsInfo } from "@/components/HomePage/ContentsInfo"

export const Contents = () => {
  return (
    <Grid
      h="3000px"
      w="100%"
      templateRows={{ base: "repeat(3, 1fr)" }}
      templateColumns={{ base: "repeat(1, 1fr)" }}
      gap={4}
    >
      <GridItem id="section1" rowSpan={1} backgroundColor={"transparent"}>
        new HomePage
      </GridItem>
      <GridItem id="section2" rowSpan={1} backgroundColor={"transparent"}>
        new HomePage
      </GridItem>
      <GridItem id="section3" rowSpan={1} backgroundColor={"transparent"}>
        <ContentsInfo />
      </GridItem>
    </Grid>
  )
}
