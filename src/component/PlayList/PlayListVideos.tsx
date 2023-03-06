import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { VideoPropType, contextType } from "../../utils/types";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { useContext } from "react";
import { ContextAPI } from "../../context/context";

const PlayListVideo = ({
  id,
  cahnnelId,
  imageUrl,
  title,
  channel,
  publishTime,
}: VideoPropType) => {
  const navigate = useNavigate();
  const videos = useAppSelector((state) => state.video.videoResult);
  const dataContext = useContext<contextType>(ContextAPI);

  const handleClick = () => {
    const singleVideo = videos?.find((item) => item.id.videoId === id);
    if (singleVideo) {
      dataContext.avatarImg = singleVideo.snippet.thumbnails.high.url;
      dataContext.channelId = singleVideo.snippet.channelId;
    }

    return navigate(`/video/${id}`);
  };

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
          image={imageUrl}
          alt="video alt"
          sx={{
            borderRadius: "1rem",
            cursor: "pointer",
            background: "grey",
            width: { xs: "10rem", sm: 700, md: 700 },
            minWidth: "10rem",
          }}
          onClick={handleClick}
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
              {title.substring(0, 30)}
            </Typography>

            <Link to={`chaneel/${cahnnelId}`}>
              <div style={{ display: "flex" }}>
                <Avatar sx={{ ml: "5px", marginRight: "8px" }} src={imageUrl} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "grey",
                    fontSize: { xs: "9px", sm: "10px", md: "12px" },
                    py: 1,
                  }}
                >
                  {channel} <CheckCircleIcon sx={{ fontSize: 10 }} />
                </Typography>
              </div>
            </Link>

            <Typography
              variant="body2"
              sx={{
                color: "grey",
                fontSize: { xs: "9px", sm: "10px", md: "12px" },
                ml: 1,
              }}
            >
              {publishTime}
            </Typography>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
};

export default PlayListVideo;
