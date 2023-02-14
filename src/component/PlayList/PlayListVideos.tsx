import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PlayListVideo = () => {
  return (
    <div className="grid-layout-sideBar">
      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          height: 240,
          maxHeight: { xs: 170, sm: 300, md: 400 },
          backgroundColor: "inherit",
          display: "flex",
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          // image={imageUrl}
          alt="video alt"
          sx={{
            borderRadius: "1rem",
            cursor: "pointer",
            background: "grey",
            width: 700,
          }}
          //   onClick={handleClick}
        />

        <CardActions disableSpacing sx={{ padding: 0 }}>
          <Stack
            sx={{
              margin: "10px",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "white",
                fontSize: { xs: "10px", sm: "15px", md: "15px" },
                marginTop: "5px",
              }}
            >
              saved video Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Fuga, debitis?
            </Typography>

            <div style={{ display: "flex" }}>
              <Avatar sx={{ ml: "5px", marginRight: "8px" }} />
              <Typography
                variant="body2"
                sx={{
                  color: "grey",
                  fontSize: { xs: "9px", sm: "10px", md: "12px" },
                  py: 1,
                }}
              >
                random channel <CheckCircleIcon sx={{ fontSize: 10 }} />
              </Typography>
            </div>

            <Typography
              variant="body2"
              sx={{
                color: "grey",
                fontSize: { xs: "9px", sm: "10px", md: "12px" },
                ml: 1,
              }}
            >
              today
            </Typography>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
};

export default PlayListVideo;
