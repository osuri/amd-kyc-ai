import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper
} from "@mui/material";

import UploadPanel from "./components/UploadPanel";
import SummaryCards from "./components/SummaryCards";
import RiskGauge from "./components/RiskGauge";
import AgentWorkflow from "./components/AgentWorkflow";
import Explainability from "./components/Explainability";
import ComplianceCopilot from "./components/ComplianceCopilot";
import AuditTrail from "./components/AuditTrail";

function App() {

  const [result, setResult] = useState(null);

  return (
    <Container maxWidth="xl">

      <Typography
        variant="h3"
        sx={{ mt: 3, mb: 3 }}
      >
        🤖 AI Compliance Copilot
      </Typography>

      <UploadPanel setResult={setResult} />

      {result && (
        <>
          <SummaryCards result={result} />

          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
              <RiskGauge score={result.score} />
            </Grid>

            <Grid item xs={12} md={6}>
              <AgentWorkflow />
            </Grid>

            <Grid item xs={12}>
              <Explainability
                evidence={result.evidence}
              />
            </Grid>

            <Grid item xs={12}>
              <ComplianceCopilot
                result={result}
              />
            </Grid>

            <Grid item xs={12}>
              <AuditTrail />
            </Grid>

          </Grid>
        </>
      )}

    </Container>
  );
}

export default App;