import HomeIcon from "@mui/icons-material/Home";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

type sideBarItemDetails = {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

export const sideBarItem: sideBarItemDetails[] = [
  {
    name: "Home",
    icon: HomeIcon,
  },
  {
    name: "Short",
    icon: LocalFloristIcon,
  },
  {
    name: "Trending",
    icon: LocalFireDepartmentIcon,
  },
  {
    name: "Saved",
    icon: OndemandVideoIcon,
  },
];

export const CategoryItem: string[] = [
  "All",
  "sports",
  "Tech",
  "anime",
  "food",
  "animal",
  "Programming",
  "AI",
  "React",
  "algorithms",
  "animals",
  "frontend",
  "projects",
  "university",
  "backend",
  "trending",
  "nigeria",
  "politics",
];
