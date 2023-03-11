import React from 'react'
import { Container, Box, Text, Center, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'

const HomePage = () => {
    return (
        <Container maxW='x1' centerContent>
            <Box
                d='flex'
                justifyContent='center'
                p={3}
                bg={"white"}
                w="40%"
                m="70px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Center fontSize='4xl' fontFamily="Work sans" color="black" justifyContent='Center'>
                    aChat Application</Center>
            </Box>
            <Box
                bg="white" w="40%" p={4} borderRadius="lg" borderWidth="1px">
                <Tabs variant='soft-rounded' >
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>


            </Box>


        </Container>
    )
}

export default HomePage
