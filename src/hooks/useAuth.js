import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/authSelectors";

export default function useAuth() {
  const authRole = useSelector(selectAuth);
  return authRole;
}
