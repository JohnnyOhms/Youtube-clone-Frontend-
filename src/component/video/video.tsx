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

export default function Video({
  id,
  channel,
  cahnnelId,
  publishTime,
  imageUrl,
  title,
}: VideoPropType) {
  const navigate = useNavigate();
  const videos = useAppSelector((state) => state.video.videoResult);
  const dataContext = useContext<contextType>(ContextAPI);
  const { setApiData } = dataContext;

  const handleClick = () => {
    const singleVideo = videos?.find((item) => item.id.videoId === id);
    if (singleVideo) {
      dataContext.avatarImg = singleVideo.snippet.thumbnails.high.url;
      dataContext.channelId = singleVideo.snippet.channelId;
    }
    setApiData({
      title: title,
      channel: channel,
      thumbnail: imageUrl,
      videoId: id,
    });

    return navigate(`/video/${id}`);
  };

  return (
    <div className="grid-layout">
      <Card
        sx={{
          maxWidth: 400,
          maxHeight: 280,
          backgroundColor: "inherit",
        }}
      >
        <CardMedia
          component="img"
          height="155"
          image={imageUrl}
          alt="video alt"
          sx={{ borderRadius: "1rem", cursor: "pointer", background: imageUrl }}
          onClick={handleClick}
        />

        <CardActions disableSpacing sx={{ padding: 0 }}>
          <Link to={`/channel/${cahnnelId}`}>
            <Avatar sx={{ ml: "5px", marginRight: "8px" }} src={imageUrl} />
          </Link>
          <Stack sx={{ marginTop: "5px" }}>
            <Typography
              variant="body2"
              sx={{ color: "white", fontSize: "15px" }}
            >
              {title.substring(0, 10)}
            </Typography>
            <Link to={`/channel/${cahnnelId}`}>
              <Typography
                variant="body2"
                sx={{ color: "grey", fontSize: "12px", py: 1 }}
              >
                {channel} <CheckCircleIcon sx={{ fontSize: 10 }} />
              </Typography>
            </Link>
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
