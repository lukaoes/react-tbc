"use client";
import { usePathname } from "next/navigation";
import { BASE_URL } from "../../api";
import { FC } from "react";
import { useCurrentLocale } from "../../locales/client";
interface SingleProdSocials {
  titlege: string;
  titleen: string;
  type: string;
}
const SingleProdSocialShare: FC<SingleProdSocials> = ({
  type,
  titleen,
  titlege,
}) => {
  const path = usePathname();
  const locale = useCurrentLocale();
  const baseUrl = BASE_URL;
  const text = `${type === "sell" ? "იყიდება" : "ქირავდება"} ${
    locale === "ge"
      ? titlege
        ? titlege
        : titleen
      : titleen
      ? titleen
      : titlege
  }`;
  const url = baseUrl + path;

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}&quote=${encodeURIComponent(text)}`;
  return (
    <div className="single-prod-social-share">
      <h1>გააზიარე განცხადება</h1>

      <div className="prod-social-container">
        <div className="social-copy" onClick={copyUrl}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width={30}
            height={30}
            viewBox="0 0 256 256"
            enableBackground="new 0 0 256 256"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  fill="#000000"
                  d="M100.8,230.4c-20.7,20.7-54.5,20.7-75.3,0c-20.7-20.7-20.7-54.5,0-75.2l53.3-53.3c20.7-20.7,54.5-20.7,75.3,0c0.6,0.6,1.1,1.1,1.6,1.7c0.3,0.3,0.6,0.5,0.9,0.8c0.8,0.8,1.5,1.8,2.1,2.7c0.1,0.1,0.1,0.2,0.2,0.3c0,0,0,0,0,0c2.6,4.8,1.8,10.9-2.3,15c-4.1,4.1-10.3,4.8-15.1,2.2c-0.3,0.4-3.7-3-5.4-4.7l0,0C125.3,109,107.8,109,97,119.8l-53.4,53.4c-10.8,10.8-10.8,28.4,0,39.2l0,0c10.8,10.8,28.4,10.8,39.2,0l32.2-32.2c11.2,5.5,24.3,5.7,35.5,0.5L100.8,230.4L100.8,230.4L100.8,230.4z M230.4,100.8l-53.3,53.3c-20.7,20.7-54.5,20.7-75.3,0c-0.6-0.6-1.1-1.1-1.6-1.7c-0.3-0.3-0.6-0.5-0.9-0.8c-0.8-0.8-1.5-1.8-2.1-2.7c-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0c-2.6-4.8-1.8-10.9,2.3-15c4.1-4.1,10.3-4.8,15.1-2.2c0.3-0.4,3.7,3,5.4,4.7l0,0c10.8,10.8,28.3,10.9,39.1,0.1l53.4-53.4c10.8-10.8,10.8-28.4,0-39.2v0c-10.8-10.8-28.4-10.8-39.2,0l-32.2,32.1c-11.1-5.4-24.3-5.7-35.5-0.5l49.7-49.7c20.7-20.7,54.5-20.7,75.3,0C251.2,46.3,251.2,80.1,230.4,100.8L230.4,100.8L230.4,100.8z"
                />
              </g>
            </g>
          </svg>
        </div>
        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 48 48"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs></defs>
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Color-"
                transform="translate(-200.000000, -160.000000)"
                fill="#4460A0"
              >
                <path
                  d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                  id="Facebook"
                ></path>
              </g>
            </g>
          </svg>
        </a>
        <a
          href={`https://x.com/intent/tweet?text=${text}: ${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 512"
            width={40}
            height={40}
          >
            <path d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0z" />
            <path
              fill="#fff"
              fillRule="nonzero"
              d="M318.64 157.549h33.401l-72.973 83.407 85.85 113.495h-67.222l-52.647-68.836-60.242 68.836h-33.423l78.052-89.212-82.354-107.69h68.924l47.59 62.917 55.044-62.917zm-11.724 176.908h18.51L205.95 176.493h-19.86l120.826 157.964z"
            />
          </svg>
        </a>
        <a href={`https://web.whatsapp.com/send?text=${text}: ${url}`}>
          <svg
            fill="#00b922"
            height="35px"
            width="35px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 308 308"
            xmlSpace="preserve"
          >
            <g id="XMLID_468_">
              <path
                id="XMLID_469_"
                d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
		c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
		c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
		c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
		c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
		c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
		c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
		c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
		c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
		C233.168,179.508,230.845,178.393,227.904,176.981z"
              />
              <path
                id="XMLID_470_"
                d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
		c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
		c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
		 M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
		l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
		c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
		C276.546,215.678,222.799,268.994,156.734,268.994z"
              />
            </g>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SingleProdSocialShare;