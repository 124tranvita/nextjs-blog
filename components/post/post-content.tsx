import { createMarkup } from "@/app/lib/utils";

type Props = {
  content: string;
};

export default function PostContent({ content }: Props) {
  return (
    <div className="block antialiased font-sans text-base leading-relaxed font-normal mb-4">
      <article
        className="max-w-full m-0 mx-auto prose prose-slate lg:prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={createMarkup(content)}
      />
    </div>
  );
}
