import Link from "next/link"
import Image from "next/image"

const LogIn = () => {
    return (
        <div className="bg-blue-400 min-h-screen flex items-center justify-center">
            <div className="bg-gray-300 rounded-lg p-5 w-1/3 flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold">Dashboard</h1>
                <p className="text-md font-bold text-gray-700 text-center">Авторизация</p>
                <label htmlFor="name" className="relative text-sm text-gray-700 w-full">
                    <span >Логин</span>
                    <input id="name" type="text" className="p-2 bg-white rounded-md w-full"/>
                </label>
                <label htmlFor="password" className="relative text-sm text-gray-700 w-full">
                    <span>Пароль</span>
                    <input id="password" type="password" className="p-2 bg-white rounded-md w-full"/>
                </label>

                <button className="bg-blue-400 w-full rounded-md font-bold py-2">Войти</button>
                <Link href={'register'} className="text-blue-700 text-sm">Регистрация</Link>
            </div>
            <Image src="/folders.jpg" width={100} height={100} alt="Sunlight" className="z-999 absolute top-0 left-0 w-[400px] h-[400px] object-cover pointer-events-none" />
        </div>
    )
}

export default LogIn