import React, { useState } from "react";
import {
  Timer,
  ListTodo,
  BarChart2,
  Clock,
  Target,
  Zap,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { settings, setSettings } = useSettings();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const handleStartClick = () => {
    if (settings.name === "User" || settings.name === "") {
      setIsInputVisible(true);
    } else {
      navigate("/app");
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setSettings((prev) => ({
        ...prev,
        name: nameInput.trim(),
      }));
      navigate("/app");
    }
  };

  const StartButton = () => (
    <button
      onClick={handleStartClick}
      className="font-mori group w-full sm:w-auto px-6 py-3 bg-black text-white text-base sm:text-lg rounded-lg 
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                active:translate-y-0 active:shadow-md"
    >
      Get Started{" "}
      <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">
        →
      </span>
    </button>
  );

  const NameInput = () => (
    <form onSubmit={handleNameSubmit} className="w-full sm:w-auto">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter your name"
          className="font-mori w-full px-4 py-3 border-2 border-black text-black text-base sm:text-lg rounded-lg 
                   transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black
                   focus:border-transparent"
          autoFocus
        />
        <button
          type="submit"
          className="font-mori w-full sm:w-auto px-6 py-3 bg-black text-white text-base sm:text-lg rounded-lg 
                   transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                   active:translate-y-0 active:shadow-md"
        >
          →
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div
        className="px-4 py-16 sm:py-32 max-w-7xl mx-auto scroll-mt-24"
        id="hero"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 transition-transform duration-300 hover:scale-[1.01]">
          <h1 className="text-5xl sm:text-7xl md:text-8xl tracking-tight text-black title-font font-ade transition-colors duration-300 hover:text-gray-800">
            RAVA
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-oskari transition-colors duration-300 hover:text-gray-900">
            Embrace the flow of productivity. Rava is your all-in-one companion
            for habit tracking and focused work sessions, designed to help you
            stay consistent and achieve your goals effortlessly.
          </p>
          <p className="text-md sm:text-lg text-gray-500 italic max-w-2xl mx-auto font-oskari">
            Derived from Persian/Urdu roots, <span className="text-black font-bold cursor-pointer relative group"style={{ display: "inline-block" }}>راوا
              <span
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-2 text-sm bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ whiteSpace: "nowrap" }}
              >
                "Rava" - Smooth, seamless, or flowing
              </span>
            </span>
            (&quot;Rava&quot;) can be interpreted as smooth, seamless, or
            flowing — capturing the effortless rhythm of progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center font-oskari">
            {isInputVisible ? <NameInput /> : <StartButton />}
            <button
              className="font-mori w-full sm:w-auto px-6 py-3 border-2 border-black text-black text-base sm:text-lg rounded-lg 
                   transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-50
                   active:translate-y-0 active:shadow-md"
              onClick={() => {
                const element = document.getElementById(`how-it-works`);
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 bg-gray-50 scroll-mt-24" id="features">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 tracking-tighter font-mori
                      transition-colors duration-300 hover:text-gray-700"
          >
            Build Your Rhythm with Rava
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center mb-8 font-oskari transition-colors duration-300 hover:text-gray-900">
            Consistency and progress come from flow. With Rava, you can
            seamlessly integrate habit-building and productivity into your daily
            routine.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                icon: Timer,
                title: "Pomodoro Timer",
                desc: "Stay focused with customizable work sessions and breaks",
              },
              {
                icon: ListTodo,
                title: "Habit Tracking",
                desc: "Build and maintain positive habits with streak tracking",
              },
              {
                icon: BarChart2,
                title: "Progress Analytics",
                desc: "Visualize your productivity and habit consistency",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="space-y-4 text-center p-4 transition-transform duration-300 hover:scale-[1.02]"
              >
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto
                             transition-transform duration-300 hover:rotate-12"
                >
                  <feature.icon
                    size={24}
                    className="sm:hidden transition-transform duration-300"
                  />
                  <feature.icon
                    size={32}
                    className="hidden sm:block transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-mori transition-colors duration-300 hover:text-gray-700">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-oskari transition-colors duration-300 hover:text-gray-900">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 sm:py-24 scroll-mt-24" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 font-mori
                      transition-colors duration-300 hover:text-gray-700"
          >
            How Rava Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center mb-8 font-oskari transition-colors duration-300 hover:text-gray-900">
            Rava helps you tap into your natural rhythm by combining focused
            work sessions, habit tracking, and progress visualization.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Clock,
                title: "Set Your Timer",
                desc: "Choose your focus duration and break intervals",
              },
              {
                icon: Target,
                title: "Define Habits",
                desc: "Create habits you want to build and track",
              },
              {
                icon: Zap,
                title: "Stay Focused",
                desc: "Work in focused sessions with built-in breaks",
              },
              {
                icon: Calendar,
                title: "Track Progress",
                desc: "Monitor your improvements over time",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="space-y-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg p-4 rounded-lg"
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-full flex items-center justify-center
                             transition-transform duration-300 hover:scale-105"
                >
                  <step.icon size={20} className="sm:hidden" />
                  <step.icon size={24} className="hidden sm:block" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-mori transition-colors duration-300 hover:text-gray-700">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-oskari transition-colors duration-300 hover:text-gray-900">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 sm:py-24 bg-black text-white scroll-mt-24" id="cta">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 sm:space-y-8 transition-transform duration-300 hover:scale-[1.01]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mori transition-colors duration-300 hover:text-gray-200">
            Ready to embrace the flow?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 font-oskari transition-colors duration-300 hover:text-gray-300">
            With Rava, productivity feels effortless. Build habits, stay
            consistent, and achieve your goals one step at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
