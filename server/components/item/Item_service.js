import itemRepository from "./Item_repository.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getDepartments = catchError(async (req, res) => {
    const id = req.params.id;
    const getAllItems = await itemRepository.getDepartments();
    res.json(getAllItems);
});

const getUserIds = catchError(async (req, res) => {
    const id = req.params.id;
    const getAllItems = await itemRepository.getUserIds();
    res.json(getAllItems);
});

export default { getDepartments, getUserIds };
