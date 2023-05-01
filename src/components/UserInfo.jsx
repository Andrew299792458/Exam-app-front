import axios from "axios"
import { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react"
import { useAuth } from "../contexts/AuthContext";


export default function UserInfo(id) {
    const { user } = useAuth()

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    const AllUsers = async () => {
        await axios.post("http://localhost:3001/users", {
            role: user.role
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        }).then((res) => {
            setUsers(res.data.users)
        })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        if (user.role === "admin") {
            AllUsers()
        }
    }, [])

    useEffect(() => {
        const findUser = () => {
            const findMyUser = users.find(user => user._id === id.id);
            setCurrentUser(findMyUser);
        }
        findUser();
    }, [users, id]);

    return (<>
        <Box>
            {currentUser ? <Flex gap={3} color="gray.400" justifyContent={"center"}>
                {currentUser.firstName}  {currentUser.lastName}</Flex> : null}
        </Box>
    </>)

}





