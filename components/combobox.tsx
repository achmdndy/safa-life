import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, Pressable, TextInput, ActivityIndicator } from 'react-native';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/theme-context';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
  BottomSheetFlatList,
} from './bottom-sheet';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { Icon } from './ui/icon';
import { Checkbox } from './ui/checkbox';
import { ChevronDown, Search, Check } from 'lucide-react-native';

// Types and Interfaces
export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  showSaveButton?: boolean;
  showClearButton?: boolean;
  className?: string;
  triggerClassName?: string;
  emptyText?: string;
  saveText?: string;
  clearText?: string;
  loadingText?: string;
}

// Helper function to format selected values for display
const formatSelectedValues = (
  selectedValues: string[],
  options: ComboboxOption[],
  multiple: boolean,
  placeholder: string
): string => {
  if (selectedValues.length === 0) {
    return placeholder;
  }

  if (!multiple) {
    const option = options.find((opt) => opt.value === selectedValues[0]);
    return option?.label || selectedValues[0];
  }

  if (selectedValues.length === 1) {
    const option = options.find((opt) => opt.value === selectedValues[0]);
    return option?.label || selectedValues[0];
  }

  return `${selectedValues.length} item dipilih`;
};

// Main Combobox Component
export function Combobox({
  options = [],
  value,
  onValueChange,
  placeholder = 'Pilih opsi...',
  multiple = false,
  searchable = false,
  disabled = false,
  isLoading = false,
  showSaveButton = true,
  showClearButton = true,
  className,
  triggerClassName,
  emptyText = 'Tidak ada opsi tersedia',
  saveText = 'Simpan',
  clearText = 'Hapus Semua',
  loadingText = 'Memuat...',
}: ComboboxProps) {
  const { themes, currentTheme } = useTheme();
  const selectedTheme = themes[currentTheme];
  const sheetRef = useRef<BottomSheetModal>(null);

  // Internal state management
  const [searchQuery, setSearchQuery] = useState('');
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  });

  // Filtered options based on search
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return options;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, searchable]);

  // Handle option selection
  const handleOptionSelect = useCallback(
    (optionValue: string) => {
      if (isLoading) return;

      let newValue: string[];

      if (multiple) {
        if (internalValue.includes(optionValue)) {
          newValue = internalValue.filter((v) => v !== optionValue);
        } else {
          newValue = [...internalValue, optionValue];
        }
        setInternalValue(newValue);
      } else {
        newValue = [optionValue];
        setInternalValue(newValue);
      }
    },
    [internalValue, multiple, isLoading]
  );

  // Handle save action
  const handleSave = useCallback(() => {
    if (isLoading) return;
    
    const finalValue = multiple ? internalValue : internalValue[0] || '';
    onValueChange?.(finalValue);
    sheetRef.current?.dismiss();
  }, [internalValue, multiple, onValueChange, isLoading]);

  // Handle clear action
  const handleClear = useCallback(() => {
    if (isLoading) return;
    
    setInternalValue([]);
    if (!showSaveButton) {
      const finalValue = multiple ? [] : '';
      onValueChange?.(finalValue);
    }
  }, [multiple, showSaveButton, onValueChange, isLoading]);

  // Display value in trigger
  const displayValue = useMemo(() => {
    const currentValues = value
      ? Array.isArray(value)
        ? value
        : [value]
      : internalValue;
    return formatSelectedValues(currentValues, options, multiple, placeholder);
  }, [value, internalValue, options, multiple, placeholder]);

  // Sync internal value with external value
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  return (
    <BottomSheet>
      <View className={cn('w-full', className)}>
        {/* Trigger Button */}
        <BottomSheetOpenTrigger asChild>
          <Pressable
            disabled={disabled || isLoading}
            className={cn(
              'flex-row items-center justify-between rounded-lg border border-border bg-background px-4 py-3 min-h-[48px]',
              (disabled || isLoading) && 'opacity-50',
              triggerClassName
            )}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${placeholder}. ${displayValue}`}
            accessibilityHint="Ketuk untuk membuka pilihan"
            accessibilityState={{ disabled: disabled || isLoading }}
          >
            <Text
              className={cn(
                'flex-1 text-foreground',
                (!value && internalValue.length === 0) &&
                  'text-muted-foreground'
              )}
              numberOfLines={1}
            >
              {displayValue}
            </Text>
            {isLoading ? (
              <ActivityIndicator size="small" color={selectedTheme.primary} />
            ) : (
              <Icon
                as={ChevronDown}
                size={20}
                className="text-muted-foreground ml-2"
              />
            )}
          </Pressable>
        </BottomSheetOpenTrigger>

        {/* Bottom Sheet Content */}
        <BottomSheetContent
          ref={sheetRef}
          snapPoints={['60%', '90%']}
          enableDynamicSizing={false}
          accessible={true}
          accessibilityLabel={`Dialog ${placeholder}`}
          accessibilityViewIsModal={true}
        >
          <BottomSheetView hasHeader={false}>
            {/* Header */}
            <View className="pb-3 border-b border-border">
              <Text 
                className="text-lg font-semibold text-foreground"
                accessible={true}
                accessibilityRole="header"
              >
                {placeholder}
              </Text>
              {multiple && internalValue.length > 0 && (
                <Text 
                  className="text-sm text-muted-foreground mt-1"
                  accessible={true}
                  accessibilityLabel={`${internalValue.length} item dipilih`}
                >
                  {internalValue.length} item dipilih
                </Text>
              )}
            </View>

            {/* Search Input (if searchable) */}
            {searchable && (
              <View className="py-3 border-b border-border">
                <View className="relative w-full">
                  <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                    <Icon
                      as={Search}
                      size={20}
                      className="text-muted-foreground"
                    />
                  </View>
                  <TextInput
                    className="rounded-full bg-muted pl-10 pr-4 py-3 text-foreground"
                    placeholder="Cari..."
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    editable={!isLoading}
                    accessible={true}
                    accessibilityLabel="Kolom pencarian"
                    accessibilityHint="Ketik untuk mencari opsi"
                  />
                </View>
              </View>
            )}

            {/* Loading State */}
            {isLoading ? (
              <View className="py-8 items-center justify-center">
                <ActivityIndicator size="large" color={selectedTheme.primary} />
                <Text className="text-muted-foreground text-center mt-4">
                  {loadingText}
                </Text>
              </View>
            ) : filteredOptions.length === 0 ? (
              /* Empty State */
              <View className="py-8 items-center justify-center">
                <Text className="text-muted-foreground text-center">
                  {emptyText}
                </Text>
              </View>
            ) : (
              /* Options List */
              <BottomSheetFlatList
                data={filteredOptions}
                keyExtractor={(item) => (item as ComboboxOption).value}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const option = item as ComboboxOption;
                  const isSelected = internalValue.includes(option.value);

                  return (
                    <Pressable
                      disabled={option.disabled || isLoading}
                      onPress={() => handleOptionSelect(option.value)}
                      className={cn(
                        'flex-row items-center px-4 py-4 active:bg-muted',
                        (option.disabled || isLoading) && 'opacity-50',
                        isSelected && 'bg-primary/10'
                      )}
                      accessible={true}
                      accessibilityRole={multiple ? 'checkbox' : 'radio'}
                      accessibilityLabel={option.label}
                      accessibilityHint={
                        multiple
                          ? isSelected
                            ? 'Dipilih. Ketuk untuk membatalkan pilihan'
                            : 'Tidak dipilih. Ketuk untuk memilih'
                          : isSelected
                          ? 'Dipilih'
                          : 'Ketuk untuk memilih'
                      }
                      accessibilityState={{
                        selected: isSelected,
                        disabled: option.disabled || isLoading,
                        checked: multiple ? isSelected : undefined,
                      }}
                    >
                      {multiple && (
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleOptionSelect(option.value)}
                          className="mr-3"
                          disabled={option.disabled || isLoading}
                          accessible={false}
                        />
                      )}

                      <Text
                        className={cn(
                          'flex-1 text-foreground text-base',
                          isSelected && 'font-medium'
                        )}
                        style={
                          isSelected && !multiple
                            ? { color: selectedTheme.primary }
                            : undefined
                        }
                      >
                        {option.label}
                      </Text>

                      {!multiple && isSelected && (
                        <Icon
                          as={Check}
                          size={20}
                          color={selectedTheme.primary}
                        />
                      )}
                    </Pressable>
                  );
                }}
              />
            )}

            {/* Footer with action buttons */}
            {!isLoading && (showSaveButton || (showClearButton && multiple && internalValue.length > 0)) && (
              <View className="pt-3 border-t border-border">
                {/* Clear button for multiple selection */}
                {multiple && showClearButton && internalValue.length > 0 && (
                  <Button
                    variant="outline"
                    onPress={handleClear}
                    disabled={isLoading}
                    className="w-full mb-2"
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel={clearText}
                    accessibilityHint="Ketuk untuk menghapus semua pilihan"
                  >
                    <Text>{clearText}</Text>
                  </Button>
                )}

                {/* Save button */}
                {showSaveButton && (
                  <Button
                    className="w-full"
                    style={{ backgroundColor: selectedTheme.primary }}
                    onPress={handleSave}
                    disabled={isLoading}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel={saveText}
                    accessibilityHint="Ketuk untuk menyimpan pilihan dan menutup dialog"
                  >
                    <Text className="text-white font-medium">{saveText}</Text>
                  </Button>
                )}
              </View>
            )}
          </BottomSheetView>
        </BottomSheetContent>
      </View>
    </BottomSheet>
  );
}