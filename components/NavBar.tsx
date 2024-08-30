"use client";

import {
  Link,
  Navbar,
  NavbarItem,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";

import { GithubIcon } from "./Icons";
import { ThemeSwitch } from "./ThemeSwitch";

export function NavBar() {
  return (
    <Navbar className="w-[900px] h-12 mx-auto">
      <NavbarBrand>
        <div className="ml-4">
          <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            D-ID Starter Kit
          </p>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex flex-row items-center gap-4">
          <Link
            isExternal
            aria-label="Github"
            href="https://github.com/WillKre/nextjs-whisper-d-id"
            className="flex flex-row justify-center gap-1 text-foreground"
          >
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
