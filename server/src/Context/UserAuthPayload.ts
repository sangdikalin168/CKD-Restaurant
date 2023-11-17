import { JwtPayload } from 'jsonwebtoken'

export type UserAuthPayload = JwtPayload & {
    user_id: number
    tokenVersion: number
}