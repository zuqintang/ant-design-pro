export function getStandardName(key) {
  switch (key) {
    case 0:
      return '国标';
    case 1:
      return '企标';
    default:
      return '未定义';
  }
}
