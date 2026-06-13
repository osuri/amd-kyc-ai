import {
  Paper,
  Typography,
  Grid,
  Chip
} from "@mui/material";

export default function AgentWorkflow() {

  const agents = [
    "OCR Agent",
    "Extraction Agent",
    "AML Agent",
    "Risk Agent",
    "Decision Agent"
  ];

  return (
    <Paper sx={{ p: 3 }}>

      <Typography
        variant="h5"
        gutterBottom
      >
        🤖 Agent Workflow
      </Typography>

      <Grid container spacing={2}>

        {agents.map((agent) => (

          <Grid item xs={12} md={4} key={agent}>

            <Chip
              label={`${agent} ✓`}
              color="success"
              sx={{
                width: "100%",
                fontSize: "16px",
                height: "45px"
              }}
            />

          </Grid>

        ))}

      </Grid>

    </Paper>
  );
}