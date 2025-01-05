require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { db } = require("./firebase-admin");
const multer = require("multer");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Store file data in Firebase
    const docRef = db.collection("uploadedFiles").doc();
    await docRef.set({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      uploadedAt: new Date(),
      // Store the file content as base64
      fileData: req.file.buffer.toString("base64")
    });

    res.status(200).send({ 
      message: "File uploaded successfully", 
      fileId: docRef.id 
    });
  } catch (error) {
    console.error("Error processing upload:", error);
    res.status(500).send({ 
      message: "Error processing upload", 
      error: error.message 
    });
  }
});

app.get("/data/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const docRef = db.collection("uploadedFiles").doc(fileId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send({ message: "File not found" });
    }

    res.status(200).send(doc.data());
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ 
      message: "Error fetching data", 
      error: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
