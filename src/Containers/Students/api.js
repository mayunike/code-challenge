import axios from "axios";
import { useQuery } from "react-query";

const useFetchStudents = () =>
  useQuery("fetchStudents", () =>
    axios("/assessment/students", { crossdomain: true })
  );

export { useFetchStudents };
