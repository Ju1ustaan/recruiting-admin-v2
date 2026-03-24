import Link from "next/link"

const LogIn = () => {
    return (
        <div className=" min-h-screen flex items-center justify-center">
            <div className=" bg-white/25 backdrop-blur-md border border-white/40 shadow-lg rounded-lg p-5 w-1/3 flex flex-col justify-center items-center gap-5">
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

                <button className=" bg-white/25 backdrop-blur-md border border-white/40 shadow-lg w-full rounded-md font-bold py-2">Войти</button>
                <Link href={'register'} className="text-blue-700 text-sm">Регистрация</Link>
            </div>
        </div>
    )
}

export default LogIn