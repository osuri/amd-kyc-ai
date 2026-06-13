import { Box, Card, CardContent, LinearProgress, Stack, Typography } from "@mui/material";

function clampScore(score) {
  const numericScore = Number(score) || 0;
  return Math.max(0, Math.min(100, numericScore));
}

function riskLevel(score) {
  if (score >= 75) return { label: "High risk", color: "#dc2626" };
  if (score >= 45) return { label: "Needs review", color: "#d97706" };
  return { label: "Low risk", color: "#16a34a" };
}

export default function RiskGauge({ score, decision }) {
  const value = clampScore(score);
  const level = riskLevel(value);

  return (
    <Card className="panel-card risk-card">
      <CardContent>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Risk scoring
            </Typography>
            <Typography variant="h5">Customer risk gauge</Typography>
          </Box>

          <Box
            className="risk-gauge"
            sx={{
              background: `conic-gradient(${level.color} ${value * 3.6}deg, #e5e7eb 0deg)`
            }}
          >
            <Box className="risk-gauge__center">
              <Typography variant="h3">{value}</Typography>
              <Typography variant="body2">{level.label}</Typography>
            </Box>
          </Box>

          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Decision confidence
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {decision || "Pending"}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={value}
              className="risk-progress"
              sx={{ "& .MuiLinearProgress-bar": { backgroundColor: level.color } }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
