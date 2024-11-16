"use client";
import clsx from "clsx";
import gsap from "gsap";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

gsap.registerPlugin(useGSAP);

type Props = {
  image: ImageField;
  className?: string;
};
export const Avatar = ({ image, className }: Props) => {
  const avatarRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".avatar",
      {
        opacity: 0,
        scale: 1.4,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: "power3.inOut",
      }
    );

    window.onmousemove = (e) => {
      if (!avatarRef.current) return;
      const componentRect = (
        avatarRef.current as HTMLElement
      ).getBoundingClientRect();
      const componentCenterX = componentRect.left + componentRect.width / 2;

      const componentPercent = {
        x: (e.clientX - componentCenterX) / componentRect.width / 2,
      };

      const distFromCenter = 1 - Math.abs(componentPercent.x);

      gsap
        .timeline({
          defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
        })
        .to(
          ".avatar",
          {
            rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
            duration: 0.5,
          },
          0
        )
        .to(
          ".highlight",
          {
            opacity: distFromCenter - 0.7,
            x: -10 + 20 * componentPercent.x,
            duration: 0.5,
          },
          0
        );
    };
  }, [avatarRef]);

  return (
    <div className={clsx("relative h-full w-full", className)} ref={avatarRef}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-100">
        <PrismicNextImage
          field={image}
          className="avatar-image h-full w-full object-cover"
          imgixParams={{
            q: 90,
          }}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
};
