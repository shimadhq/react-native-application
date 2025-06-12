// src/components/Icon.js
import React, { useContext, useEffect } from 'react';
import * as LightIcons from '../../../assets/light';
import * as DarkIcons from '../../../assets/dark';
import { ThemeContext } from "../themeProvider/themeProvider.js";

const Icon = ({ name, width = 24, height = 24 }) => {
  const { isDarkMode } = useContext(ThemeContext);

  // انتخاب آیکون بر اساس حالت
  const IconComponent = isDarkMode ? DarkIcons[name] : LightIcons[name];

  return IconComponent ? <IconComponent width={width} height={height} /> : null;
};

export default Icon;