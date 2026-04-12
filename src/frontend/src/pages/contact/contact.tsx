import { createRoute } from "@tanstack/react-router";
import type {
  ContactItem,
  ContactResponse,
  SnsItem,
} from "../../func/contact/api/generated/model";
import { langRoute } from "../../router/langRoute";
import { Title } from "../../shared/components/headings";
import { ROUTE_PATH } from "../../shared/constants/routePath";
import { ContactItemComponent } from "./contactItemComponent";
import { ContactContent } from "./content";

export const contactRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.CONTACT,
  component: () => {
    const contact: ContactResponse = ContactContent;
    const contactItems: ContactItem[] = contact.contactItems ?? [];
    const snsItems: SnsItem[] = contact.snsItems ?? [];

    return (
      <>
        <Title>Contact</Title>

        <div className="p-4 border border-border rounded-lg">
          {contactItems.map((item) => (
            <ContactItemComponent
              key={item.title}
              title={item.title ?? ""}
              value={item.value ?? ""}
              link={item.link}
            />
          ))}

          {snsItems.map((item) => (
            <ContactItemComponent
              key={item.title}
              title={item.title ?? ""}
              value={item.value ?? ""}
              link={item.link}
            />
          ))}
        </div>
      </>
    );
  },
});
