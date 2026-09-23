import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Search, ShieldAlert, HeartPulse, Bus, Briefcase, 
  Phone, MapPin, CheckCircle, Home, PhoneCall, AlertTriangle,
  Sun, Award, Sprout, Store, ArrowUpRight, Share2, 
  Droplet, Siren, UserCheck, Check, Zap, Building2,
  Train, Compass, PlusCircle, Send, X, CloudSun, MessageCircle,
  Bell, ChevronRight, ShoppingBag, Eye, EyeOff, Trash2, LogIn, LogOut, KeyRound, Image as ImageIcon, ShieldCheck, User, UserCog, Cloud, Thermometer
} from 'lucide-react';

const SARMAN_PHOTO_DATA = [
  "data:image/webp;base64,UklGRuQLAABXRUJQVlA4INgLAABwMwCdASqMAIwAPlEijkSjoiGVuNYkOAUEsYBpyjbo8lF3X/Vb6weyFxt+vNn5rGnHb0hkL3iXy2eI36Pwj8pfwmVScP/L/yl+w88PCf5NZRvut46UaDKbWYjT/Kj9Zewf+Z58J14qK/75Jp2uzWI0DBEpzTmzAZdRE74ctDm3md03CoP68legv3FHB20c66qeIezb51yMry/y1NKaCb9jB2WdK9GJPywyQ00O5Wk7DXx+X/l2u0LlxRiI9j5Mj2+N4dd24hmLRSSC50iMr2Qu1nv1p598m4rE0ujJFWsAU32tgofDksbu1Ez8YCa88uvf0O03wsgIAGysXgohYWiwcM0r+pBnUUsuBjSCva5IL4YH3Wd752eXZ6WuqAZdyXjn+XjC6NUOYo4zXLVRoLr3IQ549lx5kDO8PKmDWdK4/Y7xqMG/MfrQ8z77ItlrP9pxsPT6hXD3tXbJGPAQY2fnjzAw2PVpuiHmWrP/B+1Pf9o731UU+4GPfyQerQRTeE6KtRrI1nwgv46idHcetajx4v+iiWsjfn4GJwvBn7Jx5sSfOcAA/v2xAttOBULs1rDC5xibTqtSndGB02MsLw5oF6oNgT1DNbKhLO4qZZ0t30HwO3/mtg6sWacMd5OhR9smFVr6ZnBnf7c/yWBUl/8dnO5dxu5V1esT4S2O8piI/9oL+mmqbndOm2gY0dJUn0PTsPKMYAJXZsYtxBFyg23UVf/ViBQHSV7IgiwwrM07y1aBGf2KSwNw8YdZBbb7Yjsl4OWBE7lmOegZUOkMEDsGY9D+g6YR5siZFUSxNJzv5E6eoCS3OZis78PR8aIPtU3wwW6qgpPB1e+tdI81CCXKwrPgiXZe0IABaKFApZyt0TGrLZeJLz2FL1ghgaJvcFUdX6K4qxuhBsvmriOCZET+re2kQlIsLyiC4yodKGGHE0axt/TQVVqivTyxCQLHyTdtbL9Q3D2p5720U4r/NMO7vyTorayEbplcCaUN5KZETvBqiYV52ZxVIKMUqz/syrE/zCrDEzNxNCfNdygnmggGpOkRr7zihHceJsXPT9kzanvHJ8mYkmVHNPp0hfL5MTS3IYpPsfACzIachkin56Q0NY0H7x1UncRsgs29A//WvJKQ1eI7Aq8EHX+xCwsC8/jp0MwroMV+X/FNbv+JWA6Q2cTtNuyW5XTn23FhXFlXaF7fNZ2yuKzldDsAaKk7hmBv6tUg9iXnEZF3rozm1SCGjMXzemUIWxPixZoN5gpTJIrGpnAhmWhwKO0pknmhCvYgQVJs0nTKQwm4mBK5GWYCnRit/cesalfD17OY1tm/a6y9s2kK1AjMPhIaeMWMmXfWV4xcaxBUIx1M13STyZMSdd5VVt9qbx3Jueryaj7lWmzx3VNl9+2L+L1SgbOKjgotwyqwwNq/XEBcNr4nhmFmo8mgm4jASy5wN7LnuGFW2i3+NUAnaqvtrkTsfrmAzDyArpeEc9NBxk8gpHS6RuCakJy79CzXoAHJ3n0whzDEPlWzpnEUvOHZn0ldhFJ/i8kQRlVwcrDIZ6VWhii71qkc+z+Y4TIC1J0KSJJiPSKvE/SMkdEqPnB9A3yK/7FLXWlkxZn5XHFVYpDUUHQm7Z8oGy4c1r0i6da2MLjJicvyoEqlSnxrmOspWlrEljvVEz5c9flUWu8SKh4uhXBBezswf+mlFx3LSaYw3KPd2E88pyUB0CUNqEziYI63Ius2O8r6dVtU46/HuLC6EwPDTpn7ko30SZCm7G23FgY6RL+qmDw5T0yEkFF2O+SoSrAZapa2V7xetSfVrOrrOiIwSvi74za3X9P8InehrsSBdcUQa7NdlyiVWVPkX/8L82E92BZzgosIW17qwYURCbt36i7MX/nMZ02sUh0auRh3c+8zZmYA0MAVhGaIbYB3cOLCJaIbLCIFEAPxOXJSHj+THr9LORQLUnJh18PpVRDz8X7JBTgtJ+BT28HWZnd5oaPUhebd9dtHelkN8SzB5/0J82sf1T/MjLcGjky/kr/kmayNj7rU7k1gvcKbH84U0BYIQamYvHEOMDutT5Eysh0HFkHL/u/tsE++JdlLP3YNCFU76PEPdJ6sI2CD08we61CrVQNft3em4DZYxsxfAFKS2Bzid5xOC7hEBhQe0074V1u8HUygP3nCrPgLiuqyNKZCYJaV+FpctRq+urN6Fv044Glx2t8YKoA3Htn7xYK3g3S+tR88SmsxmZRuZQcsY+rsWkMPnp2vo1F61hy01WOLSbPCXbOU/m4zvx0ILh/ebq+Kw9GG7IHoDqpvw13edMYWlyoMUX267FQQI3+WFAymayKdfn0dxVCq841BZT6gKLrbboHbrOlN5UvruuX/J5lFo6pvht9JmtFF3tv80Z/a2ffShnmdrYMNkWF6lwczf8i4Sw8wBLM/8SBj8gW7ABZ2JkHH84wU3Cf0sdOS2P85RyfhL+Cjei0IcB10E7RV8jCDJtk368H504ArxgTu7QXdg6r6PTfASU7T20Ztv1fRsO6dRPWAyZNzTNLwm4bpaaOcWlhSpBmB6QKYL+c6GuByna+VRtKFqQcsUDnymgbs6Xc63puqFzAahOf76mVY+zw7xjDV5k5ySHLq591n2fPm2yw0r27bxGHfnkFQrkT/ZhlWR8xSx3vc2VLspHPEvKg/Eh/QGSfhFQihO9qSQJeHJTmraQTK8QXxk/LegI1wYGu1puPXxBlmktM3DtzQggDWpSusu6VFZ/N+GZ+mLAZsQWbBf7/xnRwG+bCyUhhJX9URaLPtivyMJCtlOUB5Z3sd0Sqe8S0LAJpKBD897WgfIy723yvHN+lwh5bJN85sCiLF254iYdPfroD0fporEkWwwCuL9k2sazJ1bly/8uc+dWVZui3YzclundcTVWMBmDHFIZT6+CJCJkCS7Yt29q56Zjsi8WrC7d58NPut6e3A+GG8tdib5pn0M/J7GHgjYU31OHDbcsN1sjFmSA3KgJMHKnZ9uQoKYnbDAQBOVfoMnuMlhJK3xw3p80eQH6wSGchQnW/v2+HAjaqf+ni4BorbZ24pYbD3Z3GD2tfRyaYtbvdbTmrT7hGZ6pqzC3K8qBDnisrtCxubwmLvjG3Ybqsxl9+I/Z3g8mQHkfYWrLcxRRAQTdDROwVpvaloui4aX0H3NDV+iIWR+lCN09MoT/VcfzSaSTXe8/2IvWDzxSE2igpRat6PnpgmlVQkxmjQDhhHAUe+K7f/UZanFopH4DgTQDBjM8B7UkRsLB2clc9nSiDKmYe1y6vfJCBmeSaqZMhNIS7cwUq1stzHoyZyOKwXpUEb/CxEtVr1y3V/o6ARhp8AdCipzQngRPqxYFZwKpD6HAQv4aickzIlb7ZOFrY6SbLH7q5gsDnQum4tsk7lN9arFVe5maCakjoMYgHzC6Z47YpFPxF1NlCtijVfe+TGFCtv9hXdsG001r/KGAvJTEDfu0MnARiQxNECJjPBecBuFWtkxhGyarj9KzS8Yha0nf2pyt5NvlmnLPD9PKhmwzAosVrhKE6cKsE/FQK1ehUTfX/yvLtM65LifmHjL2n5c5TPaKTOsbQcEaU++SnmnPgNvziofKScH5PER7sA/2L7DpSz1Ben0kUiuqkHGHg7sjy0hiTkYJlf7jr3GPWTQyd127lcy/6goo4CU8vsYFGo/jVGZ33rBKwxSLScKYQMVkCJDJW0Pzj9JVJgxIO2zNz+pvZUjqKRxT3/jaYZGIvrwb1105EuUMIKWsZQhmmxOy6kdqpgtYCRV5UDEJRiRohGBPvT4kUtloGWI/h1Qx7B+FSa6SKHNNOvS5qnroEXHanyvbALzpArvZ5P+4E+M8RhYiWKEzGobSiS4yhHzyj8C5yK8zf31wr8k7WTSZUiDVmyCWyT+msarp6WUlXZZWsuxLRakX97NRqnoggJT9iGB8eomzYdG9M+3Bp1DIQoswooYuRFE78WxbxVrfOSz59x0hxUX+9fW7ij/O7shcDm3JRhaPFGoNIJhQM+/n16VCEHA7tkxjN0V/aJaFsrVAbajnYFrQf4kIAAA=="
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

const DEFAULT_SERVICES = [
  {
    id: 's1',
    title_bn: 'ঠাকুরগাঁও ২৫০ শয্যা জেনারেল হাসপাতাল',
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

const DEFAULT_TOURIST_SPOTS = [
  { 
    name: 'ঐতিহাসিক হরিপুর রাজবাড়ি (ঘনশ্যাম রাজবাড়ি)', 
    place: 'হরিপুর উপজেলা সদর, ঠাকুরগাঁও', 
    desc: 'জমিদার ঘনশ্যাম রায়ের আমলে প্রতিষ্ঠিত এবং পরবর্তীতে ঊনবিংশ শতাব্দীর শেষভাগে তাঁর বংশধরদের দ্বারা নির্মিত দ্বিতল সুরম্য রাজপ্রাসাদ।' 
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

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [services, setServices] = useState([]);
  const [touristSpots, setTouristSpots] = useState(DEFAULT_TOURIST_SPOTS);
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({ title: '', phone: '', address: '', upazila: 'হরিপুর', category: 'জরুরি সেবা' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Weather State (Live API)
  const [weatherData, setWeatherData] = useState({ temp: '২৮', condition: 'অনুকূল, আলু ও ভুট্টার সেচ উপযোগী' });

  // Authentication & Admin State
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  // Password Recovery / Reset State
  const [isPasswordResetMode, setIsPasswordResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetRequestMode, setIsResetRequestMode] = useState(false);

  // User Profile State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({ full_name: '', phone: '', address: '', avatar_url: '' });
  const [profileAvatarFile, setProfileAvatarFile] = useState(null);

  // Market & Rent Listings State
  const [listings, setListings] = useState([]);
  const [marketFilter, setMarketFilter] = useState('All'); 
  const [showListingModal, setShowListingModal] = useState(false);
  const [newListing, setNewListing] = useState({
    title: '',
    listing_type: 'বিক্রয়',
    price: '',
    phone: '',
    upazila: 'হরিপুর',
    address: '',
    description: '',
    trx_id: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const upazilaList = ['ঠাকুরগাঁও সদর', 'হরিপুর', 'রানীশংকৈল', 'পীরগঞ্জ', 'বালিয়াডাঙ্গী'];

  const categoryList = [
    { id: 1, name: 'জরুরি সেবা', icon: ShieldAlert },
    { id: 2, name: 'চিকিৎসা', icon: HeartPulse },
    { id: 3, name: 'বিদ্যুৎ অফিস', icon: Zap },
    { id: 4, name: 'প্রশাসন', icon: Building2 }
  ];

  useEffect(() => {
    fetchServices();
    fetchListings();
    fetchTouristSpots();
    fetchLiveWeather();

    // Check URL parameters for Password Reset recovery code immediately
    const hash = window.location.hash;
    const search = window.location.search;
    if (hash.includes('type=recovery') || search.includes('type=recovery') || search.includes('code=')) {
      setIsPasswordResetMode(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUserProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordResetMode(true);
      } else {
        setUser(session?.user ?? null);
        if (session?.user) fetchUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [selectedUpazila, selectedCategory]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      alert('ত্রুটি: ' + error.message);
    } else {
      alert('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
      setIsPasswordResetMode(false);
      await supabase.auth.signOut();
      window.location.href = window.location.origin;
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!authEmail) {
      setAuthMessage('অনুগ্রহ করে প্রথমে আপনার ইমেইল লিখুন।');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(authEmail, {
      redirectTo: window.location.origin,
    });
    if (error) {
      setAuthMessage(error.message);
    } else {
      setAuthMessage('পাসওয়ার্ড রিকভারি লিংক আপনার ইমেলে পাঠানো হয়েছে!');
    }
  };

  // Live Weather Fetcher for Thakurgaon
  const fetchLiveWeather = async () => {
    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=26.0336&longitude=88.4616&current=temperature_2m,weather_code');
      const data = await response.json();
      if (data && data.current) {
        const tempVal = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;
        let condText = 'আবহাওয়া অনুকূল';
        if (code >= 1 && code <= 3) condText = 'আংশিক মেঘলা';
        else if (code >= 51 && code <= 67) condText = 'বৃষ্টিপাত হতে পারে';
        else if (code >= 71) condText = 'ঠান্ডা ও কুয়াশাচ্ছন্ন';

        setWeatherData({
          temp: tempVal.toString(),
          condition: `${condText}, কৃষি কাজের জন্য উপযোগী`
        });
      }
    } catch (err) {
      console.error("Live weather fetch error:", err);
    }
  };

  const fetchTouristSpots = async () => {
    try {
      const { data, error } = await supabase
        .from('tourism')
        .select('*')
        .order('id', { ascending: false });

      if (data && data.length > 0) {
        setTouristSpots(data.map(item => ({
          name: item.name,
          place: item.place,
          desc: item.description
        })));
      }
    } catch (err) {
      console.error("Tourism fetch error:", err);
    }
  };

  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) {
      setProfileData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        address: data.address || '',
        avatar_url: data.avatar_url || ''
      });

      if (data.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  };

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

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data) {
        setListings(data);
      }
    } catch (err) {
      console.error("Listings fetch error:", err);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthMessage('');

    if (authMode === 'signup') {
      if (authPassword !== authConfirmPassword) {
        setAuthMessage('পাসওয়ার্ড দুটি মিলছে না!');
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: authEmail,
        password: authPassword,
      });
      if (error) {
        setAuthMessage(error.message);
      } else {
        setAuthMessage('রেজিস্ট্রেশন সফল হয়েছে! ইমেল চেক করে কনফার্ম করুন।');
        setAuthMode('login');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: authPassword,
      });
      if (error) {
        setAuthMessage(error.message);
      } else {
        setShowAuthModal(false);
        setAuthEmail('');
        setAuthPassword('');
        setAuthConfirmPassword('');
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    setUploading(true);
    try {
      let avatarUrl = profileData.avatar_url;

      if (profileAvatarFile) {
        const fileExt = profileAvatarFile.name.split('.').pop();
        const fileName = `avatar_${user.id}_${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('listings-images')
          .upload(fileName, profileAvatarFile);

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('listings-images')
            .getPublicUrl(fileName);
          avatarUrl = publicUrlData.publicUrl;
        }
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          phone: profileData.phone,
          address: profileData.address,
          avatar_url: avatarUrl
        })
        .eq('id', user.id);

      if (!error) {
        setProfileData(prev => ({ ...prev, avatar_url: avatarUrl }));
        setShowProfileModal(false);
        alert('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
      } else {
        alert('ত্রুটি: ' + error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleListingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setUploading(true);
    try {
      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('listings-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          alert('ফাইল আপলোডে সমস্যা হয়েছে: ' + uploadError.message);
          setUploading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('listings-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase.from('listings').insert([
        {
          ...newListing,
          image_url: imageUrl,
          user_id: user.id,
          user_email: user.email,
          is_hidden: false,
          is_approved: isAdmin ? true : false
        }
      ]);

      if (!error) {
        setShowListingModal(false);
        setNewListing({
          title: '',
          listing_type: 'বিক্রয়',
          price: '',
          phone: '',
          upazila: 'হরিপুর',
          address: '',
          description: '',
          trx_id: ''
        });
        setImageFile(null);
        fetchListings();
        alert(isAdmin ? "বিজ্ঞাপন সফলভাবে পোস্ট ও লাইভ হয়েছে!" : "বিজ্ঞাপন সফলভাবে জমা হয়েছে! অ্যাডমিন যাচাই করার পর তা সাইটে শো করবে।");
      } else {
        alert("ত্রুটি: " + error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const toggleHideListing = async (id, currentStatus) => {
    const { error } = await supabase
      .from('listings')
      .update({ is_hidden: !currentStatus })
      .eq('id', id);

    if (!error) fetchListings();
  };

  const approveListing = async (id) => {
    const { error } = await supabase
      .from('listings')
      .update({ is_approved: true })
      .eq('id', id);

    if (!error) {
      fetchListings();
      alert("বিজ্ঞাপনটি সফলভাবে এপ্রুভ করা হয়েছে!");
    }
  };

  const deleteListing = async (id) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই বিজ্ঞাপনটি ডিলিট করতে চান?")) {
      const { error } = await supabase.from('listings').delete().eq('id', id);
      if (!error) fetchListings();
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

  const filteredListings = listings.filter(item => {
    const isOwner = user && user.id === item.user_id;

    if (marketFilter === 'MyPosts') {
      if (!user) return false;
      return isOwner;
    }

    if (!isAdmin && activeTab !== 'admin') {
      if (!item.is_approved) return false;
      if (item.is_hidden && !isOwner) return false;
    }

    if (marketFilter === 'All') return true;
    return item.listing_type === marketFilter;
  });

  const trains = [
    { name: 'দ্রুতযান এক্সপ্রেস (৭৫৭/৭৫৮)', route: 'ঢাকা ⇄ ঠাকুরগাঁও রোড ⇄ পঞ্চগড়', time: 'ঢাকা ছাড়ে: রাত ৮:০০ | ঠাকুরগাঁও পৌঁছায়: ভোর ৫:৫০', offDay: 'ঢাকা থেকে: নেই / পঞ্চগড় থেকে: বুধবার' },
    { name: 'একতা এক্সপ্রেস (৭০৫/৭০৬)', route: 'ঢাকা ⇄ ঠাকুরগাঁও রোড ⇄ পঞ্চগড়', time: 'ঢাকা ছাড়ে: সকাল ১০:১০ | ঠাকুরগাঁও পৌঁছায়: রাত ৮:১০', offDay: 'মঙ্গলবার' },
    { name: 'পঞ্চগড় এক্সপ্রেস (৭৯৩/৭৯৪)', route: 'ঢাকা ⇄ ঠাকুরগাঁও রোড (সেমি নন-স্টপ)', time: 'ঢাকা ছাড়ে: রাত ১১:৩০ | ঠাকুরগাঁও পৌঁছায়: সকাল ৮:৩০', offDay: 'সাপ্তাহিক ছুটি নেই (প্রতিদিন)' }
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
      
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-slate-900/75 to-emerald-950/90 backdrop-blur-[1.5px]"></div>
      </div>

      <div className="relative z-20 bg-amber-400 text-slate-950 px-3 py-1.5 text-[11px] font-black flex items-center gap-2 shadow-md">
        <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Bell className="w-3 h-3 animate-bounce" /> নোটিশ
        </span>
        <marquee className="font-bold">
          স্মার্ট ঠাকুরগাঁওয়ে স্বাগতম! বিজ্ঞাপন পোস্টিং ফি (২০ টাকা) বিকাশ/নগদ নম্বর (01744857273)-এ পেমেন্ট সাপেক্ষে অ্যাডমিন অনুমোদন সাপেক্ষে লাইভ হবে।
        </marquee>
      </div>

      <header className="relative z-10 text-white pt-6 pb-14 px-4 shadow-2xl overflow-hidden border-b border-white/10">
        <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto relative z-10">
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 text-[11px] font-extrabold tracking-wide mb-1 border border-emerald-400/40">
                <Sun className="w-3.5 h-3.5 text-amber-300" /> টাঙ্গনের তীরে • কৃষি ও ঐতিহ্যের জনপদ
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow text-white">স্মার্ট ঠাকুরগাঁও</h1>
              <p className="text-xs text-emerald-200 font-semibold mt-0.5">নাগরিক সেবা ও লোকাল মার্কেটপ্লেস</p>
            </div>
            
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-2xl border border-white/20">
                  {profileData.avatar_url ? (
                    <img src={profileData.avatar_url} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-emerald-300" />
                  ) : (
                    <User className="w-4 h-4 text-emerald-300" />
                  )}
                  <span className="text-[11px] text-emerald-300 font-bold truncate max-w-[80px] sm:max-w-[100px]">
                    {profileData.full_name || user.email.split('@')[0]}
                  </span>
                  <button onClick={() => setShowProfileModal(true)} title="প্রোফাইল এডিট" className="text-amber-300 hover:text-amber-200 p-1">
                    <UserCog className="w-4 h-4" />
                  </button>
                  <button onClick={handleLogout} title="লগআউট" className="text-red-400 hover:text-red-300 p-1">
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setAuthMode('login'); setAuthMessage(''); setShowAuthModal(true); }}
                  className="h-10 px-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-lg"
                >
                  <LogIn className="w-4 h-4 text-emerald-300" /> লগইন
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`h-10 px-3 rounded-2xl text-xs font-black flex items-center gap-1 transition shadow-lg border ${
                    activeTab === 'admin' ? 'bg-red-600 text-white border-red-400' : 'bg-slate-800 text-red-300 border-red-500/50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" /> অ্যাডমিন প্যানেল
                </button>
              )}

              <button
                onClick={() => setShowAddModal(true)}
                className="h-10 px-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xl border border-amber-300"
              >
                <PlusCircle className="w-4 h-4" /> সেবা যুক্ত করুন
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 flex items-center justify-center transition active:scale-95 shadow-lg"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-300" /> : <Share2 className="w-5 h-5 text-emerald-100" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mb-4">
            <button 
              onClick={() => setActiveTab('market')}
              className={`p-2.5 rounded-2xl border flex items-center justify-between text-left transition active:scale-95 shadow-md ${activeTab === 'market' ? 'bg-amber-500 text-slate-950 border-amber-300 font-extrabold ring-2 ring-amber-300' : 'bg-slate-800/90 text-white border-slate-700/80 hover:bg-slate-700/90'}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'market' ? 'bg-slate-950 text-amber-400' : 'bg-amber-400/20 text-amber-300'}`}>
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">বাজার ও ভাড়া</h4>
                  <p className={`text-[10px] ${activeTab === 'market' ? 'text-slate-800' : 'text-slate-400'}`}>কেনাবেচা / টু-লেট</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

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
                  <p className={`text-[10px] ${activeTab === 'transport' ? 'text-slate-800' : 'text-slate-400'}`}>সময়সূচী ও কাউন্টার</p>
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

      <main className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto px-4 -mt-6 relative z-20">
        
        {activeTab === 'admin' && (
          <section className="space-y-4">
            <div className="bg-red-900 text-white rounded-2xl p-4 shadow-xl border-2 border-red-400 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-amber-300" /> অ্যাডমিন এপ্রুভাল প্যানেল
                </h3>
                <p className="text-xs text-red-200 mt-0.5">যে সমস্ত বিজ্ঞাপন পেমেন্ট সহ পোস্ট হয়েছে কিন্তু এখনো এপ্রুভ হয়নি, তা এখানে যাচাই করে অনুমোদন দিন।</p>
              </div>
              <button onClick={() => setActiveTab('market')} className="bg-white text-slate-950 text-xs font-bold px-3 py-1.5 rounded-xl">
                বাজার দেখুন
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {listings.filter(l => !l.is_approved).length === 0 ? (
                <div className="col-span-full bg-white p-8 rounded-2xl text-center shadow-xl text-slate-700 text-xs font-bold">
                  ✅ এই মুহূর্তে কোনো পেন্ডিং বিজ্ঞাপন নেই।
                </div>
              ) : (
                listings.filter(l => !l.is_approved).map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-xl border-2 border-amber-400 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-extrabold text-slate-900 text-base">{item.title}</h4>
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full">
                          পেন্ডিং এপ্রুভাল
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-700 mb-1">মূল্য: {item.price} | ধরণ: {item.listing_type}</p>
                      <p className="text-xs text-slate-600 mb-2">ইউজার ইমেইল: {item.user_email || 'N/A'}</p>
                      <p className="text-xs font-extrabold text-purple-700 bg-purple-50 p-2 rounded-xl mb-2 border border-purple-200">
                        💳 ট্রানজেকশন আইডি (TrxID): {item.trx_id || 'দেয়া হয়নি'}
                      </p>
                      <p className="text-xs text-slate-600 mb-3">ফোন: {item.phone} | ঠিকানা: {item.address} ({item.upazila})</p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => approveListing(item.id)}
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 shadow"
                      >
                        <Check className="w-4 h-4" /> এপ্রুভ করুন (Live দিন)
                      </button>
                      <button
                        onClick={() => deleteListing(item.id)}
                        className="bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold px-3 py-2 rounded-xl"
                      >
                        বাতিল/ডিলিট
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === 'market' && (
          <section className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-amber-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-600" /> স্থানীয় কেনাবেচা ও ভাড়া (Buy/Sell & Rent)
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">পোস্টিং ফি ২০ টাকা পেমেন্ট করে বিজ্ঞাপন দিন। অ্যাডমিন যাচাই করে লাইভ করবে।</p>
              </div>
              <button
                onClick={() => {
                  if (!user) { setAuthMode('login'); setAuthMessage(''); setShowAuthModal(true); }
                  else setShowListingModal(true);
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition active:scale-95 shrink-0"
              >
                <PlusCircle className="w-4 h-4" /> নতুন বিজ্ঞাপন দিন
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {['All', 'বিক্রয়', 'ভাড়া', 'MyPosts'].map((type) => (
                <button
                  key={type}
                  onClick={() => setMarketFilter(type)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                    marketFilter === type ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300' : 'bg-white/90 text-slate-700 hover:bg-white'
                  }`}
                >
                  {type === 'All' ? 'সব বিজ্ঞাপন' : type === 'বিক্রয়' ? '🏷️ বিক্রয়' : type === 'ভাড়া' ? '🏠 ভাড়া (To-Let)' : '👤 আমার পোস্টসমূহ'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredListings.length === 0 ? (
                <div className="col-span-full bg-white p-8 rounded-2xl text-center shadow-xl border border-slate-200 text-slate-600 text-xs font-bold">
                  {marketFilter === 'MyPosts' ? 'আপনি এখনো কোনো বিজ্ঞাপন পোস্ট করেননি।' : 'কোনো অনুমোদিত বিজ্ঞাপন পাওয়া যায়নি।'}
                </div>
              ) : (
                filteredListings.map((item) => {
                  const isOwner = user && user.id === item.user_id;
                  const isVideo = item.image_url && (item.image_url.endsWith('.mp4') || item.image_url.includes('video') || item.image_url.includes('.webm') || item.image_url.includes('.mov'));
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`bg-white p-4 rounded-2xl shadow-xl border flex flex-col justify-between transition ${
                        item.is_hidden ? 'opacity-60 border-dashed border-red-300 bg-red-50/20' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        {item.image_url && (
                          <div className="w-full h-44 rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200">
                            {isVideo ? (
                              <video controls className="w-full h-full object-cover">
                                <source src={item.image_url} />
                              </video>
                            ) : (
                              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                        )}

                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            {!item.is_approved && (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                                পেন্ডিং
                              </span>
                            )}
                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shrink-0 ${
                              item.listing_type === 'ভাড়া' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {item.listing_type}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-black text-amber-700 mb-2">
                          <span>মূল্য/ভাড়া: {item.price}</span>
                        </div>

                        <p className="text-xs text-slate-600 font-semibold flex items-center gap-1 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          {item.address} ({item.upazila})
                        </p>

                        {item.description && (
                          <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3 font-medium">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <a
                          href={`tel:${item.phone}`}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition"
                        >
                          <Phone className="w-3.5 h-3.5" /> কল দিন ({item.phone})
                        </a>

                        {isOwner && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleHideListing(item.id, item.is_hidden)}
                              className={`p-2 rounded-xl border text-xs font-bold flex items-center transition ${
                                item.is_hidden ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              {item.is_hidden ? <EyeOff className="w-4 h-4 text-red-600" /> : <Eye className="w-4 h-4 text-slate-600" />}
                            </button>
                            <button
                              onClick={() => deleteListing(item.id)}
                              className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        )}

        {activeTab === 'home' && (
          <>
            <div className="mb-4 bg-gradient-to-r from-sky-600 to-teal-700 rounded-2xl p-3.5 text-white shadow-xl flex items-center justify-between border-2 border-sky-300">
              <div className="flex items-center gap-3">
                <CloudSun className="w-8 h-8 text-amber-300 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xs">ঠাকুরগাঁও লাইভ আবহাওয়া ও কৃষি বার্তা</h4>
                  <p className="text-[11px] text-sky-100 font-semibold">
                    তাপমাত্রা: {weatherData.temp}°সে • {weatherData.condition}
                  </p>
                </div>
              </div>
            </div>

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

            <section className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200 mb-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">জনপ্রিয় ক্যাটাগরি</h2>
                {selectedCategory && (
                  <button onClick={() => setSelectedCategory(null)} className="text-xs text-emerald-800 font-bold hover:underline">
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
                        isSelected ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold shadow-sm' : 'border-transparent hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-1.5 transition ${
                        isSelected ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold truncate w-full">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

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
                    <div key={service.id} className="bg-white p-4 rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition flex flex-col justify-between">
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
                          <Phone className="w-3.5 h-3.5" /> কল করুন ({service.primary_phone})
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

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
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full shrink-0">ঐতিহাসিক স্থান</span>
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
                        <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">ছুটি: {train.offDay}</span>
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
                    <a href={`tel:${bus.phone}`} className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm shrink-0">
                      <Phone className="w-3.5 h-3.5" /> কল
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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
              <a href="tel:16123" className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-md">
                <Phone className="w-3.5 h-3.5" /> ১৬১২৩
              </a>
            </div>
          </section>
        )}

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
                    selectedBloodGroup === grp ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {grp === 'All' ? 'সকল গ্রুপ' : grp}
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
                    <a href={`https://wa.me/88${donor.phone}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold p-2 rounded-xl flex items-center transition shadow-md">
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a href={`tel:${donor.phone}`} className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition shadow-md">
                      <Phone className="w-3.5 h-3.5" /> কল
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
                  <a href={`tel:${item.phone}`} className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition shadow-md shrink-0">
                    <PhoneCall className="w-3.5 h-3.5" /> কল
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

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
                  <a href={`tel:${hotline.phone}`} className="bg-red-500 hover:bg-red-600 text-white text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition shrink-0">
                    <PhoneCall className="w-3.5 h-3.5" /> {hotline.phone}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

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
              <a href="https://www.facebook.com/ak.sarman.ak" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition font-medium">
                <Share2 className="w-3.5 h-3.5 text-blue-400" /> <span>ফেসবুক প্রোফাইল</span>
              </a>

              <a href="http://iccheghurirdana.blogspot.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-bold transition">
                <span>পোর্টফোলিও ভিজিট</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Auth Modal (Login / Sign Up / Forgot Password) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl relative border-2 border-amber-400">
            <button onClick={() => { setShowAuthModal(false); setAuthMessage(''); setIsResetRequestMode(false); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="w-6 h-6 text-amber-600" />
              <h3 className="font-extrabold text-slate-900 text-base">
                {isResetRequestMode ? 'পাসওয়ার্ড রিকভারি' : authMode === 'login' ? 'অ্যাকাউন্টে লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-semibold">
              {isResetRequestMode ? 'আপনার রেজিস্টার্ড ইমেলটি দিন। আমরা একটি রিসেট লিংক পাঠাব।' : 'বিজ্ঞাপন দিতে ও নিজের পোস্ট নিয়ন্ত্রণ করতে লগইন থাকা আবশ্যক।'}
            </p>

            {authMessage && (
              <div className="bg-amber-50 text-amber-900 border border-amber-200 p-2.5 rounded-xl text-xs font-bold mb-3 text-center">
                {authMessage}
              </div>
            )}

            {isResetRequestMode ? (
              <form onSubmit={handleForgotPassword} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা *</label>
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl shadow-md transition active:scale-95"
                >
                  রিসেট লিংক পাঠান
                </button>
                <div className="text-center mt-2">
                  <button type="button" onClick={() => { setIsResetRequestMode(false); setAuthMessage(''); }} className="text-emerald-700 font-bold underline">
                    লগইন পেজে ফিরে যান
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAuth} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা *</label>
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">পাসওয়ার্ড *</label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[11px] font-bold text-emerald-700"
                    >
                      {showPassword ? 'লুকান' : 'দেখুন'}
                    </button>
                  </div>
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">কনফার্ম পাসওয়ার্ড *</label>
                    <input
                      required
                      type="password"
                      placeholder="পুনরায় পাসওয়ার্ড দিন"
                      value={authConfirmPassword}
                      onChange={(e) => setAuthConfirmPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                )}

                {authMode === 'login' && (
                  <div className="text-right">
                    <button type="button" onClick={() => { setIsResetRequestMode(true); setAuthMessage(''); }} className="text-xs text-emerald-700 font-bold hover:underline">
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-2.5 rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 mt-2"
                >
                  {authMode === 'login' ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন'}
                </button>
              </form>
            )}

            {!isResetRequestMode && (
              <div className="mt-4 text-center text-xs text-slate-600">
                {authMode === 'login' ? (
                  <span>অ্যাকাউন্ট নেই? <button onClick={() => { setAuthMode('signup'); setAuthMessage(''); }} className="text-amber-600 font-bold hover:underline">নতুন অ্যাকাউন্ট খুলুন</button></span>
                ) : (
                  <span>আগে থেকেই অ্যাকাউন্ট আছে? <button onClick={() => { setAuthMode('login'); setAuthMessage(''); }} className="text-amber-600 font-bold hover:underline">লগইন করুন</button></span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Password Reset Modal when coming from email link */}
      {isPasswordResetMode && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative border-2 border-emerald-500">
            <h3 className="font-extrabold text-slate-900 text-base mb-2">নতুন পাসওয়ার্ড সেট করুন</h3>
            <p className="text-xs text-slate-500 mb-4">আপনার নতুন পাসওয়ার্ডটি এখানে দিন।</p>
            
            <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">নতুন পাসওয়ার্ড *</label>
                <input
                  required
                  type="password"
                  placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl shadow-md transition"
              >
                পাসওয়ার্ড পরিবর্তন করুন
              </button>
            </form>
          </div>
        </div>
      )}

      {/* User Profile Edit Modal with Mandatory Fields */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl relative border-2 border-emerald-500 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowProfileModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <UserCog className="w-6 h-6 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 text-base">ইউজার প্রোফাইল আপডেট</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-semibold">নাম, ঠিকানা ও ফোন নম্বর দেওয়া বাধ্যতামূলক (Mandatory)।</p>

            <form onSubmit={handleProfileUpdate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">পূর্ণ নাম *</label>
                <input
                  required
                  type="text"
                  placeholder="যেমন: Md. Sarman Rana"
                  value={profileData.full_name}
                  onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ভ্যালিড মোবাইল নম্বর *</label>
                <input
                  required
                  type="tel"
                  placeholder="017xxxxxxxx"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ঠিকানা *</label>
                <input
                  required
                  type="text"
                  placeholder="যেমন: হরিপুর সদর, ঠাকুরগাঁও"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">প্রোফাইল ছবি (Avatar)</label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2">
                  <ImageIcon className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileAvatarFile(e.target.files[0])}
                    className="w-full text-xs font-semibold text-slate-700 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 mt-2 disabled:opacity-50"
              >
                {uploading ? 'আপডেট হচ্ছে...' : <><Send className="w-4 h-4" /> প্রোফাইল সেভ করুন</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Market / Rent Listing Modal */}
      {showListingModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl relative border-2 border-emerald-500 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowListingModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 text-base">বিজ্ঞাপন পোস্টিং ফর্ম</h3>
            </div>
            
            <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl mb-3 text-[11px] text-amber-950">
              <p className="font-extrabold mb-1">📢 পোস্টিং ফি ও নিয়মাবলী:</p>
              <p>বিজ্ঞাপন প্রতি ফি <b>২০ টাকা</b>। বিকাশ/নগদ পার্সোনাল নম্বরে (<b>01744857273</b>) টাকা পাঠিয়ে নিচের ঘরে TrxID দিন।</p>
            </div>

            <form onSubmit={handleListingSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">বিজ্ঞাপনের শিরোনাম *</label>
                <input
                  required
                  type="text"
                  placeholder="যেমন: ৩ রুমের বাসা ভাড়া / বাইক বিক্রি"
                  value={newListing.title}
                  onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ধরণ *</label>
                  <select
                    value={newListing.listing_type}
                    onChange={(e) => setNewListing({...newListing, listing_type: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="বিক্রয়">বিক্রয় (Sell)</option>
                    <option value="ভাড়া">ভাড়া (Rent)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">মূল্য / ভাড়া *</label>
                  <input
                    required
                    type="text"
                    placeholder="৫,০০০ ৳"
                    value={newListing.price}
                    onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-purple-800 block mb-1">বিকাশ/নগদ ট্রানজেকশন আইডি (TrxID) *</label>
                <input
                  required
                  type="text"
                  placeholder="যেমন: 9N7X4K8L"
                  value={newListing.trx_id}
                  onChange={(e) => setNewListing({...newListing, trx_id: e.target.value})}
                  className="w-full bg-purple-50 border border-purple-300 rounded-xl px-3 py-2 font-bold text-purple-950 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ছবি বা ভিডিও আপলোড করুন (Media)</label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2">
                  <ImageIcon className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full text-xs font-semibold text-slate-700 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">মোবাইল নম্বর *</label>
                <input
                  required
                  type="tel"
                  placeholder="017xxxxxxxx"
                  value={newListing.phone}
                  onChange={(e) => setNewListing({...newListing, phone: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">উপজেলা *</label>
                  <select
                    value={newListing.upazila}
                    onChange={(e) => setNewListing({...newListing, upazila: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {upazilaList.map((u, i) => <option key={i} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">নির্দিষ্ট এলাকা *</label>
                  <input
                    required
                    type="text"
                    placeholder="চৌরঙ্গী বাজার"
                    value={newListing.address}
                    onChange={(e) => setNewListing({...newListing, address: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">বিস্তারিত বিবরণ</label>
                <textarea
                  rows="2"
                  placeholder="অন্যান্য শর্তাদি..."
                  value={newListing.description}
                  onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 mt-2 disabled:opacity-50"
              >
                {uploading ? 'প্রসেসিং হচ্ছে...' : <><Send className="w-4 h-4" /> বিজ্ঞাপন জমা দিন (Submit)</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl relative border-2 border-emerald-500">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <PlusCircle className="w-6 h-6 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900 text-base">নতুন সেবা যুক্ত করুন</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-semibold">আপনার প্রতিষ্ঠান বা সেবার তথ্য দিন।</p>

            {formSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl text-center text-xs font-bold border border-emerald-200">
                ✅ আপনার তথ্যটি সফলভাবে গৃহীত হয়েছে!
              </div>
            ) : (
              <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">সেবার নাম *</label>
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
                    placeholder="017xxxxxxxx"
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
                    placeholder="চৌরঙ্গী বাজার, হরিপুর"
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

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-white/10 py-2.5 px-4 z-40 shadow-2xl">
        <div className="max-w-md md:max-w-3xl lg:max-w-5xl mx-auto flex justify-around items-center">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'home' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
            <Home className="w-5 h-5" /> <span className="text-[10px]">হোম</span>
          </button>
          <button onClick={() => setActiveTab('market')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'market' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            <ShoppingBag className="w-5 h-5" /> <span className="text-[10px]">বাজার/ভাড়া</span>
          </button>
          <button onClick={() => setActiveTab('blood')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'blood' ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
            <Droplet className="w-5 h-5" /> <span className="text-[10px]">রক্তদান</span>
          </button>
          <button onClick={() => setActiveTab('ambulance')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'ambulance' ? 'text-teal-300 font-bold' : 'text-slate-400'}`}>
            <Siren className="w-5 h-5" /> <span className="text-[10px]">অ্যাম্বুলেন্স</span>
          </button>
          <button onClick={() => setActiveTab('emergency')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'emergency' ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
            <PhoneCall className="w-5 h-5" /> <span className="text-[10px]">জরুরি SOS</span>
          </button>
        </div>
      </nav>
    </div>
  );
}