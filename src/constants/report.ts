import { DefaultObj } from '@/types/components/common';

export const REPORT_REASON: DefaultObj[] = [
  { value: '', name: '사유를 선택해주세요.' },
  { value: 'spam', name: '스팸/홍보' },
  { value: 'abuse', name: '욕설/비방' },
  { value: 'harmful', name: '혐오/불쾌한 내용' },
  { value: 'explicit', name: '음란/선정적 내용' },
  { value: 'etc', name: '기타' },
];
