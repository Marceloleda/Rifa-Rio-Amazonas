import { sellers } from "@prisma/client";

async function signIn(params: SignInParams): Promise<SignInResult> {
    const { email, password } = params;
  
    const user = await getUserOrFail(email);
  
    await validatePasswordOrFail(password, user.password);
  
    const token = await createSession(user.id);
  
    return {
      user: exclude(user, 'password'),
      token,
    };
}


export type SignInParams = Pick<sellers, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;
