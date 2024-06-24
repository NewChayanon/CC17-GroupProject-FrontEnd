import fflogo from "../assets/FF-logo.png";
import Footer from "../layouts/Footer";

export default function LoginPage() {
  return (
    <div className="bg-secondary h-screen flex flex-col">
      <div className="flex p-2 h-12 xl:h-24 items-center">
        <a className="btn btn-ghost text-x">
          <img className="w-auto h-full" src={fflogo} />
        </a>
        <div>
          <p className="text-2xl">Freshy Foodie</p>
          <p className="text-base">Freshly Meet, Freshly Eat</p>
        </div>
      </div>
      <div className="flex flex-1 h-screen justify-center items-center">
        <div className="bg-absolutewhite p-12 rounded-3xl">
          <label className="input input-bordered flex items-center gap-2 bg-absolutewhite">
            <input type="text" className="grow" placeholder="Daisy" />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-absolutewhite">
            <input type="text" className="grow" placeholder="daisy@site.com" />
          </label>
        </div>
      </div>
      <Footer />
    </div>
  );
}
