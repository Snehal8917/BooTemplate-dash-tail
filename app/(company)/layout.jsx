import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const layout = async ({ children, params: { lang } }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/login");
  }


  return (
    <DashBoardLayoutProvider >{children}</DashBoardLayoutProvider>
  );
};

export default layout;
