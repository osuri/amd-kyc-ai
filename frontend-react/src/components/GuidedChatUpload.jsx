import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Bot, FileUp, Send, UserRound, X } from "lucide-react";
import api from "../api";

const initialMessages = [
  {
    role: "assistant",
    text: "I can guide you through KYC. Upload a JPG or PNG document here, and add any note if needed."
  }
];

export default function GuidedChatUpload({ setResult }) {
  const [file, setFile] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!file) {
      setError("Upload a document in the chat before sending.");
      return;
    }

    const userText = message.trim() || `Uploaded ${file.name}`;
    setMessages((current) => [
      ...current,
      { role: "user", text: userText },
      { role: "assistant", text: "Thanks. I am reviewing the document now." }
    ]);
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/process", formData);
      setResult(response.data);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "Review complete. I extracted the customer details and prepared the risk evidence below."
        }
      ]);
      setMessage("");
    } catch (chatUploadError) {
      const detail =
        chatUploadError?.response?.data?.detail ||
        "Could not process the document. Check the backend and try again.";
      setError(detail);
      setMessages((current) => [
        ...current,
        { role: "assistant", text: detail }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="chat-panel">
      <Stack spacing={2}>
        <Box>
          <Typography variant="overline">Guided document intake</Typography>
          <Typography variant="h5">Assistant-guided KYC</Typography>
          <Typography variant="body2" color="text.secondary">
            Upload the file in the prompt and the assistant will guide the review.
          </Typography>
        </Box>

        <Box className="chat-thread" aria-live="polite">
          {messages.map((item, index) => (
            <Box
              className={`chat-message chat-message--${item.role}`}
              key={`${item.role}-${index}`}
            >
              {item.role === "assistant" ? <Bot size={18} /> : <UserRound size={18} />}
              <Typography variant="body2">{item.text}</Typography>
            </Box>
          ))}
        </Box>

        <Box className="chat-upload-row">
          <input
            id="chat-document-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(event) => {
              setFile(event.target.files[0]);
              setError("");
            }}
          />

          <label htmlFor="chat-document-upload">
            <FileUp size={18} />
            <span>{file?.name || "Attach document"}</span>
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

        <TextField
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Example: Please help me verify this customer document"
          multiline
          minRows={2}
          disabled={loading}
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          size="large"
          variant="contained"
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Send size={18} />}
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Reviewing" : "Send to assistant"}
        </Button>
      </Stack>
    </Box>
  );
}
