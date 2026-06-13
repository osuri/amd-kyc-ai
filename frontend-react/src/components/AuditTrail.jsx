import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { CheckCircle2, ClipboardList } from "lucide-react";

const fallbackLogs = [
  {
    step: "OCR Agent",
    status: "Completed",
    detail: "OCR Agent completed successfully"
  },
  {
    step: "Extraction Agent",
    status: "Completed",
    detail: "Extraction Agent completed successfully"
  },
  {
    step: "AML Screening",
    status: "Completed",
    detail: "AML Screening completed successfully"
  },
  {
    step: "Risk Scoring",
    status: "Completed",
    detail: "Risk Score Generated"
  },
  {
    step: "Decision Engine",
    status: "Completed",
    detail: "Decision Generated"
  }
];

export default function AuditTrail({ logs = fallbackLogs }) {

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
            {logs.map((log, index) => (
              <Box className="audit-item" key={`${log.step}-${index}`}>
                <CheckCircle2 size={18} />
                <Box>
                  <Typography fontWeight={700}>{log.step}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {log.detail || log.status}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
