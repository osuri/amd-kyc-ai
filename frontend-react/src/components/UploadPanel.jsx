import { useState } from "react";
import api from "../api";

import {
  Button,
  Paper,
  CircularProgress
} from "@mui/material";

export default function UploadPanel({
  setResult
}) {

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const upload = async () => {

    setLoading(true);

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const response = await api.post(
      "/process",
      formData
    );

    setResult(response.data);

    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>

      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <Button
        variant="contained"
        onClick={upload}
        sx={{ ml: 2 }}
      >
        {loading
          ? <CircularProgress size={20}/>
          : "Process Document"}
      </Button>

    </Paper>
  );
}