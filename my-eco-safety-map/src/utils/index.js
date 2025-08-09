/**
 * 페이지 이름과 파라미터를 기반으로 URL 경로를 생성합니다.
 * @param {string} pageName - 이동할 페이지의 이름 (예: "Home", "Route?id=123")
 * @returns {string} - 생성된 전체 URL 경로 (예: "/Home", "/Route?id=123")
 */
export function createPageUrl(pageName) {
  if (!pageName) return "/";

  // URL 파라미터가 포함된 경우와 아닌 경우를 모두 처리
  const [path, query] = pageName.split('?');
  const queryString = query ? `?${query}` : '';

  // 기본적으로 페이지 이름 앞에 '/'를 붙여 경로를 완성합니다.
  // Home 페이지는 특별히 루트 경로('/')로 매핑될 수 있으나, 일관성을 위해 /Home으로 처리합니다.
  return `/${path}${queryString}`;
}