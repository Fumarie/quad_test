import React, {ChangeEvent, useState} from "react"
import {
    Box, Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import {useRootStore} from "../../core/store/useRootStore.ts";

const allFormValues = {
    login: {
        headerText: "Sign in to your account",
        buttonText: "Sign in",
        changeTypeText: "Don't have one?",
        changeTypeButtonText: "Sign up",
    },
    signUp: {
        headerText: "Create a new account",
        buttonText: "Sign up",
        changeTypeText: "Have an account?",
        changeTypeButtonText: "Sign in",
    }
}

interface LoginFormProps {
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {

    const [isLogin, setIsLogin] = useState(true)

    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const {authStore} = useRootStore()

    const onChangeFormType = () => {
        setIsLogin(prev => !prev)
    }

    const formValues = isLogin ? allFormValues["login"] : allFormValues["signUp"]

    const onInputChange = (event: ChangeEvent<HTMLInputElement>, type: "password" | "username") => {
        const value = event.target.value

        if (type === "password") {
            setPassword(value)
        } else if (type === "username") {
            setUsername(value)
        }
    }

    const onFormSubmit = () => {
        console.log("Submitted", username, password)

        if (!username || !password) return

        const data = {
            username,
            password
        }

        if (isLogin) {
            authStore.login(data)

        } else {
            authStore.register(data)
        }

    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>{formValues.headerText}</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl isRequired id="username">
                            <FormLabel>username</FormLabel>
                            <Input value={username} onChange={value => onInputChange(value, "username")}
                                   type="username"/>
                        </FormControl>
                        <FormControl isRequired id="password">
                            <FormLabel>Password</FormLabel>
                            <Input value={password} onChange={value => onInputChange(value, "password")}
                                   type="password"/>
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                onClick={onFormSubmit}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                {formValues.buttonText}
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack pt={6}>
                        <Text userSelect={"none"} align={'center'}>
                            {formValues.changeTypeText} <Link onClick={onChangeFormType}
                                                              color={'blue.400'}>{formValues.changeTypeButtonText}</Link>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}


export default LoginForm
