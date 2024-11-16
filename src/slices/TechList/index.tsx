"use client";
import React from "react";
import gsap from "gsap";
import { MdCircle } from "react-icons/md";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: 4,
      },
    });

    tl.fromTo(
      ".tech-row",
      {
        x: (index) => {
          return index % 2 === 0
            ? gsap.utils.random(600, 400)
            : gsap.utils.random(-600, -400);
        },
      },
      {
        x: (index) => {
          return index % 2 === 0
            ? gsap.utils.random(-600, -400)
            : gsap.utils.random(600, 400);
        },
        ease: "power1.inOut",
      }
    );
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden wrapper"
    >
      <Container as="div">
        <Heading size="xl" as="h2" className="mb-8">
          {slice.primary.heading}
        </Heading>
      </Container>
      {slice.primary.techgroup.map(({ tech_name, tech_color }, index) => {
        return (
          <div
            key={`tech-row-${index}`}
            className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
            aria-label={tech_name || undefined}
          >
            {Array.from({ length: 15 }, (_, index) => (
              <React.Fragment key={`tech-item-${index}`}>
                <span
                  className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                  style={{
                    color: index === 7 && tech_color ? tech_color : "inherit",
                  }}
                >
                  {tech_name}
                </span>
                <span className="text-3xl">
                  <MdCircle />
                </span>
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </section>
  );
};

export default TechList;
