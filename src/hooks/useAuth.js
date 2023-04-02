import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/authSelectors";

export default function useAuth() {
  const auth = useSelector(selectAuth);
  if (auth?.accessToken && auth?.user) {
    const { role } = auth.user || {};
    return role;
  } else {
    return undefined;
  }
}
