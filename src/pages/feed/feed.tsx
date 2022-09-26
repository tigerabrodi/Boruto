import { Articles } from './articles/articles'
import './feed.css'
import { SideBar } from './sidebar/siderbar'

export function Feed() {
  return (
    <div className="feed">
      <SideBar />
      <Articles />
    </div>
  )
}
