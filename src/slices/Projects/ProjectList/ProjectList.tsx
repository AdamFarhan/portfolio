"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MdArrowOutward } from "react-icons/md";

import { Content } from "@prismicio/client";
import { useGSAP } from "@gsap/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { ProjectListItem } from "./ProjectListItem";
import { ProjectListItemMobile } from "./ProjectListItemMobile";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  projects: Content.ProjectDocument[];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
};
export const ProjectList = ({ projects, fallbackItemImage }: Props) => {
  const projectsRef = useRef<Array<HTMLLIElement | null>>([]);

  useGSAP(
    () => {
      projectsRef.current.forEach((project) => {
        gsap.fromTo(
          project,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1, 0.3)",
            scrollTrigger: {
              trigger: project,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { dependencies: [projectsRef] }
  );

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
        {projects.map((project, index) => (
          <li
            key={project.uid}
            className="list-item"
            ref={(element) => {
              projectsRef.current[index] = element;
            }}
          >
            <ProjectListItem
              project={project}
              fallbackItemImage={fallbackItemImage}
            />
            {/* {isDesktop ? (
              <ProjectListItem
                project={project}
                fallbackItemImage={fallbackItemImage}
              />
            ) : (
              <ProjectListItemMobile
                project={project}
                fallbackItemImage={fallbackItemImage}
              />
            )} */}
          </li>
        ))}
      </ul>

      {/* <ul className="grid border-b border-b-slate-100">
        {projects.map((project, index) => (
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
              {/* <span>
                <PrismicNextLink field={project.data.github_link}>
                  Click me
                </PrismicNextLink>
              </span> *
              <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                View Project <MdArrowOutward />
              </span>
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};
