import React, { useState } from 'react'
    import './App.css'
    import axios from 'axios'

    function App() {
      const [file, setFile] = useState(null)
      const [uploadStatus, setUploadStatus] = useState('')
      const [extractedData, setExtractedData] = useState(null)

      const handleFileChange = (event) => {
        setFile(event.target.files[0])
      }

      const handleUpload = async () => {
        if (!file) {
          setUploadStatus('Please select a file.')
          return
        }

        setUploadStatus('Uploading...')
        const formData = new FormData()
        formData.append('file', file)

        try {
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          if (response.status === 200) {
            setUploadStatus('File uploaded successfully!')
            fetchExtractedData(response.data.dataId)
          } else {
            setUploadStatus(`Upload failed: ${response.data.message}`)
          }
        } catch (error) {
          setUploadStatus(`Upload failed: ${error.message}`)
        }
      }

      const fetchExtractedData = async (dataId) => {
        try {
          const response = await axios.get(`/api/data/${dataId}`)
          if (response.status === 200) {
            setExtractedData(response.data)
          } else {
            setUploadStatus('Failed to fetch extracted data.')
          }
        } catch (error) {
          setUploadStatus('Failed to fetch extracted data.')
        }
      }

      return (
        <div className="app-container">
          <h1>Insurance Document Upload</h1>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {uploadStatus && <p>{uploadStatus}</p>}
          {extractedData && (
            <div className="extracted-data">
              <h2>Extracted Data:</h2>
              <pre>{JSON.stringify(extractedData, null, 2)}</pre>
            </div>
          )}
        </div>
      )
    }

    export default App
