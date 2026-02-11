import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Cuboid as Cube, Settings, MapPin } from 'lucide-react';

export default function Capabilities() {
  return (
    <section className="py-24 bg-graphite relative border-b border-white/5" id="capabilities">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Title & Intro */}
          <div data-reveal="up">
            <span className="block text-safety-orange text-xs font-bold uppercase tracking-[0.2em] mb-4">02 Capabilities</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Built for delivery. <br />
              <span className="text-gray-500">Ready for scale.</span>
            </h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">
              IBA is a steel partner for teams who need consistent supply, clear specs, and dependable timelines. We move you from requirement to delivery with minimal friction.
            </p>

            <ul className="space-y-4" data-stagger>
              {[
                { icon: Cube, text: "Bulk supply ready for dispatch" },
                { icon: Settings, text: "Fabrication (cut/bend/weld) as needed" },
                { icon: Truck, text: "Construction & industrial support" },
                { icon: MapPin, text: "Delivery coordination across RDC" }
              ].map((item, i) => (
                <li key={i} data-stagger-item className="flex items-center gap-4 text-gray-300 border-b border-white/5 pb-4 last:border-0">
                  <item.icon className="text-safety-orange w-5 h-5" />
                  <span className="text-sm uppercase tracking-wide">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Process Timeline */}
          <div className="md:pt-20" data-reveal="up">
            <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-12 space-y-16" data-stagger>
              {[
                { 
                  step: "01", 
                  title: "Send requirements", 
                  desc: "Submit your BOM or project specs. We review quantities and grades immediately."
                },
                { 
                  step: "02", 
                  title: "Receive a clear quote", 
                  desc: "Transparent pricing including fabrication costs and estimated lead times."
                },
                { 
                  step: "03", 
                  title: "Dispatch, Fabricate, Deliver", 
                  desc: "Material is allocated, processed to spec if needed, and loaded for site."
                }
              ].map((item, i) => (
                <div key={i} className="relative group" data-stagger-item>
                  <span className="absolute -left-[3.25rem] md:-left-[3.25rem] w-3 h-3 bg-graphite border border-safety-orange rounded-full mt-2 group-hover:bg-safety-orange transition-colors"></span>
                  <div className="text-xs text-safety-orange font-mono mb-2">STEP {item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-safety-orange transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-400 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
