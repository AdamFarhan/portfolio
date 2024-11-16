import { Content } from "@prismicio/client";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

type Props = {
  projects: Content.ProjectDocument[];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
};
export const ProjectList = ({ projects, fallbackItemImage }: Props) => {
  return (
    <div>
      <ul className="grid border-b border-b-slate-100">
        {projects.map((project) => (
          <li key={project.uid} className="list-item opacity-0f ">
            <Link
              href={`/project/${project.uid}`}
              className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
              aria-label={project.data.title || "Project"}
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{project.data.title}</span>
                <div className="flex gap-3 text-yellow-400 text-lg font-bold">
                  {project.tags.map((tag, index) => (
                    <span key={`${project.id}-tag-${index}`}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                View Project <MdArrowOutward />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
