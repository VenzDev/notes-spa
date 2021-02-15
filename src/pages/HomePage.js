import { useEffect, useState } from "react";
import { getNotes } from "../Api/api";
import CreateModal from "../components/CreateModal";
import CreateNewButton from "../components/CreateNewButton";
import SimpleTable from "../components/SimpleTable";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchNotes = async () => {
    const result = await getNotes();
    setNotes(result.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <CreateNewButton handler={handleOpen} />
      <SimpleTable data={notes} fetchNotes={fetchNotes} />
      <CreateModal
        fetchNotes={fetchNotes}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};

export default Home;
