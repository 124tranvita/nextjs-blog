import { createMarkup } from "../utils";

type Props = {
  content: string;
};

export default function PostContent({ content }: Props) {
  return (
    <div className="block antialiased font-sans text-base leading-relaxed font-normal mb-4">
      <article
        className="m-0 prose prose-slate mx-auto lg:prose-lg max-w-full dark:prose-invert"
        dangerouslySetInnerHTML={createMarkup(content)}
      />
    </div>
  );
}
