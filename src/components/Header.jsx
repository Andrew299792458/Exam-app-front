import {
    Flex,
    Link,
} from '@chakra-ui/react';
import { useAuth } from "../contexts/AuthContext.jsx";


export default function Header() {
    const { user } = useAuth()
    const token = localStorage.getItem("userToken")
    return (
        <Flex
            alignItems="center"
            color={'gray.200'}
            bg={"black"}
            mb={15}
            gap={15}>
            {!token ? <Link href="/sign-in">Sign In</Link> : null}
            {token ? <Link href="/board">Board</Link> : null}
            {token && user.role === "admin" ? <Link href="/add-user">Add User</Link> : null}
            {token ? <Link href="/create-task">New Task</Link> : null}
            {token ? <Link href="/sign-out">Sign Out</Link> : null}
        </Flex>
    )
}