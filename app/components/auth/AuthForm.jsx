import {
  useSearchParams,
  Link,
  useNavigation,
  useActionData,
} from "@remix-run/react";
import { FaLock, FaPlus } from "react-icons/fa";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const mode = searchParams.get("mode") || "login";

  const validationErrors = useActionData();

  const submitButtonCaption = mode === "login" ? "Log In" : "Create User";
  const message =
    mode === "login" ? "Create a new user" : "Login With Existing User";

  const isSubmitting = navigation.state !== "idle";

  return (
    <form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {mode === "login" ? <FaLock /> : <FaPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Authenticating..." : submitButtonCaption}
        </button>
        <Link to={mode === "login" ? "?mode=Signup" : "?mode=login"}>
          {message}
        </Link>
      </div>
    </form>
  );
}

export default AuthForm;
