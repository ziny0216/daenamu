import { ButtonProps } from '@/types/components/common';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import Spinner from '@/assets/icons/loading-3-quarters.svg';
import { useState } from 'react';

const StyledLoadingButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export default function LoadingButton({
  title,
  onClick,
  disabled,
  ...props
}: ButtonProps & { onClick?: () => void | Promise<void> }) {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await onClick?.();
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <StyledLoadingButton
        icon={loading ? <Spinner className="loading-icon" /> : null}
        title={loading ? 'Loading...' : title}
        disabled={disabled || loading}
        {...props}
        onClick={handleLoadingClick}
      ></StyledLoadingButton>
    </>
  );
}
