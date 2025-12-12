import { RootState } from "@/libs/features/store";
import { useSelector } from "react-redux";

const useUser = () => {
  const user = useSelector((store: RootState) => store.auth.user);
  return user;
};

export default useUser;
