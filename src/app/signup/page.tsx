"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import SignupImg from "@/asset/signup2.jpg"
import Image from "next/image";
import "./style.css"

export default function Signup(){

    const router = useRouter();

    const {register, watch, handleSubmit, formState : {errors, isValid}} = useForm<any>({mode : "onChange"})

    const submitSignupInfo = (data : any) => {
        console.log(data)

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`, 
                {
                        method : 'POST', 
                        body : JSON.stringify(data),
                        headers: {
                                "Content-type" : "application/json"
                        }
                })
        .then((response) => {console.log(response)
                             router.push('/login')
                             return response.json()}
             )
        .catch((error) => console.log(error));
    }

    const password = watch('password');

    return(
        
        <div>
         <div className="w-full sm:h-auto flex-shrink-0">
                    <Image
                        src={SignupImg}
                        alt="Login Image"
                        className="object-cover h-full filter grayscale-[100%] opacity-90"
                        style={{ width: '100vw', height: 'auto' }}
                    />
                </div>
            <div className="border">
                <div className="flex justify-center items-center min-h-screen"> 
                    <div className="w-[400px]">
                        <h1 className="text-[40px] mb-8">회원가입</h1>
                        <form onSubmit={handleSubmit(submitSignupInfo)} className="flex flex-col items-center justify-center">
                            <div className="mb-8 group"> 
                                <label htmlFor="userId" className="mr-4 w-24 inline-block">아이디</label>
                                <input {...register("userId", { required: '아이디를 입력해주세요.'})} className="signupInput"/>
                                <p className="signupInputMessage">{errors?.id?.message?.toString()}</p>
                            </div>
                            <div className="mb-8 group"> 
                                <label htmlFor="password" className="mr-4 w-24 inline-block">비밀번호</label>
                                <input 
                                    type="password"
                                    {...register("password", {pattern : {value : /^(?=.*[A-Za-z])(?=.*[0-9]|.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{10,}$|^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{10,}$/, message : '영문자, 숫자, 특수문자 중 2종류 이상을 포함하고 최소 10자 이상이어야 합니다.'}})} 
                                    className="signupInput"/>
                                <p className="signupInputMessage">{errors?.password?.message?.toString()}</p>
                            </div>
                            <div className="mb-8 group">
                                <label htmlFor="passwordConfirm" className="mr-4 w-24 inline-block">비밀번호 확인</label>
                                <input 
                                    type="password"
                                    {...register("passwordConfirm", { 
                                        validate: value => value === password || '비밀번호가 일치하지 않습니다.' 
                                    })} 
                                    className="signupInput"/>
                                <p className="signupInputMessage">{errors?.passwordConfirm?.message?.toString()}</p>
                            </div>
                            <div className="mb-8 group"> 
                                <label htmlFor="phone" className="mr-4 w-24 inline-block">전화번호</label>
                                <input {...register("phone", { pattern : {value : /^\d+$/, message : '숫자만 입력 가능합니다.'}})} className="signupInput"/>
                                <p className="signupInputMessage">{errors?.phone?.message?.toString()}</p>
                            </div>
                            <button
                                type="submit" 
                                className={`rounded-lg w-40 h-12 mt-20 text-white ${isValid ? 'bg-red-800' : 'bg-gray-400'}`} 
                                disabled={!isValid}>가입하기
                            </button>
                        </form>
                    </div>
                </div>
            </div>   
        </div>            
    )
}