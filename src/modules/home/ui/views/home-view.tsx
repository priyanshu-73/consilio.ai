"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="text-2xl font-semibold">
        Logged in as {session.user.name}
      </div>
      <Button
        className="cursor-pointer"
        onClick={() =>
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.push("/sign-in") },
          })
        }
      >
        Sign Out
      </Button>
    </>
  );
};
