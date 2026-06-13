import {
  Paper,
  Typography,
  Alert
} from "@mui/material";

export default function Explainability({
  evidence
}) {

  return (

    <Paper sx={{ p: 3 }}>

      <Typography
        variant="h5"
        gutterBottom
      >
        🔍 Explainability
      </Typography>

      {evidence.length > 0 ? (

        evidence.map((item, index) => (

          <Alert
            severity="warning"
            key={index}
            sx={{ mb: 2 }}
          >
            {item}
          </Alert>

        ))

      ) : (

        <Alert severity="success">

          No risk indicators detected

        </Alert>

      )}

    </Paper>

  );
}