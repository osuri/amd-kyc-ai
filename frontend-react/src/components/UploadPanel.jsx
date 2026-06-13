import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography
} from "@mui/material";
import { FileUp, PlayCircle, X } from "lucide-react";
import api from "../api";

export default function UploadPanel({ setResult }) {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const upload = async () => {
    if (!file) {
      setError("Choose a document before processing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/process", formData);
      console.log("response", response)
      setResult(response.data);
    } catch (uploadError) {
      setError(
        uploadError?.response?.data?.detail ||
          "Could not process the document. Check the backend and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="upload-panel">
      <Stack spacing={2}>
        <Box>
          <Typography variant="overline">Document intake</Typography>
          <Typography variant="h5">Upload KYC document</Typography>
          <Typography variant="body2" color="text.secondary">
            Supported formats: JPG, JPEG, PNG
          </Typography>
        </Box>

        <Box className="drop-zone">
          <input
            id="document-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(event) => {
              setFile(event.target.files[0]);
              setError("");
            }}
          />

          <label htmlFor="document-upload">
            <FileUp size={28} />
            <span>{file?.name || "Select a document"}</span>
          </label>

          {file && (
            <Button
              type="button"
              size="small"
              variant="text"
              startIcon={<X size={16} />}
              onClick={() => setFile(undefined)}
            >
              Clear
            </Button>
          )}
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          size="large"
          variant="contained"
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <PlayCircle size={18} />}
          onClick={upload}
          disabled={loading}
        >
          {loading ? "Processing" : "Process document"}
        </Button>
      </Stack>
    </Box>
  );
}
