import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <p>Halo dunia</p>
      <Link href={"/login"}>
        <Button>Login</Button>
      </Link>
    </div>
  );
}
