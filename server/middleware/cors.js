import cors from "cors"

export const corsOptions = cors({
    origin: 'http://192.168.0.224:3000',
    credentials: true,
});