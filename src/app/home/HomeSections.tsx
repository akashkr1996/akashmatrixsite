import React from "react";

export default function HomeSections() {
  return (
    <>
      {/* About Me & Site Description */}
      <section className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-[#00eaff]">Welcome to AkashMatrix</h1>
        <p className="text-lg text-[#ffd200] mb-6">
          I am Akash, your consultant for Tech Career, Skill Upgrade, Courses and Job Assistant needs. My mission is to empower individuals with expert advice, personalized solutions, and actionable strategies. Explore our services and see how we can help you grow and succeed!
        </p>
      </section>
      {/* Services Overview */}
      <section className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-4 text-[#ffd200]">Educational Services</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <li className="bg-white/20 rounded-xl p-4 shadow border border-[#00eaff]/30">
            <span className="text-xl font-bold text-[#00eaff]">Full stack development</span>
            <p className="text-[#232526]">Learn tecnologies : React, Angular, NodeJs, ExpressJS, Mongodb NextJs</p>
            <span className="text-[#ffd200] font-semibold">₹999/session</span>
          </li>
          <li className="bg-white/20 rounded-xl p-4 shadow border border-[#00eaff]/30">
            <span className="text-xl font-bold text-[#00eaff]">Full stack QA / SDET</span>
            <p className="text-[#232526]">Learn Selenium, TestNg, Cucumber, RestAssured, Postman, SQL</p>
            <span className="text-[#ffd200] font-semibold">₹999/session</span>
          </li>
          <li className="bg-white/20 rounded-xl p-4 shadow border border-[#00eaff]/30">
            <span className="text-xl font-bold text-[#00eaff]">Devops</span>
            <p className="text-[#232526]">Learn AWS, Azure, Jenkins, GIT, DOCKER, Kubernaties</p>
            <span className="text-[#ffd200] font-semibold">₹999/session</span>
          </li>
          <li className="bg-white/20 rounded-xl p-4 shadow border border-[#00eaff]/30">
            <span className="text-xl font-bold text-[#00eaff]">Programming Languages</span>
            <p className="text-[#232526]">Learn Python , JAVA, Javascript</p>
            <span className="text-[#ffd200] font-semibold">₹999/session</span>
          </li>
        </ul>
      </section>
      {/* Customer Testimonials */}
      <section className="max-w-3xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-4 text-[#00eaff]">Happy Customers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/20 rounded-xl p-4 shadow border border-[#ffd200]/30">
            <p className="text-[#232526] italic mb-2">“Akash helped me streamline my career and increase growth. Highly recommended!”</p>
            <span className="font-bold text-[#00eaff]">— Priya S.</span>
          </div>
          <div className="bg-white/20 rounded-xl p-4 shadow border border-[#ffd200]/30">
            <p className="text-[#232526] italic mb-2">“The Carrer planning session was eye-opening. I feel confident about my Technical growth now.”</p>
            <span className="font-bold text-[#00eaff]">— Rahul M.</span>
          </div>
          <div className="bg-white/20 rounded-xl p-4 shadow border border-[#ffd200]/30">
            <p className="text-[#232526] italic mb-2">“I was Struggling to land into any job, With aksh help i have made it. Akash is very knowledgeable.”</p>
            <span className="font-bold text-[#00eaff]">— Sneha T.</span>
          </div>
          <div className="bg-white/20 rounded-xl p-4 shadow border border-[#ffd200]/30">
            <p className="text-[#232526] italic mb-2">“I want finding difficulties to swith in senior profile and get regeted in  online presence, But akash helped me deeply. Thank you!”</p>
            <span className="font-bold text-[#00eaff]">— Amit K.</span>
          </div>
        </div>
      </section>
    </>
  );
}
