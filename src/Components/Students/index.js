import Filter, { useFilter } from "../../Shared/Filter";
import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import StudentCard from "./StudentCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "50%",
  },
});

const Students = ({ students }) => {
  const classes = useStyles();
  const [searchTextName, setSearchTextName] = useState("");
  const [searchTags, setSearchTextTags] = useState("");
  const [modifiedStudents, setModifiedStudents] = useState(students);

  const [filterdData] = useFilter(modifiedStudents, searchTextName, searchTags);

  const onSearchName = (text) => {
    setSearchTextName(text);
  };
  const onSearchTag = (text) => {
    setSearchTextTags(text);
  };

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Filter placeholder="Search by name" onFilterChange={onSearchName} />
      <Filter placeholder="Search by tag" onFilterChange={onSearchTag} />
      <Table aria-label="simple table">
        <TableBody>
          {filterdData.map((st) => (
            <StudentCard
              key={st.id}
              {...st}
              changeValue={(key, value) => {
                setModifiedStudents(
                  _.map(filterdData, (fd) => {
                    if (fd.id === st.id) {
                      return {
                        ...fd,
                        [key]: value,
                      };
                    }
                    return fd;
                  })
                );
              }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Students;
