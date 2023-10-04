import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [show, setShow] = useState(false);
    const handleClick = () => { setShow(!show) };
    const [email, setEmail]  = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async() => {
        setLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        if (password !== confirmpassword) {
            toast({
                title: "Passwords do not match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("/api/user", { name, email, password }, config);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/game");
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
    }

    return (
        <VStack spacing="15px">
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Enter Name' type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Enter Email</FormLabel>
                <Input placeholder='Enter Email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Enter Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        value={confirmpassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button w="100%" colorScheme='blue' onClick={handleSubmit} isLoading={loading}>Sign Up</Button>
        </VStack>
    )
}
