require("dotenv").config();
const admin = require("firebase-admin");

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log("Successfully connected to Firebase!");
  
  // Try to access Firestore
  const db = admin.firestore();
  db.collection("test").get()
    .then(() => {
      console.log("Successfully connected to Firestore!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error connecting to Firestore:", error);
      process.exit(1);
    });
} catch (error) {
  console.error("Error initializing Firebase:", error);
  process.exit(1);
}
