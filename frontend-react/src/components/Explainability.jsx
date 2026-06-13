import { Alert, Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { SearchCheck } from "lucide-react";

export default function Explainability({ evidence }) {
  const hasEvidence = evidence.length > 0;

  return (
    <Card className="panel-card">
      <CardContent>
        <Stack spacing={2}>
          <Box className="panel-heading">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Evidence review
              </Typography>
              <Typography variant="h5">Explainability</Typography>
            </Box>
            <SearchCheck size={22} />
          </Box>

          {hasEvidence ? (
            <Stack spacing={1.25}>
              {evidence.map((item, index) => (
                <Alert severity="warning" key={`${item}-${index}`} className="evidence-alert">
                  {item}
                </Alert>
              ))}
            </Stack>
          ) : (
            <Alert severity="success" className="evidence-alert">
              No risk indicators detected.
            </Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
