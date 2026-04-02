import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Time Slots
const periods = [
  "7:30 - 8:15",
  "8:15 - 9:00",
  "9:00 - 9:45",
  "9:45 - 10:30",
  "10:30 - 11:15",
  "11:15 - 12:00",
  "12:00 - 1:30",
];

// Dummy Timetable Data
const timetable = [
  {
    day: "Monday",
    subjects: [
      "Math",
      "English",
      "Physics",
      "Chemistry",
      "Break",
      "Biology",
      "Sports",
    ],
  },
  {
    day: "Tuesday",
    subjects: [
      "Hindi",
      "Math",
      "Computer",
      "Physics",
      "Break",
      "Chemistry",
      "Library",
    ],
  },
  {
    day: "Wednesday",
    subjects: [
      "Biology",
      "English",
      "Math",
      "Geography",
      "Break",
      "Physics",
      "Sports",
    ],
  },
  {
    day: "Thursday",
    subjects: [
      "Computer",
      "Math",
      "English",
      "Chemistry",
      "Break",
      "Biology",
      "Games",
    ],
  },
  {
    day: "Friday",
    subjects: [
      "Physics",
      "Math",
      "English",
      "Biology",
      "Break",
      "Chemistry",
      "Activity",
    ],
  },
  {
    day: "Saturday",
    subjects: ["Math", "English", "Test", "Test", "Break", "Sports", "Holiday"],
  },
];

// Subject Colors
const getColor = (subject) => {
  const map = {
    Math: "bg-blue-100 text-blue-700",
    English: "bg-purple-100 text-purple-700",
    Physics: "bg-yellow-100 text-yellow-700",
    Chemistry: "bg-pink-100 text-pink-700",
    Biology: "bg-green-100 text-green-700",
    Computer: "bg-indigo-100 text-indigo-700",
    Hindi: "bg-orange-100 text-orange-700",
    Geography: "bg-teal-100 text-teal-700",
    Sports: "bg-red-100 text-red-700",
    Break: "bg-gray-200 text-gray-600",
    Test: "bg-slate-200 text-slate-700",
    Activity: "bg-emerald-100 text-emerald-700",
    Library: "bg-cyan-100 text-cyan-700",
    Games: "bg-rose-100 text-rose-700",
    Holiday: "bg-gray-300 text-gray-800",
  };
  return map[subject] || "bg-gray-100";
};

const TimeTable = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Class Time Table</h1>
        <p className="text-sm text-slate-500">
          7 Period Schedule (7:30 AM – 1:30 PM)
        </p>
      </div>

      {/* Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          {/* Head */}
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Day</strong>
              </TableCell>
              {periods.map((time, i) => (
                <TableCell key={i}>
                  <strong>P{i + 1}</strong>
                  <div className="text-xs text-gray-500">{time}</div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {timetable.map((row, i) => (
              <TableRow key={i} hover>
                <TableCell className="font-semibold">{row.day}</TableCell>

                {row.subjects.map((sub, index) => (
                  <TableCell key={index}>
                    <div
                      className={`px-2 py-1 rounded-lg text-xs font-medium text-center ${getColor(sub)}`}
                    >
                      {sub}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TimeTable;
