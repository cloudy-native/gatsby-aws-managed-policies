import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/react"
import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ThemeToggle from "./toggle-theme"

function NavBar({ siteTitle, ...rest }) {
  return (
    <Flex as="header" {...rest}>
      <Heading>
        <Link as={GatsbyLink} to="/" _hover={{ textDecor: "none" }}>
          {siteTitle}
        </Link>
      </Heading>
      <Spacer />
      <ThemeToggle />
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
