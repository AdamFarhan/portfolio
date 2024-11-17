import { Button } from "@/components/Button";
import { asImageSrc, Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { useState } from "react";
import { MdInfo } from "react-icons/md";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PrismicNextImage } from "@prismicio/next";

type Props = {
  project: Content.ProjectDocument;
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
};
export const ProjectListItem = ({ project, fallbackItemImage }: Props) => {
  const [isFullView, setIsFullView] = useState(false);

  const image = isFilled.image(project.data.thumbnail)
    ? project.data.thumbnail
    : fallbackItemImage;

  const contentImage = asImageSrc(image, {
    // fit: "crop",
    // w: 384,
  });
  return (
    <div
      className="w-full h-96 rounded-md border-2 border-slate-700 row-start-1 group flex flex-col"
      style={{
        backgroundImage: `url(${contentImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full group-hover:bg-slate-900/60 z-10 p-6 flex-col justify-between hidden group-hover:flex">
        <div>
          <span className="text-3xl font-bold">{project.data.title}</span>
          <div className="flex gap-3 text-yellow-400 text-lg font-bold">
            {project.tags.map((tag, index) => (
              <span key={`${project.id}-tag-${index}`}>{tag}</span>
            ))}
          </div>
        </div>
        <p className="text-xl font-semibold">{project.data.description}</p>
        {/* <PrismicRichText field={} /> */}
        <div className="flex gap-2 items-center justify-center">
          {isFilled.link(project.data.live_link) && (
            <Button label={"View Project"} linkField={project.data.live_link} />
          )}
          {isFilled.link(project.data.github_link) && (
            <Button
              label={"Source Code"}
              linkField={project.data.github_link}
            />
          )}
          <button onClick={() => setIsFullView(true)}>
            <MdInfo className="size-6" />
          </button>
        </div>
      </div>

      <Dialog
        open={isFullView}
        onClose={() => setIsFullView(false)}
        // className="relative z-50"
        transition
        className="z-[100] fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-200 ease-in-out data-[closed]:opacity-0"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="max-w-2xl space-y-4 rounded-xl bg-slate-900 p-6 border-2 border-slate-800 shadow-md">
            <DialogTitle className="font-bold tracking-tight text-5xl md:text-6xl text-slate-300">
              {project.data.title}
            </DialogTitle>
            <Description className="flex gap-3 text-yellow-400 text-lg font-bold">
              {project.tags.map((tag, index) => (
                <span key={`${project.id}-tag-${index}`}>{tag}</span>
              ))}
            </Description>
            <PrismicNextImage
              field={project.data.thumbnail}
              // height={384}
              // imgixParams={{
              //   w: 500,
              //   h: 300,
              //   fit: "scale",
              // }}
            />
            <div className="prose prose-invert prose-lg max-w-prose max-h-[500px] overflow-y-auto">
              <PrismicRichText field={project.data.content} />
              {/* <PrismicRichText field={project.data.content} /> */}
            </div>
            <div className="flex gap-4">
              {isFilled.link(project.data.live_link) && (
                <Button
                  label={"View Project"}
                  linkField={project.data.live_link}
                />
              )}
              {isFilled.link(project.data.github_link) && (
                <Button
                  label={"Source Code"}
                  linkField={project.data.github_link}
                />
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};
