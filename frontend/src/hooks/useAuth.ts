import { useAppSelector } from "../redux/store";

export const useAuth = () => {
  const {  role, accessToken, refreshToken } = useAppSelector(
    (state) => state.auth,
  );
  return { role, accessToken, refreshToken };
};
