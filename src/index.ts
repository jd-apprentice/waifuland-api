import app from './server';
import "./database";
import dotenv from "dotenv";
dotenv.config();
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})