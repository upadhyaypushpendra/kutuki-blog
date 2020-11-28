import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

import CircularIndeterminate from "./circularIndeterminate";
import Blog from './blog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "rgb(20, 17, 17)",
    display:"grid",
    gridTemplateColumns : "1fr 1fr 1fr",
    margin: "auto",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://5fbcebea3f8f90001638c727.mockapi.io/blog/v1/posts")
      .then((res) => res.json())
      .then(data=>{
        data.forEach(obj=> {obj.likes=0;obj.comments = [];});
        data.sort((a,b)=> a.dateCreated - b.dateCreated );
        setBlogs(data);
        setIsLoading(false);
      })
      .catch();
  }, []);

  const handleLike = (blogId)=>{
      let newBlogs = [...blogs];
      let tempBlog = newBlogs.find(blog => blog.id === blogId);
      if(tempBlog) tempBlog.likes++;
      setBlogs(newBlogs);
  };
  
  return (
    <Box m={4} className={classes.root}>
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        blogs.map(blog => <Blog blog={blog} handleLike={handleLike} />)
      )}
    </Box>
  );
}
