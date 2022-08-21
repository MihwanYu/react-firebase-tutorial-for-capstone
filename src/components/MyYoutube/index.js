import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useRecoilState } from "recoil";
import YouTube from "react-youtube";

const MyYoutube = () => {
  //link: params에서 전달받은 video ID
  const { link } = useParams();
  const [player, setPlayer] = useState(null);
  const section={
    start: 128, // 반복 시작 시간(초)
    end: 135 // 반복 종료 시간(초)
  }
  // /my-youtube/:link
  useEffect(()=>{

  })

  function onPlayerReady(event) {
    setPlayer(event.target);
    // player.seekTo(section.start);
    // player.playVideo();
    }

  function onPlayerStateChange(event) {
  // if (event.data == player.PlayerState.PLAYING) {
  //     var duration = section.end - section.start;
  //     setTimeout(restartVideoSection, duration * 1000);
  // }
  }

  function restartVideoSection() {
  // player.seekTo(section.start);
  }

  return (
    <>
      <div className="video-header">
        rendering at react: video Id: {link}
      </div>
      
      <YouTube
        videoId={link}
        opts={{
          width: "640",
          height: "360",
          playerVars: {
            autoplay: 1, //자동재생 O
            rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
            modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
            controls: 1,
            mute: 1
          },
        }}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} 
      />

        
    </>
  );
};

export default MyYoutube;

