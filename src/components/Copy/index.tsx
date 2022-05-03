import React from 'react'
import styled from 'styled-components/macro'

import useCopyClipboard from './useCopyClipboard'

const Wrapper = styled.div`
  position: relative;
  font-size: 16px;
`;

const WrapperCopy = styled.div`
  position: absolute;
  width: 80px;
  height: 50px;
  background: #494949bd;
  left: 115%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  span {
    color: ${({ theme }) => theme.text2};
  }
`;

export default function Copy(props: { toCopy: string; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <Wrapper onClick={() => setCopied(props.toCopy)}>
      {
        isCopied
          ? <WrapperCopy>
            <span>Copied!</span>
          </WrapperCopy>
          : ''
      }
      {props.children}
    </Wrapper>
  )
}
