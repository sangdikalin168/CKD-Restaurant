/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { FormEvent, useState } from "react";
import JWTManager from "../../utils/jwt";
import { useAuthContext } from "../../context/AuthContext";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { useLoginMutation } from "../../generated/graphql";

function Login() {
    const { setIsAuthenticated } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const [login, _] = useLoginMutation({
        onError: (err: any) => {
            setLoading(false);
            setError(err.message);
        },
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const { data } = await login({
            variables: { loginInput: { username, password } },
        });

        if (data?.login.success) {
            console.log(data.login);
            const res = data.login?.user;
            JWTManager.SetUserDetail(res?.display_name, res?.role, res?.user_id)
            JWTManager.setToken(data.login.accessToken as string);
            setIsAuthenticated(true);
        } else {
            if (data?.login.message) {
                setError(data.login.message);
                setLoading(false);
            }
        }

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timeout);
    };


    return (
        <div>
            {loading ? (
                <LoadingPage />
            ) : (
                <figure className="h-screen flex bg-gray-100">
                    <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
                        <div className="text-primary m-6">
                            <div className="flex items-center mt-3 justify-center">
                                <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
                                    Login
                                </h1>
                            </div>
                            <form onSubmit={onSubmit} autoComplete="off">
                                <div className="col-span-6 sm:col-span-3 mt-4">
                                    <label
                                        htmlFor="first-name"
                                        className="block text-md  font-medium text-gray-700"
                                    >
                                        ឈ្មោះ ឬ លេខទូរស័ព្ទ
                                    </label>
                                    <input
                                        required
                                        name="username"
                                        type="text"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        autoComplete="off"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-4 mt-4">
                                    <label
                                        htmlFor="email-address"
                                        className="block text-md font-medium text-gray-700"
                                    >
                                        លេខសម្ងាត់
                                    </label>
                                    <input
                                        autoComplete="off"
                                        required
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-md"
                                    />
                                </div>

                                <div className="flex items-center mt-3 justify-center">
                                    <button
                                        className="text-md mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        value="Login"
                                    >
                                        ចូល
                                    </button>
                                </div>
                            </form>

                            {_error && (
                                <div role="alert">
                                    <div className="mt-5 bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                        Danger
                                    </div>
                                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                        <p>{_error}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </figure>
            )}
        </div>
    );
}

export default Login;
