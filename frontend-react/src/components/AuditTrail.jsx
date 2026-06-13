import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { CheckCircle2, ClipboardList } from "lucide-react";

export default function AuditTrail() {
  const logs = [
    "OCR Agent Completed",
    "Extraction Agent Completed",
    "AML Screening Completed",
    "Risk Score Generated",
    "Decision Generated"
  ];

  return (
    <Card className="panel-card">
      <CardContent>
        <Stack spacing={2}>
          <Box className="panel-heading">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Traceability
              </Typography>
              <Typography variant="h5">Audit trail</Typography>
            </Box>
            <ClipboardList size={22} />
          </Box>

          <Box className="audit-list">
            {logs.map((log) => (
              <Box className="audit-item" key={log}>
                <CheckCircle2 size={18} />
                <Typography>{log}</Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
