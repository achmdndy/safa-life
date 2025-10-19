import { cn } from '@/lib/utils';
import * as Slot from '@rn-primitives/slot';
import React, {
  useCallback,
  useImperativeHandle,
  forwardRef,
  useContext,
  useRef,
} from 'react';
import {
  View,
  Pressable,
  Keyboard,
  type ViewStyle,
  type ViewProps,
  type GestureResponderEvent,
} from 'react-native';
import { useTheme } from '@/contexts/theme-context';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList as GBottomSheetFlatList,
  BottomSheetTextInput as GBottomSheetTextInput,
  BottomSheetView as GBottomSheetView,
  BottomSheetScrollView as GBottomSheetScrollView,
  BottomSheetFooter as GBottomSheetFooter,
  useBottomSheetModal,
  useBottomSheetScrollableCreator,
  type BottomSheetBackdropProps,
  type BottomSheetFooterProps as GBottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { createTheme } from '@/lib/theme';

type BottomSheetContentRef = React.ElementRef<typeof BottomSheetModal>;

interface BottomSheetContextType {
  sheetRef: React.RefObject<BottomSheetModal>;
}

const BottomSheetContext = React.createContext<BottomSheetContextType | null>(
  null
);

const BottomSheet = forwardRef<View, ViewProps>((props, ref) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  return (
    <BottomSheetContext.Provider value={{ sheetRef }}>
      <View ref={ref} {...props} />
    </BottomSheetContext.Provider>
  );
});
BottomSheet.displayName = 'BottomSheet';

function useBottomSheetContext() {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) {
    throw new Error(
      'BottomSheet compound components must be inside <BottomSheet> provider'
    );
  }
  return ctx;
}

const CLOSED_INDEX = -1;

interface BottomSheetContentProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof BottomSheetModal>,
    'backdropComponent'
  > {
  backdropProps?: Partial<
    React.ComponentPropsWithoutRef<typeof BottomSheetBackdrop>
  >;
}

const BottomSheetContent = forwardRef<
  BottomSheetContentRef,
  BottomSheetContentProps
>(
  (
    {
      enablePanDownToClose = true,
      enableDynamicSizing = false,
      backdropProps,
      backgroundStyle,
      keyboardBehavior = 'interactive',
      keyboardBlurBehavior = 'restore',
      android_keyboardInputMode = 'adjustResize',
      snapPoints = ['50%', '80%'],
      index = 0,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const { sheetRef } = useBottomSheetContext();
    const { themes, currentTheme, theme } = useTheme();
    const isDarkMode = theme === "dark";
    const selectedTheme = themes[currentTheme];
    const themeColors = createTheme(
      selectedTheme.primary,
      selectedTheme.secondary,
    );

    useImperativeHandle(ref, () => sheetRef.current as BottomSheetModal, [
      sheetRef,
    ]);

    const renderBackdrop = useCallback(
      (backdropPropsFromSheet: BottomSheetBackdropProps) => {
        const {
          pressBehavior = 'close',
          disappearsOnIndex = CLOSED_INDEX,
          appearsOnIndex = 0,
          style,
          onPress,
          ...rest
        } = {
          ...backdropPropsFromSheet,
          ...backdropProps,
        };

        return (
          <BottomSheetBackdrop
            {...backdropPropsFromSheet}
            disappearsOnIndex={disappearsOnIndex}
            appearsOnIndex={appearsOnIndex}
            pressBehavior={pressBehavior}
            style={[{ backgroundColor: 'rgba(0,0,0,0.8)' }, style]}
            onPress={() => {
              if (Keyboard.isVisible()) Keyboard.dismiss();
              onPress?.();
            }}
            {...rest}
          />
        );
      },
      [backdropProps]
    );

    return (
      <BottomSheetModal
        ref={sheetRef}
        index={index}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing={enableDynamicSizing}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={[
          {
            backgroundColor: isDarkMode ? themeColors.dark.card : themeColors.light.card,
          },
          backgroundStyle,
        ]}
        handleIndicatorStyle={{
          backgroundColor: selectedTheme.primary,
        }}
        topInset={insets.top}
        keyboardBehavior={keyboardBehavior}
        keyboardBlurBehavior={keyboardBlurBehavior}
        android_keyboardInputMode={android_keyboardInputMode}
        {...props}
      />
    );
  }
);
BottomSheetContent.displayName = 'BottomSheetContent';

const BottomSheetOpenTrigger = forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ asChild = false, onPress, ...props }, ref) => {
  const { sheetRef } = useBottomSheetContext();
  const Trigger = asChild ? Slot.Pressable : Pressable;

  const handlePress = (ev: GestureResponderEvent) => {
    sheetRef.current?.present();
    onPress?.(ev);
  };

  return <Trigger ref={ref} onPress={handlePress} {...props} />;
});
BottomSheetOpenTrigger.displayName = 'BottomSheetOpenTrigger';

