import React from "react";
import styled from "@emotion/styled";

const ImageContainer = styled.div<Props>`
  background-image: ${(props) => (`url(${props.imageURL});`)}
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: ${(props) => (props.height)};
`;

type Props = {
  imageURL: string,
  height: string
}

const ImageBlock = ({
  imageURL, height
}: Props) => (
  <ImageContainer imageURL={imageURL} height={height}/>
);

export default ImageBlock;