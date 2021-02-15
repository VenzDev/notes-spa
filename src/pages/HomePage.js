import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getNotes } from "../Api/api";
import CreateModal from "../components/CreateModal";
import CreateNewButton from "../components/CreateNewButton";
import LoadingOverflow from "../components/LoadingOverflow";
import SimpleTable from "../components/SimpleTable";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchNotes = async () => {
    const result = await getNotes();
    setLoading(false);
    setNotes(result.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return !isLoading ? (
    <>
      <CreateNewButton handler={handleOpen} />
      <SimpleTable data={notes} fetchNotes={fetchNotes} />
      <CreateModal fetchNotes={fetchNotes} handleClose={handleClose} open={open} />
    </>
  ) : (
    <LoadingOverflow />
  );
};

export default Home;
