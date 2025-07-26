import React from "react";

const services = [
  {
    name: "Full stack development",
    description: "Learn tecnologies : React, Angular, NodeJs, ExpressJS, Mongodb NextJs",
    price: "₹999/session",
  },
  {
    name: "Full stack QA / SDET",
    description: "Learn Selenium, TestNg, Cucumber, RestAssured, Postman, SQL.",
    price: "₹999/session",
  },
  {
    name: "Devops",
    description: "Learn AWS, Azure, Jenkins, GIT, DOCKER, Kubernaties",
    price: "₹999/session",
  },
  {
    name: "Programming Languages",
    description: "Learn Python , JAVA, Javascript",
    price: "₹999/session",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-2 sm:px-6 md:px-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-[#232526] drop-shadow-lg">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {services.map((service) => (
          <div key={service.name} className="bg-white/30 rounded-2xl shadow-xl p-5 sm:p-7 flex flex-col gap-3 border border-[#00eaff]/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-[#00eaff] mb-1 sm:mb-2">{service.name}</h2>
            <p className="text-[#232526] mb-1 sm:mb-2 text-sm sm:text-base">{service.description}</p>
            <span className="text-base sm:text-lg font-semibold text-[#ffd200]">{service.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
