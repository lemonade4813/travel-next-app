"use client"


import { useForm } from "react-hook-form";

export default function Login(){


        const {register, handleSubmit, watch, formState : {isValid, errors}} = useForm<any>({mode : "onSubmit"});


        const onSubmit = (data : any) => {
                console.log(data)
        }

        return(
                <div className="absolute w-[400px] h-[120px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-[40px] mb-8">로그인</h1>
                        <form className="flex flex-col items-center justify-center"
                        onSubmit={handleSubmit(onSubmit)}   
                        >
                        <div className="mb-8 group"> 
                                <label htmlFor="id" className="mr-4 w-16 inline-block">아이디</label>
                                <input {...register("id", { required: '아이디를 입력해주세요.'})} className="shadow-lg border-solid border-pink-400 border-2 w-[240px] h-12 rounded-lg"/>
                                <p className="text-[#DC143C] text-sm mt-2">{errors?.id?.message?.toString()}</p>
                        </div>
                        <div className="group">
                                <label htmlFor="password" className="mr-4 w-16 inline-block">패스워드</label>
                                <input {...register("password", { required: '패스워드를 입력해주세요.' })} className="shadow-lg border-solid border-pink-400 border-2 w-[240px] h-12 rounded-lg" type="password" id="password"/>     
                                <p className="text-[#DC143C] text-sm mt-2">{errors?.password?.message?.toString()}</p>
                        </div>
                        <button className={`${isValid ? 'bg-[#B80000]' :'bg-gray-300'} h-12 w-24 h-10 text-white rounded-lg mt-8`}>로그인</button>
                        </form>
                </div>
        )





}