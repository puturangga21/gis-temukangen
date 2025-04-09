import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import loginRoute from "./route/loginRoute.js";
import locationRoute from "./route/locationRoute.js";

dotenv.config();

const app = express();
const PORT = 3001;

const corsOption = {
  origin: ["https://gis_2205551142.manpits.xyz", "http://192.168.4.4", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT} 💚`);
});

app.use("/", loginRoute);
app.use("/", locationRoute);

// const accessValidation = (req, res, next) => {
//   const { authorization } = req.headers;
//
//   if (!authorization) {
//     return res.status(401).json({ error: "Token diperlukan!" });
//   }
//
//   const token = authorization.split(" ")[1];
//   const secret = process.env.JWT_SECRET;
//
//   try {
//     const jwtDecode = jwt.verify(token, secret);
//     req.userData = jwtDecode;
//   } catch (e) {
//     return res.status(401).json({ error: "Token tidak valid!" });
//   }
//
//   next();
// };
//
