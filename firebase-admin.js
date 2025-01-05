const admin = require('firebase-admin');
    const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } = process.env;

    const serviceAccount = {
      "projectId": FIREBASE_PROJECT_ID,
      "privateKey": FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\\n'),
      "clientEmail": FIREBASE_CLIENT_EMAIL
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`
    });

    const db = admin.firestore();

    module.exports = { admin, db };
