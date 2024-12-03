import { Box, Modal, TextField, Button } from "@mui/material";
import UserButton from "./UserForm";
import UserTable from "./UserTable";
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({ id: null, name: "" });

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios
            .get("http://localhost:3001/api/users")
            .then((response) => {
                setUsers(response.data || []);
            })
            .catch((error) => {
                console.log("Axios error", error);
            });
    };

    const addUser = (data) => {
        setSubmitted(true);
        const payload = { id: data.id, name: data.name };

        axios
            .post("http://localhost:3001/api/createuser", payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
            })
            .catch((error) => {
                console.log("Axios error", error);
            });
    };

    const updateUser = () => {
        const { id, name } = selectedUser;
        const payload = { id, name };

        axios
            .post("http://localhost:3001/api/updateuser", payload)
            .then(() => {
                getUsers();
                setModalOpen(false);
            })
            .catch((error) => {
                console.log("Axios error", error);
            });
    };

    const deleteUser = (id) => {
        axios
            .post("http://localhost:3001/api/deleteuser", { id })
            .then(() => {
                getUsers();
            })
            .catch((error) => {
                console.log("Axios error", error);
            });
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <Box
            sx={{
                width: "calc(100% - 100px)",
                margin: "auto",
                marginTop: "100px",
            }}
        >
            <UserButton addUser={addUser} submitted={submitted} />
            <UserTable
                rows={users}
                updateUser={handleEditClick}
                deleteUser={(data) =>
                    window.confirm("Are you sure?") && deleteUser(data.id)
                }
            />

            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="edit-user-modal"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <h2>Edit User</h2>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        value={selectedUser.name}
                        onChange={(e) =>
                            setSelectedUser({
                                ...selectedUser,
                                name: e.target.value,
                            })
                        }
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleModalClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={updateUser}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Users;
