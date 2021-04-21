import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const Filter = (props) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      {...props}
      onChange={(e) => {
        props.onFilterChange(e.target.value);
      }}
    />
  );
};

const useFilter = (data, searchTextName, searchTags) => {
  const [filterdData, setFilterData] = useState(data);
  const [newData, setNewData] = useState(data);

  useEffect(() => {
    let _filteredData = _.filter(
      newData,
      (fd) =>
        fd.firstName.toLowerCase().includes(searchTextName.toLowerCase()) ||
        fd.lastName.toLowerCase().includes(searchTextName.toLowerCase())
    );
    if (!_.isEmpty(searchTags)) {
      _filteredData = _.filter(_filteredData, (fd) =>
        fd.tags
          ? fd.tags.some((str) =>
              str.toLowerCase().includes(searchTags.toLowerCase())
            )
          : false
      );
    }

    if (_.isEmpty(searchTextName) && _.isEmpty(searchTags)) {
      _filteredData = newData;
    }

    if (!_.isEqual(_filteredData, filterdData)) {
      setFilterData(_filteredData);
    }
  }, [filterdData, searchTags, searchTextName, newData]);

  useEffect(() => {
    if (!_.isEqual(data, newData)) {
      setNewData(data);
    }
  }, [data, newData]);

  return [filterdData];
};

export default Filter;
export { useFilter };
