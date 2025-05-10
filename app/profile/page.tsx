"use client";

import { TextButton } from "../../components/button";
import { Heading1 } from "../../components/heading";
import Text from "../../components/text";
import useUser from "../../hooks/user";

export default function Profile() {
  const { user, logout } = useUser();

  return (
    <div className="flex flex-col items-center justify-center">
      <Heading1 text="Profile" />
      <Text text={user?.email} />
      <TextButton text="Logout" onClick={logout} />
    </div>
  );
}
