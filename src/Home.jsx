import { useState, useEffect } from "react";
import Papa from "papaparse";

import "./home.css";
import Logo from "./assets/logo.svg";

function Home() {
  function getWidthClassName(percentage) {
    const roundedPercentage = Math.round(percentage);

    if (roundedPercentage >= 90) {
      return "w-full";
    } else if (roundedPercentage >= 80) {
      return "w-11/12";
    } else if (roundedPercentage >= 70) {
      return "w-10/12";
    } else if (roundedPercentage >= 60) {
      return "w-9/12";
    } else if (roundedPercentage >= 50) {
      return "w-8/12";
    } else if (roundedPercentage >= 40) {
      return "w-7/12";
    } else if (roundedPercentage >= 30) {
      return "w-6/12";
    } else if (roundedPercentage >= 20) {
      return "w-5/12";
    } else if (roundedPercentage >= 10) {
      return "w-4/12";
    } else {
      return "w-3/12";
    }
  }

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Papa.parse("./leaderboard.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data.map((row) => {
          const badgesCompleted = parseInt(row["# of Skill Badges Completed"], 10);
          const gamesCompleted = parseInt(row["# of Arcade Games Completed"], 10);
          const totalItems = 15 + 8;
          const percentage = ((badgesCompleted + gamesCompleted) / totalItems) * 100;

          return {
            ...row,
            badgesCompleted,
            gamesCompleted,
            percentage,
            rank: 0
          };
        });

        data.sort((a, b) => b.percentage - a.percentage);
        data.forEach((row, index) => {
          row.rank = index + 1;
        });

        setLeaderboardData(data);
      },
    });
  }, []);

  const filteredData = leaderboardData.filter((row) => {
    return (
      row["User Name"].toLowerCase().includes(searchQuery.toLowerCase()) ||
      row["User Email"].toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="overflow-hidden">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="mx-auto p-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
            <div className="md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="#">
                <span className="sr-only">Home</span>
                <img src={Logo} className="lg:h-24 h-20" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="px-6 pb-8 pt-16 mx-auto text-center pattern">
        <div className="max-w-lg mx-auto pb-4">
          <h1 className="text-2xl text-gray-500 lg:text-4xl">Welcome to</h1>
          <div className="flex justify-center items-center whitespace-nowrap mt-1 lg:mt-2">
            <h2 className="lg:mr-4 mr-2 lg:text-7xl text-3xl font-bold text-red-500 inline-block">
              Gen-AI
            </h2>
            <h2 className="lg:mr-4 mr-2 lg:text-7xl text-3xl font-bold text-blue-600 inline-block">
              Study
            </h2>
            <h2 className="lg:mr-4 mr-2 lg:text-7xl text-3xl font-bold text-green-600 inline-block">
              Jams
            </h2>
            <h2 className="text-3xl lg:text-7xl font-bold text-yellow-500 inline-block">
              2024
            </h2>
          </div>
          <p className="mt-3 lg:mt-5 text-gray-500">
            This is an Institution level Rankings Leaderboard for <br />
            <b>Google GenAI Study Jams 2024</b> of <b>GDGC AIKTC</b>
          </p>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center text-center">
            <a href="#" className="group relative w-full lg:w-1/5 m-4 ">
              <span className="p-5 absolute inset-0 border-2 border-dashed border-yellow-500 rounded-md"></span>
              <div className="p-5 relative flex transform items-center justify-center border-2 border-yellow-500 rounded-md bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className=" !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 ">
                  <h2 className="title-font font-medium text-3xl text-yellow-500 ">
                    120
                  </h2>
                  <p className="leading-relaxed">Eligible Participants</p>
                </div>
                <div className="absolute opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
                  <h2 className="title-font font-medium text-3xl text-yellow-500 ">
                    120
                  </h2>
                  <p className="leading-relaxed">Eligible Participants</p>
                </div>
              </div>
            </a>
            <a href="#" className="group relative w-full lg:w-1/5 m-4 ">
              <span className="p-5 absolute inset-0 border-2 border-dashed border-red-600 rounded-md"></span>
              <div className="p-5 relative flex transform items-center justify-center border-2 border-red-600 rounded-md bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className=" !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 ">
                  <h2 className="title-font font-medium text-3xl text-red-500">
                    183
                  </h2>
                  <p className="leading-relaxed">Participants Registered</p>
                </div>
                <div className="absolute opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
                  <h2 className="title-font font-medium text-3xl text-red-500">
                    183
                  </h2>
                  <p className="leading-relaxed">Participants Registered</p>
                </div>
              </div>
            </a>
            <a href="#" className="group relative w-full lg:w-1/5 m-4 ">
              <span className="p-5 absolute inset-0 border-2 border-dashed border-green-500 rounded-md"></span>
              <div className="p-5 relative flex transform items-center justify-center border-2 border-green-500 rounded-md bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="!pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 ">
                  <h2 className="title-font font-medium text-3xl text-green-500">
                    0
                  </h2>
                  <p className="leading-relaxed">Participants Qualified</p>
                </div>
                <div className="absolute opacity-0 transition-opacity group-hover:relative group-hover:opacity-100">
                  <h2 className="title-font font-medium text-3xl text-green-500">
                    0
                  </h2>
                  <p className="leading-relaxed">Participants Qualified</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="w-full max-w-sm mx-auto mt-6 bg-white border rounded-md focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40">
          <form className="flex flex-row">
            <input
              type="text"
              placeholder="Enter your name or email..."
              className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="bg-blue-700 flex justify-center items-center rounded-lg m-1 px-3 ">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </form>
        </div>
      </div>
      <section className="px-4 mx-2 lg:overflow-hidden overflow-x-auto pattern">
        <div className="flex flex-col mb-6">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="table-fixed divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="w-1/8 py-3.5 px-4 font-semibold text-left rtl:text-right text-gray-500">
                        Name & Email
                      </th>
                      <th scope="col" className="w-1/8 px-4 py-3.5 font-semibold text-left rtl:text-right text-gray-500">
                        Profile URL Status
                      </th>
                      <th scope="col" className="w-1/8 px-4 py-3.5 font-semibold text-left rtl:text-right text-gray-500">
                        Access Code Redemption Status
                      </th>
                      <th scope="col" className="w-1/8 px-4 py-3.5 font-semibold text-left rtl:text-right text-gray-500">
                        All Skill Badges & Games Completed?
                      </th>
                      <th scope="col" className="w-1/8 px-4 py-3.5 font-semibold text-left rtl:text-right text-gray-500">
                        No. of Skill Badges Completed
                      </th>
                      <th scope="col" className="w-1/8 px-4 py-3.5 font-semibold text-left rtl:text-right text-gray-500">
                        No. of Arcade Games Completed
                      </th>
                      <th scope="col" className="w-1/8 px-4 py-3.5 font-semibold text-left rtl:text-right text-gray-500">
                        Completion Status
                      </th>
                      <th scope="col" className="w-1/8 px-4 py-3.5 font-semibold text-left rtl:text-right text-gray-500">
                        Rank
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-gray-500">
                          Kindly check your name / email & try again
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((row, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              <h2 className="font-medium text-gray-800">
                                {row["User Name"]}
                              </h2>
                              <p className="text-sm font-normal text-gray-600">
                                {row["User Email"]}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium">
                            {
                              row["Profile URL Status"] === "All Good" ? (
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 bg-green-100/60">
                                  {row["Profile URL Status"]}
                                </div>
                              ) : (
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 bg-red-100/60 text-center">
                                  Wrong URL
                                </div>
                              )
                            }
                          </td>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            {
                              row["Access Code Redemption Status"] === "Yes" ? (
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 bg-green-100/60">
                                  {row["Access Code Redemption Status"]}
                                </div>
                              ) : (
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 bg-red-100/60">
                                  {row["Access Code Redemption Status"]}
                                </div>
                              )
                            }
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            {
                              row["All Skill Badges & Games Completed"] === "Yes" ? (
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-green-500 bg-green-100/60">
                                  {row["All Skill Badges & Games Completed"]}
                                </div>
                              ) : (
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 bg-red-100/60">
                                  {row["All Skill Badges & Games Completed"]}
                                </div>
                              )
                            }
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div>
                              <h4 className="text-gray-700">
                                {row["# of Skill Badges Completed"]}
                              </h4>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div>
                              <h4 className="text-gray-700">
                                {row["# of Arcade Games Completed"]}
                              </h4>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="w-full h-1.5 bg-blue-200 overflow-hidden rounded-full">
                              <div className={`bg-blue-500 h-1.5 ${getWidthClassName(row["percentage"])}`}></div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div>
                              <h4 className="text-gray-700 pl-2">{row["rank"]}</h4>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
