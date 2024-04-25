import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, List, ListItem, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function TodosPage() {
  const [userId, setUserId] = useState("");
  const [todoText, setTodoText] = useState("");
  const toast = useToast();

  const createTodo = async () => {
    const response = await fetch(`/users/${userId}/todos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: todoText }),
    });
    if (response.ok) {
      setTodoText("");
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
          <FormLabel>User ID for Todos</FormLabel>
          <Input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter User ID" />
          <FormLabel>Todo Text</FormLabel>
          <Input value={todoText} onChange={(e) => setTodoText(e.target.value)} placeholder="Enter Todo" />
          <Button leftIcon={<FaPlus />} mt={2} colorScheme="purple" onClick={createTodo}>
            Add Todo
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
}

export default TodosPage;
