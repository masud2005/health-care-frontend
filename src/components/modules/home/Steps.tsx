import React from "react";
import {
  Search,
  ClipboardList,
  CalendarCheck,
  ShieldCheck,
  FileText,
  Video,
  CreditCard,
  HeartPulse,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Search Doctor",
    description: "Find your doctor easily with a minimum of effort.",
  },
  {
    icon: ClipboardList,
    title: "Check Doctor Profile",
    description: "Get to know your doctor better before booking.",
  },
  {
    icon: CalendarCheck,
    title: "Schedule Appointment",
    description: "Choose the date and time that works best for you.",
  },
  {
    icon: ShieldCheck,
    title: "Get Your Solution",
    description: "Receive expert medical guidance and treatment.",
  },
  {
    icon: FileText,
    title: "Electronic Prescription",
    description: "Get your prescription instantly and securely.",
  },
  {
    icon: Video,
    title: "Video Consultation",
    description: "Consult with your doctor from anywhere.",
  },
  {
    icon: CreditCard,
    title: "Easy Payment",
    description: "Pay conveniently using multiple payment methods.",
  },
  {
    icon: HeartPulse,
    title: "Health Recovery",
    description: "Start your journey toward better health and wellness.",
  },
];

const StepCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) => {
  const bgColors = [
    "bg-blue-50",
    "bg-pink-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-cyan-50",
    "bg-orange-50",
    "bg-emerald-50",
  ];

  const iconColors = [
    "text-blue-600",
    "text-pink-600",
    "text-green-600",
    "text-yellow-600",
    "text-purple-600",
    "text-cyan-600",
    "text-orange-600",
    "text-emerald-600",
  ];

  return (
    <Card
      className={`
        ${bgColors[index % 8]}
        border border-transparent
        rounded-3xl
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-2
        transition-all
        duration-300
        overflow-hidden
        group
      `}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div
            className={`
              w-14 h-14
              rounded-2xl
              bg-white
              shadow-md
              flex items-center justify-center
              ${iconColors[index % 8]}
              group-hover:scale-110
              transition-transform
              duration-300
            `}
          >
            <Icon size={26} />
          </div>

          <span className="text-4xl font-bold text-black/10">
            {(index + 1).toString().padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {title}
        </h3>

        <p className="text-sm leading-6 text-gray-600">
          {description}
        </p>

        <div
          className={`
            mt-6
            h-1
            w-0
            rounded-full
            transition-all
            duration-300
            group-hover:w-full
            ${
              index % 8 === 0
                ? "bg-blue-500"
                : index % 8 === 1
                ? "bg-pink-500"
                : index % 8 === 2
                ? "bg-green-500"
                : index % 8 === 3
                ? "bg-yellow-500"
                : index % 8 === 4
                ? "bg-purple-500"
                : index % 8 === 5
                ? "bg-cyan-500"
                : index % 8 === 6
                ? "bg-orange-500"
                : "bg-emerald-500"
            }
          `}
        />
      </CardContent>
    </Card>
  );
};

const Steps = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            How It Works
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            Easy Steps to Get Your Solution
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Connect with experienced doctors, schedule appointments,
            receive consultations, and access healthcare services
            through a simple and seamless process.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;