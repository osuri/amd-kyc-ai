import {
  Paper,
  Typography
} from "@mui/material";

export default function ComplianceCopilot({
  result
}) {

  return (

    <Paper sx={{ p: 3 }}>

      <Typography variant="h5">
        🤖 Compliance Copilot
      </Typography>

      <Typography mt={2}>

        Customer:
        {result.customer.name}

        <br/>

        Decision:
        {result.decision}

        <br/>

        Risk Score:
        {result.score}

        <br/>

        Evidence:
        {result.evidence.join(", ")}

      </Typography>

    </Paper>

  );
}