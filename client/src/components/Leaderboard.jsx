import { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [leetcodeData, setLeetcodeData] = useState([
  { name: "Ashok Bongu", rank: 1210 },
  { name: "Praneeth Boni", rank: 840 },
  { name: "Sanjay Reddy", rank: 3050 },
  { name: "Ravi Kumar", rank: 1890 },
  { name: "Teja Vardhan", rank: 990 },
  { name: "Sneha Sharma", rank: 720 },
  { name: "Manoj Nair", rank: 4100 },
  { name: "Ankita Das", rank: 1330 },
]);


  const [topThree, setTopThree] = useState([]);
  const [rest, setRest] = useState([]);

  useEffect(() => {
    const arrangeLeaderBoard = () => {
      const sorted = [...leetcodeData].sort((a, b) => a.rank - b.rank);
      setTopThree(sorted.slice(0, 3));
      setRest(sorted.slice(3));
    };
    arrangeLeaderBoard();
  }, []);

  return (
    <div className="w-[100%] flex flex-col bg-orange-200 gap-1 text-center  rounded-lg  shadow-xl text-orange-800 md:w-[300px] h-[400px]">
      <h1 className="text-2xl py-3 font-bold border-b-2 border-orange-800 w-full">Leaderboard</h1>

      <div className="h-[150px] bg-orange-200 rounded-lg  m-1 flex justify-evenly super">
        <div className="w-[30%] flex flex-col items-center  gap-1">
          <div className=" border-orange-100 w-15 h-15 rounded-full border mt-11 flex items-center justify-center text-sm font-bold">
            {topThree[1]?.name.split(" ")[0] || "-"}
          </div>
          <div className=" bg-orange-100 h-[45px] w-full text-xl text-gray-400 border-orange-800 rounded-t-xl font-bold">
            2
          </div>
        </div>

        <div className="w-[30%] flex flex-col items-center gap-1">
          <div className=" border-orange-100 w-15 h-15 rounded-full border mt-5 flex items-center justify-center text-sm font-bold">
            {topThree[0]?.name.split(" ")[0] || "-"}
          </div>
          <div className=" bg-orange-100 h-[70px] w-full text-xl text-yellow-400 border-orange-800 rounded-t-xl font-bold">
            1
          </div>
        </div>

        <div className="w-[30%] flex flex-col items-center gap-1">
          <div className=" border-orange-100 w-15 h-15 rounded-full border mt-15 flex items-center justify-center text-sm font-bold">
            {topThree[2]?.name.split(" ")[0] || "-"}
          </div>
          <div className=" bg-orange-100 h-[30px] w-full text-xl text-orange-600 border-orange-800 rounded-t-xl font-bold">
            3
          </div>
        </div>
      </div>

      <div className="flex-1  bg-orange-200 ">
        {rest.map((student, index) => (
          <div key={index} className={`flex justify-between ${index + 4 <= 8 ? "" : "hidden"}  px-4 py-2 m-1 bg-orange-100 rounded-lg text-sm`}>
            <span className="text-orange-800 font-bold">#{index + 4} {student.name}</span>
            <span className="text-orange-500 font-bold">#{student.rank}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
