import userRepository from "./User_repository.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const updateUser = catchError(async (req, res) => {

    const id = req.params.id;
    const body = req.body;
    const updatedUser = await userRepository.updateUser(id, body);
    res.json(updatedUser);
});

const createUser = catchError(async (req, res) => {
    const body = req.body;
    const newUser = await userRepository.createUser(body);
    res.json(newUser);
});

const deleteUser = catchError(async (req, res) => {
    const id = req.params.id;
    await userRepository.deleteUser(id);
    res.json("用戶成功刪除");
});

const getUser = catchError(async (req, res) => {
    const id = req.params.id;
    const getUser = await userRepository.getUserById(id);
    res.json(getUser);
});

const getAllUsers = catchError(async (req, res) => {
    const getUsers = await userRepository.getAllUsers();
    res.json(getUsers);
});

export default { updateUser, deleteUser, getAllUsers, getUser, createUser };
