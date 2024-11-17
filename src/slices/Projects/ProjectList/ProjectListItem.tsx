import { Button } from "@/components/Button";
import { asImageSrc, Content, isFilled } from "@prismicio/client";

type Props = {
  project: Content.ProjectDocument;
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
};
export const ProjectListItem = ({ project, fallbackItemImage }: Props) => {
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
        <div className="flex gap-2 items-center justify-center">
          <Button label={"View Project"} linkField={project.data.live_link} />
          <Button label={"Source Code"} linkField={project.data.github_link} />
        </div>
      </div>
    </div>
  );
};
