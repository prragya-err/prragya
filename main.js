const swiper = new Swiper('.swiper', {
  
  direction: 'horizontal',
  slidesPerView: 2,
  spaceBetween: 10,
  centeredSlides: true,
  
  
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },
  
  
  
});






let currentSlide = document.getElementById(`img${swiper.activeIndex+1}`);

if (currentSlide) {
  currentSlide.style.opacity = "1";
  currentSlide.style.scale = "1";
}

let prevSlide = currentSlide;

let featureName = document.getElementById(`featureName`);

let btnMain = document.getElementById('btnMain');
let featureinfotxt = document.getElementById('feature-info-txt');
swiper.on('slideChange', function() {
  
  prevSlide.style.opacity = "0.4";
  prevSlide.style.scale = "0.6";
  
  
  currentSlide = document.getElementById(`img${swiper.activeIndex+1}`);
  
  currentSlide.style.opacity = "1";
  currentSlide.style.scale = "1";
  
  prevSlide = currentSlide;
  
  
  featureName.style.opacity = "0";
  featureName.style.scale = "0.6";
  featureinfotxt.style.scale = "0.95";
  
  featureinfotxt.style.opacity = "0";
  setTimeout(() => {
    switch (swiper.activeIndex + 1) {
      case 1:
        featureName.innerText = "প্রশ্নব্যাংক";
        featureinfotxt.innerText = "হাজারো অধ্যায়ভিত্তিক প্রশ্ন, পূর্বের বছরের বোর্ড প্রশ্ন এবং অনুশীলনী—সব এক জায়গায়। নিয়মিত প্র্যাকটিস করে নিজের প্রস্তুতিকে পরবর্তী লেভেলে নিয়ে যান।";
        break;
        
      case 2:
        featureName.innerText = "ডিজিটাল বই";
        featureinfotxt.innerText = "যেকোনো সময়, যেকোনো জায়গায় সম্পূর্ণ ডিজিটাল বই পড়ার সুবিধা। বুকমার্ক, হাইলাইট ও ইনস্ট্যান্ট সার্চসহ একদম স্মার্ট স্টাডি এক্সপিরিয়েন্স।";
        break;
        
      case 3:
        featureName.innerText = "এআই";
        featureinfotxt.innerText = "জটিল কোনো বিষয় বুঝতে সমস্যা? আমাদের এআই আপনার প্রশ্নের সাথে মিলিয়ে তাৎক্ষণিক ব্যাখ্যা, উদাহরণ ও সমাধান দিয়ে শেখাকে বানিয়ে তোলে আরও সহজ।";
        break;
        
      case 4:
        featureName.innerText = "নোট";
        featureinfotxt.innerText = "নিজের মতো করে পড়ার নোট তৈরি করুন, সংরক্ষণ করুন এবং যেকোনো সময় এডিট করুন। গুরুত্বপূর্ণ বিষয়গুলোতেও যুক্ত করুন হাইলাইট—স্টাডি হবে আরও স্মার্ট ও সাজানো।";
        btnMain.onclick = () => {
  setTimeout(() => {
    window.location.href = 'note.html';
  }, 200); // 1000 ms = 1 second
};
        
        break;
        
      case 5:
        featureName.innerText = "সিমুলেশন";
        featureinfotxt.innerText = "জটিল ধারণাগুলোকে বাস্তব অভিজ্ঞতার মতো করে শেখাতে আমাদের ইন্টারঅ্যাকটিভ সিমুলেশন। চোখের সামনে ঘটতে থাকা অ্যানিমেশনই শেখাবে কঠিন বিষয়ও সহজভাবে।";
       btnMain.onclick = () => {
  setTimeout(() => {
    window.location.href = 'simulations.html';
  }, 200); // 1000 ms = 1 second
};


 break;
        
      case 6:
        featureName.innerText = "ডাউটস";
        featureinfotxt.innerText = "কিছু বুঝতে না পারলেই পোস্ট করুন আপনার ডাউট। শিক্ষক, সিনিয়র ও সহপাঠীদের কাছ থেকে দ্রুত সমাধান—শেখার প্রতিটি মুহূর্তেই থাকুক গাইডেন্স।";
        break;
        
      case 7:
        featureName.innerText = "চ্যাট";
        featureinfotxt.innerText = "বন্ধু, ব্যাচমেট ও স্টাডি গ্রুপের সাথে রিয়েল-টাইমে আলোচনা করুন। নোট, প্রশ্ন ও ধারণা শেয়ার করে পড়াশোনাকে করে তুলুন আরও মজার ও সহযোগিতামূলক।";
        break;
        
      case 8:
        featureName.innerText = "ইংরেজি সহায়িকা";
        featureinfotxt.innerText = "গ্রামার, ভোকাবুলারি থেকে শুরু করে স্পোকেন ইংলিশ—সবকিছুর জন্য স্মার্ট গাইড। দৈনিক এক্সারসাইজ ও কুইজে ইংরেজিতে উন্নতি হবে চোখে পড়ার মতো।";
        break;
        
      case 9:
        featureName.innerText = "শিখাও";
        featureinfotxt.innerText = "ভিডিও লেসন, কুইজ, এক্সারসাইজ ও টাস্ক–সব মিলিয়ে ধাপে ধাপে শেখার একটি সম্পূর্ণ সিস্টেম। নিজের দক্ষতা বাড়ান নিজের গতিতে, নিজের মতো করে।";
        break;
        
      case 10:
        featureName.innerText = "কমিউনিটি";
        featureinfotxt.innerText = "দেশের বিভিন্ন প্রান্তের শিক্ষার্থীদের সাথে যুক্ত হোন। অভিজ্ঞতা, রিসোর্স ও মোটিভেশন শেয়ার করে তৈরি করুন এক শক্তিশালী শেখার কমিউনিটি।";
        
        btnMain.onclick = () => {
          setTimeout(() => {
            window.location.href = 'community.html';
          }, 1000); // 1000 ms = 1 second
        };
        
        break;
        
      default:
        // do nothing
    }
    
    
    
    
    
    
    featureName.style.opacity = "0.7";
    featureName.style.scale = "1";
    
    featureinfotxt.style.opacity = "0.7";
    featureinfotxt.style.scale = "1";
    
  }, 100);
  
  
  
  
  
  
});