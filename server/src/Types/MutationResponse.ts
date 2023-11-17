import { Field, InterfaceType } from 'type-graphql'

@InterfaceType()
export abstract class MutationResponse {
	@Field()
	code: number

	@Field()
	success: boolean

	@Field({ nullable: true })
	message?: string
}