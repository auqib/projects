import Image from "next/image";

export default function Hero() {
    return (
        <section className="grid grid-cols-2">
            <div >
                <h1 className="text-4xl font-semibold">Pizza is everything</h1>
                <p className="mt-4 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, facilis at quos natus aliquam delectus consequuntur id sapiente veritatis aperiam iusto possimus nemo soluta iste doloremque aspernatur, exercitationem incidunt quibusdam!</p>

            </div>
            <div className=" relative">
                <Image src={'/pizza.png'} layout="fill" objectFit="contain" alt='pizza' />

            </div>
        </section>
    )
}