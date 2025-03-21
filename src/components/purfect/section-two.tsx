import {
  HeartPulse,
  Scale,
  Bolt,
  ShieldPlus,
  ShieldCheck,
  Sparkles,
  Heart,
  BicepsFlexed,
} from "lucide-react";

const items = [
  { description: "Promotes overall wellness and vitality", icon: Heart },
  { description: "Supports Healthy Testosterone Levels", icon: BicepsFlexed },
  { description: "Supports weight management", icon: Scale },
  { description: "Help improve energy and stamina", icon: Bolt },
  { description: "Helps maintain immune health", icon: ShieldPlus },
  { description: "Helps maintain immune defenses", icon: ShieldCheck },
  { description: "Promotes Beautiful Skin", icon: Sparkles },
  { description: "Helps maintain healthy blood pressure", icon: HeartPulse },
];

export default function SectionTwo() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 mt-6 p-2">
      <h4 className="text-3xl text-center">
        Daily supplements for living life — or creating it
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-8 gap-4 md:gap-8">
        {items.map(({ description, icon: Icon }) => (
          <div
            key={description}
            className="flex flex-col items-center justify-center space-y-4 text-primary"
          >
            <Icon strokeWidth={1} className="md:size-14 size-12 text-primary" />

            <p className="text-center">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
