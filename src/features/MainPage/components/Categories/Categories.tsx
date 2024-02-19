import { FC } from "react";
import { categoriesItems } from "../../constants/categoriesConstants";

export const Categories: FC = () => {
  return (
    <section className="w-full bg-cover bg-[url('/city-bg.jpg')]" id="services">
      <div className="flex md:justify-between my-auto font-playfair max-w-screen ">
        <div className="hidden md:visible bg-transparent w-[35%] pl-96px md:flex items-center justify-center text-white ">
          <div className="h-3/5 ">
            <h1 className="font-bold text-4xl">
              СФЕРЫ <br />
              <span className="font-medium">ДЕЯТЕЛЬНОСТИ</span>
            </h1>
          </div>
        </div>

        <div className="bg-[#426179]/[.6] w-full md:w-[65%] pl-19 md:pr-0px flex md:items-center ">
          <div className="flex flex-col  h-5/5  sm:h-3/5 md:pl-0 lg:flex-wrap lg:h-/5">
            <div className="md:hidden pt-10 pb-10 text-center">
              <h1 className=" pb-0 text-5xl font-bold text-white">
                СФЕРЫ <br />
                <span className="font-medium text-white">ДЕЯТЕЛЬНОСТИ</span>
              </h1>
            </div>
            <ul className="pl-10 mb-[200px] md:mb-[600px] grid md:grid-cols-2 md:pl-20 list-[square] w-[100%] md:pr-[100px] text-white">
              {categoriesItems.map((item) => (
                <li className="pb-2 mb-[5px] h-full" key={item.id}>
                  <h1 className="text-3xl ">{item.title}</h1>
                  {item.subcategories && (
                    <ul className="">
                      {item.subcategories.map((subcategory) => (
                        <li key={subcategory.id}>
                          —{" "}
                          <span className="text-[22px]">
                            {subcategory.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
