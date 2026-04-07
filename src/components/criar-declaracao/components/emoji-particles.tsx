import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function EmojiParticles({ emoji }: { emoji: string }) {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: false,
        particles: {
          number: {
            value: 20,
          },
          shape: {
            type: "char",
            character: {
              value: emoji,
              font: "Verdana",
              style: "",
              weight: "400",
            },
          },
          size: {
            value: 25,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "bottom",
            outModes: {
              default: "out",
            },
          },
        },
        background: {
          color: "transparent",
        },
      }}
    />
  );
}