import Image from "next/image";
import React from "react";

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  className
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      objectFit="true"
    />
  );
};

export default ImageComponent;
