import { useContext } from "react";
import { LoaderContext } from "../context/loader";

export default function useLoader() {
  return useContext(LoaderContext);
}
