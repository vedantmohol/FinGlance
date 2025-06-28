import { Box, ClientOnly, IconButton, Skeleton } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import { LuMoon, LuSun } from "react-icons/lu"

const ColorModeToggle = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <Box top={4} right={4} position="fixed">
    <ClientOnly  fallback={<Skeleton boxSize="8" />}>
      <IconButton onClick={toggleColorMode} variant="outline" size="sm">
        {colorMode === "light" ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
    </Box>
  )
}

export default ColorModeToggle;