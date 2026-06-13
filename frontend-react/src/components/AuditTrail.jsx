import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

export default function AuditTrail() {

  const logs = [
    "OCR Agent Completed",
    "Extraction Agent Completed",
    "AML Screening Completed",
    "Risk Score Generated",
    "Decision Generated"
  ];

  return (

    <Paper sx={{ p: 3 }}>

      <Typography
        variant="h5"
        gutterBottom
      >
        📜 Audit Trail
      </Typography>

      <List>

        {logs.map((log, index) => (

          <ListItem key={index}>

            <ListItemText
              primary={log}
            />

          </ListItem>

        ))}

      </List>

    </Paper>

  );
}