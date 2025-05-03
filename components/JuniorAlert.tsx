import React, { useState, useEffect } from "react";

interface JuniorAlertProps {
  pageKey: string; // Prop to distinguish the page
}

const JuniorAlert: React.FC<JuniorAlertProps> = ({ pageKey }) => {
  // Use pageKey to create a unique localStorage key
  const ALERT_STORAGE_KEY = `hasSeenJuniorAlert_${pageKey}`;

  // State for visibility and client-side mount status
  const [isVisible, setIsVisible] = useState(false); // Start hidden
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false); // New state for animation

  useEffect(() => {
    // This effect runs only on the client
    setIsMounted(true);
    if (localStorage.getItem(ALERT_STORAGE_KEY) !== "true") {
      // Show only if the flag isn't set in localStorage
      setIsVisible(true);

      // Trigger animation after a small delay
      setTimeout(() => {
        setIsAnimated(true);
      }, 300);
    }
  }, [ALERT_STORAGE_KEY]); // Depend on the specific key

  const handleClose = () => {
    // First remove the animation
    setIsAnimated(false);

    // Then wait for animation to complete before hiding
    setTimeout(() => {
      // Hide the alert and set the flag in localStorage
      localStorage.setItem(ALERT_STORAGE_KEY, "true");
      setIsVisible(false);
    }, 300); // Match transition duration
  };

  // Don't render anything server-side or before mount check
  // Also don't render if it should be hidden based on localStorage or close click
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    // Added transition classes for smooth animation
    <div
      className={`relative z-50 transition-all duration-300 ease-in-out ${
        isAnimated
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform -translate-y-4"
      }`}
    >
      <h2 className="p-4 pr-8 bg-gray-800 text-gray-200 text-sm border border-orange-500/50 rounded-lg shadow-lg shadow-orange-500/20 w-[300px] mx-auto">
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 p-1 text-gray-400 hover:text-white focus:outline-none z-10 transition-colors duration-200"
          aria-label="Close alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        This website is from my junior developer days. As I&apos;m now focused
        on more complex projects, I&apos;m leaving this up as a historical
        record. For my latest work and updates, please visit my{" "}
        <a
          href="https://www.linkedin.com/in/alpovka/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-orange-400 hover:text-orange-300 transition-colors duration-200"
        >
          LinkedIn profile
        </a>
        .
      </h2>
    </div>
  );
};

export default JuniorAlert;
