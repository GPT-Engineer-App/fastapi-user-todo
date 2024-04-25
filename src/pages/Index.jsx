import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, List, ListItem, Text, VStack, Image, useToast } from "@chakra-ui/react";
import { FaPlus, FaUserPlus, FaSearch } from "react-icons/fa";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [todoText, setTodoText] = useState("");
  const toast = useToast();

  const fetchUsers = async () => {
    const response = await fetch("/users/");
    const data = await response.json();
    setUsers(data);
  };

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
      fetchUsers();
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

  const fetchTodos = async () => {
    const response = await fetch(`/users/${userId}/todos/`);
    const data = await response.json();
    setTodos(data);
  };

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
      fetchTodos();
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
        <Button leftIcon={<FaSearch />} colorScheme="green" onClick={fetchUsers}>
          Load Users
        </Button>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              {user.email} - User ID: {user.id}
            </ListItem>
          ))}
        </List>
        <FormControl>
          <FormLabel>User ID for Todos</FormLabel>
          <Input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter User ID" />
          <FormLabel>Todo Text</FormLabel>
          <Input value={todoText} onChange={(e) => setTodoText(e.target.value)} placeholder="Enter Todo" />
          <Button leftIcon={<FaPlus />} mt={2} colorScheme="purple" onClick={createTodo}>
            Add Todo
          </Button>
        </FormControl>
        <Button leftIcon={<FaSearch />} colorScheme="orange" onClick={fetchTodos}>
          Load Todos
        </Button>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              {todo.text} - Todo ID: {todo.id}
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
