import axios from "axios"
import { useState, useEffect } from "react";
import { Box, Flex} from "@chakra-ui/react"

export default function UserInfo(id) {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])

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
    useEffect(() => {
        const findUser = () => {
            const findMyUser = users.find(user => user._id === id.id);
            setUser(findMyUser);
        }
        findUser();
    }, [users, id]);

    return (<>
        <Box>
            {user ? <Flex gap={3} color="gray.400" justifyContent={"center"}>
         {user.firstName}  {user.lastName}</Flex> : "user"}
        </Box>
    </>)

}





