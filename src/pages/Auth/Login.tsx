import AuthCard from "../../components/auth/AuthCard";

export default function Login() {
  return (
    <AuthCard
      mode="login"
      onSubmit={(event) => {
        event.preventDefault();
        localStorage.setItem("webzark-auth", "true");
        window.location.href = "/account";
      }}
    />
  );
}
