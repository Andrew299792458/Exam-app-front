import { useForm } from "react-hook-form";
import { Select, Flex, Box, Input, Button, Heading, Text, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export function AddUser() {
    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const toast = useToast();
    const successToast = () => {
        return toast({
            title: 'Account created.',
            description: "Created new account!",
            status: 'success',
            duration: 8000,
            isClosable: true,
        });
    };
    const errorToast = () => {
        return toast({
            title: 'Sorry.',
            description: "This email already exists",
            status: 'error',
            duration: 8000,
            isClosable: true,
        });
    };

    const AddNewUser = async (data) => {

        await axios.post("http://localhost:3001/create-user", {
            role: user.role,
            userData: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                age: data.age,
                password: data.password,
                role: data.role
            }
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then(function (res) {
                console.log(res);
                successToast()
                reset()
            })
            .catch(function (error) {
                console.log(error);
                errorToast()
            });
    };

    return (
        <Flex w="100%"
            h="100vh"
            alignItems="center"
            justifyContent="center"
        >
            <Box>
                <form onSubmit={handleSubmit(AddNewUser)}>
                    <Heading
                    >Add New User</Heading>
                    <Input placeholder="First Name"
                        mt={6}
                        {...register("firstName", {
                            required: "First Name is Required",
                            minLength: {
                                value: 2,
                                message: "Invalid First Name"
                            }
                        })} />
                    {errors?.firstName && (
                        <Text
                            fontSize="xs"
                            color="red"
                        >{errors?.firstName?.message}</Text>
                    )}
                    <Input placeholder="Last Name"
                        mt={6}
                        {...register("lastName", {
                            required: "Last Name is Required",
                            minLength: {
                                value: 3,
                                message: "Invalid Last Name"
                            }
                        })}
                    />
                    {errors?.lastName && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.lastName?.message}</Text>)}
                    <Input placeholder="Email Address"
                        mt={6}
                        {...register("email", {
                            required: "Email Address is Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid Email Address",
                            }
                        })}
                    />
                    {errors?.email && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.email?.message}</Text>)}
                    <Input placeholder="Age"
                        mt={6}
                        {...register("age", { required: "Age is Required" })}
                    />
                    {errors?.age && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.age?.message}</Text>)}
                    <Input placeholder="Password"
                        mt={6}
                        {...register("password", {
                            required: "Password is Required",
                            minLength: {
                                value: 3,
                                message: "Password must be at least 9 symbols"
                            }
                        })}
                    />
                    {errors?.password && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.password?.message}</Text>)}

                    <Select placeholder="Role"
                        mt={6}
                        {...register("role", {
                            required: "Role is Required",
                        })}
                    >
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </Select>
                    {errors?.role && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.role?.message}</Text>)}

                    <Button type="submit"
                        mt={6}
                    >Add</Button>
                </form>
            </Box>
        </Flex>

    );
}