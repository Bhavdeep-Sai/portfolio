import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";
import { Particles } from "../components/Particles";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space relative min-h-screen py-10 lg:py-20" id="about">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={200}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-7">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.jpg"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[2] md:-left-22 md:inset-y-10 lg:scale-[2.5] grayscale-50 hover:grayscale-20 transition-all duration-500 ease-in-out"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm E. Bhavdeep Sai</p>
            <p className="subtext">
              Over the last 1 year, I developed my frontend and backend dev
              skills to deliver dynamic and software and web applications.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="Design Principles"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="Modular"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Design Patterns"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Component Reuse"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="Hooks"
              containerRef={grid2Container}
            />
            <Card
              style={{ top: "3%", left: "68%" }}
              text="OOPs"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/blender.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/canva.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/figma.svg"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Address</p>
            <p className="subtext">
              4-36, Chinna Kavuri Vari Palli,
              <br />
              Kavuri Vari Palli, Penumuru,
              <br />
              Chittoor, Andra Pradesh - 517126
            </p>
          </div>
          <div className="absolute bottom-2 z-10">
            <p className="headtext">Availability</p>

            <p className=" text-neutral-300">
              Open to opportunities —  Ready for opportunities across India.
            </p>
          </div>
          <figure className="absolute left-[40%] top-[10%]">
            <Globe />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Teck Stack</p>
            <p className="subtext">
              A curated set of technologies I use to design, build, and deploy modern, scalable, and performant web applications. From crafting responsive user interfaces to developing secure backend systems, I work across the full development lifecycle
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;