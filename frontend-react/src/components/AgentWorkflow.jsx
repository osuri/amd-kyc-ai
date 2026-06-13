import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { CheckCircle2 } from "lucide-react";

export default function AgentWorkflow() {
  const agents = [
    "OCR Agent",
    "Extraction Agent",
    "AML Screening",
    "Risk Scoring",
    "Decision Engine"
  ];

  return (
    <Card className="panel-card">
      <CardContent>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Automation path
            </Typography>
            <Typography variant="h5">Agent workflow</Typography>
          </Box>

          <Stack spacing={1.25}>
            {agents.map((agent, index) => (
              <Box className="workflow-step" key={agent}>
                <Box className="workflow-step__index">{index + 1}</Box>
                <Box>
                  <Typography fontWeight={700}>{agent}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed successfully
                  </Typography>
                </Box>
                <CheckCircle2 className="workflow-step__icon" size={20} />
              </Box>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
