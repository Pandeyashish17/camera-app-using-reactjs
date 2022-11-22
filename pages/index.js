import { useEffect, useRef } from "react";
export default function Home() {
  const videoRef = useRef(null);
  const photoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      });
  }, [videoRef]);

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    let context = photo.getContext("2d");
    context.drawImage(video, 0, 0, width, height);
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center gap-2 mt-10">
        <div className="">
          <video className="w-[50vw] h-[40vh]" ref={videoRef}></video>
        </div>

        <button onClick={() => takePhoto()}>Take photo</button>
        {photoRef && <canvas className="w-[50vw] h-[50vh]" ref={photoRef}></canvas>}
      </div>
    </>
  );
}
