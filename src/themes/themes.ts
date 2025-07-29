export interface Theme {
  name: string;
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    background: string;
    backgroundGradient: string;
    surface: string;
    surfaceHover: string;
    text: string;
    textSecondary: string;
    accent: string;
    border: string;
  };
}

// 고마워요 GPT!
// 대 카테고리마다 디자인 스타일이 다르면 좋겠다는 생각이 들었는데 스타일 정의 잘해주네
export const themes: Record<string, Theme> = {
  docker: {
    name: 'Docker',
    colors: {
      primary: 'rgb(37, 99, 235)', // blue-600
      primaryDark: 'rgb(29, 78, 216)', // blue-700
      primaryLight: 'rgb(59, 130, 246)', // blue-500
      secondary: 'rgb(147, 197, 253)', // blue-300
      background: 'linear-gradient(to bottom right, rgb(219, 234, 254), rgb(255, 255, 255), rgb(219, 234, 254))', // blue-100 to white to blue-100
      backgroundGradient: 'from-blue-100 via-white to-blue-200',
      surface: 'rgba(255, 255, 255, 0.9)',
      surfaceHover: 'rgba(255, 255, 255, 0.95)',
      text: 'rgb(30, 58, 138)', // blue-900
      textSecondary: 'rgb(147, 197, 253)', // blue-300
      accent: 'rgb(219, 234, 254)', // blue-100
      border: 'rgb(191, 219, 254)', // blue-200
    },
  },
  javascript: {
    name: 'JavaScript',
    colors: {
      primary: 'rgb(245, 158, 11)', // amber-500
      primaryDark: 'rgb(217, 119, 6)', // amber-600
      primaryLight: 'rgb(251, 191, 36)', // amber-400
      secondary: 'rgb(252, 211, 77)', // amber-300
      background: 'linear-gradient(to bottom right, rgb(254, 243, 199), rgb(255, 255, 255), rgb(254, 243, 199))', // amber-100 to white to amber-100
      backgroundGradient: 'from-amber-100 via-white to-amber-200',
      surface: 'rgba(255, 255, 255, 0.9)',
      surfaceHover: 'rgba(255, 255, 255, 0.95)',
      text: 'rgb(146, 64, 14)', // amber-800
      textSecondary: 'rgb(252, 211, 77)', // amber-300
      accent: 'rgb(254, 243, 199)', // amber-100
      border: 'rgb(253, 230, 138)', // amber-200
    },
  },
  react: {
    name: 'React',
    colors: {
      primary: 'rgb(6, 182, 212)', // cyan-500
      primaryDark: 'rgb(8, 145, 178)', // cyan-600
      primaryLight: 'rgb(34, 211, 238)', // cyan-400
      secondary: 'rgb(103, 232, 249)', // cyan-300
      background: 'linear-gradient(to bottom right, rgb(207, 250, 254), rgb(255, 255, 255), rgb(207, 250, 254))', // cyan-100 to white to cyan-100
      backgroundGradient: 'from-cyan-100 via-white to-cyan-200',
      surface: 'rgba(255, 255, 255, 0.9)',
      surfaceHover: 'rgba(255, 255, 255, 0.95)',
      text: 'rgb(22, 78, 99)', // cyan-800
      textSecondary: 'rgb(103, 232, 249)', // cyan-300
      accent: 'rgb(207, 250, 254)', // cyan-100
      border: 'rgb(165, 243, 252)', // cyan-200
    },
  },
  python: {
    name: 'Python',
    colors: {
      primary: 'rgb(34, 197, 94)', // green-500
      primaryDark: 'rgb(22, 163, 74)', // green-600
      primaryLight: 'rgb(74, 222, 128)', // green-400
      secondary: 'rgb(134, 239, 172)', // green-300
      background: 'linear-gradient(to bottom right, rgb(220, 252, 231), rgb(255, 255, 255), rgb(220, 252, 231))', // green-100 to white to green-100
      backgroundGradient: 'from-green-100 via-white to-green-200',
      surface: 'rgba(255, 255, 255, 0.9)',
      surfaceHover: 'rgba(255, 255, 255, 0.95)',
      text: 'rgb(20, 83, 45)', // green-800
      textSecondary: 'rgb(134, 239, 172)', // green-300
      accent: 'rgb(220, 252, 231)', // green-100
      border: 'rgb(187, 247, 208)', // green-200
    },
  },
  default: {
    name: 'Default',
    colors: {
      primary: 'rgb(107, 114, 128)', // gray-500
      primaryDark: 'rgb(75, 85, 99)', // gray-600
      primaryLight: 'rgb(156, 163, 175)', // gray-400
      secondary: 'rgb(209, 213, 219)', // gray-300
      background: 'linear-gradient(to bottom right, rgb(243, 244, 246), rgb(255, 255, 255), rgb(243, 244, 246))', // gray-100 to white to gray-100
      backgroundGradient: 'from-gray-100 via-white to-gray-200',
      surface: 'rgba(255, 255, 255, 0.9)',
      surfaceHover: 'rgba(255, 255, 255, 0.95)',
      text: 'rgb(31, 41, 55)', // gray-800
      textSecondary: 'rgb(156, 163, 175)', // gray-400
      accent: 'rgb(243, 244, 246)', // gray-100
      border: 'rgb(229, 231, 235)', // gray-200
    },
  },
};

export const getThemeByCategory = (category: string): Theme => {
  const categoryMap: Record<string, string> = {
    'docker': 'docker',
    'javascript': 'javascript',
    'js': 'javascript',
    'react': 'react',
    'python': 'python',
    'py': 'python',
  };

  const themeName = categoryMap[category.toLowerCase()] || 'default';
  return themes[themeName];
};

export const getCurrentTheme = (pathname: string): Theme => {
  // URL 경로에서 카테고리 추출
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Docker Docs 경로 체크
  if (pathSegments.includes('docker-docs') || pathSegments.includes('docker')) {
    return themes.docker;
  }
  
  // 다른 카테고리들 체크
  for (const segment of pathSegments) {
    if (themes[segment]) {
      return themes[segment];
    }
  }
  
  return themes.docker;
};
