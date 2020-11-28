import React, { useState } from "react";
import { Button, makeStyles, Modal, Paper, TextField } from "@material-ui/core";
import RTEditor from "./RTEditor";
import ImageUploader from "react-images-upload";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "10%",
    left: "calc((100% - 400px)/2)",
    width: "400px",
    display: "flex",
    height: "800px",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formElements: {
    margin: 10,
  },
}));

export default function NewPostModal(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState({});
  const classes = useStyles();

  const handleClick = (e) => {
    setError({});
    let errorObj = {};
    if (title.trim().length === 0) {
      errorObj.titleError = "Title Required";
    }
    if (content.trim().length === 0) {
      errorObj.contentError = "Content Required";
    }
    if (!coverImage) {
      errorObj.coverImageError = "Cover Image Required";
    }
    if (Object.keys(errorObj).length > 0) {
      setError(errorObj);
    } else {
      let post = {};
      post.coverImage = coverImage;
      post.content = content;
      post.title = title;
      post.dateCreated = Date.now();
      post.dateModified = Date.now();
      setTitle("");
      setContent("");
      setCoverImage(null);
      props.handleSubmit(post);
    }
  };
  const handleChange = (e) => {
    setTitle(e.target.value.toString().trimStart());
  };
  const onContentChange = (rteContent) => {
    setContent(rteContent);
  };
  const onImageDrop = (picture) => {
    setCoverImage(picture);
  };
  return (
    <Modal
      open={props.open}
      onClose={props.handleModalClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper elevation={2} className={classes.paper}>
        <TextField
          className={classes.formElements}
          id="comment-textfield"
          label="Add title ..."
          variant="outlined"
          value={title}
          onChange={handleChange}
          error={error.hasOwnProperty("titleError")}
          helperText={error.titleError}
        />
        <RTEditor
          onChange={onContentChange}
          error={error.hasOwnProperty("contentError")}
          helperText={error.contentError}
        />
        
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={onImageDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
        {error.hasOwnProperty("coverImageError") && <label style={{color : "red",fontSize : "12px"}} >{error.coverImageError}</label>}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClick}
          className={classes.formElements}
        >
          Create
        </Button>
      </Paper>
    </Modal>
  );
}
