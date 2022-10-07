import { IoEllipsisHorizontalSharp } from 'react-icons/io5'

import { useAuthContext } from '../../../../context/AuthContext'

type EllipsisProps = {
  commentUid: string | undefined
}
export function Ellipsis({ commentUid }: EllipsisProps) {
  const { user } = useAuthContext()
  return (
    <>
      {user?.uid === commentUid && (
        <button className="ellipsis" aria-label="Edit or delete your comment">
          <IoEllipsisHorizontalSharp />
        </button>
      )}
    </>
  )
}
