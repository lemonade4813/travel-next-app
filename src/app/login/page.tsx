"use client"

import { setCookie } from 'cookies-next';
import Image from "next/image";
import { useForm } from "react-hook-form";
import LoginImg from "@/asset/login.jpg"
import { useRouter } from "next/navigation";
import { useLogin } from '@/LoginContext';


export default function Login() {

    const router = useRouter();

    const { setIsLoggedIn } = useLogin();

    const { register, handleSubmit, formState: { isValid, errors } } = useForm<any>({ mode: "onSubmit" });

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json"
                    }
                })

            if(!res.ok){
                throw new Error("로그인에 실패하였습니다");
            }

            const { access_token : accessToken } = await res.json();
            
            if(accessToken){
                setCookie('accessToken', accessToken, { maxAge: 7 * 24 * 60 * 60 });
                setIsLoggedIn(true);
                router.push('/');
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    }

    return (
        <div>
            <div className="w-full overflow-hidden">
                <div className="w-full h-[240px] flex-shrink-0">
                    <Image
                        src={LoginImg}
                        alt="Login Image"
                        className="object-cover h-full filter grayscale-[100%] opacity-90"
                        style={{ width: '100vw', height: 'auto' }}
                    />
                </div>
                <div className="border shadow-lg">
                    <div className="flex justify-center items-center min-h-screen">
                        <div>
                            <h1 className="text-[40px] mb-8">로그인</h1>
                            <form className="flex flex-col items-center justify-center"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="mb-8 group">
                                    <label htmlFor="userId" className="mr-4 w-16 inline-block">아이디</label>
                                    <input {...register("userId", { required: '아이디를 입력해주세요.' })} className="shadow-sm bg-pink-100 w-[240px] h-12 rounded-lg" />
                                    <p className="text-[#DC143C] text-sm mt-2">{errors?.id?.message?.toString()}</p>
                                </div>
                                <div className="group">
                                    <label htmlFor="password" className="mr-4 w-16 inline-block">패스워드</label>
                                    <input {...register("password", { required: '패스워드를 입력해주세요.' })} className="shadow-sm bg-pink-100 w-[240px] h-12 rounded-lg" type="password" id="password" />
                                    <p className="text-[#DC143C] text-sm mt-2">{errors?.password?.message?.toString()}</p>
                                </div>
                                <button className={`${isValid ? 'bg-[#B80000]' : 'bg-gray-300'} w-40 h-12 text-white rounded-lg mt-8`}>로그인</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}