export const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        if (error.isJoi) {
            // 如果發生資料格式錯誤，回傳400錯誤訊息
            res.status(400).json({ error: error.message });
        } else {
            console.log(error);
            // 其他錯誤訊息，回傳500錯誤訊息
            res.status(500).json({ error: '伺服器發生錯誤' });
        }
    }
};