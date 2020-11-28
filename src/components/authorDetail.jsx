import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  Avatar,
  ListItemText,
  Paper,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";

import CircularIndeterminate from "./circularIndeterminate";
import NewPostModal from "./newPostModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    backgroundColor: "rgb(20, 17, 17)",
    minHeight: "100vh",
    margin: "auto",
    padding: "40px",
  },
  media: {
    height: "100px",
    width: "100px",
  },
  floatButtonContainer: {
    position: "fixed",
    left: "5%",
    top: "40%",
    gap: "50px",
  },
  authorInfo: {
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    height: "200px",
    width: "200px",
    boxShadow: "0 0 10px 2px rgb(20, 17, 17)",
    marginRight: theme.spacing(4),
  },
  addButton : {
      position : "absolute",
      right : "10px",
      top : "10px",
  },
  posts: {
    marginTop: theme.spacing(4),
    padding: "40px",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    margin: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
  },
  coverImage: {
    height: "150px",
    width: "150px",
    marginRight: theme.spacing(4),
  },
}));

export default function AuthorDetail(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen,setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://5fbcebea3f8f90001638c727.mockapi.io/blog/v1/authors/${id}`)
      .then((res) => res.json())
      .then(async (data) => {
        data.posts.sort(
          (post1, post2) => post1.dateCreated - post2.dateCreated
        );
        setAuthor(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleModalClose = ()=>{
    setIsModalOpen(false);
  };

  const handleSubmit =(post) =>{
    post.author = author;
    fetch(`https://5fbcebea3f8f90001638c727.mockapi.io/blog/v1/posts`,{
      method : 'POST',
      body : post
    }).then(res=>res.json()).then(data=>{
      let newAuthor = {...author,posts : [data,...author.posts]};
      setAuthor(newAuthor);
    }).catch(err=>{
      console.log(err);
    });
    setIsModalOpen(false);
  };

  const handleAddNewPost = (e)=>{
    setIsModalOpen(true);
  };

  return (
    <Box m={4} className={classes.root}>
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            p={4}
            className={classes.authorInfo}
          >
            <Avatar
              aria-label={author.name}
              src={author.avatar}
              className={classes.avatar}
            />
            <Box>
              <Typography component="h3" variant="h3">
                {author.name}
              </Typography>
              <Typography component="p">
                <b>Bio :</b>
                {author.bio}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleAddNewPost} className={classes.addButton} disableElevation>Add New Post</Button>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" className={classes.posts}>
            <Typography component="h3" variant="h3">
              Posts
            </Typography>
            {author.posts.map((post) => (
              <Paper elevation={2} className={classes.item}>
                <CardMedia
                  className={classes.media}
                  image={post.coverImage}
                  title={post.title}
                  className={classes.coverImage}
                />
                <ListItemText>
                  <Typography component="h4" variant="h4">
                    {post.title}
                  </Typography>
                  <Typography component="h6" variant="h6" color="textSecondary">
                    {new Date(post.dateCreated).toDateString()}
                  </Typography>
                  <Typography component="p">
                    {post.content.substring(0, 100).concat(" ... ")}
                    <Link to={`/post-detail/${post.id}`} color="primary">
                      Read More
                    </Link>
                  </Typography>
                </ListItemText>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    <NewPostModal open={isModalOpen} handleModalClose={handleModalClose} handleSubmit={handleSubmit} />
    </Box>
  );
}
