const mimeTypes = [
    // WebM
    "video/webm",
    'video/webm; codecs="vp8"',
    'video/webm; codecs="vp9"',
    'video/webm; codecs="av1"',
    'video/webm; codecs="vp8, vorbis"',
    'video/webm; codecs="vp9, opus"',
    'video/webm; codecs="av1, opus"',

    // MP4
    "video/mp4",
    'video/mp4; codecs="avc1.42E01E"', // H.264 Baseline
    'video/mp4; codecs="avc1.4D401E"', // H.264 Main
    'video/mp4; codecs="avc1.64001E"', // H.264 High
    'video/mp4; codecs="mp4a.40.2"', // AAC-LC
    'video/mp4; codecs="mp4a.40.5"', // AAC-HE
    'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
    'video/mp4; codecs="hevc"', // H.265 / HEVC
    'video/mp4; codecs="av01"', // AV1 in MP4 container

    // Ogg
    "video/ogg",
    'video/ogg; codecs="theora"',
    'video/ogg; codecs="theora, vorbis"',

    // 3GPP
    "video/3gpp",
    "video/3gpp2",

    // AVI
    "video/x-msvideo",

    // Windows Media
    "video/x-ms-wmv",

    // QuickTime
    "video/quicktime",

    // Matroska
    "video/x-matroska",
    'video/x-matroska; codecs="avc1"',

    // MPEG
    "video/mpeg",
    'video/mpeg; codecs="mp1v"',
    'video/mpeg; codecs="mp2v"',
    'video/mpeg; codecs="mp4v"',

    // Flash Video
    "video/x-flv",

    // Real Media
    "video/x-pn-realvideo",

    // Apple HTTP Live Streaming
    "application/x-mpegURL",
    "application/vnd.apple.mpegURL",

    // MPEG-DASH
    "application/dash+xml",

    // Microsoft Smooth Streaming
    "application/vnd.ms-sstr+xml",
  ];

function inputChanged() {
  const selectedFile = document.getElementById("infile").files[0];
  const format = document.getElementById("selectFormat").value;
  console.log(selectedFile);
  console.log(format);
  convertVideo(selectedFile, format);
}
function convertVideo(video, format) {
  //const video = document.getElementById("myVideo");
  const videoPlayer = document.getElementById("videoPlayer");

  //break the video into frames
  //step through each frame and encode into output format

  //display video
  const videoUrl = URL.createObjectURL(video);
  videoPlayer.src = videoUrl;
}

function detectSupportedVideoEncodingFormats() {
  if (!window.MediaRecorder) {
    console.log("MediaRecorder API is not supported in this browser.");
    return [];
  }

  const supportedEncodingFormats = [];

 



  mimeTypes.forEach((mimeType) => {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      supportedEncodingFormats.push(mimeType);
    }
  });

  console.log("Supported video encoding formats:");
  supportedEncodingFormats.forEach((format) => console.log(format));

  return supportedEncodingFormats;
}

function populateOutputFormatSelectList(formats) {
  // Create a select element if it doesn't exist
  let selectList = document.getElementById("selectFormat");
  // Clear existing options
  selectList.innerHTML = "";

  // Add a default option
  const defaultOption = document.createElement("option");
  defaultOption.text = "Select a format";
  defaultOption.value = "";
  selectList.appendChild(defaultOption);

  // Add an option for each supported format
  formats.forEach((format) => {
    const option = document.createElement("option");
    option.value = format;
    option.text = format;
    selectList.appendChild(option);
  });
}
function getPlaybackFormats() {
    const supportedPlaybackFormats = [];

    mimeTypes.forEach((mimeType) => {
      if (MediaSource.isTypeSupported(mimeType)) {
        supportedPlaybackFormats.push(mimeType);
      }
    });

    console.log("Supported video playback formats:");
    supportedPlaybackFormats.forEach((format) => console.log(format));

    return supportedPlaybackFormats;
  }
function populateInputFormatDiv(){
    console.log("hello world")
    const playbacks =getPlaybackFormats()
    window.getElementById("playbackformatdisplay").innerHTML(playbacks);
}
populateInputFormatDiv();
populateOutputFormatSelectList(detectSupportedVideoEncodingFormats());
