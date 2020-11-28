import React from "react";
import CommentTwoToneIcon from "@material-ui/icons/CommentTwoTone";
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';
import { makeStyles } from "@material-ui/core/styles";

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  List,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    margin: "auto",
  },
  elipsis: {
    display: "inline",
    maxWidth: "80%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  card: {
    margin: theme.spacing(2),
    flexGrow: 1,
  },
  media: {
    height: 180,
  },
}));

export default function Blog(props) {
  const classes = useStyles();
  const handleComment = (blogId) => {
    props.history.push(`http://localhost:3000/post-detail/${blogId}/comments`);
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          <Typography
            style={{ maxWidth: "60%", marginRight: "3%" }}
            noWrap
            variant="h4"
            component="h4"
          >
            {props.blog.title}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={props.blog.coverImage}
        title={props.blog.title}
      />
      <List>
        {props.blog.author.length > 0 && props.blog.author.map(author =>{
          return (
            <CardHeader
          avatar={
            <Avatar
              aria-label={author.name}
              src={author.avatar}
              className={classes.avatar}
            />
          }
          title={<Link to={`/author-detail/${author.id}`} color="primary">{author.name}</Link>}
        />
          );
        })}
      </List>
      <CardContent>
        <Typography variant="body2" component="p">
          {props.blog.content.substring(0, 150).concat(" ... ")}
          <Link to={`/post-detail/${props.blog.id}`} color="primary">
            Read More
          </Link>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box display="flex" flexDirection="row">
          <IconButton
            aria-label="like"
            onClick={() => props.handleLike(props.blog.id)}
          >
            <ThumbUpAltTwoToneIcon />
          </IconButton>
          {props.blog.likes}
        </Box>
        <Box display="flex" flexDirection="row">
          <IconButton
            aria-label="comment"
            onClick={() => handleComment(props.blog.id)}
          >
            <CommentTwoToneIcon />
          </IconButton>
          {props.blog.comments}
        </Box>
      </CardActions>
    </Card>
  );
}
