interface TimelineItemProps {
  period: string;
  title: string;
  subtitle?: string;
  description?: string;
  techStack?: string[];
  isLast?: boolean;
}

export function TimelineRow({
  period,
  title,
  subtitle,
  description,
  techStack,
  isLast,
}: TimelineItemProps) {
  return (
    <div className="flex gap-x-4">
      <div className="flex flex-col items-center">
        <div className="z-10 flex h-3 w-3 items-center justify-center rounded-full border-2 border-foreground bg-white" />
        {!isLast && <div className="h-full w-2 bg-background-accent" />}
      </div>

      <div className="flex flex-col pb-10">
        <span className="text-sm text-foreground-muted">{period}</span>
        <h3 className="text-lg font-bold mt-1">{title}</h3>
        {subtitle && (
          <p className="text-md text-foreground/80 font-medium">{subtitle}</p>
        )}
        {description && (
          <p className="mt-2 text-sm text-foreground-muted">{description}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {techStack?.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-2 py-0.5 text-sm font-medium border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
