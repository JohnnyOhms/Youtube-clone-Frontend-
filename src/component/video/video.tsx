import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Grid, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { grey } from "@mui/material/colors";

export default function Video() {
  return (
    <div className="grid-layout">
      <Card
        sx={{
          maxWidth: 290,
          maxHeight: 280,
          backgroundColor: "inherit",
        }}
      >
        <CardMedia
          component="img"
          height="155"
          image="https://images.pexels.com/photos/14711370/pexels-photo-14711370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="video alt"
          sx={{ borderRadius: "1rem" }}
        />
        <CardActions disableSpacing sx={{ padding: 0 }}>
          <Avatar sx={{ ml: "5px", marginRight: "8px" }} />
          <Stack sx={{ marginTop: "5px" }}>
            <Typography variant="h6" sx={{ color: "white" }}>
              new video
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey", fontSize: "12px" }}
            >
              Maroon 5 <CheckCircleIcon sx={{ fontSize: 10 }} />
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey", fontSize: "12px" }}
            >
              25-06-2019
            </Typography>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}
