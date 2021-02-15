import { Backdrop, Fade, IconButton, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { getHistory } from "../../Api/api";
import s from "./History.module.css";

export default ({ open, handleClose, noteId }) => {
  const [history, setHistory] = useState(null);

  const fetchHistory = async () => {
    const result = await getHistory(noteId);
    setHistory(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className={s.modalWrapper}
    >
      <Fade in={open}>
        <div className={s.content}>
          <div onClick={handleClose} className={s.icon}>
            <IconButton color="primary">
              <Close />
            </IconButton>
          </div>
          <p>History</p>

          {history &&
            history.map((version) => (
              <div key={version.id} className={s.historyItem}>
                <p>
                  <span>Version id: </span>
                  {version.version_id}
                </p>
                <p>
                  <span>Title: </span>
                  {version.title}
                </p>
                <p>
                  <span>Content: </span>
                  {version.content}
                </p>
                <p>
                  <span>Created at: </span>
                  {new Date(version.created_at).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      </Fade>
    </Modal>
  );
};
