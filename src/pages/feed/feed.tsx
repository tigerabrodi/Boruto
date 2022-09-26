import { Articles } from './articles/articles'
import './feed.css'
import { SideBar } from './sidebar/siderbar'

export function Feed() {
  return (
    <div className="feed">
      <div className="feed__sidebar">
        <SideBar />
      </div>
      <div className="feed__articles">
        <Articles />
      </div>
    </div>
  )
}
