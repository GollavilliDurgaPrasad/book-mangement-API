import express from "express";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorHandler";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", bookRoutes);
app.use(errorHandler);

export default app;