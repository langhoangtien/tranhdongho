const imgs = [
  {
    src: "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/testicles-medical-anatomy-body_organ-masculine-reproduction-system.png?v=1712073082",
    description: "Promotes overall wellness and vitality",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Layer_21.png?v=1712073082",
    description: "Supports Healthy Testosterone Levels.",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/weight_scale-wellness-fitness-diet-electronics-digital-gym.png?v=1712073082",
    description: "Supports weight management",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/eco_energy_energy_electricity_charging_plug.png?v=1712073082",
    description: "Help improve energy and stamina",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/safety_at_work_isolation_coronavirus_protective_measures.png?v=1712073082",
    description: "Helps maintain immune health",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Layer_22.png?v=1712073083",
    description: "Helps maintain immune defenses",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/collagen-cleansing-treatment-beauty-skin_care-makeup-healthcare.png?v=1712073082",
    description: "Promotes Beautiful Skin",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/heartbeat_heart_alive_clinic_healthcare_and_medical.png?v=1712073082",
    description: "Helps maintain healthy blood pressure",
  },
];
export default function SectionTwo() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-8 gap-8">
        {imgs.map((img) => (
          <div
            key={img.src}
            className="flex flex-col items-center space-y-4 text-[#46755f]"
          >
            <img key={img.src} className=" aspect-square" src={img.src} />
            <p>{img.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
