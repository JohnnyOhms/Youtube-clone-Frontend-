import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { VideoPropType } from "../../utils/types";

export default function Video({
  id,
  channel,
  publishTime,
  imageUrl,
  title,
}: VideoPropType) {
  return (
    <div className="grid-layout" id={id}>
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
          image={imageUrl}
          alt="video alt"
          sx={{ borderRadius: "1rem" }}
        />
        <CardActions disableSpacing sx={{ padding: 0 }}>
          <Avatar sx={{ ml: "5px", marginRight: "8px" }} />
          <Stack sx={{ marginTop: "5px" }}>
            <Typography
              variant="body2"
              sx={{ color: "white", fontSize: "15px" }}
            >
              {title.substring(0, 10)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey", fontSize: "12px", py: 1 }}
            >
              {channel} <CheckCircleIcon sx={{ fontSize: 10 }} />
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey", fontSize: "12px" }}
            >
              {publishTime}
            </Typography>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
}
