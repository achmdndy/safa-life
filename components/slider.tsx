import React from 'react';
import RNSlider, { SliderProps as RNSliderProps } from '@react-native-community/slider';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/theme-context';

interface SliderProps extends RNSliderProps {
  className?: string;
}

export function Slider({ className, ...props }: SliderProps) {
  const { currentTheme, themes } = useTheme();
  const selectedTheme = themes[currentTheme];

  return (
    <RNSlider
      minimumTrackTintColor={selectedTheme.primary}
      maximumTrackTintColor={selectedTheme.secondary}
      thumbTintColor={selectedTheme.primary}
      className={cn('w-full', className)}
      {...props}
    />
  );
}
