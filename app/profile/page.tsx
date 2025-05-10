"use client";

import { TextButton } from "../../components/button";
import { Heading1 } from "../../components/heading";
import Text from "../../components/text";
import useUser from "../../hooks/user";
import { useRouter } from "next/navigation";
import { paths } from "../../constants/paths";

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <Heading1 text="Profile" />
      <Text text={user?.email} />
      <div className="flex flex-col gap-2 mt-4">
        <TextButton text="Change Password" onClick={() => router.push(paths.changePassword)} />
      </div>
    </div>
  );
}
