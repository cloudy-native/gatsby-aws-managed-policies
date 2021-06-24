import { Box, Center, Flex, Heading, Link, Spacer, Button, HStack } from "@chakra-ui/react"
import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ThemeToggle from "./toggle-theme"

function NavBar({ siteTitle, ...rest }) {
  return (
    <Flex as="header" {...rest}>
      <Heading>
        <Link as={GatsbyLink} to="/" _hover={{ textDecor: "none" }} >{siteTitle}</Link>
      </Heading>
      <Spacer />
      <HStack spacing={4}>
        {/* <Link as={GatsbyLink} to="/help">Help</Link> */}
        <Link as={GatsbyLink} to="/" _hover={{ textDecor: "none" }}>Home</Link>
        <Link as={GatsbyLink} to="/about" _hover={{ textDecor: "none" }}>About</Link>
        <ThemeToggle />
      </HStack>
    </Flex>
  )
}

NavBar.propTypes = {
  siteTitle: PropTypes.string,
}

NavBar.defaultProps = {
  siteTitle: ``,
}

export default NavBar
