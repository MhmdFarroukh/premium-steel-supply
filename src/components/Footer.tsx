import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold tracking-tight text-white mb-6">
              IBA Steel <span className="text-stone-500 font-light">RDC</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The premier steel supply and fabrication partner for major industrial and construction projects in the Democratic Republic of Congo.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-safety-orange transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-safety-orange transition-colors cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-safety-orange transition-colors cursor-pointer"></div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#trust" className="hover:text-safety-orange transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-safety-orange transition-colors">Projects</a></li>
              <li><a href="#trust" className="hover:text-safety-orange transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-safety-orange transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Products</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#products" className="hover:text-safety-orange transition-colors">Rebar</a></li>
              <li><a href="#products" className="hover:text-safety-orange transition-colors">Beams & Profiles</a></li>
              <li><a href="#products" className="hover:text-safety-orange transition-colors">Sheets & Plates</a></li>
              <li><a href="#products" className="hover:text-safety-orange transition-colors">Pipes & Tubes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase">Hub</span>
                <span>Lubumbashi, RDC</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase">Phone</span>
                <span>+243 000 000 000</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-gray-600 uppercase">Email</span>
                <span>sales@ibasteel.cd</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} IBA Steel RDC. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
