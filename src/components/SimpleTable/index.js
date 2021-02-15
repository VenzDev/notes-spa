import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableSortLabel,
  Paper,
  TableContainer,
  Button,
} from "@material-ui/core";
import s from "./Table.module.css";
import { Link } from "react-router-dom";
import {
  ASC,
  CREATED_AT,
  DESC,
  TITLE,
  UPDATED_AT,
} from "../../constraints/constraints";
import { deleteNote } from "../../Api/api";

export default (props) => {
  const [defaultSort, setDefaultSort] = useState({
    sort: UPDATED_AT,
    order: DESC,
  });

  const [data, setData] = useState(props.data);

  const sortData = (sortBy = TITLE, currentOrder = ASC, initData = null) => {
    let dataToSort;
    if (initData) dataToSort = initData;
    else dataToSort = data;

    if (dataToSort.length === 0) return setData([]);

    if (sortBy === TITLE) {
      if (currentOrder === ASC)
        dataToSort = dataToSort.sort((a, b) =>
          a.latest_version.title < b.latest_version.title ? -1 : 1
        );
      else
        dataToSort = dataToSort.sort((a, b) =>
          a.latest_version.title < b.latest_version.title ? 1 : -1
        );
    } else if (sortBy === UPDATED_AT) {
      if (currentOrder === ASC)
        dataToSort = dataToSort.sort((a, b) =>
          a.latest_version.updated_at < b.latest_version.updated_at ? -1 : 1
        );
      else
        dataToSort = dataToSort.sort((a, b) =>
          a.latest_version.updated_at < b.latest_version.updated_at ? 1 : -1
        );
    } else if (sortBy === CREATED_AT) {
      if (currentOrder === ASC)
        dataToSort = dataToSort.sort((a, b) =>
          a.created_at < b.created_at ? -1 : 1
        );
      else
        dataToSort = dataToSort.sort((a, b) =>
          a.created_at < b.created_at ? 1 : -1
        );
    }

    setData(dataToSort);
  };

  useEffect(() => {
    sortData(UPDATED_AT, DESC, props.data);
  }, [props.data]);

  const handleSort = (sortBy) => {
    let currentOrder = defaultSort.order;

    if (defaultSort.sort === sortBy) {
      if (defaultSort.order === ASC) {
        setDefaultSort({ sort: sortBy, order: DESC });
        currentOrder = DESC;
      } else {
        setDefaultSort({ sort: sortBy, order: ASC });
        currentOrder = ASC;
      }
    } else {
      setDefaultSort({ sort: sortBy, order: ASC });
      currentOrder = ASC;
    }

    sortData(sortBy, currentOrder);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await deleteNote(id);
      props.fetchNotes();
    } catch (e) {
      console.log("problem");
    }
  };

  return (
    <React.Fragment>
      <TableContainer className={s.container} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Your notes</TableCell>
              <TableCell>
                <TableSortLabel
                  active={defaultSort.sort === TITLE}
                  direction={defaultSort.order}
                  onClick={() => handleSort(TITLE)}
                >
                  title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={defaultSort.sort === CREATED_AT}
                  direction={defaultSort.order}
                  onClick={() => handleSort(CREATED_AT)}
                >
                  created at
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={defaultSort.sort === UPDATED_AT}
                  direction={defaultSort.order}
                  onClick={() => handleSort(UPDATED_AT)}
                >
                  updated at
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, indx) => {
              return (
                <TableRow
                  component={Link}
                  to={`/note/${item.id}`}
                  className={s.row}
                  hover={true}
                  key={indx}
                >
                  <TableCell>{indx + 1}</TableCell>
                  <TableCell>{item.latest_version.title}</TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.latest_version.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => handleDelete(e, item.id)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter />
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};
