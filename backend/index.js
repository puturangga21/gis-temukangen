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
  origin: ["http://localhost:3000", "https://192.168.4.4"],
  credentials: true,
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
// // REGISTER
// app.post("/register", async (req, res) => {
//   const { name, email, password, nim } = req.body;
//
//   if (!email || !password || !name || !nim) {
//     return res.status(400).json({ error: "Semua field harus diisi" });
//   }
//
//   const existingEmail = await prisma.users.findUnique({
//     where: {
//       email,
//     },
//   });
//
//   if (existingEmail) {
//     return res.status(400).json({ error: "Email sudah terdaftar" });
//   }
//
//   const hashedPassword = await bcrypt.hash(password, 10);
//
//   const result = await prisma.users.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//       nim: BigInt(nim),
//     },
//   });
//
//   res.json({ message: "User created", data: serializeBigInt(result) });
//   // res.json({ message: "User created" });
// });
//
// // LOGIN
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//
//   if (!email || !password) {
//     return res.status(400).json({ error: "Semua field harus diisi" });
//   }
//
//   const user = await prisma.users.findUnique({
//     where: {
//       email,
//     },
//   });
//
//   if (!user) {
//     return res.status(404).json({ error: "Email not found" });
//   }
//
//   if (!user.password) {
//     return res.status(404).json({ error: "Password not set" });
//   }
//
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//
//   if (isPasswordValid) {
//     const payload = {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       nim: user.nim.toString(),
//     };
//
//     const secret = process.env.JWT_SECRET;
//
//     const expiresIn = 60 * 60 * 24 * 7; // 1 week
//
//     const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
//
//     return res.json({
//       data: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         nim: user.nim.toString(),
//       },
//       token: token,
//     });
//   } else {
//     return res.status(401).json({ error: "Invalid password" });
//   }
//
//   // res.json({ message: "Login success" });
//   // res.json({ message: "User created", data: serializeBigInt(result) });
// });
//
// // GET ALL USERS
// app.get("/users", accessValidation, async (req, res) => {
//   const users = await prisma.users.findMany();
//   res.json(users);
// });
//
// // CREATE LOCATION
// app.post("/locations", accessValidation, async (req, res) => {
//   const { latitude, longitude, pointX, pointY, location_name, description } = req.body;
//
//   if (!latitude || !longitude || !pointX || !pointY || !location_name || !description) {
//     return res.status(400).json({ error: "Semua field harus diisi" });
//   }
//
//   try {
//     const location = await prisma.locations.create({
//       data: {
//         latitude: parseFloat(latitude),
//         longitude: parseFloat(longitude),
//         pointX: parseFloat(pointX),
//         pointY: parseFloat(pointY),
//         location_name,
//         description,
//       },
//     });
//
//     res.status(201).json({ message: "Lokasi berhasil disimpan", data: location });
//   } catch (e) {
//     console.error("❌ Gagal menyimpan lokasi:", e);
//     res.status(500).json({ error: "Gagal menyimpan lokasi", e });
//   }
// });
//
// // GET ALL LOCATION
// app.get("/locations", async (req, res) => {
//   try {
//     const locations = await prisma.locations.findMany();
//     res.json({ message: "Sukses mengambil lokasi", data: locations });
//   } catch (e) {
//     console.error("❌ Gagal mengambil lokasi:", e);
//     res.status(500).json({ error: "Gagal mengambil lokasi" });
//   }
// });
