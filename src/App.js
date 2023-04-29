import { Box, ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx"
import Board from "./pages/Board.jsx"
import { SignIn } from './pages/SignIn.jsx';
import { AddUser } from './pages/AddUser.jsx';
import { CreateTask } from './pages/CreateTask.jsx';
import { AuthProvider } from "./contexts/AuthContext"
import { SignOut } from "./components/SignOut";

function App() {
  return (
    <Box
      h={"700px"}>
      <ChakraProvider>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/board" element={<Board />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/sign-out" element={<SignOut />} />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </Box>


  );
}

export default App;
