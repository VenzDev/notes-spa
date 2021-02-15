import { Button, CircularProgress, Paper, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { getNote, updateNote } from "../../Api/api";
import s from "./Note.module.css";

const Note = (props) => {
  const [note, setNote] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchNote = async () => {
    const result = await getNote(props.match.params.id);
    setNote(result.data);
  };

  const handleChange = (e) => {
    setNote({
      ...note,
      latest_version: {
        ...note.latest_version,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateNote({
        title: note.latest_version.title,
        content: note.latest_version.content,
        id: note.id,
      });
      toast.info("Note updated!", { position: "top-center" });
    } catch (e) {
      toast.warning("Something went wrong!", { position: "top-center" });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <div className={s.NoteContainer}>
      <Paper className={s.padding}>
        <div className={s.flex}>
          <Link className={s.link} to="/">
            <Button variant="contained" color="primary">
              Back to notes
            </Button>
          </Link>
          {note && (
            <Button variant="contained" color="secondary">
              History
            </Button>
          )}
        </div>
        {note && (
          <>
            <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
              <p>Your note</p>
              <p>
                <span>Created at: </span>
                {new Date(note.created_at).toLocaleString()}
              </p>
              <p>
                <span>Updated at: </span>
                {new Date(note.latest_version.updated_at).toLocaleString()}
              </p>
              <TextField
                className={s.marginBottom}
                variant="outlined"
                value={note.latest_version.title}
                onChange={(e) => handleChange(e)}
                name="title"
                required
                label="Title"
              />
              <TextField
                className={s.marginBottom}
                variant="outlined"
                value={note.latest_version.content}
                onChange={(e) => handleChange(e)}
                rows={4}
                rowsMax={8}
                multiline
                required
                name="content"
                label="Content"
              />
              <Button
                style={{ width: "100px" }}
                type="submit"
                disabled={isLoading}
                variant="contained"
                color="primary"
              >
                {isLoading ? <CircularProgress size={30} /> : "Edit"}
              </Button>
            </form>
          </>
        )}
      </Paper>
    </div>
  );
};

export default withRouter(Note);
