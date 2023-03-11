
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { VStack } from '@chakra-ui/layout'

import React, { useState } from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'

const Login = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = () => {
    setShow(!show);
  }



  const submitHandler = () => {

  }

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
          console.log("guest logged in")
        }}
      >

        Login as Guest User
      </Button>


    </VStack>
  )
}

export default Login
