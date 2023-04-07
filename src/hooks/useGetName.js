import { useSelector } from "react-redux";
import { selectName } from "../features/auth/authSelectors";

export default function useGetName() {
  const name = useSelector(selectName);
  return name;
}
