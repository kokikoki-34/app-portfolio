import { ArrowRightIcon } from "@radix-ui/react-icons";

interface ContactItemProps {
  title: string;
  value: string;
  link?: string;
}

export function ContactItemComponent({ title, value, link }: ContactItemProps) {
  return (
    <>
      <div className="p-1 border-b border-border last:border-none">
        <div className="p-3 flex flex-col justify-between">
          <div className="text-xs text-foreground-muted font-medium lowercase">
            {title}
          </div>
          <div className="text-lg tracking-tight">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground-accent"
            >
              <div className="flex justify-between items-center">
                <div>{value}</div>
                <div>
                  <ArrowRightIcon className="text-lg" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
