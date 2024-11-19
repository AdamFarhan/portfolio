"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { Content } from "@prismicio/client";
import { useGSAP } from "@gsap/react";

import { ProjectListItem } from "./ProjectListItem";

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
          </li>
        ))}
      </ul>
    </div>
  );
};
