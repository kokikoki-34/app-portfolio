import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { Dialog, VisuallyHidden } from "radix-ui";
import { useState } from "react";
import { NavMenu } from "../constants/navMenu";
import { BaseLink } from "./baseLink";

export function Header() {
  // Styles
  const headerStyle = "w-screen h-16 mx-auto flex items-center px-8";
  const iconSize = 24;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div
        className={`${headerStyle} justify-between bg-white/50 backdrop-blur-lg`}
      >
        <Link
          to="/$lang"
          from="/$lang"
          className="p-4 text-xl tracking-tight text-foreground"
        >
          Koki<span className="text-foreground-accent">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <MenuLinks />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            {/* Background */}
            <Dialog.Trigger asChild>
              <button className="p-2 text-foreground-muted hover:text-foreground">
                <HamburgerMenuIcon width={iconSize} height={iconSize} />
              </button>
            </Dialog.Trigger>

            {/* Content */}
            <Dialog.Portal>
              <Dialog.Overlay className="fixed top-0 z-50 w-screen h-full bg-slate-900/10 backdrop-blur-md duration-300" />

              {/* This element is to trick the browser into centering the modal contents. */}
              <VisuallyHidden.Root>
                <Dialog.Title>NavMenu</Dialog.Title>
                <Dialog.Description>Menu of this site</Dialog.Description>
              </VisuallyHidden.Root>

              {/* Menu */}
              <Dialog.Content className="fixed top-0 z-50 w-screen bg-background focus:outline-none ">
                <div className={`${headerStyle} justify-end`}>
                  <Dialog.Close>
                    <button className="p-2 text-foreground-muted hover:text-foreground">
                      <Cross1Icon width={iconSize} height={iconSize} />
                    </button>
                  </Dialog.Close>
                </div>
                <div className="flex flex-col px-8 pb-8">
                  <MenuLinks
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}

function MenuLinks({ onClick }: { onClick?: () => void }) {
  return NavMenu.map((menu) => (
    <BaseLink
      key={menu.href}
      to={`/$lang/${menu.href}`}
      className="p-4"
      onClick={onClick}
    >
      {menu.name}
    </BaseLink>
  ));
}
