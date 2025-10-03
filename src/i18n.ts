import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'BloomTrack',
      nav: {
        home: 'Home',
        map: 'Map',
        divisions: 'Divisions',
        conditions: 'Conditions',
        report: 'Report',
        data: 'Data Status',
        settings: 'Settings'
      },
      hero: {
        title: 'Know when fields will bloom',
        subtitle: 'Simple map. Clear window. Less guesswork.',
        ctaMap: 'Open Map',
        ctaReport: 'Report Bloom'
      },
      badges: {
        update: 'Satellite update',
        window: 'Bloom window'
      },
      features: {
        district: 'Division view',
        districtDesc: 'See bloom windows by division',
        conditions: 'Conditions',
        conditionsDesc: 'Heat, rain, soil moisture',
        reports: 'Reports',
        reportsDesc: 'Share photos from fields'
      },
      report: {
        heading: 'Report a Bloom',
        photo: 'Photo',
        stage: 'Stage',
        crop: 'Crop Type',
        location: 'Location',
        description: 'Description',
        send: 'Submit',
        stages: {
          bud: 'Bud',
          early: 'Early bloom',
          full: 'Full bloom',
          post: 'Post bloom'
        }
      },
      map: {
        layers: 'Layers',
        ndvi: 'NDVI trend',
        bloom: 'Bloom window',
        rain: 'Rain / Soil moisture',
        legend: 'Legend',
        quick: 'Quick Locations',
        mode: { local: 'Local', global: 'Global' }
      },
      divisions: {
        heading: 'Division Bloom Predictions',
        filterByStage: 'Filter by stage:',
        allStages: 'All Stages',
        names: {
          dhaka: 'Dhaka',
          chattogram: 'Chattogram',
          rajshahi: 'Rajshahi',
          khulna: 'Khulna',
          sylhet: 'Sylhet',
          barishal: 'Barishal',
          mymensingh: 'Mymensingh',
          rangpur: 'Rangpur'
        },
        confidence: { high: 'High', medium: 'Medium', low: 'Low' },
        stages: {
          pre: 'Pre-bloom',
          early: 'Early bloom',
          peak: 'Peak bloom',
          post: 'Post-bloom'
        }
      },
      dataStatus: {
        sparklineLabel: 'First bloom date per year',
        anomalyEarly: 'Bloom {{days}} days early',
        sourcesShort: { modis: 'MODIS', gldas: 'GLDAS', gpm: 'GPM', viirs: 'VIIRS' }
      },
      calendar: {
        heading: 'Crop Bloom Calendar',
        rice: 'Rice',
        sunflower: 'Sunflower',
        mustard: 'Mustard',
        riceWindow: 'Aug–Sep',
        sunflowerWindow: 'Apr–May',
        mustardWindow: 'Jan–Feb'
      },
      reportGallery: {
        title: 'Recent Community Reports',
        photo: 'Photo',
        crop: 'Crop'
      },
      decision: {
        title: 'Decision support:',
        text: 'Bloom likely in {{min}}–{{max}} days based on current temperature and soil moisture.'
      },
      data: {
        sources: 'Sources',
        modis: 'MODIS NDVI/EVI, GLDAS, GPM'
      },
      settings: {
        heading: 'Preferences',
        reducedMotion: 'Reduce motion',
        language: 'Language'
      },
      conditions: {
        heading: 'Weather & Soil Conditions',
        temperature: 'Temperature',
        humidity: 'Humidity',
        rainfall: 'Rainfall',
        windSpeed: 'Wind Speed',
        soilMoisture: 'Soil Moisture',
        soilTemp: 'Soil Temperature',
        currentLevel: 'Current Level',
        dry: 'Dry',
        optimal: 'Optimal',
        saturated: 'Saturated',
        scale0: '0°C',
        scale20: '20°C',
        scale40: '40°C',
        forecastTitle: '4-Day Weather Forecast',
        condition: 'Condition',
        mm: 'mm',
        bloomImpact: 'Bloom Impact',
        positive: 'Positive',
        negative: 'Negative',
        neutral: 'Neutral',
        analysis: 'Bloom Impact Analysis',
        current: 'Current Conditions',
        recommendations: 'Recommendations',
        rec1: 'Current conditions are favorable for bloom development',
        rec2: 'Monitor soil moisture levels closely',
        rec3: 'Expect peak bloom soon',
        rec4: 'Consider irrigation if rainfall decreases',
        dataUpdated: 'Data updated: {{time}} • Sources: NASA GLDAS, GPM, MODIS',
        today: 'Today',
        tomorrow: 'Tomorrow'
      },
      footer: {
        credit: 'NASA Space Apps 2025'
      },
      loading: 'Loading BloomTrack...'
    }
  },
  bn: {
    translation: {
      appName: 'ব্লুমট্র্যাক',
      nav: {
        home: 'হোম',
        map: 'মানচিত্র',
        divisions: 'বিভাগ',
        conditions: 'অবস্থা',
        report: 'রিপোর্ট',
        data: 'ডেটা অবস্থা',
        settings: 'সেটিংস'
      },
      hero: {
        title: 'কখন ফুল ফোটবে জানা থাকুক',
        subtitle: 'সহজ মানচিত্র। স্পষ্ট সময়সীমা। কম অনুমান।',
        ctaMap: 'মানচিত্র খুলুন',
        ctaReport: 'ফুল ফোটার রিপোর্ট'
      },
      badges: {
        update: 'স্যাটেলাইট আপডেট',
        window: 'ব্লুম উইন্ডো'
      },
      features: {
        district: 'বিভাগ দৃশ্য',
        districtDesc: 'বিভাগ অনুযায়ী ব্লুম উইন্ডো দেখুন',
        conditions: 'অবস্থা',
        conditionsDesc: 'তাপমাত্রা, বৃষ্টি, মাটির আর্দ্রতা',
        reports: 'রিপোর্ট',
        reportsDesc: 'মাঠ থেকে ছবি শেয়ার করুন'
      },
      report: {
        heading: 'ফুল ফোটার রিপোর্ট করুন',
        photo: 'ছবি',
        stage: 'অবস্থা',
        crop: 'ফসলের ধরন',
        location: 'অবস্থান',
        description: 'বর্ণনা',
        send: 'জমা দিন',
        stages: {
          bud: 'কুঁড়ি',
          early: 'প্রারম্ভিক ফুল',
          full: 'পূর্ণ প্রস্ফুটন',
          post: 'প্রস্ফুটন-পরবর্তী'
        }
      },
      map: {
        layers: 'স্তর',
        ndvi: 'NDVI প্রবণতা',
        bloom: 'ব্লুম উইন্ডো',
        rain: 'বৃষ্টি / মাটির আর্দ্রতা',
        legend: 'লেজেন্ড',
        quick: 'দ্রুত অবস্থান',
        mode: { local: 'স্থানীয়', global: 'বিশ্বব্যাপী' }
      },
      divisions: {
        heading: 'বিভাগভিত্তিক ব্লুম পূর্বাভাস',
        filterByStage: 'পর্যায় অনুযায়ী ফিল্টার:',
        allStages: 'সব পর্যায়',
        names: {
          dhaka: 'ঢাকা',
          chattogram: 'চট্টগ্রাম',
          rajshahi: 'রাজশাহী',
          khulna: 'খুলনা',
          sylhet: 'সিলেট',
          barishal: 'বরিশাল',
          mymensingh: 'ময়মনসিংহ',
          rangpur: 'রংপুর'
        },
        confidence: { high: 'উচ্চ', medium: 'মধ্যম', low: 'নিম্ন' },
        stages: {
          pre: 'প্রস্ফুটন-পূর্ব',
          early: 'প্রারম্ভিক ফুল',
          peak: 'পূর্ণ প্রস্ফুটন',
          post: 'প্রস্ফুটন-পরবর্তী'
        }
      },
      dataStatus: {
        sparklineLabel: 'প্রতি বছরে প্রথম ব্লুম তারিখ',
        anomalyEarly: 'এই বছর {{days}} দিন আগেই ব্লুম',
        sourcesShort: { modis: 'MODIS', gldas: 'GLDAS', gpm: 'GPM', viirs: 'VIIRS' }
      },
      calendar: {
        heading: 'ফসলের ব্লুম ক্যালেন্ডার',
        rice: 'ধান',
        sunflower: 'সূর্যমুখী',
        mustard: 'সরিষা',
        riceWindow: 'আগস্ট–সেপ্টেম্বর',
        sunflowerWindow: 'এপ্রিল–মে',
        mustardWindow: 'জানুয়ারি–ফেব্রুয়ারি'
      },
      reportGallery: {
        title: 'সাম্প্রতিক কমিউনিটি রিপোর্ট',
        photo: 'ছবি',
        crop: 'ফসল'
      },
      decision: {
        title: 'সিদ্ধান্ত সহায়তা:',
        text: 'বর্তমান তাপমাত্রা ও মাটির আর্দ্রতার ভিত্তিতে {{min}}–{{max}} দিনের মধ্যে ব্লুম সম্ভাবনা।'
      },
      data: {
        sources: 'উৎস',
        modis: 'MODIS NDVI/EVI, GLDAS, GPM'
      },
      settings: {
        heading: 'পছন্দসমূহ',
        reducedMotion: 'চলাচল কমান',
        language: 'ভাষা'
      },
      conditions: {
        heading: 'আবহাওয়া ও মাটির অবস্থা',
        temperature: 'তাপমাত্রা',
        humidity: 'আর্দ্রতা',
        rainfall: 'বৃষ্টিপাত',
        windSpeed: 'বাতাসের গতি',
        soilMoisture: 'মাটির আর্দ্রতা',
        soilTemp: 'মাটির তাপমাত্রা',
        currentLevel: 'বর্তমান মাত্রা',
        dry: 'শুষ্ক',
        optimal: 'উপযুক্ত',
        saturated: 'সন্তৃপ্ত',
        scale0: '০°সে',
        scale20: '২০°সে',
        scale40: '৪০°সে',
        forecastTitle: '৪ দিনের আবহাওয়ার পূর্বাভাস',
        condition: 'আবহাওয়ার ধরন',
        mm: 'মিমি',
        bloomImpact: 'ব্লুমের প্রভাব',
        positive: 'ইতিবাচক',
        negative: 'নেতিবাচক',
        neutral: 'নিরপেক্ষ',
        analysis: 'ব্লুম প্রভাব বিশ্লেষণ',
        current: 'বর্তমান অবস্থা',
        recommendations: 'পরামর্শ',
        rec1: 'বর্তমান অবস্থা ব্লুমের জন্য অনুকূল',
        rec2: 'মাটির আর্দ্রতা নিবিড়ভাবে পর্যবেক্ষণ করুন',
        rec3: 'শিগগিরই শীর্ষ ব্লুম প্রত্যাশিত',
        rec4: 'বৃষ্টি কমলে সেচ দেওয়ার কথা ভাবুন',
        dataUpdated: 'ডেটা হালনাগাদ: {{time}} • উৎস: নাসা GLDAS, GPM, MODIS',
        today: 'আজ',
        tomorrow: 'আগামীকাল'
      },
      footer: {
        credit: 'নাসা স্পেস অ্যাপস ২০২৫'
      },
      loading: 'ব্লুমট্র্যাক লোড হচ্ছে…'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
