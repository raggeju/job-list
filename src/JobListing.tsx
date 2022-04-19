import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, CardActionArea, Link } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface CompanyProps {
  name: string;
  logo: string;
  website: string;
}

export interface JobListingProps {
  company: CompanyProps;
  title: string;
  children: string;
  employment_type: string;
  from_date: string;
  location: string;
}

export default function JobListing(props: JobListingProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: 1 }}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Link href={props.company.website} target="_blank">
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label={props.company.name}
                src={props.company.logo}
              />
            </Link>
          }
          title={props.title}
          subheader={
            <Link href={props.company.website} target="_blank">
              {props.company.name}
            </Link>
          }
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.employment_type}
          </Typography>
          <Typography variant="h5" component="div">
            {props.location}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Starting date: {props.from_date}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
            dangerouslySetInnerHTML={{ __html: props.children }}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: "right" }}>
          <Button size="small">Read More</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
