import ContentLoader from 'react-content-loader'

import './skeleton.css'

export function Skeleton() {
  return (
    <div>
      <ContentLoader
        className="article-skeleton"
        viewBox="0 0 300 275"
        backgroundColor="#b5b5b5"
        foregroundColor="#d1d1d1"
      >
        <circle className="skeleton-profile" cx="18" cy="260" r="15" />
        <rect
          className="skeleton-username"
          x="40"
          y="250"
          rx="4"
          ry="4"
          width="80"
          height="8"
        />
        <rect
          className="skeleton-minute"
          x="40"
          y="262"
          rx="4"
          ry="4"
          width="50"
          height="7"
        />
        <rect
          className="skeleton-title"
          x="0"
          y="160"
          rx="5"
          ry="5"
          width="300"
          height="30"
        />
        <rect
          className="skeleton-text"
          x="0"
          y="195"
          rx="5"
          ry="5"
          width="300"
          height="10"
        />
        <rect
          className="skeleton-text"
          x="0"
          y="210"
          rx="5"
          ry="5"
          width="300"
          height="10"
        />
        <rect
          className="skeleton-text"
          x="0"
          y="225"
          rx="5"
          ry="5"
          width="300"
          height="10"
        />
        <rect
          className="skeleton-image"
          x="0"
          y="0"
          rx="5"
          ry="5"
          width="300"
          height="150"
        />
      </ContentLoader>
    </div>
  )
}
