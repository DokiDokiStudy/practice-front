import { useTheme as useThemeContext } from './ThemeProvider';

export const useTheme = () => {
  const { theme, setTheme } = useThemeContext();

  // Tailwind 클래스 생성 헬퍼 함수들
  const getThemeClasses = () => ({
    // 네비게이션 바
    navBackground: `bg-gradient-to-r`,
    navBackgroundStyle: {
      background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.primaryLight})`
    },
    navText: 'text-white',
    navHover: 'hover:text-white hover:opacity-80',

    // 배경
    pageBackground: `bg-gradient-to-br ${theme.colors.backgroundGradient}`,
    
    // 폼/카드
    surface: 'bg-white/90 backdrop-blur-md',
    surfaceBorder: `border`,
    surfaceBorderStyle: {
      borderColor: theme.colors.border
    },
    
    // 버튼 (Primary)
    buttonPrimary: 'text-white font-bold shadow-md transition',
    buttonPrimaryStyle: {
      background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
    },
    buttonPrimaryHoverStyle: {
      background: `linear-gradient(to right, ${theme.colors.primaryDark}, ${theme.colors.primary})`,
    },
    
    // 입력 필드
    inputBackground: `bg-opacity-20`,
    inputBackgroundStyle: {
      backgroundColor: theme.colors.accent
    },
    inputBorder: `border`,
    inputBorderStyle: {
      borderColor: theme.colors.border
    },
    inputText: '',
    inputTextStyle: {
      color: theme.colors.text
    },
    inputPlaceholder: '',
    inputPlaceholderStyle: {
      '--tw-placeholder-opacity': '0.6',
      color: theme.colors.textSecondary
    },
    inputFocus: 'focus:outline-none focus:ring-2',
    inputFocusStyle: {
      '--tw-ring-color': theme.colors.primary,
      borderColor: theme.colors.primary
    },
    
    // 텍스트
    textPrimary: '',
    textPrimaryStyle: {
      color: theme.colors.text
    },
    textSecondary: '',
    textSecondaryStyle: {
      color: theme.colors.textSecondary
    },
    
    // 타이틀
    title: 'font-extrabold tracking-tight drop-shadow-sm',
    titleStyle: {
      color: theme.colors.primary
    },
    
    // 라벨
    label: 'font-semibold',
    labelStyle: {
      color: theme.colors.text
    }
  });

  return {
    theme,
    setTheme,
    classes: getThemeClasses(),
  };
};

export default useTheme;
