
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { VStack } from '@chakra-ui/layout'

import React, { useState } from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router";


const Login = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const toast = useToast();
  const history = useNavigate();

  const handleClick = () => {
    setShow(!show);
  }



  const submitHandler = async () => {
    // console.log("submit handler fuchtion working")
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {

          email,
          password
        },
        config
      );
      // console.log(data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };



  return (
    <VStack spacing='5px'>


      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}

        />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder='Enter Your Password'
            onChange={(e) => setPassword(e.target.value)}

          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}

            </Button>

          </InputRightElement>

        </InputGroup>

      </FormControl>





      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login

      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@auqib.com");
          setPassword("Perfect123")
          // console.log("guest logged in")
        }}
      >

        Login as Guest User
      </Button>


    </VStack>
  )
}

export default Login
