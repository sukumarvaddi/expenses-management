import { Outlet } from "@remix-run/react";
import MainNavigation from "~/components/navigation/MainHeader";
import publicPageStyles from "~/styles/marketing.css";
import { getUserId } from "../data/auth.server";

export function links() {
  return [{ rel: "stylesheet", href: publicPageStyles }];
}

function PublicPagesLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export async function loader({ request }) {
  return getUserId(request);
}

export default PublicPagesLayout;
