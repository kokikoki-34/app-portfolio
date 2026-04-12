import { RocketIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
import { createRoute } from "@tanstack/react-router";
import { Avatar } from "radix-ui";
import SelfieImage from "../../../public/assets/dark_background.png";
import { getLang, langRoute } from "../../router/langRoute";
import { Heading, Title } from "../../shared/components/headings";
import type { Language } from "../../shared/constants/language";
import { ROUTE_PATH } from "../../shared/constants/routePath";
import { AboutContents, type AboutContent } from "./content";
import { TimelineRow } from "./timeline";

export const aboutRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.ABOUT,
  component: () => {
    const lang: Language = getLang();
    const content: AboutContent | undefined = AboutContents.Contents[lang];
    const timeline = [
      ...(content?.experience ?? []),
      ...(content?.education ?? []),
    ];

    return (
      <>
        <Title>About</Title>
        {/* Icon and name */}
        <div className="flex flex-col gap-10 justify-start items-start my-8 md:flex-row md:items-center md:mx-4 ">
          <Avatar.Root>
            <Avatar.Image
              className=""
              style={{ borderRadius: "50%" }}
              height={200}
              width={200}
              src={SelfieImage}
              alt="YASUI Koki"
            />
          </Avatar.Root>
          <div className="flex flex-col">
            <div className="text-3xl my-4">{content?.name}</div>
            <div className="text-foreground-muted mb-2">
              {content?.currentRole}
            </div>
            <div className="text-xs text-foreground-muted flex items-center">
              <SewingPinFilledIcon className="pr-1" />
              {content?.location}
            </div>
            <div className="text-xs text-foreground-muted flex items-center">
              <RocketIcon className="pr-1" /> {content?.birthDate}
            </div>
          </div>
        </div>

        <Heading>Introduction</Heading>
        {content?.introduction}

        <Heading>Skills</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content?.techStacks?.map((stack) => (
            <div
              key={stack.category}
              className="p-4 border border-border rounded-lg"
            >
              <h3 className="text-sm font-bold mb-3 uppercase tracking-widest">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item.name}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.level === "Proficient"
                        ? "bg-background-accent"
                        : "border border-border"
                    }`}
                  >
                    {item.name}
                    {item.level === "Learning" && (
                      <span className="ml-1 text-foreground-muted">
                        {item.level}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Heading>Interests</Heading>
        <div className="flex flex-wrap gap-2">
          {content?.interests?.map((item) => (
            <span
              key={item}
              className="px-3 py-1 border border-border rounded-full text-xs font-medium"
            >
              {item}
            </span>
          ))}
        </div>

        <Heading>Career</Heading>

        <div className="max-w-2xl">
          <div className="flex flex-col">
            {timeline.map((item, index) => (
              <TimelineRow
                key={index}
                period={item.period}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                techStack={item.techStack}
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </div>
      </>
    );
  },
});
