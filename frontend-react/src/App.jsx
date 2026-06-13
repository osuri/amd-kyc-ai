import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { ShieldCheck } from "lucide-react";

import UploadPanel from "./components/UploadPanel";
import GuidedChatUpload from "./components/GuidedChatUpload";
import PdfReportButton from "./components/PdfReportButton";
import SummaryCards from "./components/SummaryCards";
import RiskGauge from "./components/RiskGauge";
import AgentWorkflow from "./components/AgentWorkflow";
import Explainability from "./components/Explainability";
import ComplianceCopilot from "./components/ComplianceCopilot";
import AuditTrail from "./components/AuditTrail";

function App() {
  const [result, setResult] = useState(null);
  const [intakeMode, setIntakeMode] = useState("manual");

  return (
    <Box className="app-shell">
      <AppBar position="sticky" elevation={0} color="transparent" className="topbar">
        <Toolbar className="topbar__toolbar">
          <Stack direction="row" spacing={1.5}>
            <Box className="brand-mark">
              <ShieldCheck size={22} />
            </Box>

            <Box>
              <Typography variant="h6" className="brand-title">
                AI Compliance Copilot
              </Typography>
              <Typography variant="body2" className="brand-subtitle">
                KYC document review workspace
              </Typography>
            </Box>
          </Stack>

          {/* <Box className="status-pill">
            Backend: localhost:8000
          </Box> */}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className="page">
        <Box className="hero-panel">
          <Box className="hero-copy">
            <Typography variant="overline">Compliance operations</Typography>
            <Typography variant="h3">
              Review identity documents with agent-backed risk evidence.
            </Typography>
            <Typography variant="body1">
              Upload a customer document, inspect the extracted decision signals,
              and keep a concise audit trail for each KYC review.
            </Typography>
          </Box>

          <Box className="intake-panel">
            <Stack spacing={2}>
              <ToggleButtonGroup
                value={intakeMode}
                exclusive
                fullWidth
                size="small"
                onChange={(_, nextMode) => {
                  if (nextMode && nextMode !== intakeMode) {
                    setIntakeMode(nextMode);
                    setResult(null);
                  }
                }}
                aria-label="KYC intake mode"
              >
                <ToggleButton value="manual">Manual upload</ToggleButton>
                <ToggleButton value="chat">Chat guided</ToggleButton>
              </ToggleButtonGroup>

              {intakeMode === "manual" ? (
                <UploadPanel setResult={setResult} />
              ) : (
                <GuidedChatUpload setResult={setResult} />
              )}
            </Stack>
          </Box>
        </Box>

        {result ? (
          <Stack spacing={2.5}>
            <Box className="result-actions">
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Processed result
                </Typography>
                <Typography variant="h5">KYC review report</Typography>
              </Box>

              <PdfReportButton result={result} />
            </Box>

            <SummaryCards result={result} />

            <Box className="dashboard-grid">
              <RiskGauge score={result.score} decision={result.decision} />
              <AgentWorkflow />
            </Box>

            <Box className="dashboard-grid dashboard-grid--wide">
              <Explainability evidence={result.evidence || []} />
              <ComplianceCopilot result={result} />
            </Box>

            <AuditTrail logs={result.audit_logs} />
          </Stack>
        ) : (
          <Box className="empty-state">
            <Typography variant="h6">No review loaded</Typography>
            <Typography>
              Choose a JPG or PNG document to generate customer details, risk
              score, evidence, workflow status, and the audit trail.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
