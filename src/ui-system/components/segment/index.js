import React from "react";
import styled from "styled-components";
import Button from "../button";

const SegmentGroupWrapper = styled.div`
  overflow: auto;
  background-color: var(--c-button);
  padding: 0.2rem;
  border-radius: 10rem;
  display: inline-flex;
  flex-wrap: wrap;
  ${(p) => p.width && `width: ${p.width}`};

  & > button {
    flex: 1;
    ${(p) => p.fullWidth && `aspect-ratio: 1/1`};
  }
`;

const SegmentWrapper = styled(Button)`
  &:not(:hover) {
    background-color: ${(p) =>
    p.isSelected ? `var(--c-background)` : `transparent`};
  }

  ${(p) => p.isSelected && `background-color: var(--c-background)`};
  ${(p) =>
    !p.isSelected &&
    `color: var(--c-fade); filter: grayscale(1) contrast(4) opacity(0.7)`};
`;

export const SegmentGroup = ({ children, width, fullWidth }) => {
  return (
    <SegmentGroupWrapper fullWidth={fullWidth} width={width}>
      {children}
    </SegmentGroupWrapper>
  );
};

const Segment = ({ children, isSelected, icon, ...props }) => {
  return (
    <SegmentWrapper icon={icon} isSelected={isSelected} {...props}>
      {children}
    </SegmentWrapper>
  );
};

export default Segment;
