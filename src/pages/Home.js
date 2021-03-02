import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex h="100vh" w="100%" align="center" justify="center" bgColor="blue.500">
      <Flex direction="column" align="center">
        <img
          src={require("../assets/clipboard.png").default}
          alt="Clipboard"
          height="80"
          width="80"
        />
        <Heading color="white" mt="5">
          Manage tasks, Efficently.
        </Heading>
      </Flex>
    </Flex>
  );
}
