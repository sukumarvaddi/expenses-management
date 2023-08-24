import { destroyUserSession } from "../data/auth.server";

export async function action({ request }) {
  return destroyUserSession(request);
}
