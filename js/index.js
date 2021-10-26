"use strict"
const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

 const soundsGroup = {
  heaterKit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup
}
 
 const KeyboardKey = ({ play, sound: { id, key, url, keyCode } }) => {

  const handleKeydown = (event) => {
    if(event.keyCode === keyCode) {
      play(key, id);
    }
  }
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
  }, [])
  return (
  <button id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
  <audio className="clip" id={key} src={url} />
   {key}
   </button>
   );
}
  const Keyboard = ({ power,  play, sounds}) => (
  <div className="keyboard">
   {power
    ? sounds.map((sound) => <KeyboardKey play={play} sound={sound} />)
    : sounds.map((sound) => <KeyboardKey play={play} sound={{...sound, url: "#"}} />)
   } 

    
 </div>
)
  const DrumControl = ({ stop, power, name, volume, handleVolumeChange, changeSoundsGroup }) => (
  <div className="control">

 <button onClick={stop}>Power {power ?  "OFF" : "ON"}</button>
  <h2>Volume %{Math.round(volume * 100)}</h2>
  <input className="range"
   max="1"
    min="0"
    step='0.01'
    type="range"
    value={volume}
    onChange={handleVolumeChange}

    />
      
     <h2 id="display">{name}</h2>
    <button onClick={changeSoundsGroup}>Sounds</button>

    <div className='logo'>{'Jodlo' + String.fromCharCode(160)}
  <i class=" bi bi-bar-chart" />
</div>

  </div>
)


  
 
const App = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsGroup[soundType]);


 const stop = () => {
    setPower(!power)
  }

 
  const play = (key, sound) => {
   setSoundName(sound)
   
   const audio = document.getElementById(key);
   styleActiveKey(audio)
   audio.currentTime = 0;
   audio.play();
   deactivateAudio(audio);
 }
 
 
const changeSoundsGroup = () => {
  setSoundName("")

 if(soundType === "heaterKit") {
  setSoundType("smoothPianoKit");
  setSounds(soundsGroup.smoothPianoKit)
} else {
  setSoundType("heaterKit")
  setSounds(soundsGroup.heaterKit)
}
}
    const styleActiveKey = (audio) => {
      audio.parentElement.style.backgroundColor = "#0d7066"
      audio.parentElement.style.color = "#ffffff"
    }

    const deactivateAudio = (audio) => {
      setTimeout(() => {
      audio.parentElement.style.backgroundColor = "#ffffff"
      audio.parentElement.style.color = "#000000"
       }, 300)
    }
  
   const handleVolumeChange = (event) => {
   setVolume(event.target.value)
}

 const setKeyVolume = () => {
   const audios = sounds.map(sound => document.getElementById(sound.key));
   audios.forEach( audio => {
     if(audio) {
       audio.volume = volume;
     }
   })
     
}


 return (
 <div id="drum-machine">
 {setKeyVolume()}
 <div className="wrapper">

  <Keyboard power={power} play={play} sounds={sounds} />

  <DrumControl
   stop={stop}
   power={power}
   volume={volume}
   handleVolumeChange={handleVolumeChange}
   name={soundName || soundsName[soundType]}
   changeSoundsGroup={changeSoundsGroup}
    />
  
  </div>
 </div>
 )
};

ReactDOM.render(<App />, document.getElementById('app'));