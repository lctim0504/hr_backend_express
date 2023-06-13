import cors from "cors"

export const corsOptions = cors({
    origin: 'http://192.168.0.224:3000',
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['X-Requested-With', 'Accept', 'Content-Type', 'Cookie'],
});