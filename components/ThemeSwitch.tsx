"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { useSwitch } from "@nextui-org/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";

import { MoonFilledIcon, SunFilledIcon } from "./Icons";

export function ThemeSwitch() {
  const isSSR = useIsSSR();
  const { theme, setTheme } = useTheme();

  function onChange() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const {
    slots,
    Component,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer"
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx([
            "mx-0",
            "pt-px",
            "px-0",
            "rounded-lg",
            "w-auto h-auto",
            "bg-transparent",
            "!text-default-500",
            "flex items-center justify-center",
            "group-data-[selected=true]:bg-transparent",
          ]),
        })}
      >
        {!isSelected || isSSR ? (
          <SunFilledIcon size={22} />
        ) : (
          <MoonFilledIcon size={22} />
        )}
      </div>
    </Component>
  );
}
