import prisma from "../prisma/prisma.js";

const locationController = async (req, res) => {
  try {
    const locations = await prisma.locations.findMany();
    res.json({ message: "Sukses mengambil lokasi", locations: locations });
  } catch (e) {
    console.error("❌ Gagal mengambil lokasi:", e);
    res.status(500).json({ error: "Gagal mengambil lokasi" });
  }
};

export default locationController;
