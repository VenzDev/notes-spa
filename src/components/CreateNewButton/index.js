import { Button } from "@material-ui/core";
import s from "./Button.module.css";

export default ({ handler }) => {
  return (
    <div className={s.createNewButton}>
      <Button onClick={handler} variant="contained" color="primary">
        Create new note
      </Button>
    </div>
  );
};
