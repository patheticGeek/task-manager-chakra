import React from "react";
import {
  Flex,
  Box,
  Link,
  Spacer,
  Skeleton,
  SkeletonCircle
} from "@chakra-ui/react";
import { Link as RRLink } from "react-router-dom";

export default function Navbar({ user, authLoading }) {
  return (
    <Flex
      as="nav"
      padding="2"
      shadow="md"
      bgColor="white"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      right={0}
    >
      <Box as={RRLink} p="2" to="/">
        <img
          src={require("../assets/clipboard.png").default}
          alt="Task Manager"
          height="32"
          width="32"
        />
      </Box>

      <Spacer />

      {authLoading ? (
        <></>
      ) : user ? (
        <Box>
          <Link
            as={RRLink}
            paddingX="4"
            paddingY="3"
            rounded="lg"
            mr="4"
            to="/profile"
          >
            My Projects
          </Link>
        </Box>
      ) : (
        <Box>
          <Link
            as={RRLink}
            paddingX="4"
            paddingY="3"
            rounded="lg"
            background="teal.500"
            color="white"
            mr="4"
            to="/login#signup"
          >
            Sign Up
          </Link>
          <Link
            as={RRLink}
            paddingX="4"
            paddingY="3"
            rounded="lg"
            background="teal.100"
            outline
            to="/login#signin"
          >
            Log in
          </Link>
        </Box>
      )}
    </Flex>
  );
}
