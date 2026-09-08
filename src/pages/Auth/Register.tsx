import AuthCard from "../../components/auth/AuthCard";

export default function Register() {
  return (
    <AuthCard
      mode="register"
      onSubmit={(event) => {
        event.preventDefault();
        localStorage.setItem("webzark-auth", "true");
        window.location.href = "/account";
      }}
    />
  );
}
