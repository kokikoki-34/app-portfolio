import { ArrowRightIcon } from "@radix-ui/react-icons";
import { createRoute } from "@tanstack/react-router";
import React from "react";
import { BaseLink } from "../shared/components/baseLink";
import { NavMenu } from "../shared/constants/navMenu";
import { Route as rootRoute } from "./__root";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <>
      <div className="flex flex-col my-10">
        <div className="flex text-5xl my-6 gap-3 tracking-tighter">
          <div>YASUI</div>
          <div>Koki</div>
          <span className="text-foreground-accent">.</span>
        </div>
        <div className="text-xs text-foreground-muted">
          Software Engineer based in Tokyo, Japan
          <br />
          Pursuing the beauty of simplicity.
        </div>
      </div>

      {NavMenu.filter((menu) => menu.name !== "HOME").map((menu) => (
        <React.Fragment key={menu.href}>
          <BaseLink to={menu.href} className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-lg">{menu.name}</div>
              <div>
                <ArrowRightIcon className="text-lg" />
              </div>
            </div>
          </BaseLink>
          <hr className="border-border" />
        </React.Fragment>
      ))}
    </>
  ),
});
