import React, { useEffect } from 'react'

/**** 
 * Animated handwriting text
 * Credit to: https://akashraj9828.github.io/svg-text-animation-generator/
*/
export default function SplashScreen() {

    useEffect(() => {
        function setTextAnimation(
            delay: number, 
            duration: number, 
            strokeWidth: number, 
            timingFunction: string, 
            strokeColor: string,
            repeat: boolean): void {
            const paths = document.querySelectorAll(".splash__logo path");
            const mode=repeat?'infinite':'forwards'
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i] as SVGGeometryElement;
                // istanbul ignore next
                const length = path.getTotalLength();
                // const length = 1;
                path.style["stroke-dashoffset"] = `${length}px`;
                path.style["stroke-dasharray"] = `${length}px`;
                path.style["stroke-width"] = `${strokeWidth}px`;
                path.style["stroke"] = `${strokeColor}`;
                path.style["animation"] = `${duration}s svg-text-anim ${mode} ${timingFunction}`;
                path.style["animation-delay"] = `${i * delay}s`;
            }
        }

        function dismissScreen(element) {
            return new Promise((resolve) => {
                window.addEventListener('load', function() {
                    element.style.animation = "zoom-in-fade-out 1000ms forwards";
                    resolve(true);
                  });
            })
        }

        async function exitScreen() {

            const splashElem = document.querySelector(".splash-screen") as HTMLElement;
            try{
                await dismissScreen(splashElem);
            } catch {
                console.log("not yet");
            }
            setTimeout(()=>{
                splashElem.style.display = "none";
            }, 1000)
        }

        setTextAnimation(0,2,2,'ease-in-out','#ffffff',false);
        exitScreen();

    }, [])

    const mystyle:React.CSSProperties = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
      };

  return (
    <div className='splash-screen'>
        <div className="svgWrapper splash__logo">
        <svg width="80.4" height="97.8" viewBox="0 0 80.4 99.8" xmlns="http://www.w3.org/2000/svg">
            <g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke="#000" strokeWidth="0.25mm" fill="none" style={mystyle}>
                <path d="M 10.35 9.9 L 0 8.85 L 0 0 L 52.35 0 L 52.35 8.85 L 40.35 10.05 Q 40.2 19.05 40.2 28.125 L 40.2 46.5 L 40.2 53.4 A 1899.199 1899.199 0 0 0 40.219 61.725 A 2224.262 2224.262 0 0 0 40.275 70.5 Q 40.35 79.5 40.5 88.8 L 63.15 88.8 L 67.2 67.95 L 80.4 67.95 L 78.9 97.8 L 0 97.8 L 0 88.95 L 10.35 87.9 Q 10.5 79.05 10.5 70.725 L 10.5 55.65 L 10.5 46.5 L 10.5 28.2 Q 10.5 19.05 10.35 9.9 Z" id="0" vectorEffect="non-scaling-stroke"/>
            </g>
        </svg>

        <svg width="63.452" height="77.852" viewBox="0 0 63.452 79.852" xmlns="http://www.w3.org/2000/svg">
            <g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke="#000" strokeWidth="0.25mm" fill="none" style={mystyle}>
                <path d="M 0 70.5 L 0.75 51.3 L 14.4 51.3 L 16.8 66.9 Q 19.35 67.95 22.05 68.475 Q 24.75 69 27.6 69 A 29.155 29.155 0 0 0 30.913 68.824 Q 34.284 68.438 36.45 67.2 A 5.961 5.961 0 0 0 39.46 62.865 A 9.405 9.405 0 0 0 39.6 61.2 A 7.326 7.326 0 0 0 37.945 56.565 A 9.874 9.874 0 0 0 37.275 55.8 Q 35.504 53.972 30.732 52.406 A 54.642 54.642 0 0 0 27.45 51.45 L 18.9 49.2 A 29.868 29.868 0 0 1 12.403 46.644 A 21.845 21.845 0 0 1 5.4 40.725 A 22.454 22.454 0 0 1 0.989 29.758 A 29.526 29.526 0 0 1 0.75 25.95 Q 0.75 14.7 9.375 7.35 Q 16.353 1.404 28.29 0.268 A 62.466 62.466 0 0 1 34.2 0 A 55.91 55.91 0 0 1 42.444 0.586 A 46.71 46.71 0 0 1 47.025 1.5 A 59.438 59.438 0 0 1 55.278 4.272 A 70.716 70.716 0 0 1 59.1 6 L 57.9 22.95 L 44.1 22.95 L 40.8 9.6 A 45.028 45.028 0 0 0 38.837 9.255 A 54.556 54.556 0 0 0 37.575 9.075 Q 36.254 8.903 34.538 8.863 A 46.3 46.3 0 0 0 33.45 8.85 A 15.645 15.645 0 0 0 30.076 9.196 A 11.46 11.46 0 0 0 26.325 10.725 A 6.091 6.091 0 0 0 23.494 15.164 A 9.087 9.087 0 0 0 23.4 16.5 A 5.828 5.828 0 0 0 24.14 19.297 Q 24.647 20.236 25.5 21.15 Q 27.448 23.237 34.299 25.195 A 74.459 74.459 0 0 0 35.4 25.5 L 43.8 27.75 A 41.536 41.536 0 0 1 49.919 29.899 Q 55.765 32.522 58.875 36.6 A 22.043 22.043 0 0 1 63.047 46.447 A 29.887 29.887 0 0 1 63.45 51.45 A 28.429 28.429 0 0 1 62.313 59.724 A 20.983 20.983 0 0 1 53.775 71.25 Q 45.919 76.61 33.562 77.617 A 73.417 73.417 0 0 1 27.6 77.85 A 56.27 56.27 0 0 1 11.614 75.652 A 48.277 48.277 0 0 1 0 70.5 Z" id="0" vectorEffect="non-scaling-stroke"/>
            </g>
        </svg>

        <svg width="29.404" height="29.254" viewBox="0 0 29.404 31.254" xmlns="http://www.w3.org/2000/svg">
            <g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke="#000" strokeWidth="0.25mm" fill="none" style={mystyle}>
                <path d="M 8.377 27.923 A 14.854 14.854 0 0 0 14.702 29.252 A 18.003 18.003 0 0 0 14.75 29.252 A 14.308 14.308 0 0 0 25.127 25.052 Q 29.402 20.852 29.402 14.852 A 17.673 17.673 0 0 0 29.402 14.804 A 14.43 14.43 0 0 0 25.127 4.352 A 16.819 16.819 0 0 0 24.959 4.184 A 14.044 14.044 0 0 0 14.702 0.002 Q 8.552 0.002 4.277 4.352 A 17.137 17.137 0 0 0 4.244 4.386 A 14.431 14.431 0 0 0 0.002 14.852 A 16.696 16.696 0 0 0 0.004 15.086 A 13.743 13.743 0 0 0 4.277 25.052 A 14.594 14.594 0 0 0 8.377 27.923 Z" id="0" vectorEffect="non-scaling-stroke"/>
            </g>
        </svg>
        </div>
    </div>
  )
}
