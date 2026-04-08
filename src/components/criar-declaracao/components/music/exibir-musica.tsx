import { useState, useRef, useEffect, useCallback } from "react";
import {
  BsFillPlayFill,
  BsFillPauseFill,
} from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import type { MusicPlayerFooterProps } from "../../../../schema/music";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function loadYTScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    if (document.getElementById("yt-api-script")) {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      return;
    }

    window.onYouTubeIframeAPIReady = resolve;

    const script = document.createElement("script");
    script.id = "yt-api-script";
    script.src = "https://www.youtube.com/iframe_api";

    document.head.appendChild(script);
  });
}

export default function MusicPlayerFooter({ musica }: MusicPlayerFooterProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIdRef = useRef<string | null>(null);

  const startTick = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setElapsed(Math.floor(playerRef.current.getCurrentTime()));
      }
    }, 500);
  }, []);

  const stopTick = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const initPlayer = useCallback(
    (videoId: string) => {
      loadYTScript().then(() => {
        if (!playerContainerRef.current) return;

        if (playerRef.current?.loadVideoById) {
          playerRef.current.loadVideoById(videoId);
          return;
        }

        playerRef.current = new window.YT.Player(playerContainerRef.current, {
          videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (e: any) => {
              e.target.playVideo();
              setDuration(Math.floor(e.target.getDuration()));
              setPlaying(true);
              startTick();
            },
            onStateChange: (e: any) => {
              if (e.data === 1) {
                setPlaying(true);
                setDuration(Math.floor(e.target.getDuration()));
                startTick();
              } else if (e.data === 2 || e.data === 0) {
                setPlaying(false);
                stopTick();
              }
            },
          },
        });
      });
    },
    [startTick, stopTick]
  );

  useEffect(() => {
    if (!musica) return;

    if (currentIdRef.current === musica.id) return;

    currentIdRef.current = musica.id;

    setElapsed(0);
    setDuration(musica.duration ?? 0);

    initPlayer(musica.id);
  }, [musica, initPlayer]);

  useEffect(() => {
    return () => {
      stopTick();

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}

        playerRef.current = null;
      }
    };
  }, [stopTick]);

  if (!musica) return null;

  const progress = duration > 0 ? Math.min((elapsed / duration) * 100, 100) : 0;

  const handlePlayPause = () => {
    if (!playerRef.current) return;

    playing
      ? playerRef.current.pauseVideo()
      : playerRef.current.playVideo();
  };

  const handleMute = () => {
    if (!playerRef.current) return;

    muted ? playerRef.current.unMute() : playerRef.current.mute();

    setMuted((m) => !m);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const seekTo = Math.round(
      ((e.clientX - rect.left) / rect.width) * duration
    );

    playerRef.current.seekTo(seekTo, true);

    setElapsed(seekTo);
  };

  return (
    <>
      <div
        className="absolute bottom-0 left-0 w-full bg-[#111111] border-t border-white/10"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div
          className="relative w-full h-[3px] bg-white/10 cursor-pointer group"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-[#e5003a]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src={musica.thumbnail}
            className="w-12 h-12 rounded-md object-cover"
            alt={musica.title}
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {musica.title}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {musica.channelTitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className="text-white text-xl"
            >
              {playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
            </button>

            <button
              onClick={handleMute}
              className="text-white text-lg"
            >
              {muted ? <HiSpeakerXMark /> : <HiSpeakerWave />}
            </button>

          </div>

          <div className="text-[10px] text-gray-400 w-16 text-right">
            {fmt(elapsed)} / {fmt(duration)}
          </div>
        </div>
      </div>

      <div
        ref={playerContainerRef}
        className="hidden"
      />
    </>
  );
}