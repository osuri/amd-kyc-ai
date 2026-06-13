import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { BadgeCheck, Gauge, UserRound } from "lucide-react";

const decisionColor = {
  APPROVE: "success",
  REVIEW: "warning",
  REJECT: "error"
};

function normalizeDecision(decision = "") {
  return decision.toString().toUpperCase();
}

export default function SummaryCards({ result }) {
  const decision = normalizeDecision(result.decision);
  const items = [
    {
      label: "Customer",
      value: result.customer?.name || "Unknown customer",
      icon: UserRound
    },
    {
      label: "Risk score",
      value: result.score,
      icon: Gauge,
      helper: "0 low risk, 100 high risk"
    },
    {
      label: "Decision",
      value: result.decision || "Pending",
      icon: BadgeCheck,
      chip: true
    }
  ];

  return (
    <Box className="summary-grid">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card className="metric-card" key={item.label}>
            <CardContent>
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>

                  {item.chip ? (
                    <Chip
                      label={item.value}
                      color={decisionColor[decision] || "default"}
                      className="decision-chip"
                    />
                  ) : (
                    <Typography variant="h5">{item.value}</Typography>
                  )}

                  {item.helper && (
                    <Typography variant="caption" color="text.secondary">
                      {item.helper}
                    </Typography>
                  )}
                </Box>

                <Box className="metric-icon">
                  <Icon size={20} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
