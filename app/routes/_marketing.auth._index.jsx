import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";
import { validateCredentials } from "../data/validation.server";
import { login, signup } from "../data/auth.server";

export const meta = () => {
  return [
    { title: "Authentication" },
    { name: "description", content: "Login" },
  ];
};

const Authentication = () => <AuthForm />;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams?.get("mode") || "login";
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  try {
    validateCredentials(credentials);
  } catch (e) {
    return e;
  }
  if (mode === "login") {
    return await login(credentials);
  } else {
    return await signup(credentials);
  }
}

export const links = () => {
  return [{ rel: "stylesheet", href: authStyles }];
};

export default Authentication;
