const { Storage } = require('@google-cloud/storage');
    const { GCS_BUCKET_NAME } = process.env;
    const storage = new Storage();
    const bucket = storage.bucket(GCS_BUCKET_NAME);

    async function uploadFile(file, fileName) {
      const fileUpload = bucket.file(fileName);
      try {
        await fileUpload.save(file);
        return `gs://${GCS_BUCKET_NAME}/${fileName}`;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }

    module.exports = { uploadFile };
