'use client';

import { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

const LightDarkSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <SunIcon className={`w-6 h-6 ${!isDarkMode ? 'text-yellow-500' : 'text-gray-400'}`} />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleDarkMode}
        className="shad"
      />
      <MoonIcon className={`w-6 h-6 ${isDarkMode ? 'text-blue-500' : 'text-gray-400'}`} />
    </div>
  );
};

export default LightDarkSwitch;
