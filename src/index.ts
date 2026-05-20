import { handleHealth } from "./routes/index.js";

const port = Number(process.env.PORT ?? 3000);
console.log(`Server would listen on ${port}`);
