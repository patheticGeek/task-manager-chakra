import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  IconButton,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Skeleton
} from "@chakra-ui/react";
import { Redirect, useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { database } from "../firebase";
import create_new_project_data from "../utils/create_new_project_data";

export default function Profile() {
  const toast = useToast();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, authLoading] = useAuth();
  const [newProjName, setNewProjName] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    if (!user) return;

    const dbSubscription = database
      .ref(`${user.uid}/projects/`)
      .orderByChild("/created_at")
      .on("value", onChangeProjects);

    return () => {
      dbSubscription();
    };
  }, [user]);

  const onChangeProjects = (snapshot) => {
    if (!snapshot) return;
    const newValue = snapshot.exists() ? snapshot.val() : {};
    const newProjects = Object.entries(newValue).map((val) => ({
      key: val[0],
      ...val[1]
    }));
    setProjects(newProjects);
  };

  const createNewProject = async () => {
    setIsCreatingProject(true);
    try {
      await database
        .ref(`${user.uid}/projects/`)
        .push(create_new_project_data(newProjName));
      onClose();
      toast({
        title: "Project created",
        description: "Your project has been created.",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (e) {
      toast({
        title: "Project not created",
        description: "An error occured while creating project.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
    setIsCreatingProject(false);
    setNewProjName("");
  };

  if (authLoading) {
    return <></>;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Flex minH="100vh" bgColor="blue.50" pt="20" px="4" direction="column">
      <Flex direction="row" align="center" justify="space-between">
        <Heading size="md">Your projects</Heading>
        <IconButton colorScheme="blue" icon={<FaPlus />} onClick={onOpen} />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="newProjectName">
              <FormLabel as="label">Project Name</FormLabel>
              <Input
                placeholder="Wandering world"
                value={newProjName}
                onChange={(e) => setNewProjName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr="3"
              onClick={() => {
                setNewProjName("");
                onClose();
              }}
              disabled={isCreatingProject}
            >
              Close
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={createNewProject}
              isLoading={isCreatingProject}
              disabled={!newProjName || isCreatingProject}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex flexWrap="wrap" align="center" mt="3">
        {projects ? (
          projects.length > 0 ? (
            projects.map((item, index) => (
              <Button
                key={item.key}
                m="2"
                w="240px"
                colorScheme="teal"
                rounded="md"
                shadow="sm"
                onClick={() => {
                  history.push({
                    pathname: `/project/${item.key}`,
                    state: { project: item }
                  });
                }}
              >
                <Text
                  w="100%"
                  noOfLines={1}
                  fontWeight="medium"
                  textAlign="left"
                  mr="2"
                >
                  {item.name}
                </Text>
              </Button>
            ))
          ) : (
            <>
              <Heading color="gray.500" mt="5" textAlign="center" mx="Auto">
                Start creating new projects!
              </Heading>
            </>
          )
        ) : (
          <>
            <Skeleton m="2">
              <Button w="240px" colorScheme="teal" rounded="md" shadow="sm" />
            </Skeleton>
            <Skeleton m="2">
              <Button w="240px" colorScheme="teal" rounded="md" shadow="sm" />
            </Skeleton>
          </>
        )}
      </Flex>
    </Flex>
  );
}
