import React from 'react';
import { ShieldCheck, Clock, Layers, Users } from 'lucide-react';

export default function Trust() {
  return (
    <section className="py-24 bg-white text-graphite" id="trust">
      <div className="container mx-auto px-6 md:px-12 text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <span className="block text-safety-orange text-xs font-bold uppercase tracking-[0.2em] mb-4">06 Trust</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Procurement-friendly. <br /> Site-ready.
            </h2>
          </div>
          <div className="flex items-center">
             <p className="text-xl text-gray-600 leading-relaxed">
               Clear communication, dependable supply, and a focus on project requirements. We understand the cost of downtime.
             </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { icon: ShieldCheck, title: "Clear Specs", desc: "No ambiguity on grades." },
                { icon: Clock, title: "Responsive", desc: "Same-day quote response." },
                { icon: Layers, title: "Stock Planning", desc: "Dispatch coordination." },
                { icon: Users, title: "Large Orders", desc: "Project-scale capacity." }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left p-6 border border-gray-100 hover:border-safety-orange/30 transition-colors bg-gray-50">
                    <item.icon className="text-safety-orange w-8 h-8 mb-4" />
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
            ))}
        </div>
        
        {/* Logo Wall Placeholder */}
        <div className="mt-20 pt-10 border-t border-gray-100 opacity-50 grayscale">
            <div className="flex flex-wrap justify-center md:justify-between gap-8 items-center">
                <div className="text-xl font-bold text-gray-300">INDUSTRIAL CORP</div>
                <div className="text-xl font-bold text-gray-300">MINING LTD</div>
                <div className="text-xl font-bold text-gray-300">CONSTRUCT RDC</div>
                <div className="text-xl font-bold text-gray-300">KATANGA BUILD</div>
                <div className="text-xl font-bold text-gray-300">SAFARI METALS</div>
            </div>
        </div>
      </div>
    </section>
  );
}