const BottomSheetCloseTrigger = forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & { asChild?: boolean }
>(({ asChild = false, onPress, ...props }, ref) => {
  const { sheetRef } = useBottomSheetContext();
  const Trigger = asChild ? Slot.Pressable : Pressable;

  const handlePress = (ev: GestureResponderEvent) => {
    sheetRef.current?.dismiss();
    if (Keyboard.isVisible()) Keyboard.dismiss();
    onPress?.(ev);
  };

  return <Trigger ref={ref} onPress={handlePress} {...props} />;
});
BottomSheetCloseTrigger.displayName = 'BottomSheetCloseTrigger';

const BOTTOM_SHEET_HEADER_HEIGHT = 70;

function BottomSheetView({
  hasHeader = true,
  style,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof GBottomSheetView> & {
  hasHeader?: boolean;
  style?: ViewStyle;
}) {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetView
      style={[
        {
          paddingBottom:
            insets.bottom + (hasHeader ? BOTTOM_SHEET_HEADER_HEIGHT : 0),
          flex: 1,
        },
        style,
      ]}
      className={cn('px-4', className)}
      {...props}
    >
      {children}
    </GBottomSheetView>
  );
}
BottomSheetView.displayName = 'BottomSheetView';

function BottomSheetScrollView({
  hasHeader = true,
  style,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof GBottomSheetScrollView> & {
  hasHeader?: boolean;
  style?: ViewStyle;
}) {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetScrollView
      style={[
        {
          paddingBottom:
            insets.bottom + (hasHeader ? BOTTOM_SHEET_HEADER_HEIGHT : 0),
          flex: 1,
        },
        style,
      ]}
      className={cn('px-4', className)}
      {...props}
    >
      {children}
    </GBottomSheetScrollView>
  );
}
BottomSheetScrollView.displayName = 'BottomSheetScrollView';

const BottomSheetTextInput = forwardRef<
  React.ElementRef<typeof GBottomSheetTextInput>,
  React.ComponentPropsWithoutRef<typeof GBottomSheetTextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <GBottomSheetTextInput
      ref={ref}
      className={cn(
        'h-14 items-center rounded-md border border-input bg-background px-3 text-xl leading-[1.25] placeholder:text-muted-foreground disabled:opacity-50',
        'text-foreground',
        className
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  );
});
BottomSheetTextInput.displayName = 'BottomSheetTextInput';

const BottomSheetFlatList = forwardRef<
  React.ElementRef<typeof GBottomSheetFlatList>,
  React.ComponentPropsWithoutRef<typeof GBottomSheetFlatList>
>(({ className, ...props }, ref) => {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetFlatList
      ref={ref}
      contentContainerStyle={[{ paddingBottom: insets.bottom }]}
      className={cn('py-4', className)}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
});
BottomSheetFlatList.displayName = 'BottomSheetFlatList';

const BottomSheetFlashList = forwardRef<any, any>(
  ({ className, style, ...props }, ref) => {
    const FlashList = useBottomSheetScrollableCreator(
      require('@shopify/flash-list').FlashList
    );

    return (
      <FlashList
        ref={ref}
        style={[
          {
            minHeight: 200,
            maxHeight: 400,
          },
          style,
        ]}
        className={cn('py-2', className)}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 8 }}
        {...props}
      />
    );
  }
);
BottomSheetFlashList.displayName = 'BottomSheetFlashList';

const BottomSheetHeader = forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    rightChildren?: React.ReactElement;
  }
>(({ className, children, rightChildren, ...props }, ref) => {
  const { dismiss } = useBottomSheetModal();

  function close() {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    dismiss();
  }

  return (
    <View
      ref={ref}
      className={cn(
        'flex-row items-center justify-between border-b border-border pl-4',
        className
      )}
      {...props}
    >
      {children}
      <View className="flex flex-row items-center gap-2">
        {rightChildren}
        <Button onPress={close} variant="ghost" className="pr-4">
          <X className="text-muted-foreground" size={24} />
        </Button>
      </View>
    </View>
  );
});
BottomSheetHeader.displayName = 'BottomSheetHeader';

type BottomSheetFooterProps = Omit<
  React.ComponentPropsWithoutRef<typeof View>,
  'style'
> & {
  bottomSheetFooterProps: GBottomSheetFooterProps;
  children?: React.ReactNode;
  style?: ViewStyle;
};

const BottomSheetFooter = forwardRef<
  React.ElementRef<typeof View>,
  BottomSheetFooterProps
>(({ bottomSheetFooterProps, children, className, style, ...props }, ref) => {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetFooter {...bottomSheetFooterProps}>
      <View
        ref={ref}
        style={[{ paddingBottom: insets.bottom + 6 }, style]}
        className={cn('px-4 pt-1.5', className)}
        {...props}
      >
        {children}
      </View>
    </GBottomSheetFooter>
  );
});
BottomSheetFooter.displayName = 'BottomSheetFooter';

function useBottomSheet() {
  const ref = useRef<BottomSheetContentRef>(null);

  const open = useCallback(() => {
    ref.current?.present();
  }, []);

  const close = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return { ref, open, close };
}

export {
  BottomSheet,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetCloseTrigger,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetFlatList,
  BottomSheetFlashList,
  BottomSheetHeader,
  BottomSheetFooter,
  useBottomSheet,
};