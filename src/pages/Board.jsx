import { Flex, Box, Heading, Select, Button } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import UserInfo from "../components/UserInfo"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext";
import { DeleteTaskModal } from "../components/DeleteTaskModal"

export default function Board() {
    const { user } = useAuth()

    const [tasks, setTasks] = useState([])

    useEffect(() => {

        if (user.role === "user") {
            axios.get("http://localhost:3001/get-tasks", {
                headers: {
                    "x-access-token": localStorage.getItem("userToken")
                }
            }).then((res) => {
                setTasks(res.data.tasks)
            })
                .catch((err) => {
                    console.log(err)
                });
        }
        if (user.role === "admin") {
            axios.get("http://localhost:3001/get-all-tasks", {
                headers: {
                    "x-access-token": localStorage.getItem("userToken")
                }
            }).then((res) => {
                setTasks(res.data.tasks)
            })
                .catch((err) => {
                    console.log(err)
                });
        }

    }, [])


    const toDo = tasks.filter((task) => task.status === "to do")
    const inProgress = tasks.filter((task) => task.status === "in progress")
    const readyForQA = tasks.filter((task) => task.status === "ready for QA")
    const done = tasks.filter((task) => task.status === "done")


    const updateStatus = ({ taskId, status, title, description }) => {

        axios.put("http://localhost:3001/update-task", {
            status: status,
            title: title,
            description: description,
            id: taskId,
            updateAt: Date.now()
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then((res) => {
                const notUpdatedTask = tasks.filter((task) => task._id !== taskId);
                const updatedTask = tasks.find((task) => task._id === taskId);
                setTasks([
                    {
                        ...updatedTask,
                        status, title, description
                    },
                    ...notUpdatedTask
                ])

            })
            .catch((error) => {
                console.error(error);

            });
    }


    const deleteTask = (id, onClose) => {
        axios.delete("http://localhost:3001/delete-task", {
            data: { id }
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then(res => {
                const notDeletedTasks = tasks.filter((task) => task._id !== id);
                setTasks([
                    ...notDeletedTasks
                ])
                onClose()
            })
            .catch(err => {
                console.log("error>>>", err)
            })
    }

    return (
        <Flex
            h={"100%"}
            w={"100%"}
            gap={15}
            justifyContent={"space-around"}>
            <Flex
                flexDir={"column"}
                gap={5}
                borderRadius={"5px"}
                bg={"red"}
                h={"100%"}
                w={"100%"}
                alignItems={"center"}>
                <Heading textAlign={"center"}>To Do</Heading>
                {toDo ? toDo.map((task) => {
                    return <Flex key={task._id} gap={15} flexDir={"column"}>
                        <UserInfo
                            id={task.userId} />
                        <Box>
                            {task.title}
                        </Box>
                        <Box>
                            {task.description}
                        </Box>
                        <Select
                            onChange={(e) => updateStatus({
                                status: e.target.value,
                                taskId: task._id,
                                title: task.title,
                                description: task.description
                            })}
                            placeholder="Status"
                            mt={6}
                        >
                            <option value="in progress">In Progress</option>
                            <option value="ready for QA">Ready For QA</option>
                            <option value="done">Done</option>
                            <option value="to do">To Do</option>
                        </Select>
                        <p>Create At {new Date(task.createAt).toLocaleString()}</p>
                        <p>Update At {new Date(task.updateAt).toLocaleString()}</p>
                        <DeleteTaskModal
                            id={task._id}
                            deleteTask={deleteTask} />
                    </Flex>
                }) : <p>No Tasks</p>}

            </Flex>
            <Flex
                flexDir={"column"}
                gap={5}
                borderRadius={"5px"}
                bg={"red.50"}
                h={"100%"}
                w={"100%"}
                alignItems={"center"}>
                <Heading textAlign={"center"}>In Progress</Heading>
                {inProgress ? inProgress.map((task) => {
                    return <Flex key={task._id} gap={15} flexDir={"column"}>
                        <UserInfo
                            id={task.userId} />
                        <Box>
                            {task.title}
                        </Box>
                        <Box>
                            {task.description}
                        </Box>
                        <Select
                            onChange={(e) => updateStatus({
                                status: e.target.value,
                                taskId: task._id,
                                title: task.title,
                                description: task.description
                            })}
                            placeholder="Status"
                            mt={6}
                        >
                            <option value="in progress">In Progress</option>
                            <option value="ready for QA">Ready For QA</option>
                            <option value="done">Done</option>
                            <option value="to do">To Do</option>
                        </Select>
                        <p>Create At {new Date(task.createAt).toLocaleString()}</p>
                        <p>Update At {new Date(task.updateAt).toLocaleString()}</p>
                        <DeleteTaskModal
                            id={task._id}
                            deleteTask={deleteTask} />
                    </Flex>
                }) : <p>No Tasks</p>}
            </Flex>
            <Flex
                flexDir={"column"}
                gap={5}
                borderRadius={"5px"}
                bg={"yellow"}
                h={"100%"}
                w={"100%"}
                alignItems={"center"}>
                <Heading textAlign={"center"}>Ready For QA</Heading>
                {readyForQA ? readyForQA.map((task) => {
                    return <Flex key={task._id} gap={15} flexDir={"column"}>
                        <UserInfo
                            id={task.userId} />
                        <Box>
                            {task.title}
                        </Box>
                        <Box>
                            {task.description}
                        </Box>
                        <Select
                            onChange={(e) => updateStatus({
                                status: e.target.value,
                                taskId: task._id,
                                title: task.title,
                                description: task.description
                            })}
                            placeholder="Status"
                            mt={6}
                        >
                            <option value="in progress">In Progress</option>
                            <option value="ready for QA">Ready For QA</option>
                            <option value="done">Done</option>
                            <option value="to do">To Do</option>
                        </Select>
                        <p>Create At {new Date(task.createAt).toLocaleString()}</p>
                        <p>Update At {new Date(task.updateAt).toLocaleString()}</p>
                        <DeleteTaskModal
                            id={task._id}
                            deleteTask={deleteTask} />
                    </Flex>
                }) : <p>No Tasks</p>}
            </Flex>
            <Flex
                flexDir={"column"}
                gap={5}
                alignItems={"center"}
                borderRadius={"5px"}
                bg={"green"}
                h={"100%"}
                w={"100%"}>
                <Heading textAlign={"center"}>Done</Heading>
                {done ? done.map((task) => {
                    return <Flex key={task._id} gap={15} flexDir={"column"}>
                        <UserInfo
                            id={task.userId} />
                        <Box>
                            {task.title}
                        </Box>
                        <Box>
                            {task.description}
                        </Box>
                        <Select
                            onChange={(e) => updateStatus({
                                status: e.target.value,
                                taskId: task._id,
                                title: task.title,
                                description: task.description
                            })}
                            placeholder="Status"
                            mt={6}
                        >
                            <option value="in progress">In Progress</option>
                            <option value="ready for QA">Ready For QA</option>
                            <option value="done">Done</option>
                            <option value="to do">To Do</option>
                        </Select>
                        <p>Create At {new Date(task.createAt).toLocaleString()}</p>
                        <p>Update At {new Date(task.updateAt).toLocaleString()}</p>
                        <DeleteTaskModal
                            id={task._id}
                            deleteTask={deleteTask} />
                    </Flex>
                }) : <p>No Tasks</p>}
            </Flex>

        </Flex>
    )
}