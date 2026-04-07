import HeartRain from "./HeartRain";
import EmojiRain from "./EmojiRain";
import StarsBackground from "./StarsBackground";
import MeteorShower from "./MeteorShower";

export default function BackgroundEffects({ effect }: { effect: string }) {
  switch (effect) {
    case "coracoes":
      return <HeartRain />;

    case "estrelas":
      return <StarsBackground />;

    case "meteoros":
      return <MeteorShower />;

    case "emojis":
      return <EmojiRain emojis={["❤️", "💖", "✨"]} />;

    default:
      return null;
  }
}