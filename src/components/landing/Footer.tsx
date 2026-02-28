import { Layers } from "lucide-react";

const links = {
  Product: ["Features", "Dashboard", "Analytics", "Pricing"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "API", "Support", "Status"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="border-t border-edge/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-base font-semibold text-cream">
                Velora
              </span>
            </a>
            <p className="text-sm text-muted/60 leading-relaxed max-w-[200px]">
              AI-powered retail traffic intelligence.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-[13px] font-medium text-cream mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] text-muted/50 hover:text-cream transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-edge/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-muted/35">
            2026 Velora. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[12px] text-muted/35 hover:text-cream transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
