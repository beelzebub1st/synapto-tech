import type { BlogBlock } from "@/content/blog/posts";

export function BlogPostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={`${index}-${block.text}`}
              className="pt-4 text-xl font-semibold text-midnight md:text-2xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={`${index}-ul`}
              className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={`${index}-p`}
            className="text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
