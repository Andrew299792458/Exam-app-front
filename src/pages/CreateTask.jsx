import { useForm } from "react-hook-form";
import axios from "axios";
import { Flex, Box, Input, Button, Heading, useToast, Textarea, Select } from "@chakra-ui/react"
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function CreateTask() {
    const { user } = useAuth()
    const [users, setUsers] = useState([])
    const toast = useToast()
    const { register, handleSubmit, reset, watch } = useForm();

    const userId = watch("Assign")

    useEffect(() => {
        axios.get("http://localhost:3001/users", {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        }).then((res) => {
            setUsers(res.data.users)
        })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    const create = async (data) => {

        await axios.post("http://localhost:3001/create-task", {
            role: user.role,
            userId: userId,
            taskData: {
                title: data.title,
                description: data.description,
                createAt: Date.now(),
                status: "to do",
            }

        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken"),
            }
        })
            .then(function (res) {
                reset()
                return toast({
                    title: "Yes",
                    description: "Your task created",
                    status: "success",
                    duration: 8000,
                    isClosable: true,
                });
            })
            .catch(function (error) {
                console.log(error)
                return toast({
                    title: "Sorry",
                    description: "Your task not created",
                    status: "error",
                    duration: 8000,
                    isClosable: true,
                })
            })
    }

    return (
        <>
            <Flex w="100%"
                h="100vh"
                alignItems="center"
                justifyContent="center"
                color={"gray"}
            >
                <Box>
                    <form onSubmit={handleSubmit(create)}>
                        <Heading
                        >Create Task</Heading>
                        {user.role === "admin" ? <Select placeholder="Assign" {...register("Assign")}>{users ? users.map((user) => {
                            return <option key={user._id} value={user._id}>{user.firstName}</option>
                        }) : null}</Select> : null}
                        <Input placeholder="Title"
                            mt={6}
                            {...register("title")} />
                        <Textarea placeholder="Description"
                            mt={6}
                            {...register("description")}
                        />
                        <Button type="submit"
                            mt={6}
                        >Create</Button>
                    </form>
                </Box>
            </Flex>
        </>
    )
}