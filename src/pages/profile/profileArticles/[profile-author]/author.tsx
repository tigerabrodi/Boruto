import { FiBookOpen } from 'react-icons/fi'

type AuthorProps = {
  username: string
  readMin: number
}

export function Author({ username, readMin }: AuthorProps) {
  return (
    <div className="user__article--author">
      <p>@{username}</p>
      <p>
        <FiBookOpen className="icon" />
        {readMin} read min
      </p>
    </div>
  )
}
