export const useAuth = () => {
  const token = sessionStorage.getItem("token")

  return !!token
}
export const useProfile = () => {
  const profile = sessionStorage.getItem("profile");

  return profile === null ? false : true;
};