const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress')

const currentTimeEL = document.getElementById('current-time');
const durationEL = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//Music
const songs = [
    {
        name:'song1',
        displayName:'Alvida - Rangoon',
        artist:'Arjit Singh',

    },

    {
        name:'song2',
        displayName:'Main Haan Kya Kaha',
        artist:' Lata Mangeshkar, Mohammed Rafi',
    },
      
    {    
        name:'song3',
        displayName:'Kya Khub Rab ne Kiya',
        artist:'Shreya Goshal',
    },

    {   
         name:'song4',
        displayName:'Vaaste',
        artist:'Dhavni Bhanushali',
    }

    
];

//Check if playing
let isPlaying = false;

//Play
function playSong()
{
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

//Pause
function pauseSong()
{
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

//Play or pause event listener
playBtn.addEventListener('click', ()=>(isPlaying? pauseSong() : playSong()));

//Update DOM
function loadSong(song)
{
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

//Next Song
function nextSong()
{
    songIndex++;
    if(songIndex > songs.length - 1)
    {
        songIndex = 0; 
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Previous Song
function prevSong()
{
    songIndex--;
    if(songIndex < 0)
    {
        songIndex = songs.length-1;
    }
   
    loadSong(songs[songIndex]);
    playSong();
}

//Current Song
let songIndex = 0;

//on load - select first song
loadSong(songs[songIndex]);

//Update Progress Bar and time
function updateProgressBar(e)
{
   if(isPlaying)
   {
    const {duration,currentTime} = e.srcElement;
     //update progress bar width
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`;
    //calculate display for duration minutes
    const durationMinutes = Math.floor(duration/60);
    console.log(durationMinutes);
    //calculate display fo rduration seconds
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10)
    {
        durationSeconds = `0${durationSeconds}`;
    }
    console.log(durationSeconds);
    
    //Delay switching duration element to avoid NaN
    if(durationSeconds)
    {
        durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Calculate display time for current
    const currentMinutes = Math.floor(currentTime/60);
    console.log(currentMinutes);
    //calculate display for current seconds
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10)
    {
        currentSeconds = `0${currentSeconds}`;
        
    }
    currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;
   }
} 

//Set Progress Bar
function setProgressBar(e)
{
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration} = music;
  music.currentTime = (clickX / width) * duration;

}

//Event Listener
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);