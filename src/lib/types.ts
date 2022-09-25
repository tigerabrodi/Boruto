import type { User } from '@firebase/auth'
import type { FieldValue, Timestamp } from '@firebase/firestore'

export type DateType = FieldValue | Timestamp | number

export type CreatedAt = { createdAt: DateType }

export type UserData = {
  username: string | null
  user: User | null | undefined
}

export type UserProfile = {
  username: string
  email: string
  fullname: string
  age: string
  bio: string
  avatarUrl: string
  likeCount: number
  postCount: number
  createdAt: DateType
  uid: string
} & CreatedAt

export type Post = {
  title: string
  body: string
  commentsCount: number
  likeCount: number
  createdAt: DateType
  uid: string
  imageUrl: string
  readingTime: string
  authorUsername: string
  authorAvatarUrl: string
  authorFullname: string
} & CreatedAt

export type Comment = {
  text: string
  claplikeount: number
  uid: string
  authorUsername: string
  authorAvatarUrl: string
  authorFullname: string
  id: string
} & CreatedAt
