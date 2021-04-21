import React from "react";
import Students from "../../Components/Students";
import _ from "lodash";
import { useFetchStudents } from "./api";
const Container = () => {
  const { isLoading, error, data: response } = useFetchStudents();

  return (
    <div>
      {error && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Retrieving the data ...</div>
      ) : (
        <Students students={_.get(response, "data.students", [])} />
      )}
    </div>
  );
};

export default Container;
