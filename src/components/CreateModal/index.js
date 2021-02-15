import {
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { createNote } from "../../Api/api";
import s from "./Modal.module.css";

export default ({ open, handleClose, fetchNotes }) => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createNote({ title, content });
      fetchNotes();
      handleClose();
      toast.info("Note created!", { position: "top-center" });
    } catch (e) {
      setErrorMessage(e.response.data.message);
      toast.warning("Something went wrong!", { position: "top-center" });
    }
    setLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      className={s.modalWrapper}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <div className={s.content}>
          <div onClick={handleClose} className={s.icon}>
            <IconButton color="primary">
              <Close />
            </IconButton>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <p>Create new note</p>
            <TextField
              variant="outlined"
              className={s.input}
              disabled={isLoading}
              value={title}
              error={errorMessage && errorMessage.title}
              onChange={(e) => setTitle(e.target.value)}
              required
              label="Title"
            />
            <TextField
              variant="outlined"
              className={s.input}
              disabled={isLoading}
              value={content}
              error={errorMessage && errorMessage.content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              rowsMax={8}
              multiline
              required
              label="Content"
            />
            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isLoading ? <CircularProgress size={30} /> : "Create!"}
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};
