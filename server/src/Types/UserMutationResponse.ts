import { Field, ObjectType } from 'type-graphql'
import { User } from '../entity/User'
import { MutationResponse } from './MutationResponse'

@ObjectType({ implements: MutationResponse })
export class UserMutationResponse implements MutationResponse {
	code: number
	success: boolean
	message?: string

	@Field({ nullable: true })
	user?: User

	@Field({ nullable: true })
	accessToken?: string
}