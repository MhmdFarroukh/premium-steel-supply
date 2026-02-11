import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { submitQuote, QuoteRequest } from '../services/QuoteService';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteRequest>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: QuoteRequest) => {
    setIsSubmitting(true);
    setError("");
    try {
      await submitQuote(data);
      setIsSuccess(true);
      reset();
    } catch (e) {
      setError("Something went wrong. Please try again or use WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-graphite relative" id="contact">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Text Side */}
          <div>
            <span className="block text-safety-orange text-xs font-bold uppercase tracking-[0.2em] mb-4">07 Contact</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Request a quote
            </h2>
            <p className="text-xl text-gray-400 font-light mb-10">
              Tell us what you need—product, size, quantity, and delivery city. We’ll respond with pricing and lead time.
            </p>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm mb-8">
                <p className="text-sm text-gray-300 mb-2 font-bold uppercase tracking-wide">Typical Response Time</p>
                <div className="flex items-center gap-2 text-safety-orange">
                    <div className="w-2 h-2 bg-safety-orange rounded-full animate-pulse"></div>
                    Same day / Next business day
                </div>
            </div>

            <a 
              href="https://wa.me/243900009227" 
              className="inline-flex items-center gap-3 text-white hover:text-safety-orange transition-colors group"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-safety-orange transition-colors">
                <Phone size={20} />
              </div>
              <span className="text-lg font-bold">WhatsApp Us Directly</span>
            </a>
          </div>

          {/* Form Side */}
          <div className="bg-white text-graphite p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
            {isSuccess ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20 text-center p-8">
                <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Request Received</h3>
                <p className="text-gray-600 mb-6">We have received your quote request and will get back to you shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-safety-orange font-bold uppercase tracking-widest text-sm hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Name *</label>
                  <input 
                    {...register("name", { required: true })}
                    className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-safety-orange transition-colors"
                    placeholder="Full Name"
                  />
                  {errors.name && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Company</label>
                  <input 
                    {...register("company")}
                    className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-safety-orange transition-colors"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">WhatsApp / Phone *</label>
                  <input 
                    {...register("phone", { required: true })}
                    className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-safety-orange transition-colors"
                    placeholder="+243..."
                  />
                  {errors.phone && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                  <input 
                    {...register("email")}
                    className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-safety-orange transition-colors"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Product *</label>
                    <select 
                      {...register("product", { required: true })}
                      className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-safety-orange transition-colors"
                    >
                      <option value="">Select Product...</option>
                      <option value="Rebar">Rebar</option>
                      <option value="Beams">Steel Beams</option>
                      <option value="Plates">Sheets & Plates</option>
                      <option value="Pipes">Pipes & Tubes</option>
                      <option value="Other">Other / Multiple</option>
                    </select>
                    {errors.product && <span className="text-red-500 text-xs">Required</span>}
                 </div>
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">City *</label>
                    <input 
                      {...register("city", { required: true })}
                      className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-safety-orange transition-colors"
                      placeholder="Delivery City"
                    />
                    {errors.city && <span className="text-red-500 text-xs">Required</span>}
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Specs & Details *</label>
                <textarea 
                  {...register("specs", { required: true })}
                  className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-safety-orange transition-colors h-24 resize-none"
                  placeholder="E.g. 12mm Rebar, Grade 500, 12m lengths..."
                ></textarea>
                {errors.specs && <span className="text-red-500 text-xs">Required</span>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Quantity Estimate *</label>
                <input 
                  {...register("quantity", { required: true })}
                  className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-safety-orange transition-colors"
                  placeholder="E.g. 50 tons / 200 pieces"
                />
                {errors.quantity && <span className="text-red-500 text-xs">Required</span>}
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-graphite text-white font-bold uppercase tracking-widest py-4 hover:bg-safety-orange transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <>Send Request <Send size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
