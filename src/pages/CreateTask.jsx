import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Flex, Box, Input, Button, Heading, useToast, Textarea } from "@chakra-ui/react"

export function CreateTask(user) {
    const toast = useToast()
    const { register, handleSubmit, reset } = useForm();

    const create = async (data) => {

        await axios.post("http://localhost:3001/create-task", {
            title: data.title,
            description: data.description,
            createAt: Date.now(),
            status: "to do"
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then(function (res) {
                reset()
                return toast({
                    title: "Yes",
                    description: "Your post created",
                    status: "success",
                    duration: 8000,
                    isClosable: true,
                });
            })
            .catch(function (error) {
                console.log(error)
                return toast({
                    title: "Sorry",
                    description: "Your post not created",
                    status: "error",
                    duration: 8000,
                    isClosable: true,
                })
            })

        console.log("data>>>", data)


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