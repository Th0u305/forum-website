

export default function ErrorPage() {
  return (
    <div className="h-screen w-full bg-yellow-600 text-gray-900">
      <section className="home grid h-screen pt-32 pb-16">
        <div className="container grid content-center gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center">
          <div className="justify-self-center text-center lg:text-left">
            <p className="pb-2 font-semibold">Error 404</p>
            <h1 className="pb-4 text-5xl font-bold lg:text-6xl">Hey Buddy</h1>
            <p className="pb-8 font-semibold">
              We can't seem to find the page <br />
              you are looking for.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 py-4 px-8 font-bold text-white"
            >
              Go Home
            </a>
          </div>

          <div className="justify-self-center">
            <img
              src="https://res.cloudinary.com/dmegxaayi/image/upload/v1737036893/home-img_uuirtf.png"
              className="w-64 animate-float lg:w-[400px]"
              alt="home image"
            />
            <div className="mx-auto h-8 w-36 animate-shadow rounded-[50%] bg-gray-900/30 blur-md lg:w-64"></div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 self-end text-sm font-semibold">
          <p>0891 2345 6789</p>
          <p>|</p>
          <p>topicTree@xcompany.com</p>
        </div>
      </section>
    </div>
  );
}