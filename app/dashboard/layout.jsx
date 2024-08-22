"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LayoutLoader from "@/components/layout-loader";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";

const DashboardLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && typeof window !== "undefined") {
      localStorage.setItem("token", session.jwt);
    } else if (status === "unauthenticated" && typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }, [status, session]);

  if (status === "loading") {
    return (
      <div>
        <LayoutLoader />
      </div>
    );
  }

  return (
    <>
      {status === "authenticated" && (
        <DashBoardLayoutProvider>{children}</DashBoardLayoutProvider>
      )}
    </>
  );
};

export default DashboardLayout;
