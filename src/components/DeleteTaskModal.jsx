
import {
    Button,
    useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

export const DeleteTaskModal = ({ id, deleteTask }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const onDelete = () => deleteTask(id, onClose)
    return (
        <>
            <Button w={"100px"} onClick={onOpen}>Delete</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button onClick={onDelete}>delete</Button>
                        <Button onClick={onClose} >Close</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
