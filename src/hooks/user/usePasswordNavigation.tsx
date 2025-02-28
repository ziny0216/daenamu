'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import browserClient from '@/utils/supabaseClient';
import { clearUser, setIsRecovery } from '@/lib/features/user/userSlice';
import { useDispatch } from 'react-redux';

const usePreventNavigation = (type: string) => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기
  const dispatch = useDispatch();
  // 페이지 이동 감지 및 차단
  let prevPath = pathname; // 이전 경로 저장
  const handleRouteChange = (url: string) => {
    if (url !== prevPath) {
      const isConfirmed = window.confirm(
        '이 페이지를 떠나시겠습니까? 변경사항이 저장되지 않을 수 있습니다.',
      );

      if (!isConfirmed) {
        router.replace(prevPath); // 취소시 원래 페이지로 다시 이동
        throw '페이지 이동 취소';
      } else {
        prevPath = url; // 확인하면 prevPath 업데이트
      }
    }
  };
  useEffect(() => {
    if (type !== 'recovery') return;

    // 최초 진입시 history 상태 추가 (뒤로 가기 방지)
    history.pushState(null, '', location.href);

    // 새로 고침시 경고 메시지 표시
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        '변경사항이 저장되지 않을 수 있습니다. 이동하시겠습니까?';
    };

    // 뒤로 가기 확인
    const handlePopState = async () => {
      const isConfirmed = window.confirm(
        '비밀번호 재설정이 취소됩니다. 이동하시겠습니까?',
      );

      if (isConfirmed) {
        await browserClient.auth.signOut();
        dispatch(clearUser());
        dispatch(setIsRecovery(false));
        router.replace('/auth/login'); //로그인 페이지로 이동
      } else {
        history.pushState(null, '', location.href); // 취소시 다시 pushState 실행
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [type, router, pathname]);
  // pathname이 변경될 때 handleRouteChange 실행
  useEffect(() => {
    handleRouteChange(pathname);
  }, [pathname]);
  return null;
};

export default usePreventNavigation;
