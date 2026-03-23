import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/teachers')
      .then(response => setTeachers(response.data))
      .catch(error => console.error('Error fetching teachers:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/schools')
      .then(response => setSchools(response.data))
      .catch(error => console.error('Error fetching schools:', error));
  }, []);

  const getSubjectIcon = (subject) => {
    const icons = {
      'Mathematics': '📐', 'English': '📖', 'Science': '🔬', 'Physics': '⚛️',
      'Chemistry': '🧪', 'Biology': '🧬', 'History': '📜', 'Geography': '🌍',
      'Computer Science': '💻', 'Hindi': '📖', 'Commerce': '📊',
      'Economics': '📈', 'Physical Education': '⚽'
    };
    return icons[subject] || '📚';
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'border-emerald-400 bg-emerald-50/50',
      'English': 'border-blue-400 bg-blue-50/50',
      'Science': 'border-red-400 bg-red-50/50',
      'Physics': 'border-amber-400 bg-amber-50/50',
      'Chemistry': 'border-violet-400 bg-violet-50/50',
      'Biology': 'border-pink-400 bg-pink-50/50',
      'History': 'border-orange-400 bg-orange-50/50',
      'Geography': 'border-teal-400 bg-teal-50/50',
      'Computer Science': 'border-indigo-400 bg-indigo-50/50',
      'Hindi': 'border-sky-400 bg-sky-50/50',
      'Commerce': 'border-lime-400 bg-lime-50/50',
      'Economics': 'border-fuchsia-400 bg-fuchsia-50/50',
      'Physical Education': 'border-rose-400 bg-rose-50/50'
    };
    return colors[subject] || 'border-slate-300 bg-slate-50/50';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Teachers</h1>
        <p className="text-sm text-slate-500">{teachers.length} teachers across all schools</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {teachers.map((teacher, i) => (
          <div
            key={teacher.id}
            className={`p-4 rounded-xl border-l-4 border border-slate-100 bg-white shadow-sm card-hover animate-slide-up ${getSubjectColor(teacher.subject).split(' ')[0]}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className={`inline-block px-2 py-1 rounded-lg text-xs font-medium mb-3 ${getSubjectColor(teacher.subject).split(' ')[1]}`}>
              {getSubjectIcon(teacher.subject)} {teacher.subject}
            </div>
            <p className="text-sm font-bold text-slate-800">{teacher.name}</p>
            <p className="text-xs text-slate-400 mt-1">{teacher.email}</p>
            <p className="text-xs text-slate-500 mt-1">{teacher.experience}</p>
            <p className="text-xs text-blue-500 mt-2 font-medium">
              {schools.find(school => school.id === teacher.schoolId)?.schoolName || 'N/A'}
            </p>
          </div>
        ))}
      </div>

      {teachers.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400">No teachers found.</p>
        </div>
      )}
    </div>
  )
}

export default Teachers