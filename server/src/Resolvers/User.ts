import { Arg, Ctx, Mutation, Query, Resolver, ID, InterfaceType, ObjectType } from "type-graphql";
import { User } from "../entity/User";
import { GetUser } from "../Types/GetUser";
import { Context } from "../Context/Context";
import { compare, hash } from "bcryptjs";
import { createToken, sendRefreshToken } from "../Utils/auth";
import { RegisterInput } from "../Types/RegisterInput";

import { Field, InputType } from 'type-graphql'

@InputType()
export class LoginInput {
  @Field()
  username: string

  @Field()
  password: string
}

@InterfaceType()
export abstract class IMutationResponse {
  @Field()
  code: number

  @Field()
  success: boolean

  @Field({ nullable: true })
  message?: string
}

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {
  code: number
  success: boolean
  message?: string

  @Field({ nullable: true })
  user?: User

  @Field({ nullable: true })
  accessToken?: string
}

@Resolver()
export class UserResolver {
  @Query((_return) => [User])
  async users(): Promise<User[]> {
    return await User.find({ order: { user_id: "DESC" } });
  }

  @Query((returns) => GetUser)
  async get_user(@Arg("user_id", (_type) => ID) user_id: number) {
    const user = await User.findOne({ where: { user_id: user_id } });
    return user;
  }

  @Mutation((_return) => UserMutationResponse)
  async create_user(
    @Arg("userInput")
    { username, password, display_name, phone, role }: RegisterInput,
    @Ctx() { }: Context
  ): Promise<UserMutationResponse> {
    const existingUser = await User.findOne({
      where: [{ username: username }, { phone: phone }],
    });

    if (existingUser) {
      return {
        code: 400,
        success: false,
        message: "User Already Register",
      };
    }

    const hashedPassword = await hash(password, 12);

    await User.insert({
      username,
      password: hashedPassword,
      phone,
      display_name,
      role,
    });

    return {
      code: 200,
      success: true,
      message: "User Create Success",
    };
  }

  @Mutation((_return) => UserMutationResponse)
  async login(
    @Arg("loginInput") { username, password }: LoginInput,
    @Ctx() { res }: Context
  ): Promise<UserMutationResponse> {
    const existingUser = await User.findOne({
      where: [{ username: username }, { phone: username }],
    });

    if (!existingUser) {
      return {
        code: 400,
        success: false,
        message: "User not found",
      };
    }
    const isPasswordValid = await compare(password, existingUser.password);

    if (!isPasswordValid) {
      return {
        code: 400,
        success: false,
        message: "Incorrect password",
      };
    }

    sendRefreshToken(res, existingUser);

    return {
      code: 200,
      success: true,
      message: "Logged in successfully",
      user: existingUser,
      accessToken: createToken("accessToken", existingUser),
    };
  }

  @Mutation((_return) => UserMutationResponse)
  async logout(
    @Arg("user_id", (_type) => ID) user_id: number,
    @Ctx() { res }: Context
  ): Promise<UserMutationResponse> {
    const existingUser = await User.findOne({ where: { user_id: user_id } });

    if (!existingUser) {
      return {
        code: 400,
        success: false,
      };
    }

    existingUser.tokenVersion += 1;

    await existingUser.save();

    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_NAME as string, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/refresh_token",
    });

    return { code: 200, success: true };
  }
}
