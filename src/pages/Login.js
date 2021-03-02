import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Skeleton,
  Text
} from "@chakra-ui/react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { auth } from "../firebase";

export default function Login() {
  const [user, authLoading] = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [tab, setTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    setTab(location.hash.replace("#", ""));
  }, [location.hash]);

  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setAuthError("");
    if (tab === "signin") {
      auth
        .signInWithEmailAndPassword(email, pass)
        .then((user) => {
          setIsLoading(false);
        })
        .catch((error) => {
          setAuthError(error.message);
          setIsLoading(false);
        });
    } else if (tab === "signup") {
      auth
        .createUserWithEmailAndPassword(email, pass)
        .then((user) => {
          setIsLoading(false);
        })
        .catch((error) => {
          setAuthError(error.message);
          setIsLoading(false);
        });
    }
  };

  if (user) {
    return <Redirect to="/profile" />;
  }

  return (
    <Flex
      h="100vh"
      w="100%"
      align="center"
      justify="center"
      p="4"
      bgColor="teal.50"
    >
      <Flex
        w="100%"
        maxW="500px"
        bgColor="white"
        shadow="md"
        rounded="lg"
        py="4"
        px="8"
        d="column"
      >
        <Heading fontSize="3xl" mb="5">
          {tab === "signin" ? "Login" : "Register"}
        </Heading>

        <Skeleton isLoaded={!authLoading}>
          <Input
            placeholder="Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={authLoading}
          />
        </Skeleton>
        <Skeleton isLoaded={!authLoading} mt="3" mb="4">
          <Input
            placeholder="Your Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            disabled={authLoading}
          />
        </Skeleton>

        {authError && <Text color="red.500">{authError}</Text>}

        <Flex justify="space-between" mt="2">
          <Button
            colorScheme="blue"
            type="submit"
            onClick={onSubmit}
            isLoading={isLoading}
          >
            {tab === "signin" ? "Login" : "Register"}
          </Button>
          <Button
            onClick={() =>
              history.push(tab === "signin" ? "#signup" : "#signin")
            }
            disabled={isLoading}
          >
            {tab === "signin"
              ? "New here? Create an account"
              : "Login with an existing account"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
