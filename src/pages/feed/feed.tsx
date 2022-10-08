import { BlogArticles } from './blogArticles/blogArticles'
import './feed.css'
import { SideBar } from './sidebar/siderbar'

export default function Feed() {
  return (
    <div className="feed">
      <div className="feed__sidebar">
        <SideBar />
      </div>
      <div className="feed__articles">
        <BlogArticles />
      </div>
    </div>
  )
}
