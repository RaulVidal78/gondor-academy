import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type Student = {
  id: string;
  name: string;
  score: number;
  badges: string[];
};

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudentName, setNewStudentName] = useState<string>('');

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    if (newStudentName.trim() === '') return;
    const newStudent: Student = {
      id: Date.now().toString(),
      name: newStudentName,
      score: 0,
      badges: [],
    };  
    setStudents([...students, newStudent]);
    setNewStudentName('');
  };

  const deleteStudent = (id: string) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  };

  const updateScore = (id: string, increment: number) => {
    setStudents(students.map(student => {
      if (student.id === id) {
        return { ...student, score: student.score + increment };
      }
      return student;
    }));
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <input  
        type="text"
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
        placeholder="Enter student name"
        className="border-2 border-gray-300 p-2 rounded-md mb-2"
      />
      <button onClick={addStudent} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Add Student
      </button>
      <motion.ul className="mt-5">
        {students.map(student => (
          <motion.li key={student.id} className="flex justify-between items-center bg-white p-4 rounded-md shadow mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="flex-1">
              {student.name} - Score: {student.score}
            </span>
            <div>
              <button onClick={() => updateScore(student.id, 1)} className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 mr-2">
                +1
              </button>
              <button onClick={() => deleteStudent(student.id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                Delete
              </button>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default StudentManagement;