import React,{ useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Button,
  Paper,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root :{
    marginTop : theme.spacing(4),
    paddingBottom : theme.spacing(8),
  },
  drawer: {
    minHeight: 250,
    maxHeight: 250,
  },
  commentBox: {
    backgroundColor: theme.palette.background.paper,
    padding: "20px",
  },
  textField: {
    flexGrow: "1",
    marginRight: "20px",
  },
}));

export default function CommentSection(props) {
  const classes = useStyles();
  const [commentText,setCommentText] = useState("")
  const [enableButton,setEnableButton] = useState(true);
  const handleClick =()=>{
    props.handleAddComment(commentText);
    setCommentText("");
    setEnableButton(true);
  };
  const handleChange= (e)=>{
    if(e.target.value.toString().trimStart().length > 0 ) setEnableButton(false);
    else setEnableButton(true);
    setCommentText(e.target.value);
  };
  return (
    <Paper alignment={4} className={classes.root}>
      <div className={classes.drawer} role="presentation">
        <Box display="flex" className={classes.commentBox}>
          <TextField
            className={classes.textField}
            id="comment-textfield"
            label="Type your comment..."
            variant="outlined"
            value={commentText}
            onChange={handleChange}
          />
          <Button disabled={enableButton} variant="outlined" color="primary" onClick={handleClick} >Add Comment</Button>
        </Box>
        <Divider />
        <Box>
          <List>
              {props.comments.map((comment) => (
                <ListItem button key={comment.comment}>
                  <ListItemText primary={comment.comment} />
                </ListItem>
              ))}
            </List>
        </Box>
      </div>
    </Paper>
  );
}
