const allowedOrigins = ['https://waifuland.jonathan.com.ar', 'https://waifus.jonathan.com.ar'];
export const corsConfiguration = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600
}