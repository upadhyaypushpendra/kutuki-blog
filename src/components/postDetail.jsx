import React, { createRef, useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  Box,
  Typography,
  CardMedia,
  Avatar,
  CardContent,
  Fab,
  LinearProgress
} from "@material-ui/core";
import ThumbUpAltTwoToneIcon from "@material-ui/icons/ThumbUpAltTwoTone";
import CommentTwoToneIcon from "@material-ui/icons/CommentTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import CommentSection from "./commentSection";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    minHeight: "100vh",
    backgroundColor: "rgb(20, 17, 17)",
    margin: "0 auto",
  },
  media: {
    minHeight: "280px",
    maxHeight: "480px",
  },
  floatButtonContainer: {
    position: "fixed",
    left: "5%",
    top: "40%",
    gap: "30px",
    padding : "20px 10px",
    borderRadius : "20px",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PostDetail(props) {
  const classes = useStyles();
  const { id, comments: showComments } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const commentSection = createRef();

  const scrollToBottom = () => {
    commentSection.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleAddComment = (comment) => {
    setPost({ ...post, comments: [{ comment }, ...post.comments] });
  };
  useEffect(() => {
    fetch(`https://5fbcebea3f8f90001638c727.mockapi.io/blog/v1/posts/${id}`)
      .then((res) => res.json())
      .then(async (data) => {
        let res = await fetch(
          `https://5fbcebea3f8f90001638c727.mockapi.io/blog/v1/posts/${id}/comments/`
        );
        let comments = await res.json();
        data.likes = 0;
        data.comments = comments;
        setPost(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLikeClick = () => {
    let newPost = { ...post };
    newPost.likes++;
    setPost(newPost);
  };

  return (
    <Box m={4} className={classes.root}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Card>
          <CardHeader
            avatar={
              <Avatar
                aria-label={post.author[0].name}
                src={post.author[0].avatar}
                className={classes.avatar}
              />
            }
            title={
              <Link to={`/author-detail/${post.author[0].id}`} color="primary">
                {post.author[0].name}
              </Link>
            }
          />
          <CardMedia
            className={classes.media}
            image={post.coverImage}
            title={post.title}
          />
          <CardHeader
            title={
              <Typography variant="h2" component="h1">
                {post.title}
              </Typography>
            }
            subheader={
              <Box display="flex" flexDirection="column">
                <Typography variant="body2" color="textSecondary" component="p">
                  Modified : {new Date(post.dateModified).toDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Created : {new Date(post.dateCreated).toDateString()}
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <Typography variant="body2" component="p">
              {ReactHtmlParser(post.content)}
            </Typography>
          </CardContent>
          <Box
            display="flex"
            flexDirection="Column"
            className={classes.floatButtonContainer}
          >
            <Box display="flex" flexDirection="row">
              <Fab aria-label="like" onClick={handleLikeClick} color="primary" >
                <ThumbUpAltTwoToneIcon />
              </Fab>
              {post.likes}
            </Box>
            <Box display="flex" flexDirection="row">
              <Fab aria-label="comment" onClick={scrollToBottom} color="primary">
                <CommentTwoToneIcon />
              </Fab>
              {post.comments.length}
            </Box>
          </Box>
        </Card>
      )}
      {!isLoading && (
        <div ref={commentSection}>
          <CommentSection
            comments={post.comments}
            handleAddComment={handleAddComment}
          />
        </div>
      )}
    </Box>
  );
}
