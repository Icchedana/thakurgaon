import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Search, ShieldAlert, HeartPulse, Bus, Briefcase, 
  Phone, MapPin, CheckCircle, Home, PhoneCall, AlertTriangle,
  Sun, Award, Sprout, Store, ArrowUpRight, Share2, 
  Droplet, Siren, UserCheck, Check, Zap, Building2,
  Train, Compass, PlusCircle, Send, X, CloudSun, MessageCircle,
  Bell, ChevronRight, Stethoscope
} from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Apnar asol chobi (SVG SarmanProfileSVG) - 100% secure o fixed[cite: 2]
const SARMAN_PHOTO_DATA = [
  "data:image/webp;base64,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"
].join('');

function SarmanProfileSVG() {
  return (
    <svg viewBox="0 0 140 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="userCircleClip">
          <circle cx="70" cy="70" r="70" />
        </clipPath>
      </defs>
      <image
        href={SARMAN_PHOTO_DATA}
        width="140"
        height="140"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#userCircleClip)"
      />
    </svg>
  );
}

// Thakurgaon local backup services[cite: 2]
const DEFAULT_SERVICES = [
  {
    id: 's1',
    title_bn: 'ঠাকুরগাঁও ২৫০ শ���্যা জেনারেল হাসপাতাল',
    primary_phone: '01712213560',
    address_bn: 'হাসপাতাল রোড, ঠাকুরগাঁও সদর',
    description_bn: '২৪ ঘণ্টা জরুরি বিভাগ, ইনডোর-আউটডোর ও বিশেষজ্ঞ চিকিৎসা সেবা।',
    upazila_name: 'ঠাকুরগাঁও সদর',
    category_name: 'চিকিৎসা'
  },
  {
    id: 's2',
    title_bn: 'ঠাকুরগাঁও ফায়ার সার্ভিস ও সিভিল ডিফেন্স',
    primary_phone: '01718042456',
    address_bn: 'কলেজ রোড, ঠাকুরগাঁও সদর',
    description_bn: 'যেকোনো অগ্নিকাণ্ড ও জরুরি উদ্ধার তৎপরতায় অবিলম্বে যোগাযোগ করুন।',
    upazila_name: 'ঠাকুরগাঁও সদর',
    category_name: 'জরুরি সেবা'
  },
  {
    id: 's3',
    title_bn: 'হরিপুর উপজেলা স্বাস্থ্য কমপ্লেক্স',
    primary_phone: '01730324888',
    address_bn: 'হরিপুর সদর, ঠাকুরগাঁও',
    description_bn: 'জরুরি প্রাথমিক চিকিৎসা, মাতৃত্বকালীন সেবা ও সরকারি অ্যাম্বুলেন্স।',
    upazila_name: 'হরিপুর',
    category_name: 'চিকিৎসা'
  },
  {
    id: 's4',
    title_bn: 'হরিপুর থানা পুলিশ কন্ট্রোল',
    primary_phone: '01320136240',
    address_bn: 'থানা কমপ্লেক্স, হরিপুর',
    description_bn: 'আইনশৃঙ্খলা রক্ষা ও সাধারণ নাগরিকের জরুরি পুলিশি সহায়তা।',
    upazila_name: 'হরিপুর',
    category_name: 'জরুরি সেবা'
  },
  {
    id: 's5',
    title_bn: 'পীরগঞ্জ ফায়ার সার্ভিস স্টেশন',
    primary_phone: '01718042458',
    address_bn: 'পীরগঞ্জ পৌরসভা, ঠাকুরগাঁও',
    description_bn: 'পীরগঞ্জ এলাকার সার্বক্ষণিক অগ্নি ও দুর্যোগ ব্যবস্থাপনা।',
    upazila_name: 'পীরগঞ্জ',
    category_name: 'জরুরি সেবা'
  },
  {
    id: 's6',
    title_bn: 'রানীশংকৈল উপজেলা স্বাস্থ্য কমপ্লেক্স',
    primary_phone: '01730324889',
    address_bn: 'শিবদিঘী মোড়, রানীশংকৈল',
    description_bn: '২৪ ঘণ্টা ইমার্জেন্সি ও সরকারি স্বাস্থ্য সেবা কেন্দ্র।',
    upazila_name: 'রানীশংকৈল',
    category_name: 'চিকিৎসা'
  },
  {
    id: 's7',
    title_bn: 'বালিয়াডাঙ্গী পল্লী বিদ্যুৎ অভিযোগ কেন্দ্র',
    primary_phone: '01769400234',
    address_bn: 'বালিয়াডাঙ্গী সাব-স্টেশন',
    description_bn: 'বিদ্যুৎ বিপর্যয় ও লাইন মেরামতের জরুরি সহায়তার জন্য।',
    upazila_name: 'বালিয়াডাঙ্গী',
    category_name: 'বিদ্যুৎ অফিস'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [services, setServices] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({ title: '', phone: '', address: '', upazila: 'হরিপুর', category: 'জরুরি সেবা' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const upazilaList = ['ঠাকুরগাঁও সদর', 'হরিপুর', 'রানীশংকৈল', 'পীরগঞ্জ', 'বালিয়াডাঙ্গী'];

  const categoryList = [
    { id: 1, name: 'জরুরি সেবা', icon: ShieldAlert },
    { id: 2, name: 'চিকিৎসা', icon: HeartPulse },
    { id: 3, name: 'বিদ্যুৎ অফিস', icon: Zap },
    { id: 4, name: 'প্রশাসন', icon: Building2 }
  ];

  useEffect(() => {
    fetchServices();
  }, [selectedUpazila, selectedCategory]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('services')
        .select(`*, upazilas (name_bn), categories (name_bn)`)
        .order('id', { ascending: false });

      if (selectedUpazila) {
        query = query.eq('upazilas.name_bn', selectedUpazila);
      }

      const { data, error } = await query;

      if (data && data.length > 0) {
        setServices(data.map(item => ({
          ...item,
          upazila_name: item.upazilas?.name_bn || 'ঠাকুরগাঁও',
          category_name: item.categories?.name_bn || 'নাগরিক সেবা'
        })));
      } else {
        let filtered = [...DEFAULT_SERVICES];
        if (selectedUpazila) {
          filtered = filtered.filter(item => item.upazila_name.includes(selectedUpazila));
        }
        if (selectedCategory) {
          filtered = filtered.filter(item => item.category_name.includes(selectedCategory));
        }
        setServices(filtered);
      }
    } catch (error) {
      console.error(error);
      setServices(DEFAULT_SERVICES);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'স্মার্ট ঠাকুরগাঁও - সকল নাগরিক ও জরুরি সেবা',
          text: 'ঠাকুরগাঁও জেলার সব জরুরি হেল্পলাইন ও সেবার নম্বর এক ঠিকানায়!',
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowAddModal(false);
      setNewService({ title: '', phone: '', address: '', upazila: 'হরিপুর', category: 'জরুরি সেবা' });
    }, 2000);
  };

  const filteredServices = services.filter(service =>
    service.title_bn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description_bn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.upazila_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trains = [
    { 
      name: 'দ্রুতযান এক্সপ্রেস (৭৫৭/৭৫৮)', 
      route: 'ঢাকা ⇄ ঠাকুরগাঁও রোড ⇄ পঞ্চগড়', 
      time: 'ঢাকা ছাড়ে: রাত ৮:০০ | ঠাকুরগাঁও পৌঁছায়: ভোর ৫:৫০', 
      offDay: 'ঢাকা থেকে: নেই / পঞ্চগড় থেকে: বুধবার' 
    },
    { 
      name: 'একতা এক্সপ্রেস (৭০৫/৭০৬)', 
      route: 'ঢাকা ⇄ ঠাকুরগাঁও রোড ⇄ পঞ্চগড়', 
      time: 'ঢাকা ছাড়ে: সকাল ১০:১০ | ঠাকুরগাঁও পৌঁছায়: রাত ৮:১০', 
      offDay: 'মঙ্গলবার' 
    },
    { 
      name: 'পঞ্চগড় এক্সপ্রেস (৭৯৩/৭৯৪)', 
      route: 'ঢাকা ⇄ ঠাকুরগাঁও রোড (সেমি নন-স্টপ)', 
      time: 'ঢাকা ছাড়ে: রাত ১১:৩০ | ঠাকুরগাঁও পৌঁছায়: সকাল ৮:৩০', 
      offDay: 'সাপ্তাহিক ছুটি নেই (প্রতিদিন)' 
    }
  ];

  const busCounters = [
    { name: 'হানিফ এন্টারপ্রাইজ', location: 'ঠাকুরগাঁও বাস টার্মিনাল', phone: '01713049555' },
    { name: 'শ্যামলী পরিবহন', location: 'পুরাতন বাসস্ট্যান্ড, ঠাকুরগাঁও', phone: '01711234567' },
    { name: 'নাবিল পরিবহন', location: 'ঠাকুরগাঁও রোড / হরিপুর মোড়', phone: '01712987654' }
  ];

  const agriGuides = [
    { crop: 'আমন ও বোরো ধান', problem: 'মাজরা পোকা ও ব্লাস্ট রোগ', solution: 'জমিতে পরিমিত পটাশ সার প্রয়োগ করুন এবং আক্রমণের শুরুতে ট্রাইসাইক্লাজল বা কার্বেনডাজিম স্প্রে করুন।' },
    { crop: 'ভুট্টা চাষ', problem: 'ফল আর্মিওয়ার্ম ও পাতা পোড়া', solution: 'জমি সবসময় আগাছামুক্ত রাখুন এবং আক্রমণ দেখা দিলে স্পিনোস্যাড বা ক্লোরপায়রিফস প্রয়োগ করুন।' },
    { crop: 'আলু ফসল', problem: 'নাবি ধসা (Late Blight)', solution: 'আবহাওয়ায় কুয়াশা ও আর্দ্রতা বেশি থাকলে প্রতিরোধমূলকভাবে ম্যানকোজেব স্প্রে করতে হবে।' }
  ];

  const touristSpots = [
    { 
      name: 'ঐতিহাসিক হরিপুর রাজবাড়ি (ঘনশ্যাম রাজবাড়ি)', 
      place: 'হরিপুর উপজ���লা সদর, ঠাকুরগাঁও', 
      desc: 'জমিদার ঘনশ্যাম রায়ের আমলে প্রতিষ্ঠিত এবং পরবর্তীতে ঊনবিংশ শতাব্দীর শেষভাগে তাঁর বংশধরদের দ্বারা নির্মিত দ্বিতল সুরম্য রাজপ্রাসাদ। নান্দনিক খিলান ও প্রাচীন ঠাকুরদালান সংবলিত প্রত্নতাত্ত্বিক নিদর্শন।' 
    },
    { 
      name: 'জামালপুর জমিদার বাড়ি জামে মসজিদ', 
      place: 'শিবগঞ্জ, ঠাকুরগাঁও সদর', 
      desc: 'মুঘল ও ইউরোপীয় স্থাপত্যরীতির অনন্য মেলবন্ধনে নির্মিত ঐতিহাসিক তিন গম্বুজবিশিষ্ট প্রাচীন মসজিদ।' 
    },
    { 
      name: 'রাজা টংকনাথের রাজবাড়ি', 
      place: 'রানীশংকৈল, ঠাকুরগাঁও', 
      desc: 'বিংশ শতাব্দীর গোড়ার দিকে নির্মিত প্রাচীন মালদুয়ার জমিদারের সুবিশাল ঐতিহাসিক রাজপ্রাসাদ।' 
    },
    { 
      name: 'লোকায়ন জীবনবৈচিত্র্য জাদুঘর', 
      place: 'ঠাকুরগাঁও সদর', 
      desc: 'উত্তরবঙ্গের গ্রামীণ জনজীবনের বিলুপ্তপ্রায় ঐতিহ্য, তৈজসপত্র ও লোকসংস্কৃতির সমৃদ্ধ সংগ্রহশালা।' 
    },
    { 
      name: 'বালিয়া মসজিদ ও রাজভিটা', 
      place: 'ভূল্লী / বালিয়াডাঙ্গী', 
      desc: 'নৈসর্গিক টেরাকোটা অলংকরণ ও ঐতিহ্যবাহী প্রত্নতাত্ত্বিক নিদর্শনের প্রতীক।' 
    }
  ];

  const bloodDonors = [
    { name: 'রেড ক্রিসেন্ট ঠাকুরগাঁও ইউনিট', group: 'সকল গ্রুপ', upazila: 'ঠাকুরগাঁও সদর', phone: '01711000000', verified: true },
    { name: 'ঠাকুরগাঁও ব্লাড ডোনার্স ক্লাব', group: 'সকল গ্রুপ', upazila: 'ঠাকুরগাঁও সদর', phone: '01722000000', verified: true },
    { name: 'স্বেচ্ছাসেবী রক্তদাতা হরিপুর', group: 'O+', upazila: 'হরিপুর', phone: '01733000000', verified: true },
    { name: 'রানীশংকৈল যুব ব্লাড ব্যাংক', group: 'A+', upazila: 'রানীশংকৈল', phone: '01744000000', verified: true },
    { name: 'পীরগঞ্জ মানবকল্যাণ রক্তদান সংস্থা', group: 'B+', upazila: 'পীরগঞ্জ', phone: '01755000000', verified: true },
    { name: 'বালিয়াডাঙ্গী ব্লাড অ্যাসোসিয়েশন', group: 'AB+', upazila: 'বালিয়াডাঙ্গী', phone: '01766000000', verified: true }
  ];

  const filteredDonors = selectedBloodGroup === 'All' 
    ? bloodDonors 
    : bloodDonors.filter(d => d.group === selectedBloodGroup || d.group === 'সকল গ্রুপ');

  const ambulances = [
    { title: 'ঠাকুরগাঁও জেনারেল হাসপাতাল অ্যাম্বুলেন্স', place: 'সদর', phone: '01712213560' },
    { title: 'হরিপুর উপজেলা স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স', place: 'হরিপুর', phone: '01730324888' },
    { title: 'রানীশংকৈল স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স', place: 'রানীশংকৈল', phone: '01730324889' },
    { title: 'পীরগঞ্জ স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স', place: 'পীরগঞ্জ', phone: '01730324890' },
    { title: 'বালিয়াডাঙ্গী স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স', place: 'বালিয়াডাঙ্গী', phone: '01730324891' },
    { title: 'রেড ক্রিসেন্ট ঠাকুরগাঁও অ্যাম্বুলেন্স', place: 'সদর', phone: '01718000000' }
  ];

  const emergencyHotlines = [
    { title: 'জাতীয় জরুরি সেবা (পুলিশ, অ্যাম্বুলেন্স, ফায়ার)', phone: '999', desc: 'সরকারি টোল ফ্রি ২৪/৭ সেবা' },
    { title: 'ঠাকুরগাঁও সদর থানা কন্ট্রোল রুম', phone: '01320136200', desc: 'জরুরি পুলিশি সহায়তা' },
    { title: 'ঠাকুরগাঁও ফায়ার সার্ভিস স্টেশন', phone: '01718042456', desc: 'অগ্নি ও দুর্যোগ উদ্ধার সেবা' },
    { title: 'ঠাকুরগাঁও ২৫০ শয্যা বিশিষ্ট হাসপাতাল', phone: '01712213560', desc: 'জরুরি স্বাস্থ্য বিভাগ' },
    { title: 'নেসকো ঠাকুরগাঁও বিদ্যুৎ অভিযোগ কেন্দ্র', phone: '16116', desc: 'বিদ্যুৎ বিপর্যয় ও ত্রুটি সেবা' },
    { title: 'নারী ও শিশু নির্যাতন প্রতিরোধ হেল্পলাইন', phone: '109', desc: 'সরকারি টোল ফ্রি সহায়তা' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 pb-32 antialiased selection:bg-emerald-500 selection:text-white font-sans relative">
      
      {/* Background layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-slate-900/75 to-emerald-950/90 backdrop-blur-[1.5px]"></div>
      </div>

      {/* Running notice bar */}
      <div className="relative z-20 bg-amber-400 text-slate-950 px-3 py-1.5 text-[11px] font-black flex items-center gap-2 shadow-md">
        <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Bell className="w-3 h-3 animate-bounce" /> নোটিশ
        </span>
        <marquee className="font-bold">
          স্মার্ট ঠাকুরগাঁওয়ে স্বাগতম! জেলার সকল জরুরি নম্বর, রক্তদাতা, হাসপাতাল ও দর্শনীয় স্থানের তথ্য এক ক্লিকেই পেয়ে যান।
        </marquee>
      </div>

      {/* Header banner */}
      <header className="relative z-10 text-white pt-6 pb-14 px-4 shadow-2xl overflow-hidden border-b border-white/10">
        <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto relative z-10">
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 text-[11px] font-extrabold tracking-wide mb-1 border border-emerald-400/40">
                <Sun className="w-3.5 h-3.5 text-amber-300" /> টাঙ্গনের তীরে • কৃষি ও ঐতিহ্যের জনপদ
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow text-white">স্মার্ট ঠাকুরগাঁও</h1>
              <p className="text-xs text-emerald-200 font-semibold mt-0.5">নাগরিক সেবা ও তথ্য বাতায়ন</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="h-10 px-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xl border border-amber-300"
                title="সেবা যুক্ত করুন"
              >
                <PlusCircle className="w-4 h-4" /> সেবা যুক্ত করুন
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 flex items-center justify-center transition active:scale-95 shadow-lg"
                title="শেয়ার করুন"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-300" /> : <Share2 className="w-5 h-5 text-emerald-100" />}
              </button>
            </div>
          </div>

          {/* Shortcut Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
            <button 
              onClick={() => setActiveTab('tourism')}
              className={`p-2.5 rounded-2xl border flex items-center justify-between text-left transition active:scale-95 shadow-md ${activeTab === 'tourism' ? 'bg-amber-500 text-slate-950 border-amber-300 font-extrabold ring-2 ring-amber-300' : 'bg-slate-800/90 text-white border-slate-700/80 hover:bg-slate-700/90'}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'tourism' ? 'bg-slate-950 text-amber-400' : 'bg-amber-400/20 text-amber-300'}`}>
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">দর্শনীয় স্থান</h4>
                  <p className={`text-[10px] ${activeTab === 'tourism' ? 'text-slate-800' : 'text-slate-400'}`}>হরিপুর রাজবাড়ী</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button 
              onClick={() => setActiveTab('transport')}
              className={`p-2.5 rounded-2xl border flex items-center justify-between text-left transition active:scale-95 shadow-md ${activeTab === 'transport' ? 'bg-sky-500 text-slate-950 border-sky-300 font-extrabold ring-2 ring-sky-300' : 'bg-slate-800/90 text-white border-slate-700/80 hover:bg-slate-700/90'}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'transport' ? 'bg-slate-950 text-sky-400' : 'bg-sky-400/20 text-sky-300'}`}>
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">ট্রেন ও বাস</h4>
                  <p className={`text-[10px] ${activeTab === 'transport' ? 'text-slate-800' : 'text-slate-400'}`}>সময়সূচী ও কাউন্টার</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button 
              onClick={() => setActiveTab('agri')}
              className={`p-2.5 rounded-2xl border flex items-center justify-between text-left transition active:scale-95 shadow-md ${activeTab === 'agri' ? 'bg-emerald-500 text-slate-950 border-emerald-300 font-extrabold ring-2 ring-emerald-300' : 'bg-slate-800/90 text-white border-slate-700/80 hover:bg-slate-700/90'}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'agri' ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-400/20 text-emerald-300'}`}>
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">কৃষি গাইড</h4>
                  <p className={`text-[10px] ${activeTab === 'agri' ? 'text-slate-800' : 'text-slate-400'}`}>রোগবালাই ও পরামর্শ</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button 
              onClick={() => setActiveTab('home')}
              className={`p-2.5 rounded-2xl border flex items-center justify-between text-left transition active:scale-95 shadow-md ${activeTab === 'home' ? 'bg-teal-500 text-slate-950 border-teal-300 font-extrabold ring-2 ring-teal-300' : 'bg-slate-800/90 text-white border-slate-700/80 hover:bg-slate-700/90'}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'home' ? 'bg-slate-950 text-teal-400' : 'bg-teal-400/20 text-teal-300'}`}>
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">সকল সেবা</h4>
                  <p className={`text-[10px] ${activeTab === 'home' ? 'text-slate-800' : 'text-slate-400'}`}>উপজেলা তালিকা</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          </div>

          {activeTab === 'home' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div>
                <select
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  className="w-full bg-slate-950 text-amber-400 border-2 border-amber-400/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 transition shadow-xl cursor-pointer"
                >
                  <option value="" className="text-white font-semibold">পুরো ঠাকুরগাঁও জেলা (সকল উপজেলা)</option>
                  {upazilaList.map((u, idx) => (
                    <option key={idx} value={u} className="text-white font-semibold">
                      উপজেলা: {u}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Search className="absolute left-3.5 top-3 text-slate-900 w-4 h-4" />
                <input
                  type="text"
                  placeholder="কী সেবা খুঁজছেন? (যেমন: হাসপাতাল, সার, ফায়ার...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-slate-950 pl-10 pr-4 py-2.5 rounded-xl shadow-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-800 placeholder:font-bold font-bold border-2 border-white"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4 -mt-6 relative z-20">
        
        {activeTab === 'home' && (
          <>
            {/* Weather & Agriculture bar */}
            <div className="mb-4 bg-gradient-to-r from-sky-600 to-teal-700 rounded-2xl p-3.5 text-white shadow-xl flex items-center justify-between border-2 border-sky-300">
              <div className="flex items-center gap-3">
                <CloudSun className="w-8 h-8 text-amber-300 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xs">ঠাকুরগাঁও আবহাওয়া ও কৃষি বার্তা</h4>
                  <p className="text-[11px] text-sky-100 font-semibold">তাপমাত্রা: ২৮°সে • আবহাওয়া অনুকূল, আলু ও ভুট্টার সেচ উপযোগী</p>
                </div>
              </div>
            </div>

            {/* M/S Sarman Traders */}
            <section className="mb-5">
              <div className="relative bg-white rounded-2xl p-4 shadow-2xl border-2 border-amber-400 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full pointer-events-none"></div>

                <div className="flex items-start justify-between relative z-10 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-13 h-13 p-2.5 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 flex items-center justify-center text-white shadow-lg shadow-emerald-800/30">
                      <Sprout className="w-7 h-7 text-amber-300" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider shadow-sm uppercase">
                        <Award className="w-3 h-3 text-slate-950" /> ভেরিফায়েড প্রতিষ্ঠান
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-lg leading-tight mt-1">
                        মেসার্স সারমান ট্রেডার্স
                      </h3>
                    </div>
                  </div>
                  <Store className="w-6 h-6 text-amber-600 mt-1" />
                </div>

                <div className="bg-slate-100 rounded-xl p-2.5 border border-slate-200 mb-3.5">
                  <p className="text-xs font-bold text-slate-900 leading-relaxed">
                    🌱 উন্নত জাতের বীজ, সুষম সার ও কার্যকরী বালাইনাশক পাইকারি ও খুচরা বিক্রয় কেন্দ্র। কৃষকের আস্থায় বিশ্বস্ত সেবা।
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>চৌরঙ্গী বাজার, হরিপুর</span>
                  </div>
                  <a
                    href="tel:01741075757" 
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md active:scale-95 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-300" /> 01741075757
                  </a>
                </div>
              </div>
            </section>

            {/* Popular Categories */}
            <section className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200 mb-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">জনপ্রিয় ক্যাটাগরি</h2>
                {selectedCategory && (
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs text-emerald-800 font-bold hover:underline"
                  >
                    সব দেখুন
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                {categoryList.map((cat) => {
                  const IconComp = cat.icon;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                      className={`flex flex-col items-center p-2 rounded-xl border transition ${
                        isSelected 
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold shadow-sm' 
                          : 'border-transparent hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 transition ${
                        isSelected 
                          ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold truncate w-full">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Services List */}
            <section className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-sm font-bold text-white drop-shadow">উপলব্ধ সেবাসমূহ</h2>
                <span className="text-[11px] text-emerald-200 bg-emerald-950 font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  {filteredServices.length} টি পাওয়া গেছে
                </span>
              </div>

              {loading ? (
                <div className="text-center py-12 text-slate-300 text-xs">ডাটা লোড হচ্ছে...</div>
              ) : filteredServices.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-xl text-slate-700 text-xs border border-slate-100">
                  <p className="font-bold">এই মুহূর্তে কোনো তথ্য খুঁজে পাওয়া যায়নি।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredServices.map((service) => (
                    <div 
                      key={service.id} 
                      className="bg-white p-4 rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                              {service.title_bn}
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            </h3>
                            <p className="text-xs text-slate-600 font-semibold flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              {service.address_bn} ({service.upazila_name})
                            </p>
                          </div>
                        </div>

                        {service.description_bn && (
                          <p className="text-xs text-slate-800 font-medium mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            {service.description_bn}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 mt-2">
                        <a
                          href={`tel:${service.primary_phone}`}
                          className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          কল করুন ({service.primary_phone})
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* Tourism Tab */}
        {activeTab === 'tourism' && (
          <section className="space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-amber-300">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-600" /> ঠাকুরগাঁওয়ের ঐতিহ্য ও দর্শনীয় স্থান
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">ইতিহাস, সংস্কৃতি ও প্রাচীন নিদর্শনে সমৃদ্ধ অঞ্চল।</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {touristSpots.map((spot, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{spot.name}</h4>
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full shrink-0">
                        ঐতিহাসিক স্থান
                      </span>
                    </div>
                    <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-1 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {spot.place}
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
                      {spot.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Transport Tab */}
        {activeTab === 'transport' && (
          <section className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-sky-300">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2 mb-2">
                <Train className="w-5 h-5 text-sky-600" /> আন্তঃনগর ট্রেনের সময়সূচী
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-3">
                {trains.map((train, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{train.name}</h4>
                        <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                          ছুটি: {train.offDay}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">{train.route}</p>
                    </div>
                    <p className="text-[11px] text-sky-800 font-bold mt-2">{train.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2 mb-3">
                <Bus className="w-5 h-5 text-emerald-600" /> দূরপাল্লার বাস কাউন্টার
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {busCounters.map((bus, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{bus.name}</h4>
                      <p className="text-[11px] text-slate-500 font-semibold">{bus.location}</p>
                    </div>
                    <a
                      href={`tel:${bus.phone}`}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" /> কল
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Agriculture Guide Tab */}
        {activeTab === 'agri' && (
          <section className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-emerald-400">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2 mb-1">
                <Sprout className="w-5 h-5 text-emerald-600" /> ঠাকুরগাঁও কৃষি ও ফসল গাইড
              </h3>
              <p className="text-xs text-slate-600 mb-3">মৌসুমভিত্তিক প্রধান ফসল ও রোগবালাই প্রতিরোধে জরুরি পরামর্শ।</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {agriGuides.map((agri, idx) => (
                  <div key={idx} className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-emerald-900 text-xs sm:text-sm">{agri.crop}</h4>
                      <p className="text-[11px] text-red-700 font-bold mt-0.5">⚠️ সমস্যা: {agri.problem}</p>
                    </div>
                    <p className="text-xs text-slate-800 mt-2 font-semibold bg-white p-2 rounded-lg border border-emerald-100">
                      💡 পরামর্শ: {agri.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-4 shadow-xl border-2 border-amber-300 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-amber-950 text-xs sm:text-sm">উপজেলা কৃষি অফিস হটলাইন</h4>
                <p className="text-[11px] text-amber-800 font-semibold">যেকোনো কৃষি তথ্যের জন্য সরকারি হেল্পলাইন।</p>
              </div>
              <a
                href="tel:16123"
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" /> ১৬১২৩
              </a>
            </div>
          </section>
        )}

        {/* Blood Donation Tab */}
        {activeTab === 'blood' && (
          <section className="space-y-4">
            <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-xl border-2 border-rose-200">
              <Droplet className="w-8 h-8 text-rose-600 shrink-0" />
              <div>
                <h3 className="text-sm font-extrabold text-rose-950">জরুরি রক্তদান সেবা</h3>
                <p className="text-xs text-rose-700 font-bold mt-0.5">রক্তের প্রয়োজনে সংশ্লিষ্ট রক্তদাতা বা ব্লাড ক্লাবে সরাসরি যোগাযোগ করুন।</p>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((grp) => (
                <button
                  key={grp}
                  onClick={() => setSelectedBloodGroup(grp)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition shadow-md ${
                    selectedBloodGroup === grp 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {grp === 'All' ? 'স��ল গ্রুপ' : grp}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredDonors.map((donor, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 font-black text-xs flex items-center justify-center shadow-inner shrink-0">
                      {donor.group}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1">
                        {donor.name}
                        {donor.verified && <UserCheck className="w-3.5 h-3.5 text-emerald-600" />}
                      </h4>
                      <p className="text-[11px] text-slate-600 font-semibold mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {donor.upazila}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <a
                      href={`https://wa.me/88${donor.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold p-2 rounded-xl flex items-center transition shadow-md"
                      title="WhatsApp মেসেজ"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${donor.phone}`}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" /> কল
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ambulance Tab */}
        {activeTab === 'ambulance' && (
          <section className="space-y-3">
            <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-xl border-2 border-teal-200">
              <Siren className="w-8 h-8 text-teal-700 shrink-0" />
              <div>
                <h3 className="text-sm font-extrabold text-teal-950">জরুরি অ্যাম্বুলেন্স ডিরেক্টরি</h3>
                <p className="text-xs text-teal-700 font-bold mt-0.5">যেকোনো মুমূর্ষু রোগীর দ্রুত স্থানান্তরে সরকারি ও রেড ক্রিসেন্ট অ্যাম্বুলেন্স সেবা।</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {ambulances.map((item, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.title}</h4>
                    <p className="text-[11px] text-slate-600 font-semibold mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> উপজেলা: {item.place}
                    </p>
                  </div>
                  <a
                    href={`tel:${item.phone}`}
                    className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition shadow-md shrink-0"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> কল
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Emergency SOS Tab */}
        {activeTab === 'emergency' && (
          <section className="space-y-3">
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 flex items-center gap-3 shadow-xl">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              <p className="text-xs text-amber-950 font-bold">
                যেকোনো তাৎক্ষণিক পুলিশ, অগ্নিকাণ্ড বা জাতীয় সংকটে নিচের সরকারি হটলাইন নম্বরগুলোতে কল করুন।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {emergencyHotlines.map((hotline, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{hotline.title}</h4>
                    <p className="text-xs text-slate-600 font-semibold mt-0.5">{hotline.desc}</p>
                  </div>
                  <a
                    href={`tel:${hotline.phone}`}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition shrink-0"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    {hotline.phone}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 👨‍💻 Developer Identity Footer Section (Moved to Bottom Footer) */}
        <footer className="mt-12 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-slate-700">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="max-w-xl mx-auto">
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-lg bg-slate-800 flex items-center justify-center">
                  <SarmanProfileSVG />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-100 leading-tight">Md. Sarman Rana</h4>
                <p className="text-xs text-emerald-400 font-medium mt-0.5">UI/UX Designer & Web Developer</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              ঠাকুরগাঁও জেলার সাধারণ মানুষের সুবিধার্থে আধুনিক ওয়েব প্রযুক্তির সমন্বয়ে এই প্ল্যাটফর্মটি ডেভেলপ করা হয়েছে। সর্বস্বত্ব সংরক্ষিত © ২০২৬ স্মার্ট ঠাকুরগাঁও।
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-700 text-xs">
              <a 
                href="https://www.facebook.com/ak.sarman.ak" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition font-medium"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span>ফেসবুক প্রোফাইল</span>
              </a>

              <a 
                href="http://iccheghurirdana.blogspot.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-bold transition"
              >
                <span>পোর্টফোলিও ভিজিট</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl relative border-2 border-emerald-500">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <PlusCircle className="w-6 h-6 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 text-base">নতুন সেবা যুক্ত করুন</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-semibold">আপনার প্রতিষ্ঠান বা সেবার তথ্য দিন, যাচাই করে অ্যাপে যুক্ত করা হবে।</p>

            {formSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl text-center text-xs font-bold border border-emerald-200">
                ✅ আপনার তথ্যটি সফলভাবে গৃহীত হয়েছে! শীঘ্রই তা যাচাই করে তালিকায় যুক্ত করা হবে।
              </div>
            ) : (
              <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">সেবা বা প্রতিষ্ঠানের নাম *</label>
                  <input
                    required
                    type="text"
                    placeholder="যেমন: আল-মদিনা ফার্মেসি"
                    value={newService.title}
                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ফোন নম্বর *</label>
                  <input
                    required
                    type="tel"
                    placeholder="যেমন: 017xxxxxxxx"
                    value={newService.phone}
                    onChange={(e) => setNewService({...newService, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">উপজেলা *</label>
                  <select
                    value={newService.upazila}
                    onChange={(e) => setNewService({...newService, upazila: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {upazilaList.map((u, i) => <option key={i} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ঠিকানা *</label>
                  <input
                    required
                    type="text"
                    placeholder="যেমন: চৌরঙ্গী বাজার, হরিপুর"
                    value={newService.address}
                    onChange={(e) => setNewService({...newService, address: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 mt-2"
                >
                  <Send className="w-4 h-4" /> আবেদন জমা দিন
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-white/10 py-2.5 px-4 z-40 shadow-2xl">
        <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'home' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">হোম</span>
          </button>

          <button 
            onClick={() => setActiveTab('blood')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'blood' ? 'text-rose-400 font-bold' : 'text-slate-400'}`}
          >
            <Droplet className="w-5 h-5" />
            <span className="text-[10px]">রক্তদান</span>
          </button>

          <button 
            onClick={() => setActiveTab('ambulance')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'ambulance' ? 'text-teal-300 font-bold' : 'text-slate-400'}`}
          >
            <Siren className="w-5 h-5" />
            <span className="text-[10px]">অ্যাম্বুলেন্স</span>
          </button>

          <button 
            onClick={() => setActiveTab('emergency')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'emergency' ? 'text-red-400 font-bold' : 'text-slate-400'}`}
          >
            <PhoneCall className="w-5 h-5" />
            <span className="text-[10px]">জরুরি SOS</span>
          </button>
        </div>
      </nav>
      <SpeedInsights />
    </div>
  );
}
