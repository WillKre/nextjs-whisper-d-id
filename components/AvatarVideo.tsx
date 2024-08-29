import React, { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { ArrowClockwise } from "@phosphor-icons/react";

type AvatarVideoProps = {
  videoUrl: string | null;
};

export function AvatarVideo({ videoUrl }: AvatarVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current
        .play()
        .catch((e) => console.error("Error playing video:", e));
      setIsEnded(false);
    }
  }, [videoUrl]);

  function handleVideoEnded() {
    setIsEnded(true);
  }

  function handleReplay() {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .catch((e) => console.error("Error replaying video:", e));
      setIsEnded(false);
    }
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        onEnded={handleVideoEnded}
        className="w-full h-full bg-gray-100 dark:bg-[#1B191D]"
      >
        <track kind="captions" />
      </video>

      {isEnded && (
        <Button
          isIconOnly
          className="absolute bottom-4 right-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          onClick={handleReplay}
        >
          <ArrowClockwise size={20} weight="fill" className="text-white" />
        </Button>
      )}
    </div>
  );
}
