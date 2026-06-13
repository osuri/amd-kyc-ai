import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { BotMessageSquare } from "lucide-react";

function Field({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={700}>{value || "Not available"}</Typography>
    </Box>
  );
}

export default function ComplianceCopilot({ result }) {
  const evidence = result.evidence || [];
  const evidenceSummary = evidence.length
    ? evidence.join(", ")
    : "No supporting risk indicators were returned.";

  return (
    <Card className="panel-card">
      <CardContent>
        <Stack spacing={2}>
          <Box className="panel-heading">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Review brief
              </Typography>
              <Typography variant="h5">Compliance copilot</Typography>
            </Box>
            <BotMessageSquare size={22} />
          </Box>

          <Box className="brief-grid">
            <Field label="Customer" value={result.customer?.name} />
            <Field label="Decision" value={result.decision} />
            <Field label="Risk score" value={result.score} />
          </Box>

          <Divider />

          <Box>
            <Typography variant="caption" color="text.secondary">
              Evidence summary
            </Typography>
            <Typography>{evidenceSummary}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
