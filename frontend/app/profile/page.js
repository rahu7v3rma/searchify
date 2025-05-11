"use client";

import { TextButton } from "../../components/button";
import { Heading1 } from "../../components/heading";
import Text from "../../components/text";
import useUser from "../../context/user";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <Heading1 text="Profile" />
      <Text text={user?.email} />
      <div className="flex flex-col gap-2 mt-4">
        <TextButton
          text="Change Password"
          onClick={() => router.push("/change-password")}
        />
      </div>
    </div>
  );
}
