export const GenderOptions = ["পুরুষ", "মহিলা", "অন্যান্য"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "জাতীয় পরিচয়পত্র",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
"জন্ম সনদ",
  "ড্রাইভিং লাইসেন্স",
  "জাতীয় পরিচয়পত্র",
  "পাসপোর্ট",
  "ছাত্র আইডি কার্ড",
  "ভোটার আইডি কার্ড",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "রহিম উদ্দিন",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "লেইলা আক্তার",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "দাউদ খান",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "ইভান আহমেদ",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "জান্নাত বেগম",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "আরিফ রহমান",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "জাসমিন আক্তার",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "আলেয়না চৌধুরী",
  },


];

export const StatusIcon = {
  নির্ধারন: "/assets/icons/check.svg",
  অপেক্ষারত: "/assets/icons/pending.svg",
  বিলুপ্ত: "/assets/icons/cancelled.svg",
};
