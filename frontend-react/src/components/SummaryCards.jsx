import {
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";

export default function SummaryCards({
  result
}) {

  return (

    <Grid container spacing={2} mb={2}>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography>
              Customer
            </Typography>

            <Typography variant="h5">
              {result.customer.name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography>
              Risk Score
            </Typography>

            <Typography variant="h5">
              {result.score}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>

            <Typography>
              Decision
            </Typography>

            <Typography variant="h5">
              {result.decision}
            </Typography>

          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}