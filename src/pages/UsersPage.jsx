import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, List, ListItem, Text, VStack, useToast } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";

function UsersPage() {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const createUser = async () => {
    const response = await fetch("/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    if (response.ok) {
      setEmail("");
    } else {
      const errorData = await response.json();
      toast({
        title: "Error",
        description: errorData.detail,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md">
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          <Button leftIcon={<FaUserPlus />} mt={2} colorScheme="blue" onClick={createUser}>
            Add User
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
}

export default UsersPage;
