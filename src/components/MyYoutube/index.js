import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useRecoilState } from "recoil";
import YouTube from "react-youtube";
import styled from "@emotion/styled";

const MyYoutube = () => {
  //link: params에서 전달받은 video ID
  const { link } = useParams();
  //player: div id=player 대신에 react-youtube로 전달해주는 youtube player 객체
  const [player, setPlayer] = useState(null);

  //currentIdx: software/system/engineering 버튼 중에 하나 누르면 가장 최근에 누른 버튼 인덱스 값 저장
  const [currentKey, setCurrentKey] = useState('');
  //timestampIdx: 이전 js의 변수now와 동일. 현재 눌려진 버튼에 맵핑된 타임스탬프 리스트 중 보여지고 있는 인덱스 값
  const [timestampIdx, setTimestampIdx] = useState(-1);
  //currentTime: 현재 보여지고 있는 0:00 등의 시간을 정수로 환산
  const [currentTime, setCurrentTime] = useState(0);

  const keyword_time_dict = {'software': ['3.94', '18.55', '26.94', '31.84', '42.04', '58.74', '84.74', '88.72', '134.64', '166.36', '169.82', '185.74', '199.94', '207.15', '216.43', '217.32', '249.1', '256.04', '273.34', '279.24', '281.54', '285.39', '287.92', '295.48', '302.84', '311.74', '319.1', '325.36', '329.47', '361.94', '368.24', '395.48', '430.64', '448.64', '519.14', '525.14', '602.44', '613.54', '637.14', '719.14', '833.14', '844.84', '868.54', '880.54', '898.74', '913.52', '935.42', '940.04', '958.04', '963.74', '983.44', '988.14', '1004.04', '1010.74', '1026.04', '1031.34', '1039.94', '1058.34', '1081.84', '1117.24', '1127.14', '1141.24', '1162.59', '1174.26', '1268.51', '1279.44', '1284.64', '1293.43', '1303.08', '1315.34', '1324.44', '1329.84', '1366.54', '1403.54', '1428.44', '1483.64', '1489.44', '1585.22', '1592.86', '1643.04', '1650.4', '1695.34', '1699.47', '1712.44', '1737.86', '1787.14', '1798.94', '1815.84', '1823.07'], 'system': ['31.84', '58.74', '105.57', '134.64', '229.44', '430.64', '439.74', '448.64', '488.83', '666.34', '671.64', '693.24', '731.04', '769.04', '786.24', '815.42', '833.14', '844.84', '858.04', '880.54', '963.74', '988.14', '1010.74', '1039.94', '1109.94', '1147.55', '1394.44', '1510.24', '1520.04', '1536.73', '1606.58', '1643.04', '1650.4'], 'engineering': ['719.14', '743.44', '753.24', '769.04', '786.24', '798.44', '833.14', '844.84', '880.54', '907.74', '913.52', '958.04', '983.44', '1026.04', '1039.94', '1117.24']}
  const keyValue = Object.keys(keyword_time_dict);

  const section={
    start: 128, // 반복 시작 시간(초)
    end: 135 // 반복 종료 시간(초)
  }

  // /my-youtube/:link
  //useEffect: []안에 있는 값 중 하나라도 바뀔 때마다 useEffect()안의 구문 실행. []비어있으면 처음 페이지 렌더링 할 때 한 번만 실행
  useEffect(()=>{
    if(player){
    player.seekTo(currentTime);
    console.log('seek to: ',currentTime);
    console.log(keyword_time_dict[currentKey]);
    }
  }, [currentTime]);

  function onPlayerReady(event) {
    setPlayer(event.target);
    // player.seekTo(section.start);
    // player.playVideo();
    }

  function onPlayerStateChange(event) {
    console.log('timestamp: ',player.getCurrentTime());

  // 클립 구간반복 설정
  // if (event.data == player.PlayerState.PLAYING) {
  //     var duration = section.end - section.start;
  //     setTimeout(restartVideoSection, duration * 1000);
  // }
  }

  function restartVideoSection() {
    //클립 구간반복 끝에 다다랐을 때 실행
  // player.seekTo(section.start);
  }

  //onClickKeyword: 예전 clickKey역할, alert 띄우고 currentIdx 값을 해당 key index값으로 바꿈, 타임스탬프 리스트도 리셋
  const onClickKeyword=(keyVal,idx)=>{
    alert(keyword_time_dict[keyVal]);
    setCurrentKey(keyVal);//현재 누른 버튼 인덱스
    setTimestampIdx(0);//software의 리스트에서 현재 보여지고 있는 인덱스
    setCurrentTime(keyword_time_dict[keyVal][0]);
    console.log('current key: ',keyVal);
  }

  //movePrev, moveNext: 예전 동일 이름 함수와 역할 같음
  const movePrev=()=>{
    if(timestampIdx>0){
      setTimestampIdx(timestampIdx-1);
      setCurrentTime(keyword_time_dict[currentKey][timestampIdx-1]);  
    }
  }

  const moveNext=()=>{
    console.log(`timestampIdx: ${timestampIdx}, length: ${keyword_time_dict[currentKey].length}`);
    if(timestampIdx<keyword_time_dict[currentKey].length){
      console.log(`change datas: stamp id: ${timestampIdx+1}, currentTime: ${currentKey}`)
      setTimestampIdx(timestampIdx+1);
      setCurrentTime(keyword_time_dict[currentKey][timestampIdx+1]);  
    }
  }

  return (
    <>
      <Wrapper className="video-header">
        rendering at react: video Id: {link}
      </Wrapper>
      
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
      <div>
        {keyValue.map((keyVal, idx)=>(
          //js 파일에서 button 3개 만든거 똑같은 내용임
          //버튼 클릭하면 onClickKeyword실행(이전js에서 clickKey역할)
          <button key={idx} onClick={()=>onClickKeyword(keyVal,idx)}>{keyVal}</button>
        ))}
      </div>

      <div>
        <button type="button" id ="prev" onClick={()=>movePrev()}>prev</button>
        {/* 원래 0:00들어가던 자린데 변수값으로 치환 */}
        <span id="timestamp">{currentTime}</span>
        <button type="button" id ="next" onClick={moveNext}>next</button>
      </div>

      <button type="button" id ="bookmark_save" onclick="bookmarkSaver()">bookmark save</button>
      <div>
        <span><a id="clip_1">0:00</a></span>
        <button type="button" id ="start_time" >start</button>
        <span><a id="clip_2">0:00</a></span>
        <button type="button" id ="end_time" >end</button>
        <button type="button" id ="clip_save" >save</button>
      </div>
    </>
  );
};

export default MyYoutube;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: red;
  background: linen;
`

