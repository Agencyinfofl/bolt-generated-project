const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;
    const { DOCUMENT_AI_PROJECT_ID, DOCUMENT_AI_LOCATION, DOCUMENT_AI_PROCESSOR_ID } = process.env;

    const client = new DocumentProcessorServiceClient();

    async function processDocument(gcsUri) {
      const name = `projects/${DOCUMENT_AI_PROJECT_ID}/locations/${DOCUMENT_AI_LOCATION}/processors/${DOCUMENT_AI_PROCESSOR_ID}`;
      const request = {
        name,
        rawDocument: {
          gcsUri: gcsUri,
          mimeType: 'application/pdf',
        },
      };

      try {
        const [result] = await client.processDocument(request);
        return result.document;
      } catch (error) {
        console.error('Error processing document:', error);
        throw error;
      }
    }

    module.exports = { processDocument };
